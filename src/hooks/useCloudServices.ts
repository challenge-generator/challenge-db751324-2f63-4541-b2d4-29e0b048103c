import { useState, useCallback, useEffect, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import {
  CloudServiceEvaluation,
  CloudServiceHealth,
  CloudServiceUsage,
  CloudServiceError,
  CloudIntegrationConfig,
  ProviderType,
} from '@/types/cloudServices';
import { errorHandler } from '@/utils/errorHandler';

const API_BASE_URL = '/api/cloud-services';

const DEFAULT_CONFIG: CloudIntegrationConfig = {
  enabledServices: [],
  fallbackProvider: 'aws',
  retryAttempts: 3,
  timeout: 5000,
  cacheDuration: 300000,
};

interface UseCloudServicesOptions {
  config?: Partial<CloudIntegrationConfig>;
  onError?: (error: CloudServiceError) => void;
  onSuccess?: (data: CloudServiceEvaluation[]) => void;
}

interface UseCloudServicesReturn {
  services: CloudServiceEvaluation[];
  isLoading: boolean;
  isError: boolean;
  error: CloudServiceError | null;
  selectedServices: string[];
  healthStatus: Map<string, CloudServiceHealth>;
  usageData: Map<string, CloudServiceUsage>;
  selectService: (serviceId: string) => void;
  deselectService: (serviceId: string) => void;
  toggleService: (serviceId: string) => void;
  refreshServices: () => void;
  getServiceById: (serviceId: string) => CloudServiceEvaluation | undefined;
  getServicesByProvider: (provider: ProviderType) => CloudServiceEvaluation[];
  getServicesByCategory: (category: string) => CloudServiceEvaluation[];
  evaluateService: (serviceId: string) => Promise<void>;
  checkHealth: (serviceId: string) => Promise<CloudServiceHealth>;
  getUsage: (serviceId: string) => Promise<CloudServiceUsage>;
}

const mockServices: CloudServiceEvaluation[] = [
  {
    serviceId: 'aws-cognito',
    provider: 'aws',
    serviceName: 'Amazon Cognito',
    category: 'auth',
    pros: ['Integración nativa con AWS', 'Alta escalabilidad', 'Soporte para OAuth2'],
    cons: ['Curva de aprendizaje pronunciada', 'Costos variables'],
    estimatedCost: 150,
    latency: 45,
    scalability: 'high',
    securityFeatures: ['MFA', 'Cifrado AES-256', 'Cumplimiento SOC'],
    complianceCertifications: ['SOC 2', 'ISO 27001', 'HIPAA'],
    easeOfIntegration: 7,
    documentationQuality: 9,
    communitySupport: 8,
    lastUpdated: new Date(),
  },
  {
    serviceId: 'aws-s3',
    provider: 'aws',
    serviceName: 'Amazon S3',
    category: 'storage',
    pros: ['99.999999999% durabilidad', 'Lifecycle policies', 'Versioning'],
    cons: ['Configuración de permisos compleja', 'Costos por solicitud'],
    estimatedCost: 50,
    latency: 30,
    scalability: 'high',
    securityFeatures: ['Cifrado SSE-KMS', 'Bucket policies', 'Access Control Lists'],
    complianceCertifications: ['SOC 2', 'ISO 27001', 'HIPAA', 'PCI DSS'],
    easeOfIntegration: 9,
    documentationQuality: 10,
    communitySupport: 9,
    lastUpdated: new Date(),
  },
  {
    serviceId: 'firebase-auth',
    provider: 'firebase',
    serviceName: 'Firebase Authentication',
    category: 'auth',
    pros: ['SDK completo para múltiples plataformas', 'UI preconstruida', 'Integración con Firebase Analytics'],
    cons: ['Dependencia del ecosistema Google', 'Límites en tier gratuito'],
    estimatedCost: 75,
    latency: 55,
    scalability: 'high',
    securityFeatures: ['Recaptcha', 'Phone authentication', 'Email link auth'],
    complianceCertifications: ['SOC 2', 'COPPA'],
    easeOfIntegration: 9,
    documentationQuality: 9,
    communitySupport: 8,
    lastUpdated: new Date(),
  },
  {
    serviceId: 'firebase-storage',
    provider: 'firebase',
    serviceName: 'Firebase Cloud Storage',
    category: 'storage',
    pros: ['Integración con Firebase Auth', 'SDKs para móviles', 'Firebase Hosting integrado'],
    cons: ['Costos escalan rápidamente', 'Dependencia de región'],
    estimatedCost: 40,
    latency: 60,
    scalability: 'high',
    securityFeatures: ['Firebase Security Rules', 'Signed URLs', 'Cifrado en tránsito'],
    complianceCertifications: ['SOC 2'],
    easeOfIntegration: 8,
    documentationQuality: 8,
    communitySupport: 7,
    lastUpdated: new Date(),
  },
  {
    serviceId: 'firebase-cloud-messaging',
    provider: 'firebase',
    serviceName: 'Firebase Cloud Messaging',
    category: 'notifications',
    pros: ['Gratis hasta 10K mensajes', 'Segmentación de usuarios', 'Analytics integrado'],
    cons: ['Solo hasta 4KB por mensaje', 'Sin garantía de entrega'],
    estimatedCost: 25,
    latency: 100,
    scalability: 'high',
    securityFeatures: ['Topic subscriptions', 'Device groups', 'APNs/HCM integration'],
    complianceCertifications: ['SOC 2'],
    easeOfIntegration: 9,
    documentationQuality: 9,
    communitySupport: 8,
    lastUpdated: new Date(),
  },
];

export const useCloudServices = (options?: UseCloudServicesOptions): UseCloudServicesReturn => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [healthStatus, setHealthStatus] = useState<Map<string, CloudServiceHealth>>(new Map());
  const [usageData, setUsageData] = useState<Map<string, CloudServiceUsage>>(new Map());
  const [error, setError] = useState<CloudServiceError | null>(null);

  const config = useMemo(
    () => ({ ...DEFAULT_CONFIG, ...options?.config }),
    [options?.config]
  );

  const queryClient = useQueryClient();

  const {
    data: services = [],
    isLoading,
    isError,
    refetch,
  } = useQuery<CloudServiceEvaluation[]>({
    queryKey: ['cloud-services'],
    queryFn: async () => {
      try {
        const response = await axios.get<CloudServiceEvaluation[]>(
          `${API_BASE_URL}/evaluations`,
          {
            timeout: config.timeout,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        return response.data;
      } catch (err) {
        const axiosError = err as AxiosError;
        const serviceError: CloudServiceError = {
          serviceId: 'api',
          code: axiosError.code || 'UNKNOWN_ERROR',
          message: errorHandler.handleError(err),
          timestamp: new Date(),
          recoverable: true,
        };
        setError(serviceError);
        options?.onError?.(serviceError);
        console.warn('API no disponible, usando datos mock:', serviceError.message);
        return mockServices;
      }
    },
    staleTime: config.cacheDuration,
    retry: config.retryAttempts,
    refetchOnWindowFocus: false,
  });

  const selectService = useCallback((serviceId: string) => {
    setSelectedServices((prev) => {
      if (prev.includes(serviceId)) return prev;
      return [...prev, serviceId];
    });
  }, []);

  const deselectService = useCallback((serviceId: string) => {
    setSelectedServices((prev) => prev.filter((id) => id !== serviceId));
  }, []);

  const toggleService = useCallback((serviceId: string) => {
    setSelectedServices((prev) => {
      if (prev.includes(serviceId)) {
        return prev.filter((id) => id !== serviceId);
      }
      return [...prev, serviceId];
    });
  }, []);

  const getServiceById = useCallback(
    (serviceId: string): CloudServiceEvaluation | undefined => {
      return services.find((s) => s.serviceId === serviceId);
    },
    [services]
  );

  const getServicesByProvider = useCallback(
    (provider: ProviderType): CloudServiceEvaluation[] => {
      return services.filter((s) => s.provider === provider);
    },
    [services]
  );

  const getServicesByCategory = useCallback(
    (category: string): CloudServiceEvaluation[] => {
      return services.filter((s) => s.category === category);
    },
    [services]
  );

  const checkHealth = useCallback(
    async (serviceId: string): Promise<CloudServiceHealth> => {
      try {
        const response = await axios.get<CloudServiceHealth>(
          `${API_BASE_URL}/${serviceId}/health`,
          { timeout: config.timeout }
        );
        setHealthStatus((prev) => {
          const newMap = new Map(prev);
          newMap.set(serviceId, response.data);
          return newMap;
        });
        return response.data;
      } catch (err) {
        const mockHealth: CloudServiceHealth = {
          serviceId,
          status: 'healthy',
          lastCheck: new Date(),
          responseTime: Math.floor(Math.random() * 100) + 20,
          errorRate: Math.random() * 0.01,
        };
        setHealthStatus((prev) => {
          const newMap = new Map(prev);
          newMap.set(serviceId, mockHealth);
          return newMap;
        });
        return mockHealth;
      }
    },
    [config.timeout]
  );

  const getUsage = useCallback(
    async (serviceId: string): Promise<CloudServiceUsage> => {
      try {
        const response = await axios.get<CloudServiceUsage>(
          `${API_BASE_URL}/${serviceId}/usage`,
          { timeout: config.timeout }
        );
        setUsageData((prev) => {
          const newMap = new Map(prev);
          newMap.set(serviceId, response.data);
          return newMap;
        });
        return response.data;
      } catch (err) {
        const mockUsage: CloudServiceUsage = {
          serviceId,
          requestsPerMinute: Math.floor(Math.random() * 1000),
          dataTransfer: Math.floor(Math.random() * 100),
          computeUnits: Math.floor(Math.random() * 50),
          storageUsed: Math.floor(Math.random() * 1000),
        };
        setUsageData((prev) => {
          const newMap = new Map(prev);
          newMap.set(serviceId, mockUsage);
          return newMap;
        });
        return mockUsage;
      }
    },
    [config.timeout]
  );

  const evaluateServiceMutation = useMutation({
    mutationFn: async (serviceId: string) => {
      const response = await axios.post<CloudServiceEvaluation>(
        `${API_BASE_URL}/${serviceId}/evaluate`,
        {},
        { timeout: config.timeout }
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['cloud-services'], (old: CloudServiceEvaluation[] | undefined) => {
        if (!old) return [data];
        return old.map((s) => (s.serviceId === data.serviceId ? data : s));
      });
      options?.onSuccess?.([data]);
    },
    onError: (err, serviceId) => {
      const serviceError: CloudServiceError = {
        serviceId,
        code: 'EVALUATION_FAILED',
        message: errorHandler.handleError(err),
        timestamp: new Date(),
        recoverable: true,
      };
      setError(serviceError);
      options?.onError?.(serviceError);
    },
  });

  const evaluateService = useCallback(
    async (serviceId: string): Promise<void> => {
      await evaluateServiceMutation.mutateAsync(serviceId);
    },
    [evaluateServiceMutation]
  );

  const refreshServices = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['cloud-services'] });
    setHealthStatus(new Map());
    setUsageData(new Map());
  }, [queryClient]);

  useEffect(() => {
    if (services.length > 0 && healthStatus.size === 0) {
      services.forEach((service) => {
        checkHealth(service.serviceId);
      });
    }
  }, [services, healthStatus.size, checkHealth]);

  return {
    services,
    isLoading,
    isError,
    error,
    selectedServices,
    healthStatus,
    usageData,
    selectService,
    deselectService,
    toggleService,
    refreshServices,
    getServiceById,
    getServicesByProvider,
    getServicesByCategory,
    evaluateService,
    checkHealth,
    getUsage,
  };
};

export default useCloudServices;