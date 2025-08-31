import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AccountStep = ({ formData, setFormData, onNext }) => {
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateStep = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData?.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Senha deve ter pelo menos 8 caracteres';
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem';
    }

    if (!formData?.termsAccepted) {
      newErrors.termsAccepted = 'Você deve aceitar os termos de uso';
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

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
          Criar sua conta
        </h2>
        <p className="text-muted-foreground font-body">
          Comece vendendo seus produtos frescos online
        </p>
      </div>
      <div className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="seu@email.com"
          value={formData?.email || ''}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          required
        />

        <div className="relative">
          <Input
            label="Senha"
            type={showPassword ? 'text' : 'password'}
            placeholder="Mínimo 8 caracteres"
            value={formData?.password || ''}
            onChange={(e) => handleInputChange('password', e?.target?.value)}
            error={errors?.password}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
          </button>
        </div>

        <div className="relative">
          <Input
            label="Confirmar senha"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Digite a senha novamente"
            value={formData?.confirmPassword || ''}
            onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
            error={errors?.confirmPassword}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={18} />
          </button>
        </div>

        <div className="flex items-start space-x-3 pt-2">
          <input
            type="checkbox"
            id="terms"
            checked={formData?.termsAccepted || false}
            onChange={(e) => handleInputChange('termsAccepted', e?.target?.checked)}
            className="mt-1 w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
          />
          <label htmlFor="terms" className="text-sm font-body text-foreground">
            Eu aceito os{' '}
            <button className="text-primary hover:underline">
              Termos de Uso
            </button>
            {' '}e{' '}
            <button className="text-primary hover:underline">
              Política de Privacidade
            </button>
          </label>
        </div>
        {errors?.termsAccepted && (
          <p className="text-error text-sm font-caption">{errors?.termsAccepted}</p>
        )}
      </div>
      <Button
        onClick={handleNext}
        variant="default"
        size="lg"
        fullWidth
        iconName="ArrowRight"
        iconPosition="right"
        className="mt-8"
      >
        Continuar
      </Button>
    </div>
  );
};

export default AccountStep;