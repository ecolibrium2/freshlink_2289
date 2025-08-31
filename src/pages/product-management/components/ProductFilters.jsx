import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

import Select from '../../../components/ui/Select';

const ProductFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters,
  productCount,
  viewMode,
  onViewModeChange 
}) => {
  const categoryOptions = [
    { value: '', label: 'Todas as categorias' },
    { value: 'frutas', label: 'Frutas' },
    { value: 'verduras', label: 'Verduras' },
    { value: 'legumes', label: 'Legumes' },
    { value: 'organicos', label: 'Orgânicos' },
    { value: 'temperos', label: 'Temperos e Ervas' },
    { value: 'graos', label: 'Grãos e Cereais' },
    { value: 'laticinios', label: 'Laticínios' },
    { value: 'outros', label: 'Outros' }
  ];

  const stockOptions = [
    { value: '', label: 'Todos os estoques' },
    { value: 'available', label: 'Disponível' },
    { value: 'low', label: 'Estoque baixo' },
    { value: 'out', label: 'Esgotado' }
  ];

  const visibilityOptions = [
    { value: '', label: 'Todos os produtos' },
    { value: 'visible', label: 'Visíveis' },
    { value: 'hidden', label: 'Ocultos' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Nome A-Z' },
    { value: 'name_desc', label: 'Nome Z-A' },
    { value: 'price', label: 'Menor preço' },
    { value: 'price_desc', label: 'Maior preço' },
    { value: 'stock', label: 'Maior estoque' },
    { value: 'views', label: 'Mais visualizados' },
    { value: 'created', label: 'Mais recentes' }
  ];

  const hasActiveFilters = filters?.search || filters?.category || filters?.stock || filters?.visibility;

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      {/* Search and View Toggle */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Icon 
              name="Search" 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={filters?.search}
              onChange={(e) => onFilterChange('search', e?.target?.value)}
              className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 ml-4">
          {/* View Mode Toggle */}
          <div className="hidden md:flex items-center bg-muted rounded-lg p-1">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded-md transition-colors duration-200 ${
                viewMode === 'grid' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
              title="Visualização em grade"
            >
              <Icon name="Grid3X3" size={16} />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-2 rounded-md transition-colors duration-200 ${
                viewMode === 'list' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
              title="Visualização em lista"
            >
              <Icon name="List" size={16} />
            </button>
          </div>

          {/* Results Count */}
          <div className="text-sm text-muted-foreground">
            {productCount} produto{productCount !== 1 ? 's' : ''}
          </div>
        </div>
      </div>
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <Select
          placeholder="Categoria"
          options={categoryOptions}
          value={filters?.category}
          onChange={(value) => onFilterChange('category', value)}
        />

        <Select
          placeholder="Estoque"
          options={stockOptions}
          value={filters?.stock}
          onChange={(value) => onFilterChange('stock', value)}
        />

        <Select
          placeholder="Visibilidade"
          options={visibilityOptions}
          value={filters?.visibility}
          onChange={(value) => onFilterChange('visibility', value)}
        />

        <Select
          placeholder="Ordenar por"
          options={sortOptions}
          value={filters?.sort}
          onChange={(value) => onFilterChange('sort', value)}
        />
      </div>
      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Filter" size={16} />
            <span>Filtros ativos</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
          >
            Limpar Filtros
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductFilters;