import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AdvertisementPanel = ({ className = '' }) => {
  const currentAd = {
    status: 'active',
    title: 'Promoção Premium Ativa',
    description: 'Seu negócio está em destaque nos resultados de busca',
    budget: 150.00,
    spent: 89.50,
    impressions: 2847,
    clicks: 156,
    endDate: '30/08/2024'
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10';
      case 'paused': return 'text-warning bg-warning/10';
      case 'ended': return 'text-muted-foreground bg-muted';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'paused': return 'Pausado';
      case 'ended': return 'Finalizado';
      default: return 'Inativo';
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-body font-semibold text-foreground">Anúncios e Promoções</h3>
        <div className={`px-3 py-1 rounded-full text-xs font-caption font-medium ${getStatusColor(currentAd?.status)}`}>
          {getStatusText(currentAd?.status)}
        </div>
      </div>
      {currentAd?.status === 'active' ? (
        <div className="space-y-6">
          {/* Current Campaign */}
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <Icon name="Megaphone" size={20} className="text-success" />
              </div>
              <div className="flex-1">
                <h4 className="font-body font-medium text-foreground">{currentAd?.title}</h4>
                <p className="text-sm font-caption text-muted-foreground mt-1">{currentAd?.description}</p>
                <p className="text-xs font-caption text-muted-foreground mt-2">
                  Termina em: {currentAd?.endDate}
                </p>
              </div>
            </div>

            {/* Budget Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-caption text-muted-foreground">Orçamento Utilizado</span>
                <span className="font-body font-medium text-foreground">
                  R$ {currentAd?.spent?.toFixed(2)} / R$ {currentAd?.budget?.toFixed(2)}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary rounded-full h-2 transition-all duration-300"
                  style={{ width: `${(currentAd?.spent / currentAd?.budget) * 100}%` }}
                />
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-muted rounded-lg">
                <p className="text-lg font-heading font-bold text-foreground">{currentAd?.impressions?.toLocaleString('pt-BR')}</p>
                <p className="text-xs font-caption text-muted-foreground">Visualizações</p>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <p className="text-lg font-heading font-bold text-foreground">{currentAd?.clicks}</p>
                <p className="text-xs font-caption text-muted-foreground">Cliques</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" size="sm" className="flex-1">
              <Icon name="Pause" size={16} className="mr-2" />
              Pausar Campanha
            </Button>
            <Button variant="default" size="sm" className="flex-1">
              <Icon name="Plus" size={16} className="mr-2" />
              Aumentar Orçamento
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Megaphone" size={24} className="text-muted-foreground" />
          </div>
          <h4 className="font-body font-medium text-foreground mb-2">Nenhuma campanha ativa</h4>
          <p className="text-sm font-caption text-muted-foreground mb-6">
            Promova seu negócio e apareça em destaque para mais clientes
          </p>
          <Button variant="default" size="sm">
            <Icon name="Plus" size={16} className="mr-2" />
            Criar Campanha
          </Button>
        </div>
      )}
    </div>
  );
};

export default AdvertisementPanel;