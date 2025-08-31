import React from 'react';

const TabNavigation = ({ activeTab, onTabChange, productCount, reviewCount }) => {
  const tabs = [
    {
      id: 'products',
      label: 'Produtos',
      count: productCount
    },
    {
      id: 'about',
      label: 'Sobre',
      count: null
    },
    {
      id: 'reviews',
      label: 'Avaliações',
      count: reviewCount
    }
  ];

  return (
    <div className="bg-card border-b border-border sticky top-16 z-40">
      <div className="container mx-auto px-4">
        <div className="flex space-x-0 overflow-x-auto scrollbar-hide">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => onTabChange(tab?.id)}
              className={`flex-shrink-0 px-4 py-4 text-sm font-body font-medium border-b-2 transition-colors duration-200 ${
                activeTab === tab?.id
                  ? 'text-primary border-primary' :'text-muted-foreground border-transparent hover:text-foreground'
              }`}
            >
              {tab?.label}
              {tab?.count !== null && (
                <span className="ml-2 text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                  {tab?.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;