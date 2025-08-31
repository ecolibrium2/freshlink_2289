import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActivityFeedItem = ({ type, title, description, timestamp, actionText, onAction, className = '' }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'inquiry': return 'MessageCircle';
      case 'view': return 'Eye';
      case 'order': return 'ShoppingCart';
      case 'review': return 'Star';
      default: return 'Bell';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'inquiry': return 'text-primary';
      case 'view': return 'text-blue-500';
      case 'order': return 'text-success';
      case 'review': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}min atrás`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h atrás`;
    } else {
      return time?.toLocaleDateString('pt-BR');
    }
  };

  return (
    <div className={`flex items-start space-x-4 p-4 border-b border-border last:border-b-0 ${className}`}>
      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
        <Icon name={getActivityIcon(type)} size={18} className={getActivityColor(type)} />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h4 className="font-body font-medium text-foreground text-sm truncate">{title}</h4>
            <p className="text-sm font-caption text-muted-foreground mt-1">{description}</p>
            <p className="text-xs font-caption text-muted-foreground mt-2">{formatTimestamp(timestamp)}</p>
          </div>
          
          {actionText && onAction && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onAction}
              className="ml-2 flex-shrink-0"
            >
              {actionText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityFeedItem;