import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductPreview = ({ className = '' }) => {
  const recentProducts = [
    {
      id: 1,
      name: "Tomates Orgânicos",
      image: "https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=400",
      price: 8.50,
      stock: 25,
      status: 'active',
      views: 142,
      inquiries: 8
    },
    {
      id: 2,
      name: "Alface Americana",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
      price: 3.20,
      stock: 0,
      status: 'out_of_stock',
      views: 89,
      inquiries: 3
    },
    {
      id: 3,
      name: "Cenouras Frescas",
      image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400",
      price: 4.80,
      stock: 18,
      status: 'active',
      views: 67,
      inquiries: 5
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10';
      case 'out_of_stock': return 'text-error bg-error/10';
      case 'inactive': return 'text-muted-foreground bg-muted';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'out_of_stock': return 'Sem Estoque';
      case 'inactive': return 'Inativo';
      default: return 'Desconhecido';
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-body font-semibold text-foreground">Produtos Recentes</h3>
        <Button variant="ghost" size="sm">
          Ver Todos
          <Icon name="ArrowRight" size={16} className="ml-2" />
        </Button>
      </div>
      <div className="space-y-4">
        {recentProducts?.map((product) => (
          <div key={product?.id} className="flex items-center space-x-4 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors duration-200">
            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={product?.image}
                alt={product?.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h4 className="font-body font-medium text-foreground truncate">{product?.name}</h4>
                  <p className="text-sm font-caption text-primary font-medium">
                    R$ {product?.price?.toFixed(2)}/kg
                  </p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-xs font-caption text-muted-foreground">
                      {product?.stock > 0 ? `${product?.stock} kg disponível` : 'Sem estoque'}
                    </span>
                    <div className={`px-2 py-1 rounded-full text-xs font-caption font-medium ${getStatusColor(product?.status)}`}>
                      {getStatusText(product?.status)}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-1 ml-4">
                  <div className="flex items-center space-x-3 text-xs font-caption text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Eye" size={12} />
                      <span>{product?.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="MessageCircle" size={12} />
                      <span>{product?.inquiries}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="xs">
                    <Icon name="Edit" size={14} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <Button variant="outline" className="w-full">
          <Icon name="Plus" size={16} className="mr-2" />
          Adicionar Novo Produto
        </Button>
      </div>
    </div>
  );
};

export default ProductPreview;