import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ onAddProduct, hasFilters, onClearFilters }) => {
  if (hasFilters) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Search" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
          Nenhum produto encontrado
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Não encontramos produtos que correspondam aos filtros aplicados. 
          Tente ajustar os critérios de busca.
        </p>
        <Button
          variant="outline"
          onClick={onClearFilters}
          iconName="X"
          iconPosition="left"
        >
          Limpar Filtros
        </Button>
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon name="Package" size={40} className="text-primary" />
      </div>
      <h3 className="font-heading font-semibold text-xl text-foreground mb-3">
        Comece seu catálogo de produtos
      </h3>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Adicione seus primeiros produtos para começar a vender. 
        Inclua fotos atrativas e descrições detalhadas para atrair mais clientes.
      </p>
      <div className="space-y-4">
        <Button
          onClick={onAddProduct}
          iconName="Plus"
          iconPosition="left"
          size="lg"
        >
          Adicionar Primeiro Produto
        </Button>
        <div className="text-sm text-muted-foreground">
          <p>💡 Dica: Produtos com fotos de qualidade vendem 3x mais</p>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="text-center">
          <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Icon name="Camera" size={24} className="text-success" />
          </div>
          <h4 className="font-body font-medium text-foreground mb-2">
            Fotos de Qualidade
          </h4>
          <p className="text-sm text-muted-foreground">
            Use boa iluminação e mostre o produto de diferentes ângulos
          </p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Icon name="FileText" size={24} className="text-warning" />
          </div>
          <h4 className="font-body font-medium text-foreground mb-2">
            Descrições Detalhadas
          </h4>
          <p className="text-sm text-muted-foreground">
            Inclua origem, características e benefícios do produto
          </p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Icon name="DollarSign" size={24} className="text-accent" />
          </div>
          <h4 className="font-body font-medium text-foreground mb-2">
            Preços Competitivos
          </h4>
          <p className="text-sm text-muted-foreground">
            Pesquise o mercado local para definir preços justos
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;