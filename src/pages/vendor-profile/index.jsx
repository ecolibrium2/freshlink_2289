import React, { useState, useEffect } from 'react';
import VendorSidebarNavigation from '../../components/ui/VendorSidebarNavigation';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { Checkbox } from '../../components/ui/Checkbox';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';

const VendorProfile = () => {
  const [activeTab, setActiveTab] = useState('basic');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profileData, setProfileData] = useState({
    // Basic Info
    businessName: 'Fazenda Orgânica São José',
    email: 'vendedor@freshlink.com',
    phone: '(11) 99999-9999',
    whatsappNumber: '(11) 99999-9999',
    businessType: 'organic_producer',
    description: 'Há mais de 20 anos cultivamos alimentos orgânicos com muito carinho e dedicação.',
    
    // Location
    address: 'Rua das Flores, 123',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01234-567',
    
    // Operating Hours
    operatingHours: {
      monday: { isOpen: true, openTime: '06:00', closeTime: '18:00' },
      tuesday: { isOpen: true, openTime: '06:00', closeTime: '18:00' },
      wednesday: { isOpen: true, openTime: '06:00', closeTime: '18:00' },
      thursday: { isOpen: true, openTime: '06:00', closeTime: '18:00' },
      friday: { isOpen: true, openTime: '06:00', closeTime: '18:00' },
      saturday: { isOpen: true, openTime: '06:00', closeTime: '16:00' },
      sunday: { isOpen: false, openTime: '', closeTime: '' }
    },
    
    // Business Settings
    deliveryAvailable: true,
    deliveryRadius: '5',
    deliveryFee: '8.00',
    pickupAvailable: true,
    paymentMethods: ['cash', 'pix', 'card'],
    
    // Profile Image
    profileImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=300&fit=crop'
  });

  const businessTypes = [
    { value: 'farmer', label: 'Produtor Rural' },
    { value: 'market_vendor', label: 'Vendedor de Feira' },
    { value: 'organic_producer', label: 'Produtor Orgânico' },
    { value: 'cooperative', label: 'Cooperativa' },
    { value: 'small_business', label: 'Pequeno Negócio' },
    { value: 'other', label: 'Outro' }
  ];

  const daysOfWeek = [
    { id: 'monday', label: 'Segunda-feira' },
    { id: 'tuesday', label: 'Terça-feira' },
    { id: 'wednesday', label: 'Quarta-feira' },
    { id: 'thursday', label: 'Quinta-feira' },
    { id: 'friday', label: 'Sexta-feira' },
    { id: 'saturday', label: 'Sábado' },
    { id: 'sunday', label: 'Domingo' }
  ];

  const timeOptions = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      timeOptions.push({ value: time, label: time });
    }
  }

  const tabs = [
    { id: 'basic', label: 'Informações Básicas', icon: 'User' },
    { id: 'location', label: 'Localização', icon: 'MapPin' },
    { id: 'hours', label: 'Horários', icon: 'Clock' },
    { id: 'business', label: 'Configurações', icon: 'Settings' }
  ];

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleOperatingHoursChange = (day, field, value) => {
    setProfileData(prev => ({
      ...prev,
      operatingHours: {
        ...prev.operatingHours,
        [day]: {
          ...prev.operatingHours[day],
          [field]: value
        }
      }
    }));
  };

  const handlePaymentMethodChange = (method, checked) => {
    setProfileData(prev => ({
      ...prev,
      paymentMethods: checked 
        ? [...prev.paymentMethods, method]
        : prev.paymentMethods.filter(m => m !== method)
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsEditing(false);
      alert('Perfil atualizado com sucesso!');
    } catch (error) {
      alert('Erro ao salvar perfil. Tente novamente.');
    } finally {
      setIsSaving(false);
    }
  };

  const formatPrice = (value) => {
    const numericValue = value.replace(/\D/g, '');
    const formattedValue = (parseInt(numericValue) / 100).toFixed(2);
    return formattedValue.replace('.', ',');
  };

  const renderBasicInfo = () => (
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
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
              <Icon name="Camera" size={16} />
            </button>
          )}
        </div>
        <div>
          <h3 className="font-body font-medium text-foreground mb-1">Foto do Perfil</h3>
          <p className="text-sm text-muted-foreground">
            Uma boa foto ajuda os clientes a conhecer seu negócio
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Nome do Negócio"
          value={profileData.businessName}
          onChange={(e) => handleInputChange('businessName', e.target.value)}
          disabled={!isEditing}
          required
        />

        <Input
          label="Email"
          type="email"
          value={profileData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          disabled={!isEditing}
          required
        />

        <Input
          label="Telefone"
          value={profileData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          disabled={!isEditing}
          required
        />

        <Input
          label="WhatsApp"
          value={profileData.whatsappNumber}
          onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
          disabled={!isEditing}
          required
        />
      </div>

      <Select
        label="Tipo de Negócio"
        options={businessTypes}
        value={profileData.businessType}
        onChange={(value) => handleInputChange('businessType', value)}
        disabled={!isEditing}
      />

      <div>
        <label className="block text-sm font-body font-medium text-foreground mb-2">
          Descrição do Negócio
        </label>
        <textarea
          value={profileData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          disabled={!isEditing}
          rows={4}
          className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>
    </div>
  );

  const renderLocation = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <Input
            label="Endereço Completo"
            value={profileData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            disabled={!isEditing}
            required
          />
        </div>

        <Input
          label="Cidade"
          value={profileData.city}
          onChange={(e) => handleInputChange('city', e.target.value)}
          disabled={!isEditing}
          required
        />

        <Input
          label="Estado"
          value={profileData.state}
          onChange={(e) => handleInputChange('state', e.target.value)}
          disabled={!isEditing}
          required
        />

        <Input
          label="CEP"
          value={profileData.zipCode}
          onChange={(e) => handleInputChange('zipCode', e.target.value)}
          disabled={!isEditing}
          required
        />
      </div>

      {/* Map Preview */}
      <div>
        <label className="block text-sm font-body font-medium text-foreground mb-2">
          Localização no Mapa
        </label>
        <div className="w-full h-64 bg-muted rounded-lg border border-border overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="Localização do negócio"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=-23.5505,-46.6333&z=14&output=embed"
            className="border-0"
          />
        </div>
      </div>
    </div>
  );

  const renderOperatingHours = () => (
    <div className="space-y-6">
      {daysOfWeek.map(day => {
        const dayData = profileData.operatingHours[day.id] || {};
        const isOpen = dayData.isOpen || false;

        return (
          <div key={day.id} className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <Checkbox
                label={day.label}
                checked={isOpen}
                onChange={(e) => handleOperatingHoursChange(day.id, 'isOpen', e.target.checked)}
                disabled={!isEditing}
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
                <Select
                  label="Abertura"
                  options={timeOptions}
                  value={dayData.openTime || ''}
                  onChange={(value) => handleOperatingHoursChange(day.id, 'openTime', value)}
                  disabled={!isEditing}
                  searchable
                />
                <Select
                  label="Fechamento"
                  options={timeOptions}
                  value={dayData.closeTime || ''}
                  onChange={(value) => handleOperatingHoursChange(day.id, 'closeTime', value)}
                  disabled={!isEditing}
                  searchable
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  const renderBusinessSettings = () => (
    <div className="space-y-6">
      {/* Delivery Settings */}
      <div className="border border-border rounded-lg p-4">
        <h3 className="font-body font-medium text-foreground mb-4">Entrega</h3>
        
        <div className="space-y-4">
          <Checkbox
            label="Ofereço entrega"
            checked={profileData.deliveryAvailable}
            onChange={(e) => handleInputChange('deliveryAvailable', e.target.checked)}
            disabled={!isEditing}
          />

          {profileData.deliveryAvailable && (
            <div className="grid grid-cols-2 gap-4 ml-6">
              <Input
                label="Raio de Entrega (km)"
                type="number"
                value={profileData.deliveryRadius}
                onChange={(e) => handleInputChange('deliveryRadius', e.target.value)}
                disabled={!isEditing}
              />
              <Input
                label="Taxa de Entrega (R$)"
                value={profileData.deliveryFee}
                onChange={(e) => handleInputChange('deliveryFee', formatPrice(e.target.value))}
                disabled={!isEditing}
              />
            </div>
          )}
        </div>
      </div>

      {/* Pickup Settings */}
      <div className="border border-border rounded-lg p-4">
        <h3 className="font-body font-medium text-foreground mb-4">Retirada</h3>
        
        <Checkbox
          label="Permito retirada no local"
          checked={profileData.pickupAvailable}
          onChange={(e) => handleInputChange('pickupAvailable', e.target.checked)}
          disabled={!isEditing}
        />
      </div>

      {/* Payment Methods */}
      <div className="border border-border rounded-lg p-4">
        <h3 className="font-body font-medium text-foreground mb-4">Formas de Pagamento</h3>
        
        <div className="space-y-3">
          <Checkbox
            label="Dinheiro"
            checked={profileData.paymentMethods.includes('cash')}
            onChange={(e) => handlePaymentMethodChange('cash', e.target.checked)}
            disabled={!isEditing}
          />
          <Checkbox
            label="PIX"
            checked={profileData.paymentMethods.includes('pix')}
            onChange={(e) => handlePaymentMethodChange('pix', e.target.checked)}
            disabled={!isEditing}
          />
          <Checkbox
            label="Cartão"
            checked={profileData.paymentMethods.includes('card')}
            onChange={(e) => handlePaymentMethodChange('card', e.target.checked)}
            disabled={!isEditing}
          />
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return renderBasicInfo();
      case 'location':
        return renderLocation();
      case 'hours':
        return renderOperatingHours();
      case 'business':
        return renderBusinessSettings();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <VendorSidebarNavigation />
      
      <div className="md:ml-64 pt-16 md:pt-0">
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-heading font-bold text-2xl text-foreground">
                Meu Perfil
              </h1>
              <p className="text-muted-foreground mt-1">
                Gerencie as informações do seu negócio
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              {isEditing ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(false)}
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
                    Salvar Alterações
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

          {/* Tab Navigation */}
          <div className="bg-card border border-border rounded-lg overflow-hidden mb-6">
            <div className="flex overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 text-sm font-body font-medium whitespace-nowrap border-b-2 transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'text-primary border-primary bg-primary/5'
                      : 'text-muted-foreground border-transparent hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={tab.icon} size={16} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-card border border-border rounded-lg p-6">
            {renderTabContent()}
          </div>

          {/* Mobile Bottom Padding */}
          <div className="h-20 md:hidden" />
        </div>
      </div>
    </div>
  );
};

export default VendorProfile;