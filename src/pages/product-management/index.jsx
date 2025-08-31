import React, { useState, useEffect } from 'react';
import VendorSidebarNavigation from '../../components/ui/VendorSidebarNavigation';
import ConfirmModal from '../../components/ui/ConfirmModal';
import ProductCard from './components/ProductCard';
import ProductForm from './components/ProductForm';
import BulkActions from './components/BulkActions';
import ProductFilters from './components/ProductFilters';
import EmptyState from './components/EmptyState';

import Button from '../../components/ui/Button';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    stock: '',
    visibility: '',
    sort: 'name'
  });

  // Mock data
  useEffect(() => {
    const mockProducts = [
      {
        id: 1,
        name: "Tomates Orgânicos",
        description: "Tomates frescos cultivados sem agrotóxicos, direto da nossa horta familiar. Ideais para saladas e molhos caseiros.",
        category: "organicos",
        price: 8.50,
        stock: 25,
        images: [
          "https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=500",
          "https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=500"
        ],
        isVisible: true,
        isSeasonal: false,
        views: 156,
        inquiries: 23,
        customTags: ["orgânico", "sem agrotóxico"]
      },
      {
        id: 2,
        name: "Alface Crespa",
        description: "Alface fresca colhida pela manhã, crocante e saborosa. Perfeita para saladas nutritivas.",
        category: "verduras",
        price: 3.00,
        stock: 40,
        images: [
          "https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&w=500"
        ],
        isVisible: true,
        isSeasonal: false,
        views: 89,
        inquiries: 12,
        customTags: ["fresco", "hidropônico"]
      },
      {
        id: 3,
        name: "Bananas Prata",
        description: "Bananas doces e maduras, ricas em potássio. Colhidas no ponto ideal de maturação.",
        category: "frutas",
        price: 4.50,
        stock: 0,
        images: [
          "https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=500"
        ],
        isVisible: false,
        isSeasonal: false,
        views: 234,
        inquiries: 45,
        customTags: ["doce", "natural"]
      },
      {
        id: 4,
        name: "Cenouras Baby",
        description: "Cenouras pequenas e doces, ideais para lanches saudáveis e pratos gourmet.",
        category: "legumes",
        price: 6.00,
        stock: 3,
        images: [
          "https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=500"
        ],
        isVisible: true,
        isSeasonal: true,
        views: 67,
        inquiries: 8,
        customTags: ["baby", "gourmet"]
      },
      {
        id: 5,
        name: "Manjericão Fresco",
        description: "Manjericão aromático cultivado em estufa. Perfeito para temperar pratos italianos e fazer pesto.",
        category: "temperos",
        price: 5.50,
        stock: 15,
        images: [
          "https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg?auto=compress&cs=tinysrgb&w=500"
        ],
        isVisible: true,
        isSeasonal: false,
        views: 123,
        inquiries: 19,
        customTags: ["aromático", "italiano"]
      }
    ];

    setProducts(mockProducts);
  }, []);

  const filteredProducts = products?.filter(product => {
    // Search filter
    if (filters?.search && !product?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase())) {
      return false;
    }

    // Category filter
    if (filters?.category && product?.category !== filters?.category) {
      return false;
    }

    // Stock filter
    if (filters?.stock) {
      if (filters?.stock === 'available' && product?.stock === 0) return false;
      if (filters?.stock === 'low' && (product?.stock === 0 || product?.stock > 5)) return false;
      if (filters?.stock === 'out' && product?.stock > 0) return false;
    }

    // Visibility filter
    if (filters?.visibility) {
      if (filters?.visibility === 'visible' && !product?.isVisible) return false;
      if (filters?.visibility === 'hidden' && product?.isVisible) return false;
    }

    return true;
  })?.sort((a, b) => {
    switch (filters?.sort) {
      case 'name':
        return a?.name?.localeCompare(b?.name);
      case 'name_desc':
        return b?.name?.localeCompare(a?.name);
      case 'price':
        return a?.price - b?.price;
      case 'price_desc':
        return b?.price - a?.price;
      case 'stock':
        return b?.stock - a?.stock;
      case 'views':
        return b?.views - a?.views;
      case 'created':
        return b?.id - a?.id;
      default:
        return 0;
    }
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      category: '',
      stock: '',
      visibility: '',
      sort: 'name'
    });
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowProductForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      // Update existing product
      setProducts(prev => prev?.map(p => 
        p?.id === editingProduct?.id ? { ...productData, id: editingProduct?.id } : p
      ));
    } else {
      // Add new product
      setProducts(prev => [...prev, { ...productData, views: 0, inquiries: 0 }]);
    }
    setShowProductForm(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId) => {
    setProductToDelete(productId);
    setShowDeleteModal(true);
  };

  const confirmDeleteProduct = () => {
    setProducts(prev => prev?.filter(p => p?.id !== productToDelete));
    setSelectedProducts(prev => prev?.filter(id => id !== productToDelete));
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const handleDuplicateProduct = (product) => {
    const duplicatedProduct = {
      ...product,
      id: Date.now(),
      name: `${product?.name} (Cópia)`,
      views: 0,
      inquiries: 0
    };
    setProducts(prev => [...prev, duplicatedProduct]);
  };

  const handleToggleVisibility = (productId) => {
    setProducts(prev => prev?.map(p => 
      p?.id === productId ? { ...p, isVisible: !p?.isVisible } : p
    ));
  };

  const handleProductSelection = (productId, isSelected) => {
    if (isSelected) {
      setSelectedProducts(prev => [...prev, productId]);
    } else {
      setSelectedProducts(prev => prev?.filter(id => id !== productId));
    }
  };

  const handleSelectAll = () => {
    if (selectedProducts?.length === filteredProducts?.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts?.map(p => p?.id));
    }
  };

  const handleBulkUpdate = (productIds, updates) => {
    if (updates?.delete) {
      if (window.confirm(`Tem certeza que deseja excluir ${productIds?.length} produto(s)?`)) {
        setProducts(prev => prev?.filter(p => !productIds?.includes(p?.id)));
        setSelectedProducts([]);
      }
    } else {
      setProducts(prev => prev?.map(p => 
        productIds?.includes(p?.id) ? { ...p, ...updates } : p
      ));
      setSelectedProducts([]);
    }
  };

  const hasActiveFilters = filters?.search || filters?.category || filters?.stock || filters?.visibility;

  return (
    <div className="min-h-screen bg-background">
      <VendorSidebarNavigation />
      {/* Main Content */}
      <div className="md:ml-64 pt-16 md:pt-0">
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-heading font-bold text-2xl text-foreground">
                Meus Produtos
              </h1>
              <p className="text-muted-foreground mt-1">
                Gerencie seu catálogo de produtos frescos
              </p>
            </div>
            <Button
              onClick={handleAddProduct}
              iconName="Plus"
              iconPosition="left"
              size="lg"
            >
              Adicionar Produto
            </Button>
          </div>

          {/* Product Form Modal */}
          {showProductForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
              <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-scale-in">
                <ProductForm
                  product={editingProduct}
                  onSave={handleSaveProduct}
                  onCancel={() => {
                    setShowProductForm(false);
                    setEditingProduct(null);
                  }}
                  isEditing={!!editingProduct}
                />
              </div>
            </div>
          )}

          {/* Delete Confirmation Modal */}
          <ConfirmModal
            isOpen={showDeleteModal}
            onClose={() => {
              setShowDeleteModal(false);
              setProductToDelete(null);
            }}
            onConfirm={confirmDeleteProduct}
            title="Excluir Produto"
            message="Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita."
            confirmText="Excluir"
            cancelText="Cancelar"
            variant="destructive"
            icon="Trash2"
          />

          {/* Bulk Actions */}
          <BulkActions
            selectedProducts={selectedProducts}
            onBulkUpdate={handleBulkUpdate}
            onClearSelection={() => setSelectedProducts([])}
          />

          {/* Filters */}
          <ProductFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            productCount={filteredProducts?.length}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />

          {/* Select All - Desktop */}
          {filteredProducts?.length > 0 && (
            <div className="hidden md:flex items-center justify-between mb-4 p-3 bg-muted rounded-lg">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedProducts?.length === filteredProducts?.length}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <span className="text-sm font-body font-medium text-foreground">
                  Selecionar todos os produtos visíveis
                </span>
              </label>
              <div className="text-sm text-muted-foreground">
                {selectedProducts?.length} de {filteredProducts?.length} selecionados
              </div>
            </div>
          )}

          {/* Products Grid/List */}
          {filteredProducts?.length === 0 ? (
            <EmptyState
              onAddProduct={handleAddProduct}
              hasFilters={hasActiveFilters}
              onClearFilters={handleClearFilters}
            />
          ) : (
            <div className={
              viewMode === 'grid' ?'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' :'space-y-4'
            }>
              {filteredProducts?.map(product => (
                <div key={product?.id} className="relative">
                  {/* Selection Checkbox - Desktop */}
                  <div className="hidden md:block absolute top-3 left-3 z-10">
                    <input
                      type="checkbox"
                      checked={selectedProducts?.includes(product?.id)}
                      onChange={(e) => handleProductSelection(product?.id, e?.target?.checked)}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary bg-white/80 backdrop-blur-sm"
                    />
                  </div>
                  
                  <ProductCard
                    product={product}
                    onEdit={handleEditProduct}
                    onDelete={handleDeleteProduct}
                    onDuplicate={handleDuplicateProduct}
                    onToggleVisibility={handleToggleVisibility}
                    viewMode={viewMode}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Mobile Bottom Padding */}
          <div className="h-20 md:hidden" />
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;