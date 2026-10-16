export enum ErrorSeverity {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical',
}

export enum CloudServiceType {
  AWS_COGNITO = 'AWS_COGNITO',
  AWS_S3 = 'AWS_S3',
  FIREBASE = 'FIREBASE',
  API = 'API',
}

export interface CloudErrorContext {
  service: CloudServiceType;
  operation: string;
  timestamp: number;
  requestId?: string;
  userId?: string;
}

export interface CloudError extends Error {
  severity: ErrorSeverity;
  service: CloudServiceType;
  context: CloudErrorContext;
  retryable: boolean;
  statusCode?: number;
  code?: string;
}

export type ErrorHandlerCallback = (error: CloudError) => void;

class CloudErrorHandler {
  private errorListeners: ErrorHandlerCallback[] = [];
  private errorLog: CloudError[] = [];
  private maxLogSize: number = 100;

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('error', this.handleGlobalError);
      window.addEventListener('unhandledrejection', this.handleUnhandledRejection);
    }
  }

  private handleGlobalError = (event: ErrorEvent): void => {
    const error = this.createError(
      event.message,
      ErrorSeverity.ERROR,
      CloudServiceType.API,
      { service: CloudServiceType.API, operation: 'window.onerror', timestamp: Date.now() }
    );
    this.notifyListeners(error);
  };

  private handleUnhandledRejection = (event: PromiseRejectionEvent): void => {
    const error = this.createError(
      event.reason?.message || 'Unhandled Promise Rejection',
      ErrorSeverity.ERROR,
      CloudServiceType.API,
      { service: CloudServiceType.API, operation: 'unhandledrejection', timestamp: Date.now() }
    );
    this.notifyListeners(error);
  };

  createError(
    message: string,
    severity: ErrorSeverity,
    service: CloudServiceType,
    context: CloudErrorContext,
    options?: { retryable?: boolean; statusCode?: number; code?: string }
  ): CloudError {
    const error = new Error(message) as CloudError;
    error.severity = severity;
    error.service = service;
    error.context = context;
    error.retryable = options?.retryable ?? this.isRetryableError(service);
    error.statusCode = options?.statusCode;
    error.code = options?.code;
    return error;
  }

  private isRetryableError(service: CloudServiceType): boolean {
    return service === CloudServiceType.API || service === CloudServiceType.AWS_S3;
  }

  handleError(error: CloudError): void {
    console.error(`[${error.severity.toUpperCase()}] ${error.service}:`, error.message);
    
    this.errorLog.push(error);
    if (this.errorLog.length > this.maxLogSize) {
      this.errorLog.shift();
    }

    this.notifyListeners(error);

    if (error.severity === ErrorSeverity.CRITICAL) {
      this.handleCriticalError(error);
    }
  }

  private handleCriticalError(error: CloudError): void {
    if (error.service === CloudServiceType.AWS_COGNITO) {
      console.warn('Error crítico en autenticación. Redirigiendo al login...');
      window.location.href = '/login?reason=auth_error';
    }
  }

  private notifyListeners(error: CloudError): void {
    this.errorListeners.forEach(listener => {
      try {
        listener(error);
      } catch (listenerError) {
        console.error('Error en listener de errores:', listenerError);
      }
    });
  }

  subscribe(callback: ErrorHandlerCallback): () => void {
    this.errorListeners.push(callback);
    return () => {
      this.errorListeners = this.errorListeners.filter(l => l !== callback);
    };
  }

  getErrorLog(): CloudError[] {
    return [...this.errorLog];
  }

  clearErrorLog(): void {
    this.errorLog = [];
  }

  async withRetry<T>(
    operation: () => Promise<T>,
    service: CloudServiceType,
    operationName: string,
    maxRetries: number = 3
  ): Promise<T> {
    let lastError: CloudError | null = null;
    const context: CloudErrorContext = {
      service,
      operation: operationName,
      timestamp: Date.now(),
    };

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        const err = error as Error;
        lastError = this.createError(
          err.message,
          attempt < maxRetries - 1 ? ErrorSeverity.WARNING : ErrorSeverity.ERROR,
          service,
          { ...context, requestId: `attempt-${attempt + 1}` }
        );
        
        this.handleError(lastError);
        
        if (!lastError.retryable || attempt === maxRetries - 1) {
          throw lastError;
        }

        const delay = Math.min(1000 * Math.pow(2, attempt), 10000);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    throw lastError;
  }
}

export const cloudErrorHandler = new CloudErrorHandler();