import { ref, uploadBytesResumable, getDownloadURL, deleteObject, listAll, StorageReference, getStorage } from 'firebase/storage';
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, ListObjectsV2Command, ListObjectsV2CommandOutput } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export interface StorageFile {
  key: string;
  url?: string;
  size: number;
  contentType: string;
  lastModified: Date;
  provider: 'firebase-storage' | 'aws-s3';
}

export interface UploadProgress {
  bytesTransferred: number;
  totalBytes: number;
  percentage: number;
}

export interface StorageServiceConfig {
  provider: 'firebase-storage' | 'aws-s3';
  firebaseStorage?: ReturnType<typeof getStorage>;
  s3Client?: S3Client;
  bucketName: string;
  region?: string;
}

export interface UploadOptions {
  onProgress?: (progress: UploadProgress) => void;
  contentType?: string;
  metadata?: Record<string, string>;
}

export class StorageService {
  private config: StorageServiceConfig;
  private basePath: string = '';

  constructor(config: StorageServiceConfig) {
    this.config = config;
  }

  setBasePath(path: string): void {
    this.basePath = path.endsWith('/') ? path : `${path}/`;
  }

  async uploadFile(file: File, path: string, options?: UploadOptions): Promise<StorageFile> {
    const fullPath = `${this.basePath}${path}`;

    if (this.config.provider === 'firebase-storage' && this.config.firebaseStorage) {
      return this.uploadToFirebase(file, fullPath, options);
    }

    if (this.config.provider === 'aws-s3' && this.config.s3Client) {
      return this.uploadToS3(file, fullPath, options);
    }

    throw new Error('Proveedor de almacenamiento no configurado');
  }

  async downloadFile(path: string): Promise<{ blob: Blob; contentType: string }> {
    const fullPath = `${this.basePath}${path}`;

    if (this.config.provider === 'firebase-storage' && this.config.firebaseStorage) {
      return this.downloadFromFirebase(fullPath);
    }

    if (this.config.provider === 'aws-s3' && this.config.s3Client) {
      return this.downloadFromS3(fullPath);
    }

    throw new Error('Proveedor de almacenamiento no configurado');
  }

  async getSignedDownloadUrl(path: string, expiresInSeconds: number = 3600): Promise<string> {
    const fullPath = `${this.basePath}${path}`;

    if (this.config.provider === 'aws-s3' && this.config.s3Client) {
      const command = new GetObjectCommand({
        Bucket: this.config.bucketName,
        Key: fullPath,
      });

      return getSignedUrl(this.config.s3Client, command, { expiresIn: expiresInSeconds });
    }

    if (this.config.provider === 'firebase-storage' && this.config.firebaseStorage) {
      const storageRef = ref(this.config.firebaseStorage, fullPath);
      return getDownloadURL(storageRef);
    }

    throw new Error('Proveedor de almacenamiento no configurado');
  }

  async deleteFile(path: string): Promise<void> {
    const fullPath = `${this.basePath}${path}`;

    if (this.config.provider === 'firebase-storage' && this.config.firebaseStorage) {
      const storageRef = ref(this.config.firebaseStorage, fullPath);
      await deleteObject(storageRef);
      return;
    }

    if (this.config.provider === 'aws-s3' && this.config.s3Client) {
      await this.config.s3Client.send(
        new DeleteObjectCommand({
          Bucket: this.config.bucketName,
          Key: fullPath,
        })
      );
      return;
    }

    throw new Error('Proveedor de almacenamiento no configurado');
  }

  async listFiles(prefix?: string): Promise<StorageFile[]> {
    const searchPrefix = prefix ? `${this.basePath}${prefix}` : this.basePath;

    if (this.config.provider === 'firebase-storage' && this.config.firebaseStorage) {
      return this.listFirebaseFiles(searchPrefix);
    }

    if (this.config.provider === 'aws-s3' && this.config.s3Client) {
      return this.listS3Files(searchPrefix);
    }

    throw new Error('Proveedor de almacenamiento no configurado');
  }

  async copyFile(sourcePath: string, destinationPath: string): Promise<void> {
    const fullSource = `${this.basePath}${sourcePath}`;
    const fullDestination = `${this.basePath}${destinationPath}`;

    if (this.config.provider === 'aws-s3' && this.config.s3Client) {
      const copyCommand = new PutObjectCommand({
        Bucket: this.config.bucketName,
        Key: fullDestination,
        CopySource: encodeURIComponent(`${this.config.bucketName}/${fullSource}`),
      });

      await this.config.s3Client.send(copyCommand);
      return;
    }

    if (this.config.provider === 'firebase-storage' && this.config.firebaseStorage) {
      const sourceRef = ref(this.config.firebaseStorage, fullSource);
      const downloadUrl = await getDownloadURL(sourceRef);

      const response = await fetch(downloadUrl);
      const blob = await response.blob();

      const destRef = ref(this.config.firebaseStorage, fullDestination);
      await uploadBytesResumable(destRef, blob);
      return;
    }

    throw new Error('Proveedor de almacenamiento no configurado');
  }

  private async uploadToFirebase(file: File, path: string, options?: UploadOptions): Promise<StorageFile> {
    if (!this.config.firebaseStorage) {
      throw new Error('Firebase Storage no está configurado');
    }

    const storageRef = ref(this.config.firebaseStorage, path);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          if (options?.onProgress) {
            const progress: UploadProgress = {
              bytesTransferred: snapshot.bytesTransferred,
              totalBytes: snapshot.totalBytes,
              percentage: Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100),
            };
            options.onProgress(progress);
          }
        },
        (error) => reject(error),
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve({
            key: path,
            url: downloadURL,
            size: file.size,
            contentType: file.type,
            lastModified: new Date(),
            provider: 'firebase-storage',
          });
        }
      );
    });
  }

  private async uploadToS3(file: File, path: string, options?: UploadOptions): Promise<StorageFile> {
    if (!this.config.s3Client) {
      throw new Error('S3 client no está configurado');
    }

    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    const command = new PutObjectCommand({
      Bucket: this.config.bucketName,
      Key: path,
      Body: uint8Array,
      ContentType: options?.contentType || file.type,
      Metadata: options?.metadata,
    });

    await this.config.s3Client.send(command);

    const signedUrl = await this.getSignedDownloadUrl(path, 604800);

    return {
      key: path,
      url: signedUrl,
      size: file.size,
      contentType: file.type,
      lastModified: new Date(),
      provider: 'aws-s3',
    };
  }

  private async downloadFromFirebase(path: string): Promise<{ blob: Blob; contentType: string }> {
    if (!this.config.firebaseStorage) {
      throw new Error('Firebase Storage no está configurado');
    }

    const storageRef = ref(this.config.firebaseStorage, path);
    const url = await getDownloadURL(storageRef);

    const response = await fetch(url);
    const blob = await response.blob();
    const contentType = blob.type || 'application/octet-stream';

    return { blob, contentType };
  }

  private async downloadFromS3(path: string): Promise<{ blob: Blob; contentType: string }> {
    if (!this.config.s3Client) {
      throw new Error('S3 client no está configurado');
    }

    const command = new GetObjectCommand({
      Bucket: this.config.bucketName,
      Key: path,
    });

    const response = await this.config.s3Client.send(command);
    
    if (!response.Body) {
      throw new Error('Cuerpo de respuesta vacío');
    }

    const blob = await response.Body.transformToBlob();
    const contentType = response.ContentType || 'application/octet-stream';

    return { blob, contentType };
  }

  private async listFirebaseFiles(prefix: string): Promise<StorageFile[]> {
    if (!this.config.firebaseStorage) {
      throw new Error('Firebase Storage no está configurado');
    }

    const storageRef = ref(this.config.firebaseStorage, prefix);
    const result = await listAll(storageRef);

    const files: StorageFile[] = await Promise.all(
      result.items.map(async (item: StorageReference) => {
        const url = await getDownloadURL(item);
        const metadata = await item.getMetadata();

        return {
          key: item.fullPath,
          url,
          size: metadata.size || 0,
          contentType: metadata.contentType || 'application/octet-stream',
          lastModified: metadata.updated ? new Date(metadata.updated) : new Date(),
          provider: 'firebase-storage',
        };
      })
    );

    return files;
  }

  private async listS3Files(prefix: string): Promise<StorageFile[]> {
    if (!this.config.s3Client) {
      throw new Error('S3 client no está configurado');
    }

    const command = new ListObjectsV2Command({
      Bucket: this.config.bucketName,
      Prefix: prefix,
    });

    const response: ListObjectsV2CommandOutput = await this.config.s3Client.send(command);

    const files: StorageFile[] = (response.Contents || []).map((item) => ({
      key: item.Key || '',
      size: item.Size || 0,
      contentType: this.inferContentType(item.Key || ''),
      lastModified: item.LastModified || new Date(),
      provider: 'aws-s3',
    }));

    return files;
  }

  private inferContentType(key: string): string {
    const ext = key.split('.').pop()?.toLowerCase();
    const contentTypes: Record<string, string> = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
      webp: 'image/webp',
      svg: 'image/svg+xml',
      pdf: 'application/pdf',
      json: 'application/json',
      xml: 'application/xml',
      txt: 'text/plain',
      html: 'text/html',
      css: 'text/css',
      js: 'application/javascript',
      mp4: 'video/mp4',
      mp3: 'audio/mpeg',
    };

    return contentTypes[ext || ''] || 'application/octet-stream';
  }
}

export const createStorageService = (config: StorageServiceConfig): StorageService => {
  return new StorageService(config);
};