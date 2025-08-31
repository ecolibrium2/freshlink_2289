import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VendorSidebarNavigation from '../../components/ui/VendorSidebarNavigation';
import MetricsCard from './components/MetricsCard';
import QuickActionCard from './components/QuickActionCard';
import ActivityFeedItem from './components/ActivityFeedItem';
import AnalyticsChart from './components/AnalyticsChart';
import AdvertisementPanel from './components/AdvertisementPanel';
import ProductPreview from './components/ProductPreview';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const VendorDashboard = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');

  // Mock data for metrics
  const metrics = [
    {
      title: "Consultas Hoje",
      value: "12",
      subtitle: "3 novas mensagens",
      icon: "MessageCircle",
      trend: "up",
      trendValue: "+25%"
    },
    {
      title: "Visualizações da Semana",
      value: "847",
      subtitle: "Perfil e produtos",
      icon: "Eye",
      trend: "up",
      trendValue: "+12%"
    },
    {
      title: "Produtos Populares",
      value: "8",
      subtitle: "Com mais interesse",
      icon: "TrendingUp",
      trend: "up",
      trendValue: "+5"
    },
    {
      title: "Potencial de Receita",
      value: "R$ 2.340",
      subtitle: "Baseado nas consultas",
      icon: "DollarSign",
      trend: "up",
      trendValue: "+18%"
    }
  ];

  // Mock data for quick actions
  const quickActions = [
    {
      title: "Adicionar Produto",
      description: "Cadastre novos produtos no seu catálogo",
      icon: "Plus",
      buttonText: "Adicionar",
      variant: "primary",
      onClick: () => navigate('/product-management')
    },
    {
      title: "Ver Mensagens WhatsApp",
      description: "Responda às consultas dos clientes",
      icon: "MessageCircle",
      buttonText: "Ver Mensagens",
      variant: "success",
      onClick: () => window.open('https://web.whatsapp.com', '_blank')
    },
    {
      title: "Promover Negócio",
      description: "Apareça em destaque nos resultados",
      icon: "Megaphone",
      buttonText: "Promover",
      variant: "warning",
      onClick: () => console.log('Promote business')
    }
  ];

  // Mock data for recent activity
  const recentActivity = [
    {
      type: 'inquiry',
      title: 'Nova consulta sobre Tomates Orgânicos',
      description: 'Cliente interessado em comprar 5kg para entrega amanhã',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      actionText: 'Responder',
      onAction: () => window.open('https://web.whatsapp.com', '_blank')
    },
    {
      type: 'view',
      title: 'Perfil visualizado',
      description: 'Seu perfil foi visto por um cliente em São Paulo',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      actionText: null
    },
    {
      type: 'inquiry',
      title: 'Pergunta sobre Alface Americana',
      description: 'Cliente quer saber sobre disponibilidade para esta semana',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      actionText: 'Responder',
      onAction: () => window.open('https://web.whatsapp.com', '_blank')
    },
    {
      type: 'order',
      title: 'Interesse em compra',
      description: 'Cliente demonstrou interesse em múltiplos produtos',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      actionText: 'Ver Detalhes'
    },
    {
      type: 'view',
      title: 'Produto em destaque',
      description: 'Cenouras Frescas teve 15 visualizações hoje',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      actionText: null
    }
  ];

  // Mock data for analytics charts
  const visitorData = [
    { name: '18/08', views: 45 },
    { name: '19/08', views: 52 },
    { name: '20/08', views: 38 },
    { name: '21/08', views: 67 },
    { name: '22/08', views: 84 },
    { name: '23/08', views: 91 },
    { name: '24/08', views: 76 }
  ];

  const popularProductsData = [
    { name: 'Tomates', sales: 28 },
    { name: 'Alface', sales: 22 },
    { name: 'Cenouras', sales: 18 },
    { name: 'Pepinos', sales: 15 },
    { name: 'Cebolas', sales: 12 }
  ];

  const handleTimeRangeChange = (range) => {
    setSelectedTimeRange(range);
  };

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      // Update metrics or activity feed if needed
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar Navigation */}
      <VendorSidebarNavigation isCollapsed={sidebarCollapsed} />
      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'md:ml-16' : 'md:ml-64'} pb-16 md:pb-0`}>
        {/* Header */}
        <div className="bg-card border-b border-border px-4 md:px-6 py-4 mt-16 md:mt-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-heading font-bold text-foreground">Dashboard</h1>
              <p className="text-sm font-caption text-muted-foreground mt-1">
                Acompanhe o desempenho do seu negócio
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Time Range Selector */}
              <div className="hidden sm:flex items-center space-x-2 bg-muted rounded-lg p-1">
                {[
                  { value: '7d', label: '7 dias' },
                  { value: '30d', label: '30 dias' },
                  { value: '90d', label: '90 dias' }
                ]?.map((range) => (
                  <button
                    key={range?.value}
                    onClick={() => handleTimeRangeChange(range?.value)}
                    className={`px-3 py-1 text-xs font-caption font-medium rounded-md transition-colors duration-200 ${
                      selectedTimeRange === range?.value
                        ? 'bg-card text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {range?.label}
                  </button>
                ))}
              </div>

              {/* Sidebar Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden md:flex"
              >
                <Icon name={sidebarCollapsed ? "ChevronRight" : "ChevronLeft"} size={20} />
              </Button>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-4 md:p-6 space-y-6">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics?.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                subtitle={metric?.subtitle}
                icon={metric?.icon}
                trend={metric?.trend}
                trendValue={metric?.trendValue}
              />
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {quickActions?.map((action, index) => (
              <QuickActionCard
                key={index}
                title={action?.title}
                description={action?.description}
                icon={action?.icon}
                buttonText={action?.buttonText}
                variant={action?.variant}
                onClick={action?.onClick}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Column - Analytics & Activity */}
            <div className="xl:col-span-2 space-y-6">
              {/* Analytics Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AnalyticsChart
                  title="Visualizações do Perfil"
                  data={visitorData}
                  type="line"
                  dataKey="views"
                  xAxisKey="name"
                />
                <AnalyticsChart
                  title="Produtos Mais Procurados"
                  data={popularProductsData}
                  type="bar"
                  dataKey="sales"
                  xAxisKey="name"
                />
              </div>

              {/* Recent Activity */}
              <div className="bg-card border border-border rounded-lg">
                <div className="p-6 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h3 className="font-body font-semibold text-foreground">Atividade Recente</h3>
                    <Button variant="ghost" size="sm">
                      Ver Todas
                      <Icon name="ArrowRight" size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {recentActivity?.map((activity, index) => (
                    <ActivityFeedItem
                      key={index}
                      type={activity?.type}
                      title={activity?.title}
                      description={activity?.description}
                      timestamp={activity?.timestamp}
                      actionText={activity?.actionText}
                      onAction={activity?.onAction}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Ads & Products */}
            <div className="space-y-6">
              <AdvertisementPanel />
              <ProductPreview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;