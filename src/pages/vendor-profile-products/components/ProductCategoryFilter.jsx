import React from 'react';
import Icon from '../../../components/AppIcon';

const ProductCategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  const categoryIcons = {
    'frutas': 'Apple',
    'verduras': 'Carrot', 
    'legumes': 'Wheat',
    'temperos': 'Flower2',
    'organicos': 'Leaf',
    'laticinios': 'Milk'
  };

  return (
    <div className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => onCategoryChange('all')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-full text-sm font-body font-medium whitespace-nowrap transition-all duration-200 border ${
              activeCategory === 'all'
                ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                : 'bg-card text-muted-foreground border-border hover:bg-muted hover:text-foreground hover:border-primary/30'
            }`}
          >
            <Icon name="Grid3X3" size={16} />
            <span>Todos</span>
          </button>
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => onCategoryChange(category?.id)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-full text-sm font-body font-medium whitespace-nowrap transition-all duration-200 border ${
                activeCategory === category?.id
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-card text-muted-foreground border-border hover:bg-muted hover:text-foreground hover:border-primary/30'
              }`}
            >
              <Icon name={categoryIcons[category?.id] || 'Package'} size={16} />
              <span>{category?.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCategoryFilter;