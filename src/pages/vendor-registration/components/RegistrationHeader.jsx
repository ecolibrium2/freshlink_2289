import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const RegistrationHeader = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/consumer-home-search');
  };

  const handleLoginClick = () => {
    navigate('/vendor-login');
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Leaf" size={20} color="white" />
            </div>
            <span className="font-heading font-bold text-xl text-foreground">FreshLink</span>
          </button>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLoginClick}
              className="text-sm font-body font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Já tem conta? Entrar
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default RegistrationHeader;