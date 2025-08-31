import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SuccessModal = ({ isOpen, onClose, formData }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleGoToDashboard = () => {
    navigate('/vendor-dashboard');
  };

  const handleAddProducts = () => {
    navigate('/product-management');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-xl shadow-modal max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 text-center">
          {/* Success Icon */}
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" size={32} className="text-success" />
          </div>

          {/* Success Message */}
          <h3 className="text-xl font-heading font-bold text-foreground mb-2">
            Conta criada com sucesso!
          </h3>
          <p className="text-muted-foreground font-body mb-6">
            Bem-vindo ao FreshLink, {formData?.businessName}! Sua conta foi criada e você já pode começar a vender.
          </p>

          {/* Next Steps */}
          <div className="bg-muted/50 rounded-lg p-4 mb-6 text-left">
            <h4 className="font-body font-medium text-foreground mb-3 flex items-center">
              <Icon name="List" size={18} className="mr-2" />
              Próximos passos:
            </h4>
            <ul className="space-y-2 text-sm font-caption text-muted-foreground">
              <li className="flex items-start">
                <Icon name="Plus" size={16} className="mr-2 mt-0.5 text-primary flex-shrink-0" />
                Adicione seus primeiros produtos
              </li>
              <li className="flex items-start">
                <Icon name="Camera" size={16} className="mr-2 mt-0.5 text-primary flex-shrink-0" />
                Faça upload de fotos atrativas
              </li>
              <li className="flex items-start">
                <Icon name="Star" size={16} className="mr-2 mt-0.5 text-primary flex-shrink-0" />
                Complete seu perfil para mais visibilidade
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleAddProducts}
              variant="default"
              size="lg"
              fullWidth
              iconName="Plus"
              iconPosition="left"
            >
              Adicionar Produtos
            </Button>
            <Button
              onClick={handleGoToDashboard}
              variant="outline"
              size="lg"
              fullWidth
              iconName="BarChart3"
              iconPosition="left"
            >
              Ir para Dashboard
            </Button>
          </div>

          {/* Contact Info */}
          <div className="mt-6 pt-4 border-t border-border">
            <p className="text-xs font-caption text-muted-foreground">
              Precisa de ajuda? Entre em contato conosco pelo WhatsApp
            </p>
            <Button
              variant="ghost"
              size="sm"
              iconName="MessageCircle"
              iconPosition="left"
              className="mt-2"
            >
              (11) 99999-9999
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;