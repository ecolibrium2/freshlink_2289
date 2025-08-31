import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/consumer-home-search');
  };

  const handleBackClick = () => {
    navigate('/consumer-home-search');
  };

  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Back Button - Mobile */}
          <button
            onClick={handleBackClick}
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
          >
            <Icon name="ArrowLeft" size={20} />
          </button>

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
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => navigate('/consumer-home-search')}
              className="text-sm font-body font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Buscar Produtos
            </button>
            <button
              onClick={() => navigate('/vendor-registration')}
              className="px-4 py-2 bg-primary text-primary-foreground text-sm font-body font-medium rounded-lg hover:bg-primary/90 transition-colors duration-200"
            >
              Cadastrar-se
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden w-10"></div>
        </div>
      </div>
    </header>
  );
};

export default LoginHeader;