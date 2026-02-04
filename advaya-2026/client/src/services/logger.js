import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class Logger {
  constructor() {
    this.logEndpoint = `${API_BASE_URL}/logs`;
  }

  async sendLog(level, message, context = {}) {
    try {
      await axios.post(this.logEndpoint, {
        level,
        message,
        context: {
          ...context,
          userAgent: navigator.userAgent,
          url: window.location.href,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error) {
      console.error('Failed to send log to backend:', error);
    }
  }

  logError(error, errorInfo = null) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const stackTrace = error instanceof Error ? error.stack : null;

    this.sendLog('error', errorMessage, {
      stack: stackTrace,
      errorInfo,
      type: 'frontend_error',
    });

    console.error('Error logged:', error);
  }

  logWarning(message, context = {}) {
    this.sendLog('warning', message, context);
    console.warn('Warning logged:', message);
  }

  logInfo(message, context = {}) {
    this.sendLog('info', message, context);
    console.info('Info logged:', message);
  }
}

// Create a singleton instance
const logger = new Logger();

// Make it available globally for ErrorBoundary
if (typeof window !== 'undefined') {
  window.logger = logger;
}

export default logger;
