import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import RegistrationHeader from './components/RegistrationHeader';
import ProgressIndicator from './components/ProgressIndicator';
import AccountStep from './components/AccountStep';
import BusinessStep from './components/BusinessStep';
import LocationStep from './components/LocationStep';
import OperatingHoursStep from './components/OperatingHoursStep';
import SuccessModal from './components/SuccessModal';

const VendorRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    // Account data
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
    
    // Business data
    businessName: '',
    businessType: '',
    whatsappNumber: '',
    businessDescription: '',
    
    // Location data
    address: '',
    city: '',
    state: '',
    zipCode: '',
    latitude: null,
    longitude: null,
    
    // Operating hours data
    operatingHours: {}
  });

  const totalSteps = 4;

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    // Simulate registration process
    console.log('Registration completed:', formData);
    setShowSuccessModal(true);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <AccountStep
            formData={formData}
            setFormData={setFormData}
            onNext={handleNextStep}
          />
        );
      case 2:
        return (
          <BusinessStep
            formData={formData}
            setFormData={setFormData}
            onNext={handleNextStep}
            onBack={handlePreviousStep}
          />
        );
      case 3:
        return (
          <LocationStep
            formData={formData}
            setFormData={setFormData}
            onNext={handleNextStep}
            onBack={handlePreviousStep}
          />
        );
      case 4:
        return (
          <OperatingHoursStep
            formData={formData}
            setFormData={setFormData}
            onNext={handleNextStep}
            onBack={handlePreviousStep}
            onComplete={handleComplete}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Cadastro de Vendedor - FreshLink</title>
        <meta name="description" content="Cadastre-se como vendedor no FreshLink e comece a vender seus produtos frescos online para clientes locais." />
        <meta name="keywords" content="cadastro vendedor, marketplace, produtos frescos, venda online" />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <RegistrationHeader />
        
        <main className="container mx-auto px-4 py-8 flex-1">
          <div className="max-w-2xl mx-auto">
            <ProgressIndicator 
              currentStep={currentStep} 
              totalSteps={totalSteps} 
            />
            
            <div className="bg-card rounded-xl shadow-sm border border-border p-6 md:p-8 auth-form animate-step-transition">
              {renderCurrentStep()}
            </div>
          </div>
        </main>

        <SuccessModal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          formData={formData}
        />
      </div>
    </>
  );
};

export default VendorRegistration;