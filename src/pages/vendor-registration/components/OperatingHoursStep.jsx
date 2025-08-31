import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const OperatingHoursStep = ({ formData, setFormData, onNext, onBack, onComplete }) => {
  const [errors, setErrors] = useState({});

  const daysOfWeek = [
    { id: 'monday', label: 'Segunda-feira', short: 'Seg' },
    { id: 'tuesday', label: 'Terça-feira', short: 'Ter' },
    { id: 'wednesday', label: 'Quarta-feira', short: 'Qua' },
    { id: 'thursday', label: 'Quinta-feira', short: 'Qui' },
    { id: 'friday', label: 'Sexta-feira', short: 'Sex' },
    { id: 'saturday', label: 'Sábado', short: 'Sáb' },
    { id: 'sunday', label: 'Domingo', short: 'Dom' }
  ];

  const timeOptions = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour?.toString()?.padStart(2, '0')}:${minute?.toString()?.padStart(2, '0')}`;
      timeOptions?.push({ value: time, label: time });
    }
  }

  const validateStep = () => {
    const newErrors = {};
    const operatingHours = formData?.operatingHours || {};
    
    const hasAtLeastOneDay = daysOfWeek?.some(day => operatingHours?.[day?.id]?.isOpen);
    
    if (!hasAtLeastOneDay) {
      newErrors.general = 'Selecione pelo menos um dia de funcionamento';
    }

    // Validate each open day has valid times
    daysOfWeek?.forEach(day => {
      const dayData = operatingHours?.[day?.id];
      if (dayData?.isOpen) {
        if (!dayData?.openTime) {
          newErrors[`${day.id}_open`] = 'Horário de abertura obrigatório';
        }
        if (!dayData?.closeTime) {
          newErrors[`${day.id}_close`] = 'Horário de fechamento obrigatório';
        }
        if (dayData?.openTime && dayData?.closeTime && dayData?.openTime >= dayData?.closeTime) {
          newErrors[`${day.id}_time`] = 'Horário de abertura deve ser antes do fechamento';
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleComplete = () => {
    if (validateStep()) {
      onComplete();
    }
  };

  const handleDayToggle = (dayId, isOpen) => {
    const currentHours = formData?.operatingHours || {};
    setFormData(prev => ({
      ...prev,
      operatingHours: {
        ...currentHours,
        [dayId]: {
          ...currentHours?.[dayId],
          isOpen,
          openTime: isOpen ? (currentHours?.[dayId]?.openTime || '08:00') : '',
          closeTime: isOpen ? (currentHours?.[dayId]?.closeTime || '18:00') : ''
        }
      }
    }));
  };

  const handleTimeChange = (dayId, timeType, value) => {
    const currentHours = formData?.operatingHours || {};
    setFormData(prev => ({
      ...prev,
      operatingHours: {
        ...currentHours,
        [dayId]: {
          ...currentHours?.[dayId],
          [timeType]: value
        }
      }
    }));
  };

  const setAllDays = (isOpen) => {
    const newHours = {};
    daysOfWeek?.forEach(day => {
      newHours[day.id] = {
        isOpen,
        openTime: isOpen ? '08:00' : '',
        closeTime: isOpen ? '18:00' : ''
      };
    });
    setFormData(prev => ({
      ...prev,
      operatingHours: newHours
    }));
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
          Horários de funcionamento
        </h2>
        <p className="text-muted-foreground font-body">
          Quando os clientes podem entrar em contato
        </p>
      </div>
      {errors?.general && (
        <div className="bg-error/10 border border-error/20 rounded-lg p-3">
          <p className="text-error text-sm font-caption">{errors?.general}</p>
        </div>
      )}
      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          onClick={() => setAllDays(true)}
          variant="outline"
          size="sm"
          iconName="Clock"
          iconPosition="left"
        >
          Todos os dias
        </Button>
        <Button
          onClick={() => setAllDays(false)}
          variant="outline"
          size="sm"
          iconName="X"
          iconPosition="left"
        >
          Limpar tudo
        </Button>
      </div>
      {/* Days Configuration */}
      <div className="space-y-4">
        {daysOfWeek?.map(day => {
          const dayData = formData?.operatingHours?.[day?.id] || {};
          const isOpen = dayData?.isOpen || false;

          return (
            <div key={day?.id} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <Checkbox
                  label={day?.label}
                  checked={isOpen}
                  onChange={(e) => handleDayToggle(day?.id, e?.target?.checked)}
                />
                {isOpen && (
                  <div className="flex items-center space-x-2 text-sm font-caption text-success">
                    <Icon name="Clock" size={16} />
                    <span>Aberto</span>
                  </div>
                )}
              </div>
              {isOpen && (
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div>
                    <Select
                      label="Abertura"
                      options={timeOptions}
                      value={dayData?.openTime || ''}
                      onChange={(value) => handleTimeChange(day?.id, 'openTime', value)}
                      error={errors?.[`${day?.id}_open`]}
                      searchable
                    />
                  </div>
                  <div>
                    <Select
                      label="Fechamento"
                      options={timeOptions}
                      value={dayData?.closeTime || ''}
                      onChange={(value) => handleTimeChange(day?.id, 'closeTime', value)}
                      error={errors?.[`${day?.id}_close`]}
                      searchable
                    />
                  </div>
                  {errors?.[`${day?.id}_time`] && (
                    <div className="col-span-2">
                      <p className="text-error text-sm font-caption">{errors?.[`${day?.id}_time`]}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="bg-muted/50 rounded-lg p-4 mt-6">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-body font-medium text-foreground mb-1">
              Dica importante
            </p>
            <p className="text-sm font-caption text-muted-foreground">
              Estes horários serão mostrados aos clientes. Você pode alterá-los a qualquer momento no seu painel.
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
          onClick={handleComplete}
          variant="default"
          size="lg"
          fullWidth
          iconName="Check"
          iconPosition="right"
        >
          Criar Conta
        </Button>
      </div>
    </div>
  );
};

export default OperatingHoursStep;