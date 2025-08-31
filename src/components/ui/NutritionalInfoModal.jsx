import React, { useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const NutritionalInfoModal = ({ isOpen, onClose, nutritionalInfo, productName }) => {
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

  if (!isOpen || !nutritionalInfo) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-2xl shadow-modal max-w-md w-full animate-scale-in">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={20} className="text-success" />
              </div>
              <div>
                <h3 className="text-lg font-heading font-bold text-foreground">
                  Informações Nutricionais
                </h3>
                <p className="text-sm text-muted-foreground">
                  {productName}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors duration-200"
            >
              <Icon name="X" size={16} />
            </button>
          </div>

          {/* Nutritional Content */}
          <div className="space-y-6">
            {/* Calories */}
            {nutritionalInfo.calories && (
              <div className="bg-warning/10 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <Icon name="Zap" size={24} className="text-warning" />
                  <div>
                    <p className="text-lg font-heading font-bold text-foreground">
                      {nutritionalInfo.calories}
                    </p>
                    <p className="text-sm text-muted-foreground">Calorias por 100g</p>
                  </div>
                </div>
              </div>
            )}

            {/* Macronutrients */}
            {(nutritionalInfo.protein || nutritionalInfo.carbs || nutritionalInfo.fat || nutritionalInfo.fiber) && (
              <div>
                <h4 className="font-body font-semibold text-foreground mb-3">
                  Macronutrientes (por 100g)
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {nutritionalInfo.protein && (
                    <div className="bg-accent/10 rounded-lg p-3 text-center">
                      <p className="text-lg font-heading font-bold text-accent">
                        {nutritionalInfo.protein}g
                      </p>
                      <p className="text-xs text-muted-foreground">Proteínas</p>
                    </div>
                  )}
                  {nutritionalInfo.carbs && (
                    <div className="bg-primary/10 rounded-lg p-3 text-center">
                      <p className="text-lg font-heading font-bold text-primary">
                        {nutritionalInfo.carbs}g
                      </p>
                      <p className="text-xs text-muted-foreground">Carboidratos</p>
                    </div>
                  )}
                  {nutritionalInfo.fat && (
                    <div className="bg-warning/10 rounded-lg p-3 text-center">
                      <p className="text-lg font-heading font-bold text-warning">
                        {nutritionalInfo.fat}g
                      </p>
                      <p className="text-xs text-muted-foreground">Gorduras</p>
                    </div>
                  )}
                  {nutritionalInfo.fiber && (
                    <div className="bg-success/10 rounded-lg p-3 text-center">
                      <p className="text-lg font-heading font-bold text-success">
                        {nutritionalInfo.fiber}g
                      </p>
                      <p className="text-xs text-muted-foreground">Fibras</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Vitamins */}
            {nutritionalInfo.vitamins && nutritionalInfo.vitamins.length > 0 && (
              <div>
                <h4 className="font-body font-semibold text-foreground mb-3">
                  Vitaminas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {nutritionalInfo.vitamins.map((vitamin, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-success/10 text-success text-sm font-caption rounded-full"
                    >
                      {vitamin}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Minerals */}
            {nutritionalInfo.minerals && nutritionalInfo.minerals.length > 0 && (
              <div>
                <h4 className="font-body font-semibold text-foreground mb-3">
                  Minerais
                </h4>
                <div className="flex flex-wrap gap-2">
                  {nutritionalInfo.minerals.map((mineral, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-accent/10 text-accent text-sm font-caption rounded-full"
                    >
                      {mineral}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Benefits */}
            {nutritionalInfo.benefits && nutritionalInfo.benefits.length > 0 && (
              <div>
                <h4 className="font-body font-semibold text-foreground mb-3">
                  Benefícios
                </h4>
                <ul className="space-y-2">
                  {nutritionalInfo.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm font-body text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Close Button */}
          <div className="mt-6 pt-4 border-t border-border">
            <Button
              onClick={onClose}
              variant="outline"
              size="lg"
              fullWidth
            >
              Fechar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionalInfoModal;