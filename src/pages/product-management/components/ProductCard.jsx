import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductCard = ({ 
  product, 
  onEdit, 
  onDelete, 
  onDuplicate, 
  onToggleVisibility,
  viewMode = 'grid' 
}) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })?.format(price);
  };

  const getStockStatusColor = (stock) => {
    if (stock === 0) return 'text-error';
    if (stock <= 5) return 'text-warning';
    return 'text-success';
  };

  const getStockStatusText = (stock) => {
    if (stock === 0) return 'Esgotado';
    if (stock <= 5) return 'Estoque baixo';
    return 'Disponível';
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center space-x-4">
          {/* Product Image */}
          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={product?.image}
              alt={product?.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="font-body font-medium text-foreground truncate">
                  {product?.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {product?.category}
                </p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="font-body font-semibold text-foreground">
                    {formatPrice(product?.price)}
                  </span>
                  <span className={`text-sm font-caption ${getStockStatusColor(product?.stock)}`}>
                    {getStockStatusText(product?.stock)} ({product?.stock})
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => onToggleVisibility(product?.id)}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    product?.isVisible
                      ? 'text-success hover:bg-success/10' :'text-muted-foreground hover:bg-muted'
                  }`}
                  title={product?.isVisible ? 'Produto visível' : 'Produto oculto'}
                >
                  <Icon name={product?.isVisible ? 'Eye' : 'EyeOff'} size={16} />
                </button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(product)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Icon name="Edit" size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDuplicate(product)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Icon name="Copy" size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(product?.id)}
                  className="text-muted-foreground hover:text-error"
                >
                  <Icon name="Trash2" size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* Performance Metrics - Mobile */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Eye" size={14} />
              <span>{product?.views} visualizações</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="MessageCircle" size={14} />
              <span>{product?.inquiries} consultas</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Product Image */}
      <div className="aspect-square relative overflow-hidden">
        <Image
          src={product?.image}
          alt={product?.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 flex space-x-2">
          <button
            onClick={() => onToggleVisibility(product?.id)}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors duration-200 ${
              product?.isVisible
                ? 'bg-success/20 text-success' :'bg-black/20 text-white'
            }`}
            title={product?.isVisible ? 'Produto visível' : 'Produto oculto'}
          >
            <Icon name={product?.isVisible ? 'Eye' : 'EyeOff'} size={16} />
          </button>
        </div>
        {product?.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-body font-medium">Esgotado</span>
          </div>
        )}
      </div>
      {/* Product Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-body font-medium text-foreground line-clamp-2">
            {product?.name}
          </h3>
        </div>
        
        <p className="text-sm text-muted-foreground mb-3">
          {product?.category}
        </p>

        <div className="flex items-center justify-between mb-3">
          <span className="font-body font-semibold text-lg text-foreground">
            {formatPrice(product?.price)}
          </span>
          <span className={`text-sm font-caption ${getStockStatusColor(product?.stock)}`}>
            {getStockStatusText(product?.stock)}
          </span>
        </div>

        {/* Performance Metrics */}
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center space-x-1">
            <Icon name="Eye" size={14} />
            <span>{product?.views}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="MessageCircle" size={14} />
            <span>{product?.inquiries}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(product)}
            className="flex-1"
            iconName="Edit"
            iconPosition="left"
            iconSize={14}
          >
            Editar
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDuplicate(product)}
            iconName="Copy"
            iconSize={14}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(product?.id)}
            iconName="Trash2"
            iconSize={14}
            className="text-error hover:text-error"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;