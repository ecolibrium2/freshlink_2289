import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Checkbox } from '../../components/ui/Checkbox';
import Select from '../../components/ui/Select';
import Icon from '../../components/AppIcon';
import ResponsiveHeader from '../../components/ui/ResponsiveHeader';
import Footer from '../../components/ui/Footer';

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Login fields
    email: '',
    password: '',
    rememberMe: false,
    
    // Register fields
    name: '',
    confirmPassword: '',
    termsAccepted: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'register') {
      setActiveTab('register');
    }
  }, [searchParams]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateLogin = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegister = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem';
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'Você deve aceitar os termos de uso';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!validateLogin()) return;

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock credentials
      const clientCredentials = { email: 'cliente@freshlink.com', password: '123456' };
      const vendorCredentials = { email: 'vendedor@freshlink.com', password: '123456' };
      
      if (formData.email === clientCredentials.email && formData.password === clientCredentials.password) {
        localStorage.setItem('clientAuth', JSON.stringify({
          name: 'Cliente Teste',
          email: formData.email,
          loginTime: new Date().toISOString(),
          type: 'client'
        }));
        navigate('/consumer-home-search');
      } else if (formData.email === vendorCredentials.email && formData.password === vendorCredentials.password) {
        localStorage.setItem('vendorAuth', JSON.stringify({
          businessName: 'Fazenda Teste',
          email: formData.email,
          loginTime: new Date().toISOString(),
          type: 'vendor'
        }));
        navigate('/vendor-dashboard');
      } else {
        alert(`Credenciais incorretas.\n\nCredenciais de teste:\nCliente: ${clientCredentials.email} / ${clientCredentials.password}\nVendedor: ${vendorCredentials.email} / ${vendorCredentials.password}`);
      }
    } catch (error) {
      alert('Erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!validateRegister()) return;

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      localStorage.setItem('clientAuth', JSON.stringify({
        name: formData.name,
        email: formData.email,
        loginTime: new Date().toISOString(),
        type: 'client'
      }));
      alert('Conta criada com sucesso!');
      navigate('/consumer-home-search');
    } catch (error) {
      alert('Erro ao criar conta. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-16 flex flex-col">
      <ResponsiveHeader />
      
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-md mx-auto">
          <div className="bg-card rounded-lg border border-border p-6 shadow-sm auth-form">
            {/* Tab Navigation */}
            <div className="flex mb-6 bg-muted rounded-lg p-1 animate-fade-in">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-2 px-4 text-sm font-body font-medium rounded-md transition-colors duration-200 ${
                  activeTab === 'login'
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Entrar
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className={`flex-1 py-2 px-4 text-sm font-body font-medium rounded-md transition-colors duration-200 ${
                  activeTab === 'register'
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Cadastrar
              </button>
            </div>

            {activeTab === 'login' ? (
              <div>
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
                    Entrar na sua conta
                  </h1>
                  <p className="text-sm font-body text-muted-foreground">
                    Acesse sua conta para uma experiência personalizada
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <Input
                    label="Email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    error={errors.email}
                    required
                  />

                  <div className="relative">
                    <Input
                      label="Senha"
                      type={showPassword ? "text" : "password"}
                      placeholder="Digite sua senha"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      error={errors.password}
                      required
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
                      checked={formData.rememberMe}
                      onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                      size="sm"
                    />
                    
                    <button
                      type="button"
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
              </div>
            ) : (
              <div>
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
                    Criar conta
                  </h1>
                  <p className="text-sm font-body text-muted-foreground">
                    Escolha o tipo de conta que deseja criar
                  </p>
                </div>

                {/* User Type Selection */}
                <div className="flex mb-6 bg-muted rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() => setUserType('client')}
                    className={`flex-1 py-3 px-4 text-sm font-body font-medium rounded-md transition-colors duration-200 ${
                      userType === 'client'
                        ? 'bg-card text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-1">
                      <Icon name="User" size={20} />
                      <span>Cliente</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserType('vendor')}
                    className={`flex-1 py-3 px-4 text-sm font-body font-medium rounded-md transition-colors duration-200 ${
                      userType === 'vendor'
                        ? 'bg-card text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-1">
                      <Icon name="Store" size={20} />
                      <span>Vendedor</span>
                    </div>
                  </button>
                </div>

                <form onSubmit={handleRegister} className="space-y-4">
                  {userType === 'client' ? (
                    <Input
                      label="Nome completo"
                      type="text"
                      placeholder="Seu nome"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      error={errors.name}
                      required
                    />
                  ) : (
                    <>
                      <Input
                        label="Nome do negócio"
                        type="text"
                        placeholder="Ex: Fazenda São João"
                        value={formData.businessName}
                        onChange={(e) => handleInputChange('businessName', e.target.value)}
                        error={errors.businessName}
                        required
                      />

                      <Select
                        label="Tipo de negócio"
                        placeholder="Selecione o tipo do seu negócio"
                        options={businessTypes}
                        value={formData.businessType}
                        onChange={(value) => handleInputChange('businessType', value)}
                        error={errors.businessType}
                        required
                      />

                      <Input
                        label="WhatsApp para contato"
                        type="tel"
                        placeholder="(11) 99999-9999"
                        value={formData.whatsappNumber}
                        onChange={handleWhatsAppChange}
                        error={errors.whatsappNumber}
                        description="Clientes entrarão em contato através deste número"
                        required
                      />
                    </>
                  )}

                  <Input
                    label="Email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    error={errors.email}
                    required
                  />

                  <div className="relative">
                    <Input
                      label="Senha"
                      type={showPassword ? "text" : "password"}
                      placeholder="Mínimo 6 caracteres"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      error={errors.password}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      <Icon name={showPassword ? "EyeOff" : "Eye"} size={18} />
                    </button>
                  </div>

                  <div className="relative">
                    <Input
                      label="Confirmar senha"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Digite a senha novamente"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      error={errors.confirmPassword}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={18} />
                    </button>
                  </div>

                  <div className="flex items-start space-x-3 pt-2">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={formData.termsAccepted}
                      onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                      className="mt-1 w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                    />
                    <label htmlFor="terms" className="text-sm font-body text-foreground">
                      Eu aceito os{' '}
                      <button type="button" className="text-primary hover:underline">
                        Termos de Uso
                      </button>
                      {' '}e{' '}
                      <button type="button" className="text-primary hover:underline">
                        Política de Privacidade
                      </button>
                    </label>
                  </div>

                  {errors.termsAccepted && (
                    <p className="text-error text-sm font-caption">{errors.termsAccepted}</p>
                  )}

                  <Button
                    type="submit"
                    variant="default"
                    size="lg"
                    fullWidth
                    loading={isLoading}
                    className="mt-6"
                  >
                    {userType === 'client' ? 'Criar Conta de Cliente' : 'Criar Conta de Vendedor'}
                  </Button>
                </form>
              </div>
            )}
          </div>

          {/* Benefits Section */}
          <div className="mt-8 bg-muted/50 rounded-lg p-6">
            <h3 className="font-body font-medium text-foreground mb-4 text-center">
              {activeTab === 'login' ? 'Bem-vindo de volta!' : 'Vantagens de ter uma conta'}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Icon name="Heart" size={16} className="text-primary flex-shrink-0" />
                <span className="text-sm font-body text-muted-foreground">
                  {userType === 'client' ? 'Salve seus vendedores favoritos' : 'Gerencie seus produtos facilmente'}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Clock" size={16} className="text-primary flex-shrink-0" />
                <span className="text-sm font-body text-muted-foreground">
                  {userType === 'client' ? 'Histórico de consultas e compras' : 'Acompanhe métricas de vendas'}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Bell" size={16} className="text-primary flex-shrink-0" />
                <span className="text-sm font-body text-muted-foreground">
                  {userType === 'client' ? 'Notificações de novos produtos' : 'Receba consultas de clientes'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Auth;