import React, { useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = "Confirmar", 
  cancelText = "Cancelar",
  variant = "default",
  icon = "AlertTriangle",
  loading = false
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const getVariantStyles = () => {
    switch (variant) {
      case 'destructive':
        return {
          iconColor: 'text-error',
          iconBg: 'bg-error/10',
          confirmVariant: 'destructive'
        };
      case 'warning':
        return {
          iconColor: 'text-warning',
          iconBg: 'bg-warning/10',
          confirmVariant: 'warning'
        };
      case 'success':
        return {
          iconColor: 'text-success',
          iconBg: 'bg-success/10',
          confirmVariant: 'success'
        };
      default:
        return {
          iconColor: 'text-primary',
          iconBg: 'bg-primary/10',
          confirmVariant: 'default'
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-card rounded-2xl shadow-modal max-w-md w-full animate-scale-in">
        <div className="p-6">
          {/* Icon */}
          <div className={`w-16 h-16 ${styles.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
            <Icon name={icon} size={32} className={styles.iconColor} />
          </div>

          {/* Content */}
          <div className="text-center mb-6">
            <h3 className="text-xl font-heading font-bold text-foreground mb-2">
              {title}
            </h3>
            <p className="text-muted-foreground font-body">
              {message}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              size="lg"
              fullWidth
              onClick={onClose}
              disabled={loading}
            >
              {cancelText}
            </Button>
            <Button
              variant={styles.confirmVariant}
              size="lg"
              fullWidth
              onClick={onConfirm}
              loading={loading}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;