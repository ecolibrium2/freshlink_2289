import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onSubmit, isLoading = false }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'E-mail inválido';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleForgotPassword = () => {
    navigate('/vendor-registration');
  };

  const handleCreateAccount = () => {
    navigate('/vendor-registration');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card rounded-lg border border-border p-6 shadow-sm auth-form">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
            Entrar na sua conta
          </h1>
          <p className="text-sm font-body text-muted-foreground">
            Acesse seu painel de vendedor
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="E-mail"
            type="email"
            name="email"
            placeholder="seu@email.com"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            required
            className="mb-4"
          />

          <div className="relative">
            <Input
              label="Senha"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Digite sua senha"
              value={formData?.password}
              onChange={handleInputChange}
              error={errors?.password}
              required
              className="mb-4"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <Icon name={showPassword ? "EyeOff" : "Eye"} size={18} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <Checkbox
              label="Lembrar de mim"
              name="rememberMe"
              checked={formData?.rememberMe}
              onChange={handleInputChange}
              size="sm"
            />
            
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm font-body text-primary hover:text-primary/80 transition-colors duration-200"
            >
              Esqueci minha senha
            </button>
          </div>

          <Button
            type="submit"
            variant="default"
            size="lg"
            fullWidth
            loading={isLoading}
            className="mt-6"
          >
            Entrar
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm font-body text-muted-foreground">
            Não tem uma conta?{' '}
            <button
              onClick={handleCreateAccount}
              className="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
            >
              Criar conta
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;