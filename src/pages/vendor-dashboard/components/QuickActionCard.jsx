import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionCard = ({ title, description, icon, buttonText, onClick, variant = 'default', className = '' }) => {
  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-start space-x-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
          variant === 'primary' ? 'bg-primary/10' : 
          variant === 'success' ? 'bg-success/10' : 
          variant === 'warning' ? 'bg-warning/10' : 'bg-muted'
        }`}>
          <Icon 
            name={icon} 
            size={24} 
            className={
              variant === 'primary' ? 'text-primary' : 
              variant === 'success' ? 'text-success' : 
              variant === 'warning' ? 'text-warning' : 'text-muted-foreground'
            } 
          />
        </div>
        
        <div className="flex-1 space-y-3">
          <div>
            <h3 className="font-body font-semibold text-foreground mb-1">{title}</h3>
            <p className="text-sm font-caption text-muted-foreground">{description}</p>
          </div>
          
          <Button
            variant={variant === 'primary' ? 'default' : variant === 'success' ? 'success' : variant === 'warning' ? 'warning' : 'outline'}
            size="sm"
            onClick={onClick}
            className="w-full sm:w-auto"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActionCard;