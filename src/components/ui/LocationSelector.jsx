import React, { useState } from 'react';
import Icon from '../AppIcon';

const LocationSelector = ({ currentLocation, onLocationChange, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const locations = [
    { id: 1, name: "São Paulo, SP", distance: "Atual" },
    { id: 2, name: "Rio de Janeiro, RJ", distance: "450 km" },
    { id: 3, name: "Belo Horizonte, MG", distance: "586 km" },
    { id: 4, name: "Brasília, DF", distance: "1.015 km" },
    { id: 5, name: "Salvador, BA", distance: "1.962 km" }
  ];

  const handleLocationSelect = (location) => {
    onLocationChange(location);
    setIsOpen(false);
  };

  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position?.coords;
          onLocationChange({
            id: 'current',
            name: 'Localização Atual',
            distance: 'Detectada',
            coords: { lat: latitude, lng: longitude }
          });
          setIsOpen(false);
        },
        (error) => {
          console.error('Erro ao obter localização:', error);
        }
      );
    }
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-3 bg-muted border border-border rounded-lg text-sm font-body font-medium text-foreground hover:bg-muted/80 transition-colors duration-200 whitespace-nowrap"
      >
        <Icon name="MapPin" size={16} className="text-primary" />
        <span className="hidden sm:inline">{currentLocation?.name}</span>
        <Icon name="ChevronDown" size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 min-w-64">
            <div className="p-3 border-b border-border">
              <button
                onClick={handleDetectLocation}
                className="w-full flex items-center space-x-3 px-3 py-2 text-sm font-body font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors duration-200"
              >
                <Icon name="Navigation" size={16} />
                <span>Detectar minha localização</span>
              </button>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {locations?.map((location) => (
                <button
                  key={location?.id}
                  onClick={() => handleLocationSelect(location)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-sm font-body hover:bg-muted transition-colors duration-200 ${
                    currentLocation?.id === location?.id ? 'bg-primary/10 text-primary' : 'text-foreground'
                  }`}
                >
                  <span className="font-medium">{location?.name}</span>
                  <span className="text-muted-foreground text-xs">{location?.distance}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LocationSelector;