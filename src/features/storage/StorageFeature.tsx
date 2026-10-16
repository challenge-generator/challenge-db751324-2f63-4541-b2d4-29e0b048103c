import React, { useState, useCallback } from 'react';
import { storageService, StorageFile, UploadProgress } from '@services/storageService';
import { CloudServiceCard } from '@shared/components/CloudServiceCard';

interface StorageFeatureProps {
  onError?: (error: Error) => void;
}

export const StorageFeature: React.FC<StorageFeatureProps> = ({ onError }) => {
  const [files, setFiles] = useState<StorageFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<UploadProgress | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<string>('default');

  const handleUpload = useCallback(async (file: File) => {
    setUploading(true);
    try {
      const uploadedFile = await storageService.uploadFile(file, selectedFolder, (prog) => {
        setProgress(prog);
      });
      setFiles((prev) => [...prev, uploadedFile]);
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Error al subir archivo');
      onError?.(err);
    } finally {
      setUploading(false);
      setProgress(null);
    }
  }, [selectedFolder, onError]);

  const handleDelete = useCallback(async (fileId: string) => {
    try {
      await storageService.deleteFile(fileId);
      setFiles((prev) => prev.filter((f) => f.id !== fileId));
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Error al eliminar archivo');
      onError?.(err);
    }
  }, [onError]);

  const handleListFiles = useCallback(async () => {
    try {
      const fileList = await storageService.listFiles(selectedFolder);
      setFiles(fileList);
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Error al listar archivos');
      onError?.(err);
    }
  }, [selectedFolder, onError]);

  const handleDownload = useCallback(async (fileId: string) => {
    try {
      const downloadUrl = await storageService.getDownloadUrl(fileId);
      window.open(downloadUrl, '_blank');
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Error al obtener URL de descarga');
      onError?.(err);
    }
  }, [onError]);

  return (
    <div className="storage-feature">
      <h2>Almacenamiento en la Nube</h2>
      <CloudServiceCard
        title="AWS S3 / Firebase Storage"
        description="Almacenamiento escalable de archivos"
        status="active"
      />
      <div className="storage-controls">
        <select
          value={selectedFolder}
          onChange={(e) => setSelectedFolder(e.target.value)}
          className="folder-select"
        >
          <option value="default">Carpeta Principal</option>
          <option value="documents">Documentos</option>
          <option value="images">Imágenes</option>
          <option value="videos">Videos</option>
        </select>
        <button onClick={handleListFiles} disabled={uploading} className="btn-list">
          Listar Archivos
        </button>
        <label className="upload-label">
          <input
            type="file"
            onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
            disabled={uploading}
            style={{ display: 'none' }}
          />
          <span className="btn-upload">{uploading ? 'Subiendo...' : 'Subir Archivo'}</span>
        </label>
      </div>
      {progress && (
        <div className="upload-progress">
          <progress value={progress.percentage} max={100} />
          <span>{progress.percentage}% - {progress.bytesUploaded} / {progress.totalBytes} bytes</span>
        </div>
      )}
      <div className="file-list">
        {files.length === 0 ? (
          <p className="no-files">No hay archivos en esta carpeta</p>
        ) : (
          files.map((file) => (
            <div key={file.id} className="file-item">
              <span className="file-name">{file.name}</span>
              <span className="file-size">{(file.size / 1024).toFixed(2)} KB</span>
              <span className="file-date">{new Date(file.lastModified).toLocaleDateString()}</span>
              <button onClick={() => handleDownload(file.id)} className="btn-download">
                Descargar
              </button>
              <button onClick={() => handleDelete(file.id)} className="btn-delete">
                Eliminar
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StorageFeature;