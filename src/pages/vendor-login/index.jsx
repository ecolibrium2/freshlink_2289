import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import TrustSignals from './components/TrustSignals';
import SocialLogin from './components/SocialLogin';
import LoginHeader from './components/LoginHeader';
import Icon from '../../components/AppIcon';


const VendorLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isWhatsAppLoading, setIsWhatsAppLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);

  // Mock credentials for testing
  const mockCredentials = {
    email: "vendedor@freshlink.com",
    password: "123456"
  };

  const handleLogin = async (formData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check credentials
      if (formData?.email === mockCredentials?.email && formData?.password === mockCredentials?.password) {
        // Successful login
        localStorage.setItem('vendorAuth', JSON.stringify({
          email: formData?.email,
          loginTime: new Date()?.toISOString(),
          rememberMe: formData?.rememberMe
        }));
        
        navigate('/vendor-dashboard');
      } else {
        // Failed login
        setLoginAttempts(prev => prev + 1);
        
        let errorMessage = "E-mail ou senha incorretos.";
        if (loginAttempts >= 2) {
          errorMessage += " Muitas tentativas. Tente novamente em alguns minutos.";
        }
        
        alert(`${errorMessage}\n\nCredenciais de teste:\nE-mail: ${mockCredentials?.email}\nSenha: ${mockCredentials?.password}`);
      }
    } catch (error) {
      alert('Erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsAppLogin = async () => {
    setIsWhatsAppLoading(true);
    
    try {
      // Simulate WhatsApp authentication
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock WhatsApp login success
      localStorage.setItem('vendorAuth', JSON.stringify({
        email: 'whatsapp@freshlink.com',
        loginTime: new Date()?.toISOString(),
        loginMethod: 'whatsapp'
      }));
      
      navigate('/vendor-dashboard');
    } catch (error) {
      alert('Erro na autenticação via WhatsApp. Tente novamente.');
    } finally {
      setIsWhatsAppLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <LoginHeader />
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Login Form */}
            <div className="order-2 lg:order-1">
              <div className="sticky top-8">
                <div className="auth-form">
                  <LoginForm 
                    onSubmit={handleLogin} 
                    isLoading={isLoading}
                  />
                </div>
                
                <div className="mt-6">
                  <SocialLogin 
                    onWhatsAppLogin={handleWhatsAppLogin}
                    isLoading={isWhatsAppLoading}
                  />
                </div>

                {/* Security Notice */}
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name="Info" size={14} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-body font-medium text-foreground mb-1">
                        Primeira vez aqui?
                      </h4>
                      <p className="text-xs font-caption text-muted-foreground">
                        Crie sua conta gratuita e comece a vender seus produtos frescos para clientes locais em poucos minutos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Trust Signals */}
            <div className="order-1 lg:order-2">
              <TrustSignals />
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default VendorLogin;