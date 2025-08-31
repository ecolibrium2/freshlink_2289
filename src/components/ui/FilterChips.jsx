import React from 'react';
import Icon from '../AppIcon';

const FilterChips = ({ activeFilters, onFilterChange, className = '' }) => {
  const filterOptions = [
    { id: 'all', label: 'Todos', icon: 'Grid3X3' },
    { id: 'frutas', label: 'Frutas', icon: 'Apple' },
    { id: 'verduras', label: 'Verduras', icon: 'Carrot' },
    { id: 'organicos', label: 'Orgânicos', icon: 'Leaf' },
    { id: 'legumes', label: 'Legumes', icon: 'Wheat' },
    { id: 'temperos', label: 'Temperos', icon: 'Flower2' },
    { id: 'laticinios', label: 'Laticínios', icon: 'Milk' },
    { id: 'carnes', label: 'Carnes', icon: 'Beef' }
  ];

  const handleFilterClick = (filterId) => {
    if (filterId === 'all') {
      onFilterChange([]);
    } else {
      const newFilters = activeFilters?.includes(filterId)
        ? activeFilters?.filter(f => f !== filterId)
        : [...activeFilters, filterId];
      onFilterChange(newFilters);
    }
  };

  const isActive = (filterId) => {
    if (filterId === 'all') {
      return activeFilters?.length === 0;
    }
    return activeFilters?.includes(filterId);
  };

  return (
    <div className={`${className}`}>
      <div className="flex items-center space-x-3 overflow-x-auto scrollbar-hide pb-2">
        {filterOptions?.map((filter) => (
          <button
            key={filter?.id}
            onClick={() => handleFilterClick(filter?.id)}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-full text-sm font-body font-medium whitespace-nowrap transition-all duration-200 border ${
              isActive(filter?.id)
                ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                : 'bg-card text-muted-foreground border-border hover:bg-muted hover:text-foreground hover:border-primary/30'
            }`}
          >
            <Icon name={filter?.icon} size={16} />
            <span>{filter?.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterChips;