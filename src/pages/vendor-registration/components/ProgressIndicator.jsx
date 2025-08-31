import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps }) => {
  const steps = [
    { id: 1, title: 'Conta', icon: 'User' },
    { id: 2, title: 'Negócio', icon: 'Store' },
    { id: 3, title: 'Localização', icon: 'MapPin' },
    { id: 4, title: 'Horários', icon: 'Clock' }
  ];

  return (
    <div className="w-full mb-8">
      {/* Mobile Progress Bar */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-body font-medium text-foreground">
            Etapa {currentStep} de {totalSteps}
          </span>
          <span className="text-sm font-caption text-muted-foreground">
            {Math.round((currentStep / totalSteps) * 100)}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>
      {/* Desktop Step Indicator */}
      <div className="hidden md:flex items-center justify-between">
        {steps?.map((step, index) => {
          const isActive = step?.id === currentStep;
          const isCompleted = step?.id < currentStep;
          const isUpcoming = step?.id > currentStep;

          return (
            <React.Fragment key={step?.id}>
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
                  isCompleted 
                    ? 'bg-primary border-primary text-primary-foreground' 
                    : isActive 
                    ? 'bg-primary/10 border-primary text-primary' :'bg-muted border-border text-muted-foreground'
                }`}>
                  {isCompleted ? (
                    <Icon name="Check" size={20} />
                  ) : (
                    <Icon name={step?.icon} size={20} />
                  )}
                </div>
                <span className={`mt-2 text-sm font-body font-medium ${
                  isActive ? 'text-primary' : isCompleted ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step?.title}
                </span>
              </div>
              {index < steps?.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${
                  step?.id < currentStep ? 'bg-primary' : 'bg-border'
                }`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;