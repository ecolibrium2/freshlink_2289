import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const BusinessStep = ({ formData, setFormData, onNext, onBack }) => {
  const [errors, setErrors] = useState({});

  const businessTypes = [
    { value: 'farmer', label: 'Produtor Rural' },
    { value: 'market_vendor', label: 'Vendedor de Feira' },
    { value: 'organic_producer', label: 'Produtor Orgânico' },
    { value: 'cooperative', label: 'Cooperativa' },
    { value: 'small_business', label: 'Pequeno Negócio' },
    { value: 'other', label: 'Outro' }
  ];

  const validateStep = () => {
    const newErrors = {};

    if (!formData?.businessName) {
      newErrors.businessName = 'Nome do negócio é obrigatório';
    }

    if (!formData?.businessType) {
      newErrors.businessType = 'Tipo de negócio é obrigatório';
    }

    if (!formData?.whatsappNumber) {
      newErrors.whatsappNumber = 'WhatsApp é obrigatório';
    } else if (!/^\(\d{2}\)\s\d{4,5}-\d{4}$/?.test(formData?.whatsappNumber)) {
      newErrors.whatsappNumber = 'Formato inválido. Use (11) 99999-9999';
    }

    if (!formData?.businessDescription) {
      newErrors.businessDescription = 'Descrição é obrigatória';
    } else if (formData?.businessDescription?.length < 50) {
      newErrors.businessDescription = 'Descrição deve ter pelo menos 50 caracteres';
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

  const formatWhatsApp = (value) => {
    const numbers = value?.replace(/\D/g, '');
    if (numbers?.length <= 11) {
      return numbers?.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  const handleWhatsAppChange = (e) => {
    const formatted = formatWhatsApp(e?.target?.value);
    handleInputChange('whatsappNumber', formatted);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
          Informações do negócio
        </h2>
        <p className="text-muted-foreground font-body">
          Conte-nos sobre seu negócio e produtos
        </p>
      </div>
      <div className="space-y-4">
        <Input
          label="Nome do negócio"
          type="text"
          placeholder="Ex: Fazenda São João"
          value={formData?.businessName || ''}
          onChange={(e) => handleInputChange('businessName', e?.target?.value)}
          error={errors?.businessName}
          required
        />

        <Select
          label="Tipo de negócio"
          placeholder="Selecione o tipo do seu negócio"
          options={businessTypes}
          value={formData?.businessType || ''}
          onChange={(value) => handleInputChange('businessType', value)}
          error={errors?.businessType}
          required
        />

        <Input
          label="WhatsApp para contato"
          type="tel"
          placeholder="(11) 99999-9999"
          value={formData?.whatsappNumber || ''}
          onChange={handleWhatsAppChange}
          error={errors?.whatsappNumber}
          description="Clientes entrarão em contato através deste número"
          required
        />

        <div>
          <label className="block text-sm font-body font-medium text-foreground mb-2">
            Descrição do negócio *
          </label>
          <textarea
            placeholder="Descreva seus produtos, experiência e diferenciais. Mínimo 50 caracteres."
            value={formData?.businessDescription || ''}
            onChange={(e) => handleInputChange('businessDescription', e?.target?.value)}
            rows={4}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none"
          />
          <div className="flex justify-between items-center mt-1">
            {errors?.businessDescription && (
              <p className="text-error text-sm font-caption">{errors?.businessDescription}</p>
            )}
            <p className="text-xs font-caption text-muted-foreground ml-auto">
              {(formData?.businessDescription || '')?.length}/500
            </p>
          </div>
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

export default BusinessStep;