import { CloudProvider, CloudService, CloudServiceConfig, CloudServiceStatus, CloudServiceResponse, CloudServiceMetrics, CloudServiceFeature } from './cloudServices.d';

export type { CloudProvider, CloudService, CloudServiceConfig, CloudServiceStatus, CloudServiceResponse, CloudServiceMetrics, CloudServiceFeature };

export type ProviderType = 'aws' | 'firebase' | 'azure' | 'gcp';

export interface CloudServiceEvaluation {
  serviceId: string;
  provider: ProviderType;
  serviceName: string;
  category: 'auth' | 'storage' | 'notifications' | 'compute' | 'database';
  pros: string[];
  cons: string[];
  estimatedCost: number;
  latency: number;
  scalability: 'low' | 'medium' | 'high';
  securityFeatures: string[];
  complianceCertifications: string[];
  easeOfIntegration: number;
  documentationQuality: number;
  communitySupport: number;
  lastUpdated: Date;
}

export interface CloudIntegrationConfig {
  enabledServices: string[];
  fallbackProvider?: ProviderType;
  retryAttempts: number;
  timeout: number;
  cacheDuration: number;
}

export interface CloudServiceHealth {
  serviceId: string;
  status: 'healthy' | 'degraded' | 'unavailable';
  lastCheck: Date;
  responseTime: number;
  errorRate: number;
}

export interface CloudServiceUsage {
  serviceId: string;
  requestsPerMinute: number;
  dataTransfer: number;
  computeUnits: number;
  storageUsed: number;
}

export type CloudEventHandler = (event: CloudServiceEvent) => void;

export interface CloudServiceEvent {
  type: 'auth' | 'storage' | 'notification' | 'error' | 'health';
  serviceId: string;
  timestamp: Date;
  payload: unknown;
}

export interface CloudServiceError {
  serviceId: string;
  code: string;
  message: string;
  timestamp: Date;
  recoverable: boolean;
}

export const CLOUD_PROVIDERS: Record<ProviderType, CloudProvider>;
export const DEFAULT_CONFIG: CloudIntegrationConfig;