import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

type AlertType = 'success' | 'error' | 'info';

interface AlertProps {
  type: AlertType;
  message: string;
  onClose?: () => void;
}

export function Alert({ type, message, onClose }: AlertProps) {
  const styles = {
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200'
  };

  const icons = {
    success: CheckCircle,
    error: XCircle,
    info: AlertCircle
  };

  const Icon = icons[type];

  return (
    <div className={`p-4 rounded-lg border ${styles[type]} mb-4`}>
      <div className="flex items-center">
        <Icon className="h-5 w-5 mr-3" />
        <span>{message}</span>
        {onClose && (
          <button 
            onClick={onClose}
            className="ml-auto"
          >
            <XCircle className="h-5 w-5 opacity-50 hover:opacity-100" />
          </button>
        )}
      </div>
    </div>
  );
} 