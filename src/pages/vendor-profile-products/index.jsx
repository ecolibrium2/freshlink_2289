import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import ResponsiveHeader from '../../components/ui/ResponsiveHeader';
import Footer from '../../components/ui/Footer';
import ShareModal from '../../components/ui/ShareModal';
import ProductModal from '../../components/ui/ProductModal';
import VendorHeroSection from './components/VendorHeroSection';
import ProductCategoryFilter from './components/ProductCategoryFilter';
import TabNavigation from './components/TabNavigation';
import ProductGrid from './components/ProductGrid';
import VendorAboutSection from './components/VendorAboutSection';
import VendorReviewsSection from './components/VendorReviewsSection';
import StickyContactBar from './components/StickyContactBar';

const VendorProfileProducts = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);

  // Mock vendor data
  const vendorData = {
    id: "vendor-001",
    name: "Fazenda Orgânica São José",
    location: "Vila Madalena, São Paulo",
    distance: "2.3 km",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=300&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=400&fit=crop",
    rating: 4.8,
    reviewCount: 127,
    productCount: 24,
    operatingHours: {
      open: "06:00",
      close: "18:00"
    },
    phone: "(11) 99999-9999",
    email: "contato@fazendaorganica.com.br",
    fullAddress: "Rua das Flores, 123 - Vila Madalena, São Paulo - SP",
    story: `Há mais de 20 anos cultivamos alimentos orgânicos com muito carinho e dedicação. Nossa fazenda familiar começou pequena, mas cresceu com o apoio da comunidade local. Hoje, oferecemos uma variedade de produtos frescos, cultivados sem agrotóxicos e com práticas sustentáveis.\n\nAcreditamos que alimentação saudável é um direito de todos, por isso trabalhamos para oferecer produtos de qualidade a preços justos. Cada produto que chega à sua mesa carrega o amor e cuidado de nossa família.`,
    certifications: [
      {
        name: "Certificação Orgânica IBD",
        issuer: "Instituto Biodinâmico"
      },
      {
        name: "Selo de Agricultura Familiar",
        issuer: "INCRA"
      }
    ],
    deliveryInfo: {
      available: true,
      radius: "5",
      fee: "R$ 8,00"
    },
    pickupInfo: {
      available: true,
      address: "Rua das Flores, 123 - Vila Madalena"
    },
    paymentMethods: [
      { name: "Dinheiro", icon: "Banknote" },
      { name: "PIX", icon: "Smartphone" },
      { name: "Cartão", icon: "CreditCard" }
    ]
  };

  // Mock product categories
  const categories = [
    { id: "frutas", name: "Frutas" },
    { id: "verduras", name: "Verduras" },
    { id: "legumes", name: "Legumes" },
    { id: "temperos", name: "Temperos" }
  ];

  // Mock products data
  const allProducts = [
    {
      id: "prod-001",
      name: "Tomate Orgânico",
      category: "legumes",
      price: 8.50,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1546470427-e5ac89c8ba37?w=300&h=300&fit=crop",
      available: true,
      isOrganic: true,
      rating: 4.8,
      reviewCount: 23,
      categories: ["Orgânicos", "Legumes"],
      discount: 15,
      originalPrice: 10.00
    },
    {
      id: "prod-002",
      name: "Alface Crespa",
      category: "verduras",
      price: 3.00,
      unit: "maço",
      image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=300&h=300&fit=crop",
      available: true,
      isOrganic: true,
      rating: 4.6,
      reviewCount: 18,
      categories: ["Orgânicos", "Verduras"]
    },
    {
      id: "prod-003",
      name: "Banana Prata",
      category: "frutas",
      price: 6.90,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=300&fit=crop",
      available: true,
      isOrganic: false,
      rating: 4.5,
      reviewCount: 34,
      categories: ["Frutas", "Natural"]
    },
    {
      id: "prod-004",
      name: "Cenoura Orgânica",
      category: "legumes",
      price: 5.50,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=300&h=300&fit=crop",
      available: false,
      isOrganic: true,
      rating: 4.7,
      reviewCount: 29,
      categories: ["Orgânicos", "Legumes"]
    },
    {
      id: "prod-005",
      name: "Manjericão",
      category: "temperos",
      price: 2.50,
      unit: "maço",
      image: "https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=300&h=300&fit=crop",
      available: true,
      isOrganic: true,
      rating: 4.9,
      reviewCount: 15,
      categories: ["Orgânicos", "Temperos"]
    },
    {
      id: "prod-006",
      name: "Maçã Fuji",
      category: "frutas",
      price: 9.90,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=300&fit=crop",
      available: true,
      isOrganic: false,
      rating: 4.4,
      reviewCount: 41,
      categories: ["Frutas", "Doces"]
    },
    {
      id: "prod-007",
      name: "Rúcula",
      category: "verduras",
      price: 4.00,
      unit: "maço",
      image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300&h=300&fit=crop",
      available: true,
      isOrganic: true,
      rating: 4.6,
      reviewCount: 22,
      categories: ["Orgânicos", "Verduras"]
    },
    {
      id: "prod-008",
      name: "Abóbora Cabotiá",
      category: "legumes",
      price: 4.20,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=300&h=300&fit=crop",
      available: true,
      isOrganic: true,
      rating: 4.3,
      reviewCount: 8,
      categories: ["Orgânicos", "Legumes"]
    }
  ];

  // Mock reviews data
  const reviewsData = [
    {
      id: "review-001",
      customerName: "Maria Silva",
      customerAvatar: "https://randomuser.me/api/portraits/women/1.jpg",
      rating: 5,
      date: "2024-08-20",
      comment: "Produtos fresquíssimos e de excelente qualidade! A entrega foi rápida e o atendimento muito cordial. Recomendo demais!",
      vendorResponse: {
        date: "2024-08-21",
        message: "Muito obrigado, Maria! Ficamos felizes em saber que gostou dos nossos produtos. Esperamos vê-la novamente em breve!"
      }
    },
    {
      id: "review-002",
      customerName: "João Santos",
      customerAvatar: "https://randomuser.me/api/portraits/men/2.jpg",
      rating: 4,
      date: "2024-08-18",
      comment: "Ótima variedade de produtos orgânicos. Os preços são justos e a qualidade é muito boa. Só achei que poderia ter mais opções de frutas.",
      vendorResponse: null
    },
    {
      id: "review-003",
      customerName: "Ana Costa",
      customerAvatar: "https://randomuser.me/api/portraits/women/3.jpg",
      rating: 5,
      date: "2024-08-15",
      comment: "Compro aqui há meses e nunca me decepcionei. Os vegetais são sempre frescos e o atendimento é excepcional. Parabéns pelo trabalho!",
      vendorResponse: {
        date: "2024-08-16",
        message: "Ana, muito obrigado pela fidelidade e pelas palavras carinhosas! É um prazer atendê-la sempre."
      }
    }
  ];

  // Filter products based on active category
  useEffect(() => {
    // Load favorite products from localStorage
    const savedFavorites = JSON.parse(localStorage.getItem('favoriteProducts') || '[]');
    setFavoriteProducts(savedFavorites);

    if (activeCategory === 'all') {
      setFilteredProducts(allProducts);
    } else {
      setFilteredProducts(allProducts?.filter(product => product?.category === activeCategory));
    }
  }, [activeCategory]);

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(`Olá! Vi seu perfil no FreshLink e gostaria de saber mais sobre seus produtos.`);
    const whatsappUrl = `https://wa.me/5511999999999?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleDirections = () => {
    const address = encodeURIComponent(vendorData?.fullAddress);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${address}`;
    window.open(mapsUrl, '_blank');
  };

  const handleProductInquiry = (product) => {
    const message = encodeURIComponent(`Olá! Tenho interesse no produto: ${product?.name} (${product?.unit}). Está disponível?`);
    const whatsappUrl = `https://wa.me/5511999999999?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleProductClick = (product) => {
    setSelectedProduct({ ...product, vendor: vendorData });
    setShowProductModal(true);
  };

  const handleFavoriteToggle = (productId) => {
    const updatedFavorites = favoriteProducts.includes(productId)
      ? favoriteProducts.filter(id => id !== productId)
      : [...favoriteProducts, productId];
    
    setFavoriteProducts(updatedFavorites);
    localStorage.setItem('favoriteProducts', JSON.stringify(updatedFavorites));
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const averageRating = reviewsData?.reduce((acc, review) => acc + review?.rating, 0) / reviewsData?.length;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'products':
        return (
          <div className="space-y-6">
            <ProductCategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
            <div className="container mx-auto px-4 pb-20 md:pb-6">
              <ProductGrid
                products={filteredProducts}
                vendor={vendorData}
                onFavoriteToggle={handleFavoriteToggle}
                favoriteProducts={favoriteProducts}
              />
            </div>
          </div>
        );
      case 'about':
        return (
          <div className="container mx-auto px-4 py-6 pb-20 md:pb-6">
            <VendorAboutSection vendor={vendorData} />
          </div>
        );
      case 'reviews':
        return (
          <div className="container mx-auto px-4 py-6 pb-20 md:pb-6">
            <VendorReviewsSection
              reviews={reviewsData}
              averageRating={averageRating}
              totalReviews={reviewsData?.length}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>{vendorData?.name} - Produtos Frescos | FreshLink</title>
        <meta name="description" content={`Confira os produtos frescos da ${vendorData?.name} em ${vendorData?.location}. Entrega local disponível.`} />
        <meta name="keywords" content="produtos orgânicos, frutas, verduras, legumes, entrega local, São Paulo" />
        <meta property="og:title" content={`${vendorData?.name} - FreshLink`} />
        <meta property="og:description" content={`Produtos frescos e orgânicos da ${vendorData?.name}`} />
        <meta property="og:image" content={vendorData?.image} />
        <meta property="og:type" content="business.business" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": vendorData?.name,
            "image": vendorData?.image,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Rua das Flores, 123",
              "addressLocality": "São Paulo",
              "addressRegion": "SP",
              "addressCountry": "BR"
            },
            "telephone": vendorData?.phone,
            "email": vendorData?.email,
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": averageRating,
              "reviewCount": reviewsData?.length
            },
            "openingHours": "Mo-Su 06:00-18:00"
          })}
        </script>
      </Helmet>
      
      <ResponsiveHeader />
      
      <VendorHeroSection
        vendor={vendorData}
        onWhatsAppContact={handleWhatsAppContact}
        onDirections={handleDirections}
        onShare={handleShare}
      />
      <TabNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        productCount={allProducts?.length}
        reviewCount={reviewsData?.length}
      />
      {renderTabContent()}
      <StickyContactBar
        vendor={vendorData}
        onWhatsAppContact={handleWhatsAppContact}
        onDirections={handleDirections}
      />

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        vendor={vendorData}
      />

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        vendor={selectedProduct?.vendor}
        isOpen={showProductModal}
        onClose={() => {
          setShowProductModal(false);
          setSelectedProduct(null);
        }}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default VendorProfileProducts;