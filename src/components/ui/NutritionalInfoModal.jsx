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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full animate-scale-in border-2 border-gray-200">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                <Icon name="Zap" size={20} className="text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-black text-gray-900">
                  Informações Nutricionais
                </h3>
                <p className="text-sm text-gray-600">
                  {productName}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-2xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
            >
              <Icon name="X" size={16} />
            </button>
          </div>

          {/* Nutritional Content */}
          <div className="space-y-6">
            {/* Calories */}
            {nutritionalInfo.calories && (
              <div className="bg-orange-50 rounded-2xl p-4 border-2 border-orange-100">
                <div className="flex items-center space-x-3">
                  <Icon name="Zap" size={24} className="text-orange-600" />
                  <div>
                    <p className="text-lg font-black text-gray-900">
                      {nutritionalInfo.calories}
                    </p>
                    <p className="text-sm text-gray-600">Calorias por 100g</p>
                  </div>
                </div>
              </div>
            )}

            {/* Macronutrients */}
            {(nutritionalInfo.protein || nutritionalInfo.carbs || nutritionalInfo.fat || nutritionalInfo.fiber) && (
              <div>
                <h4 className="font-bold text-gray-900 mb-3">
                  Macronutrientes (por 100g)
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {nutritionalInfo.protein && (
                    <div className="bg-blue-50 rounded-2xl p-3 text-center border-2 border-blue-100">
                      <p className="text-lg font-black text-blue-600">
                        {nutritionalInfo.protein}g
                      </p>
                      <p className="text-xs text-gray-600">Proteínas</p>
                    </div>
                  )}
                  {nutritionalInfo.carbs && (
                    <div className="bg-green-50 rounded-2xl p-3 text-center border-2 border-green-100">
                      <p className="text-lg font-black text-green-600">
                        {nutritionalInfo.carbs}g
                      </p>
                      <p className="text-xs text-gray-600">Carboidratos</p>
                    </div>
                  )}
                  {nutritionalInfo.fat && (
                    <div className="bg-yellow-50 rounded-2xl p-3 text-center border-2 border-yellow-100">
                      <p className="text-lg font-black text-yellow-600">
                        {nutritionalInfo.fat}g
                      </p>
                      <p className="text-xs text-gray-600">Gorduras</p>
                    </div>
                  )}
                  {nutritionalInfo.fiber && (
                    <div className="bg-purple-50 rounded-2xl p-3 text-center border-2 border-purple-100">
                      <p className="text-lg font-black text-purple-600">
                        {nutritionalInfo.fiber}g
                      </p>
                      <p className="text-xs text-gray-600">Fibras</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Vitamins */}
            {nutritionalInfo.vitamins && nutritionalInfo.vitamins.length > 0 && (
              <div>
                <h4 className="font-bold text-gray-900 mb-3">
                  Vitaminas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {nutritionalInfo.vitamins.map((vitamin, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-green-100 text-green-700 text-sm font-semibold rounded-full border border-green-200"
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
                <h4 className="font-bold text-gray-900 mb-3">
                  Minerais
                </h4>
                <div className="flex flex-wrap gap-2">
                  {nutritionalInfo.minerals.map((mineral, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full border border-blue-200"
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
                <h4 className="font-bold text-gray-900 mb-3">
                  Benefícios
                </h4>
                <ul className="space-y-2">
                  {nutritionalInfo.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Icon name="Check" size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-900">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Close Button */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <Button
              onClick={onClose}
              variant="default"
              size="lg"
              fullWidth
              className="bg-primary hover:bg-primary/90 text-white rounded-2xl font-semibold"
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