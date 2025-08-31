import React from 'react';
import Button from '../../../components/ui/Button';


const SocialLogin = ({ onWhatsAppLogin, isLoading = false }) => {
  const handleWhatsAppLogin = () => {
    if (onWhatsAppLogin) {
      onWhatsAppLogin();
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-muted-foreground font-body">
            Ou entre com
          </span>
        </div>
      </div>

      <Button
        variant="outline"
        size="lg"
        fullWidth
        onClick={handleWhatsAppLogin}
        loading={isLoading}
        iconName="MessageCircle"
        iconPosition="left"
        className="border-green-200 hover:bg-green-50 hover:border-green-300 text-green-700"
      >
        Continuar com WhatsApp
      </Button>

      <div className="text-center">
        <p className="text-xs font-caption text-muted-foreground">
          Ao continuar, você concorda com nossos{' '}
          <button className="text-primary hover:text-primary/80 underline">
            Termos de Uso
          </button>{' '}
          e{' '}
          <button className="text-primary hover:text-primary/80 underline">
            Política de Privacidade
          </button>
        </p>
      </div>
    </div>
  );
};

export default SocialLogin;