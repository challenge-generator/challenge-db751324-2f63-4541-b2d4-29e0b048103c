export interface CloudServiceConfig {
  region?: string;
  endpoint?: string;
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
}

export interface CloudConfig {
  aws: {
    region: string;
    cognito: CloudServiceConfig;
    s3: CloudServiceConfig;
  };
  firebase: CloudServiceConfig;
  api: {
    baseUrl: string;
    timeout: number;
    retryAttempts: number;
  };
}

const getEnvVar = (key: string, defaultValue: string = ''): string => {
  return import.meta.env[key] || defaultValue;
};

const getEnvNumber = (key: string, defaultValue: number): number => {
  const value = import.meta.env[key];
  return value ? parseInt(value, 10) : defaultValue;
};

export const cloudConfig: CloudConfig = {
  aws: {
    region: getEnvVar('VITE_AWS_REGION', 'us-east-1'),
    cognito: {
      region: getEnvVar('VITE_AWS_REGION', 'us-east-1'),
      endpoint: getEnvVar('VITE_COGNITO_ENDPOINT'),
      apiKey: getEnvVar('VITE_COGNITO_API_KEY'),
    },
    s3: {
      region: getEnvVar('VITE_AWS_REGION', 'us-east-1'),
      endpoint: getEnvVar('VITE_S3_ENDPOINT'),
    },
  },
  firebase: {
    authDomain: getEnvVar('VITE_FIREBASE_AUTH_DOMAIN'),
    projectId: getEnvVar('VITE_FIREBASE_PROJECT_ID'),
    storageBucket: getEnvVar('VITE_FIREBASE_STORAGE_BUCKET'),
    messagingSenderId: getEnvVar('VITE_FIREBASE_MESSAGING_SENDER_ID'),
    appId: getEnvVar('VITE_FIREBASE_APP_ID'),
  },
  api: {
    baseUrl: getEnvVar('VITE_API_BASE_URL', 'https://api.example.com'),
    timeout: getEnvNumber('VITE_API_TIMEOUT', 30000),
    retryAttempts: getEnvNumber('VITE_API_RETRY_ATTEMPTS', 3),
  },
};

export const getCognitoConfig = () => ({
  region: cloudConfig.aws.region,
  credentials: {
    accessKeyId: cloudConfig.aws.cognito.apiKey || '',
    secretAccessKey: getEnvVar('VITE_COGNITO_SECRET_KEY', ''),
  },
});

export const getS3Config = () => ({
  region: cloudConfig.aws.s3.region,
  endpoint: cloudConfig.aws.s3.endpoint || undefined,
  credentials: {
    accessKeyId: getEnvVar('VITE_S3_ACCESS_KEY', ''),
    secretAccessKey: getEnvVar('VITE_S3_SECRET_KEY', ''),
  },
});

export const getFirebaseConfig = () => ({
  authDomain: cloudConfig.firebase.authDomain,
  projectId: cloudConfig.firebase.projectId,
  storageBucket: cloudConfig.firebase.storageBucket,
  messagingSenderId: cloudConfig.firebase.messagingSenderId,
  appId: cloudConfig.firebase.appId,
});

export const getApiConfig = () => ({
  baseURL: cloudConfig.api.baseUrl,
  timeout: cloudConfig.api.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});