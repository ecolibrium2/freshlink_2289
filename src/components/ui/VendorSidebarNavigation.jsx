import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const VendorSidebarNavigation = ({ isCollapsed = false, className = '' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/vendor-dashboard',
      icon: 'BarChart3',
      tooltip: 'Métricas e atividade'
    },
    {
      label: 'Produtos',
      path: '/product-management',
      icon: 'Package',
      tooltip: 'Gerenciar catálogo'
    },
    {
      label: 'Perfil',
      path: '/vendor-profile-products',
      icon: 'Store',
      tooltip: 'Informações do negócio'
    },
    {
      label: 'Configurações',
      path: '/vendor-profile',
      icon: 'Settings',
      tooltip: 'Configurações da conta'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    // Handle logout logic
    navigate('/vendor-login');
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden md:block fixed left-0 top-0 h-full bg-card border-r border-border z-40 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      } ${className}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center h-16 px-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="Leaf" size={20} color="white" />
              </div>
              {!isCollapsed && (
                <span className="font-heading font-bold text-xl text-foreground">FreshLink</span>
              )}
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-3 py-4 space-y-2">
            {navigationItems?.map((item) => {
              const isActive = location?.pathname === item?.path;
              return (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-body font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-primary bg-primary/10 border border-primary/20' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  title={isCollapsed ? item?.tooltip : ''}
                >
                  <Icon name={item?.icon} size={20} className="flex-shrink-0" />
                  {!isCollapsed && <span>{item?.label}</span>}
                </button>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="p-3 border-t border-border">
            <div className="flex items-center space-x-3 px-3 py-2 mb-2">
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="User" size={16} color="white" />
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-body font-medium text-foreground truncate">Vendedor</p>
                  <p className="text-xs font-caption text-muted-foreground truncate">vendedor@freshlink.com</p>
                </div>
              )}
            </div>
            <button
              onClick={handleLogout}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-body font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200 ${
                isCollapsed ? 'justify-center' : ''
              }`}
              title={isCollapsed ? 'Sair' : ''}
            >
              <Icon name="LogOut" size={18} className="flex-shrink-0" />
              {!isCollapsed && <span>Sair</span>}
            </button>
          </div>
        </div>
      </aside>
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 bg-card border-b border-border z-50">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Leaf" size={20} color="white" />
            </div>
            <span className="font-heading font-bold text-xl text-foreground">FreshLink</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-card border-b border-border shadow-modal">
            <nav className="px-4 py-4 space-y-2">
              {navigationItems?.map((item) => {
                const isActive = location?.pathname === item?.path;
                return (
                  <button
                    key={item?.path}
                    onClick={() => handleNavigation(item?.path)}
                    className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-body font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-primary bg-primary/10 border border-primary/20' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={item?.icon} size={20} />
                    <span>{item?.label}</span>
                  </button>
                );
              })}
              <div className="pt-4 border-t border-border">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-body font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
                >
                  <Icon name="LogOut" size={20} />
                  <span>Sair</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>
      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
        <div className="flex items-center justify-around h-16 px-4">
          {navigationItems?.map((item) => {
            const isActive = location?.pathname === item?.path;
            return (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex flex-col items-center justify-center space-y-1 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground'
                }`}
                title={item?.tooltip}
              >
                <Icon name={item?.icon} size={20} />
                <span className="text-xs font-caption font-medium">{item?.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default VendorSidebarNavigation;