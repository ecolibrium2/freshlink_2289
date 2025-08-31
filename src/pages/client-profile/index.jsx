import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ResponsiveHeader from '../../components/ui/ResponsiveHeader';
import Footer from '../../components/ui/Footer';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';

const ClientProfile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    profileImage: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    // Check if user is logged in as client
    const clientAuth = localStorage.getItem('clientAuth');
    if (!clientAuth) {
      navigate('/auth');
      return;
    }

    const userData = JSON.parse(clientAuth);
    setProfileData({
      name: userData.name || '',
      email: userData.email || '',
      profileImage: userData.profileImage || 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  }, [navigate]);

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
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

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({
          ...prev,
          profileImage: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!profileData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!profileData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      newErrors.email = 'Email inválido';
    }

    // Password validation only if user wants to change password
    if (profileData.newPassword || profileData.confirmPassword) {
      if (!profileData.currentPassword) {
        newErrors.currentPassword = 'Senha atual é obrigatória para alterar a senha';
      }

      if (!profileData.newPassword) {
        newErrors.newPassword = 'Nova senha é obrigatória';
      } else if (profileData.newPassword.length < 6) {
        newErrors.newPassword = 'Nova senha deve ter pelo menos 6 caracteres';
      }

      if (!profileData.confirmPassword) {
        newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
      } else if (profileData.newPassword !== profileData.confirmPassword) {
        newErrors.confirmPassword = 'Senhas não coincidem';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update localStorage
      const clientAuth = JSON.parse(localStorage.getItem('clientAuth'));
      const updatedAuth = {
        ...clientAuth,
        name: profileData.name,
        email: profileData.email,
        profileImage: profileData.profileImage
      };
      localStorage.setItem('clientAuth', JSON.stringify(updatedAuth));
      
      setIsEditing(false);
      
      // Clear password fields
      setProfileData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      
      alert('Perfil atualizado com sucesso!');
    } catch (error) {
      alert('Erro ao salvar perfil. Tente novamente.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setErrors({});
    
    // Reset form data
    const clientAuth = JSON.parse(localStorage.getItem('clientAuth'));
    setProfileData({
      name: clientAuth.name || '',
      email: clientAuth.email || '',
      profileImage: clientAuth.profileImage || 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="min-h-screen bg-background pt-16 flex flex-col">
      <ResponsiveHeader />
      
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-heading font-bold text-foreground">
                Meu Perfil
              </h1>
              <p className="text-muted-foreground mt-1">
                Gerencie suas informações pessoais
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              {isEditing ? (
                <>
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isSaving}
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleSave}
                    loading={isSaving}
                    iconName="Save"
                    iconPosition="left"
                  >
                    Salvar
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setIsEditing(true)}
                  iconName="Edit"
                  iconPosition="left"
                >
                  Editar Perfil
                </Button>
              )}
            </div>
          </div>

          {/* Profile Form */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="space-y-6">
              {/* Profile Image */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-muted">
                    <Image
                      src={profileData.profileImage}
                      alt="Foto do perfil"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {isEditing && (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors duration-200"
                    >
                      <Icon name="Camera" size={16} />
                    </button>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
                <div>
                  <h3 className="font-body font-medium text-foreground mb-1">Foto do Perfil</h3>
                  <p className="text-sm text-muted-foreground">
                    {isEditing ? 'Clique no ícone para alterar sua foto' : 'Sua foto de perfil atual'}
                  </p>
                </div>
              </div>

              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-heading font-semibold text-foreground border-b border-border pb-2">
                  Informações Básicas
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Nome completo"
                    value={profileData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    disabled={!isEditing}
                    error={errors.name}
                    required
                  />

                  <Input
                    label="Email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                    error={errors.email}
                    required
                  />
                </div>
              </div>

              {/* Password Change */}
              {isEditing && (
                <div className="space-y-4">
                  <h3 className="text-lg font-heading font-semibold text-foreground border-b border-border pb-2">
                    Alterar Senha
                  </h3>
                  
                  <p className="text-sm text-muted-foreground">
                    Deixe em branco se não quiser alterar a senha
                  </p>

                  <div className="space-y-4">
                    <div className="relative">
                      <Input
                        label="Senha atual"
                        type={showCurrentPassword ? "text" : "password"}
                        placeholder="Digite sua senha atual"
                        value={profileData.currentPassword}
                        onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                        error={errors.currentPassword}
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors duration-200"
                      >
                        <Icon name={showCurrentPassword ? "EyeOff" : "Eye"} size={18} />
                      </button>
                    </div>

                    <div className="relative">
                      <Input
                        label="Nova senha"
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Digite a nova senha"
                        value={profileData.newPassword}
                        onChange={(e) => handleInputChange('newPassword', e.target.value)}
                        error={errors.newPassword}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors duration-200"
                      >
                        <Icon name={showNewPassword ? "EyeOff" : "Eye"} size={18} />
                      </button>
                    </div>

                    <div className="relative">
                      <Input
                        label="Confirmar nova senha"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Digite a nova senha novamente"
                        value={profileData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        error={errors.confirmPassword}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors duration-200"
                      >
                        <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Account Actions */}
              <div className="space-y-4 pt-6 border-t border-border">
                <h3 className="text-lg font-heading font-semibold text-foreground">
                  Ações da Conta
                </h3>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    iconName="Download"
                    iconPosition="left"
                    onClick={() => alert('Funcionalidade em desenvolvimento')}
                  >
                    Baixar Dados
                  </Button>
                  <Button
                    variant="destructive"
                    iconName="Trash2"
                    iconPosition="left"
                    onClick={() => {
                      if (confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.')) {
                        localStorage.removeItem('clientAuth');
                        navigate('/auth');
                      }
                    }}
                  >
                    Excluir Conta
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ClientProfile;