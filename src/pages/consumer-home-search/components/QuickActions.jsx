import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickActions = ({ onActionClick, className = '' }) => {
  const quickActions = [
    {
      id: 'organic',
      label: 'Orgânicos',
      icon: 'Leaf',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'Produtos certificados'
    },
    {
      id: 'nearby',
      label: 'Próximos',
      icon: 'Navigation',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Até 2km de distância'
    },
    {
      id: 'open-now',
      label: 'Aberto Agora',
      icon: 'Clock',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      description: 'Funcionando no momento'
    },
    {
      id: 'delivery',
      label: 'Entrega',
      icon: 'Truck',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'Fazem entrega'
    }
  ];

  const handleActionClick = (actionId) => {
    onActionClick(actionId);
  };

  return (
    <div className={`${className}`}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions?.map((action) => (
          <button
            key={action?.id}
            onClick={() => handleActionClick(action?.id)}
            className="flex flex-col items-center p-4 bg-card border border-border rounded-lg hover:shadow-md hover:border-primary/20 transition-all duration-200 group"
          >
            <div className={`w-12 h-12 ${action?.bgColor} rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
              <Icon name={action?.icon} size={24} className={action?.color} />
            </div>
            <h3 className="font-body font-semibold text-sm text-foreground mb-1">
              {action?.label}
            </h3>
            <p className="text-xs font-caption text-muted-foreground text-center">
              {action?.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;