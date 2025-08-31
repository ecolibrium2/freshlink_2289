import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ProductForm = ({ product, onSave, onCancel, isEditing = false }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    category: product?.category || '',
    unit: product?.unit || 'kg',
    price: product?.price || '',
    stock: product?.stock || '',
    images: product?.images || [],
    isVisible: product?.isVisible ?? true,
    isSeasonal: product?.isSeasonal || false,
    customTags: product?.customTags || []
  });

  const [errors, setErrors] = useState({});
  const [dragActive, setDragActive] = useState(false);
  const [currentSection, setCurrentSection] = useState('basic');
  const fileInputRef = useRef(null);

  const categoryOptions = [
    { value: 'frutas', label: 'Frutas' },
    { value: 'verduras', label: 'Verduras' },
    { value: 'legumes', label: 'Legumes' },
    { value: 'organicos', label: 'Orgânicos' },
    { value: 'temperos', label: 'Temperos e Ervas' },
    { value: 'graos', label: 'Grãos e Cereais' },
    { value: 'laticinios', label: 'Laticínios' },
    { value: 'outros', label: 'Outros' }
  ];

  const unitOptions = [
    { value: 'kg', label: 'Quilograma (kg)' },
    { value: 'g', label: 'Grama (g)' },
    { value: 'unidade', label: 'Unidade' },
    { value: 'maço', label: 'Maço' },
    { value: 'dúzia', label: 'Dúzia' },
    { value: 'litro', label: 'Litro (L)' },
    { value: 'ml', label: 'Mililitro (ml)' },
    { value: 'pacote', label: 'Pacote' },
    { value: 'caixa', label: 'Caixa' },
    { value: 'bandeja', label: 'Bandeja' }
  ];

  const sections = [
    { id: 'basic', label: 'Informações Básicas', icon: 'Info' },
    { id: 'pricing', label: 'Preços', icon: 'DollarSign' },
    { id: 'photos', label: 'Fotos', icon: 'Camera' },
    { id: 'availability', label: 'Disponibilidade', icon: 'Package' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleImageUpload = (files) => {
    const newImages = Array.from(files)?.map(file => ({
      id: Date.now() + Math.random(),
      file,
      url: URL.createObjectURL(file),
      name: file?.name
    }));

    setFormData(prev => ({
      ...prev,
      images: [...prev?.images, ...newImages]
    }));
  };

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === 'dragenter' || e?.type === 'dragover') {
      setDragActive(true);
    } else if (e?.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleImageUpload(e?.dataTransfer?.files);
    }
  };

  const removeImage = (imageId) => {
    setFormData(prev => ({
      ...prev,
      images: prev?.images?.filter(img => img?.id !== imageId)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Nome do produto é obrigatório';
    }

    if (!formData?.category) {
      newErrors.category = 'Categoria é obrigatória';
    }

    if (!formData?.price || formData?.price <= 0) {
      newErrors.price = 'Preço deve ser maior que zero';
    }

    if (!formData?.stock || formData?.stock < 0) {
      newErrors.stock = 'Quantidade em estoque é obrigatória';
    }

    if (formData?.images?.length === 0) {
      newErrors.images = 'Pelo menos uma foto é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (validateForm()) {
      onSave({
        ...formData,
        price: parseFloat(formData?.price),
        stock: parseInt(formData?.stock),
        id: product?.id || Date.now()
      });
    }
  };

  const formatPrice = (value) => {
    const numericValue = value?.replace(/\D/g, '');
    const formattedValue = (parseInt(numericValue) / 100)?.toFixed(2);
    return formattedValue?.replace('.', ',');
  };

  const renderBasicInfo = () => (
    <div className="space-y-6">
      <Input
        label="Nome do Produto"
        type="text"
        placeholder="Ex: Tomates orgânicos"
        value={formData?.name}
        onChange={(e) => handleInputChange('name', e?.target?.value)}
        error={errors?.name}
        required
      />

      <div>
        <label className="block text-sm font-body font-medium text-foreground mb-2">
          Descrição
        </label>
        <textarea
          placeholder="Descreva seu produto, origem, características especiais..."
          value={formData?.description}
          onChange={(e) => handleInputChange('description', e?.target?.value)}
          rows={4}
          className="w-full px-3 py-2 border border-border rounded-lg text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
        />
      </div>

      <Select
        label="Categoria"
        placeholder="Selecione uma categoria"
        options={categoryOptions}
        value={formData?.category}
        onChange={(value) => handleInputChange('category', value)}
        error={errors?.category}
        required
      />

      <Select
        label="Unidade de Medida"
        placeholder="Selecione a unidade"
        options={unitOptions}
        value={formData?.unit}
        onChange={(value) => handleInputChange('unit', value)}
        required
      />
    </div>
  );

  const renderPricing = () => (
    <div className="space-y-6">
      <Input
        label="Preço por Unidade/Kg"
        type="text"
        placeholder="0,00"
        value={formData?.price}
        onChange={(e) => {
          const formatted = formatPrice(e?.target?.value);
          handleInputChange('price', formatted);
        }}
        error={errors?.price}
        required
        description="Preço em reais (R$)"
      />

      <div className="bg-muted rounded-lg p-4">
        <h4 className="font-body font-medium text-foreground mb-2">
          Dicas de Precificação
        </h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Pesquise preços de concorrentes locais</li>
          <li>• Considere custos de produção e transporte</li>
          <li>• Produtos orgânicos podem ter preço premium</li>
        </ul>
      </div>
    </div>
  );

  const renderPhotos = () => (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
          dragActive
            ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Icon name="Upload" size={48} className="mx-auto text-muted-foreground mb-4" />
        <h3 className="font-body font-medium text-foreground mb-2">
          Adicionar Fotos do Produto
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Arraste e solte suas fotos aqui ou clique para selecionar
        </p>
        <Button
          variant="outline"
          onClick={() => fileInputRef?.current?.click()}
          iconName="Camera"
          iconPosition="left"
        >
          Selecionar Fotos
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleImageUpload(e?.target?.files)}
          className="hidden"
        />
      </div>

      {errors?.images && (
        <p className="text-sm text-error">{errors?.images}</p>
      )}

      {/* Image Preview */}
      {formData?.images?.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {formData?.images?.map((image, index) => (
            <div key={image?.id} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden">
                <Image
                  src={image?.url || image}
                  alt={`Produto ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={() => removeImage(image?.id)}
                className="absolute top-2 right-2 p-1 bg-error text-error-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <Icon name="X" size={16} />
              </button>
              {index === 0 && (
                <div className="absolute bottom-2 left-2 px-2 py-1 bg-primary text-primary-foreground text-xs rounded">
                  Principal
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderAvailability = () => (
    <div className="space-y-6">
      <Input
        label="Quantidade em Estoque"
        type="number"
        placeholder="0"
        value={formData?.stock}
        onChange={(e) => handleInputChange('stock', e?.target?.value)}
        error={errors?.stock}
        required
        description="Quantidade disponível para venda"
      />

      <div className="space-y-4">
        <Checkbox
          label="Produto sazonal"
          description="Marque se este produto tem disponibilidade limitada por época do ano"
          checked={formData?.isSeasonal}
          onChange={(e) => handleInputChange('isSeasonal', e?.target?.checked)}
        />

        <Checkbox
          label="Produto visível"
          description="Desmarque para ocultar temporariamente este produto"
          checked={formData?.isVisible}
          onChange={(e) => handleInputChange('isVisible', e?.target?.checked)}
        />
      </div>
    </div>
  );

  const renderSectionContent = () => {
    switch (currentSection) {
      case 'basic':
        return renderBasicInfo();
      case 'pricing':
        return renderPricing();
      case 'photos':
        return renderPhotos();
      case 'availability':
        return renderAvailability();
      default:
        return renderBasicInfo();
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-semibold text-xl text-foreground">
            {isEditing ? 'Editar Produto' : 'Adicionar Produto'}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onCancel}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>
      </div>
      {/* Section Navigation - Desktop */}
      <div className="hidden md:flex border-b border-border">
        {sections?.map((section) => (
          <button
            key={section?.id}
            onClick={() => setCurrentSection(section?.id)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-body font-medium transition-colors duration-200 ${
              currentSection === section?.id
                ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <Icon name={section?.icon} size={16} />
            <span>{section?.label}</span>
          </button>
        ))}
      </div>
      {/* Section Navigation - Mobile */}
      <div className="md:hidden px-4 py-3 border-b border-border">
        <Select
          options={sections?.map(section => ({
            value: section?.id,
            label: section?.label
          }))}
          value={currentSection}
          onChange={setCurrentSection}
          placeholder="Selecione uma seção"
        />
      </div>
      {/* Form Content */}
      <form onSubmit={handleSubmit} className="p-6">
        {renderSectionContent()}

        {/* Actions */}
        <div className="flex items-center justify-end space-x-3 mt-8 pt-6 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="default"
            iconName="Save"
            iconPosition="left"
          >
            {isEditing ? 'Salvar Alterações' : 'Adicionar Produto'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;