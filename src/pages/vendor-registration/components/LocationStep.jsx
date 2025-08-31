import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';


const LocationStep = ({ formData, setFormData, onNext, onBack }) => {
  const [errors, setErrors] = useState({});
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const validateStep = () => {
    const newErrors = {};

    if (!formData?.address) {
      newErrors.address = 'Endereço é obrigatório';
    }

    if (!formData?.city) {
      newErrors.city = 'Cidade é obrigatória';
    }

    if (!formData?.state) {
      newErrors.state = 'Estado é obrigatório';
    }

    if (!formData?.zipCode) {
      newErrors.zipCode = 'CEP é obrigatório';
    } else if (!/^\d{5}-?\d{3}$/?.test(formData?.zipCode)) {
      newErrors.zipCode = 'CEP inválido. Use formato 12345-678';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      onNext();
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const formatZipCode = (value) => {
    const numbers = value?.replace(/\D/g, '');
    if (numbers?.length <= 8) {
      return numbers?.replace(/(\d{5})(\d{3})/, '$1-$2');
    }
    return value;
  };

  const handleZipCodeChange = (e) => {
    const formatted = formatZipCode(e?.target?.value);
    handleInputChange('zipCode', formatted);
  };

  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position?.coords;
          // Mock address based on coordinates
          setFormData(prev => ({
            ...prev,
            address: 'Rua das Flores, 123',
            city: 'São Paulo',
            state: 'SP',
            zipCode: '01234-567',
            latitude,
            longitude
          }));
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLoadingLocation(false);
        }
      );
    } else {
      setIsLoadingLocation(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
          Localização
        </h2>
        <p className="text-muted-foreground font-body">
          Onde os clientes podem encontrar você
        </p>
      </div>
      <div className="space-y-4">
        <div className="flex gap-3">
          <div className="flex-1">
            <Input
              label="CEP"
              type="text"
              placeholder="12345-678"
              value={formData?.zipCode || ''}
              onChange={handleZipCodeChange}
              error={errors?.zipCode}
              required
            />
          </div>
          <Button
            onClick={getCurrentLocation}
            variant="outline"
            size="default"
            loading={isLoadingLocation}
            iconName="MapPin"
            className="mt-6"
          >
            Localizar
          </Button>
        </div>

        <Input
          label="Endereço completo"
          type="text"
          placeholder="Rua, número, complemento"
          value={formData?.address || ''}
          onChange={(e) => handleInputChange('address', e?.target?.value)}
          error={errors?.address}
          required
        />

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Cidade"
            type="text"
            placeholder="São Paulo"
            value={formData?.city || ''}
            onChange={(e) => handleInputChange('city', e?.target?.value)}
            error={errors?.city}
            required
          />
          <Input
            label="Estado"
            type="text"
            placeholder="SP"
            value={formData?.state || ''}
            onChange={(e) => handleInputChange('state', e?.target?.value)}
            error={errors?.state}
            required
          />
        </div>

        {/* Map Preview */}
        <div className="mt-6">
          <label className="block text-sm font-body font-medium text-foreground mb-2">
            Localização no mapa
          </label>
          <div className="w-full h-48 bg-muted rounded-lg border border-border overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title="Localização do negócio"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${formData?.latitude || -23.5505}&lng=${formData?.longitude || -46.6333}&z=14&output=embed`}
              className="border-0"
            />
          </div>
          <p className="text-xs font-caption text-muted-foreground mt-2">
            Esta localização será mostrada aos clientes para facilitar o contato
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        <Button
          onClick={onBack}
          variant="outline"
          size="lg"
          fullWidth
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Voltar
        </Button>
        <Button
          onClick={handleNext}
          variant="default"
          size="lg"
          fullWidth
          iconName="ArrowRight"
          iconPosition="right"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default LocationStep;