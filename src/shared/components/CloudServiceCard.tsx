import React from 'react';
import { CloudServiceEvaluation, CloudServiceHealth, ProviderType } from '@/types/cloudServices';

interface CloudServiceCardProps {
  service: CloudServiceEvaluation;
  health?: CloudServiceHealth;
  onSelect?: (serviceId: string) => void;
  onConfigure?: (serviceId: string) => void;
  isSelected?: boolean;
  isLoading?: boolean;
}

const providerLogos: Record<ProviderType, string> = {
  aws: '☁️',
  firebase: '🔥',
  azure: '💙',
  gcp: '🌐',
};

const categoryIcons: Record<string, string> = {
  auth: '🔐',
  storage: '💾',
  notifications: '🔔',
  compute: '⚡',
  database: '🗄️',
};

const statusColors: Record<string, string> = {
  healthy: 'bg-green-100 border-green-500',
  degraded: 'bg-yellow-100 border-yellow-500',
  unavailable: 'bg-red-100 border-red-500',
};

export const CloudServiceCard: React.FC<CloudServiceCardProps> = ({
  service,
  health,
  onSelect,
  onConfigure,
  isSelected = false,
  isLoading = false,
}) => {
  const handleSelect = () => {
    if (!isLoading && onSelect) {
      onSelect(service.serviceId);
    }
  };

  const handleConfigure = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLoading && onConfigure) {
      onConfigure(service.serviceId);
    }
  };

  const getScoreColor = (score: number): string => {
    if (score >= 8) return 'text-green-600';
    if (score >= 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScalabilityIndicator = (level: string): string => {
    switch (level) {
      case 'high': return '⬆⬆⬆';
      case 'medium': return '⬆⬆';
      case 'low': return '⬆';
      default: return '—';
    }
  };

  return (
    <div
      className={`
        p-4 rounded-lg border-2 transition-all cursor-pointer
        ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}
        ${isLoading ? 'opacity-50 pointer-events-none' : ''}
        ${health ? statusColors[health.status] : ''}
      `}
      onClick={handleSelect}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && handleSelect()}
      aria-pressed={isSelected}
      aria-label={`Servicio ${service.serviceName} de ${service.provider}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl" role="img" aria-hidden="true">
            {providerLogos[service.provider]}
          </span>
          <div>
            <h3 className="font-semibold text-gray-900">{service.serviceName}</h3>
            <span className="text-sm text-gray-500 capitalize">{service.provider}</span>
          </div>
        </div>
        <span className="text-xl" role="img" aria-hidden="true">
          {categoryIcons[service.category]}
        </span>
      </div>

      <div className="mb-3">
        <div className="flex flex-wrap gap-1 mb-2">
          {service.pros.slice(0, 3).map((pro, idx) => (
            <span
              key={idx}
              className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full"
            >
              + {pro}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-1">
          {service.cons.slice(0, 2).map((con, idx) => (
            <span
              key={idx}
              className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full"
            >
              - {con}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm mb-3">
        <div className="flex justify-between">
          <span className="text-gray-500">Latencia:</span>
          <span className="font-medium">{service.latency}ms</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Costo est.:</span>
          <span className="font-medium">${service.estimatedCost}/mes</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Escalabilidad:</span>
          <span>{getScalabilityIndicator(service.scalability)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Integración:</span>
          <span className={getScoreColor(service.easeOfIntegration)}>
            {service.easeOfIntegration}/10
          </span>
        </div>
      </div>

      {health && (
        <div className="mb-3 p-2 bg-gray-50 rounded text-xs">
          <div className="flex justify-between">
            <span>Estado:</span>
            <span className={`font-medium capitalize ${
              health.status === 'healthy' ? 'text-green-600' :
              health.status === 'degraded' ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {health.status}
            </span>
          </div>
          <div className="flex justify-between mt-1">
            <span>Tiempo respuesta:</span>
            <span>{health.responseTime}ms</span>
          </div>
          <div className="flex justify-between mt-1">
            <span>Tasa error:</span>
            <span>{(health.errorRate * 100).toFixed(2)}%</span>
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={handleSelect}
          disabled={isLoading}
          className="flex-1 px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
          aria-label={`Seleccionar ${service.serviceName}`}
        >
          {isSelected ? 'Seleccionado' : 'Seleccionar'}
        </button>
        <button
          onClick={handleConfigure}
          disabled={isLoading}
          className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50 transition-colors"
          aria-label={`Configurar ${service.serviceName}`}
        >
          ⚙️
        </button>
      </div>

      {service.securityFeatures.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <span className="text-xs text-gray-500 block mb-1">Seguridad:</span>
          <div className="flex flex-wrap gap-1">
            {service.securityFeatures.slice(0, 4).map((feature, idx) => (
              <span
                key={idx}
                className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CloudServiceCard;