import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import ResponsiveHeader from '../../components/ui/ResponsiveHeader';
import Footer from '../../components/ui/Footer';
import ShareModal from '../../components/ui/ShareModal';
import NutritionalInfoModal from '../../components/ui/NutritionalInfoModal';
import ProductReviewsSection from '../../components/ui/ProductReviewsSection';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';

const ProductDetails = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [product, setProduct] = useState(null);
    const [vendor, setVendor] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showShareModal, setShowShareModal] = useState(false);
    const [showNutritionalModal, setShowNutritionalModal] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [favoriteProducts, setFavoriteProducts] = useState([]);

    // Mock product data
    const mockProducts = [
        {
            id: 1,
            name: "Tomate Orgânico Premium",
            brand: "Fazenda Verde",
            rating: 4.8,
            reviewCount: 45,
            watchCount: 156,
            price: 8.50,
            originalPrice: 10.00,
            discount: 15,
            images: [
                "https://images.unsplash.com/photo-1546470427-e5ac89c8ba37?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1533280349977-2dc2608f4d62?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&h=600&fit=crop"
            ],
            description: "Tomates orgânicos premium cultivados sem agrotóxicos em nossa fazenda familiar. Estes tomates são colhidos no ponto ideal de maturação, garantindo sabor intenso e textura perfeita. Ideais para saladas, molhos caseiros e pratos gourmet. Cultivados com técnicas sustentáveis e certificação orgânica.",
            available: true,
            isOrganic: true,
            productType: "organic",
            category: "Legumes",
            stock: 25,
            unit: "kg",
            vendorId: 1,
            nutritionalInfo: {
                calories: "18 kcal por 100g",
                protein: 0.9,
                carbs: 3.9,
                fat: 0.2,
                fiber: 1.2,
                vitamins: ["Vitamina C", "Vitamina K", "Folato"],
                minerals: ["Potássio", "Licopeno"],
                benefits: [
                    "Rico em licopeno, um poderoso antioxidante",
                    "Fonte de vitamina C para fortalecer a imunidade",
                    "Baixo em calorias e rico em água",
                    "Contém folato, importante para a saúde cardiovascular"
                ]
            },
            harvestDate: "2024-01-15",
            shelfLife: "7-10 dias refrigerado"
        }
    ];

    // Mock related products
    const mockRelatedProducts = [
        {
            id: 2,
            name: "Tomate Cereja Orgânico",
            vendor: "Fazenda Verde",
            price: 12.50,
            unit: "bandeja",
            image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300&h=300&fit=crop",
            rating: 4.6,
            reviewCount: 18,
            available: true,
            isOrganic: true
        },
        {
            id: 3,
            name: "Manjericão Fresco",
            vendor: "Horta Urbana",
            price: 3.50,
            unit: "maço",
            image: "https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=300&h=300&fit=crop",
            rating: 4.9,
            reviewCount: 12,
            available: true,
            isOrganic: true
        },
        {
            id: 4,
            name: "Alface Orgânica",
            vendor: "Verde Vida",
            price: 4.20,
            unit: "unidade",
            image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=300&h=300&fit=crop",
            rating: 4.7,
            reviewCount: 25,
            available: true,
            isOrganic: true
        },
        {
            id: 5,
            name: "Rúcula Orgânica",
            vendor: "Fazenda Verde",
            price: 5.80,
            unit: "maço",
            image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300&h=300&fit=crop",
            rating: 4.5,
            reviewCount: 14,
            available: true,
            isOrganic: true
        }
    ];
    // Mock vendor data
    const mockVendor = {
        id: 1,
        name: "Fazenda Verde Orgânicos",
        image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=300&fit=crop",
        location: "Vila Madalena, São Paulo",
        distance: "2.3 km",
        phone: "11999999999",
        rating: 4.8,
        reviewCount: 127,
        productCount: 24,
        description: "Fazenda familiar especializada em produtos orgânicos há mais de 20 anos."
    };

    useEffect(() => {
        const loadProductDetails = async () => {
            setLoading(true);
            
            // Get product from location state or mock data
            const productFromState = location.state?.product;
            const vendorFromState = location.state?.vendor;
            
            if (productFromState) {
                setProduct(productFromState);
                setVendor(vendorFromState || mockVendor);
            } else {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 800));
                const foundProduct = mockProducts.find(p => p.id.toString() === productId);
                setProduct(foundProduct || mockProducts[0]);
                setVendor(mockVendor);
            }
            
            setLoading(false);
        };

        loadProductDetails();

        // Load favorites
        const savedFavorites = JSON.parse(localStorage.getItem('favoriteProducts') || '[]');
        setFavoriteProducts(savedFavorites);
    }, [productId, location.state]);

    const handleWhatsAppContact = () => {
        const message = encodeURIComponent(`Olá! Tenho interesse no produto: ${product.name}. Está disponível?`);
        const whatsappUrl = `https://wa.me/55${vendor?.phone}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleShare = () => {
        setShowShareModal(true);
    };

    const handleFavoriteToggle = () => {
        const updatedFavorites = favoriteProducts.includes(product.id)
            ? favoriteProducts.filter(id => id !== product.id)
            : [...favoriteProducts, product.id];
        
        setFavoriteProducts(updatedFavorites);
        localStorage.setItem('favoriteProducts', JSON.stringify(updatedFavorites));
    };

    const handleImageClick = () => {
        setShowImageModal(true);
    };

    const handleRelatedProductClick = (relatedProduct) => {
        navigate(`/product-details/${relatedProduct.id}`);
    };

    // Mock reviews data for the product
    const mockProductReviews = [
        {
            id: 1,
            customerName: "Maria Silva",
            customerAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
            rating: 5,
            date: "2024-01-20",
            comment: "Tomates incríveis! Muito saborosos e frescos. Chegaram no ponto perfeito de maturação."
        },
        {
            id: 2,
            customerName: "João Santos",
            customerAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
            rating: 4,
            date: "2024-01-18",
            comment: "Ótima qualidade, mas achei um pouco caro. Mesmo assim, vale a pena pela qualidade orgânica."
        },
        {
            id: 3,
            customerName: "Ana Costa",
            customerAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
            rating: 5,
            date: "2024-01-15",
            comment: "Perfeitos para fazer molho caseiro! Sabor intenso e textura ideal."
        }
    ];

    const averageRating = mockProductReviews.reduce((acc, review) => acc + review.rating, 0) / mockProductReviews.length;

    const getProductTypeLabel = (type) => {
        const types = {
            'organic': 'Orgânico',
            'natural': 'Natural',
            'conventional': 'Convencional'
        };
        return types[type] || 'Não informado';
    };

    const getProductTypeColor = (type) => {
        const colors = {
            'organic': 'bg-success/10 text-success border-success/20',
            'natural': 'bg-primary/10 text-primary border-primary/20',
            'conventional': 'bg-muted text-muted-foreground border-border'
        };
        return colors[type] || 'bg-muted text-muted-foreground border-border';
    };

    const handleVendorClick = () => {
        navigate('/vendor-profile-products', { state: { vendorId: vendor?.id } });
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <Icon key={i} name="Star" size={16} className="text-warning fill-current" />
            );
        }

        if (hasHalfStar) {
            stars.push(
                <Icon key="half" name="StarHalf" size={16} className="text-warning fill-current" />
            );
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <Icon key={`empty-${i}`} name="Star" size={16} className="text-muted-foreground" />
            );
        }

        return stars;
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <ResponsiveHeader />
                <main className="pt-16 flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-muted-foreground">Carregando produto...</p>
                    </div>
                </main>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <ResponsiveHeader />
                <main className="pt-16 flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <Icon name="Package" size={48} className="text-muted-foreground mx-auto mb-4" />
                        <h2 className="text-xl font-heading font-semibold text-foreground mb-2">
                            Produto não encontrado
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            O produto que você está procurando não existe ou foi removido.
                        </p>
                        <Button onClick={() => navigate('/products')}>
                            Voltar aos Produtos
                        </Button>
                    </div>
                </main>
            </div>
        );
    }

    const images = Array.isArray(product.images) ? product.images : [product.image];

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <ResponsiveHeader />
            
            <main className="pt-16 flex-1">
                {/* Breadcrumb */}
                <div className="bg-muted/50 border-b border-border">
                    <div className="container mx-auto px-4 py-3">
                        <div className="flex items-center space-x-2 text-sm font-body">
                            <button 
                                onClick={() => navigate('/products')}
                                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                            >
                                Produtos
                            </button>
                            <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
                            <button 
                                onClick={() => navigate('/products', { state: { categoryFilter: product.category?.toLowerCase() } })}
                                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                            >
                                {product.category}
                            </button>
                            <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
                            <span className="text-foreground font-medium truncate">{product.name}</span>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Image Section */}
                        <div className="space-y-4">
                            {/* Main Image */}
                            <div className="aspect-square bg-background rounded-xl overflow-hidden border border-border relative group cursor-pointer" onClick={handleImageClick}>
                                <Image
                                    src={images[currentImageIndex]}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />

                                {/* Navigation Arrows */}
                                {images.length > 1 && (
                                    <>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
                                            }}
                                            onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-background transition-all duration-200 opacity-0 group-hover:opacity-100"
                                        >
                                            <Icon name="ChevronLeft" size={20} className="text-foreground" />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setCurrentImageIndex((prev) => (prev + 1) % images.length);
                                            }}
                                            onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-background transition-all duration-200 opacity-0 group-hover:opacity-100"
                                        >
                                            <Icon name="ChevronRight" size={20} className="text-foreground" />
                                        </button>
                                    </>
                                )}

                                {/* Favorite Button */}
                                <button
                                    onClick={handleFavoriteToggle}
                                    className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                                        favoriteProducts.includes(product.id)
                                            ? 'bg-error text-white'
                                            : 'bg-background/80 backdrop-blur-sm text-muted-foreground hover:text-error hover:bg-background'
                                    }`}
                                >
                                    <Icon 
                                        name="Heart" 
                                        size={20} 
                                        className={favoriteProducts.includes(product.id) ? 'fill-current' : ''} 
                                    />
                                </button>

                                {/* Discount Badge */}
                                {product.discount && (
                                    <div className="absolute top-4 left-4 bg-error text-error-foreground px-3 py-1 rounded-full text-sm font-caption font-medium">
                                        -{product.discount}%
                                    </div>
                                )}

                                {/* Organic Badge */}
                                {product.isOrganic && (
                                    <div className="absolute bottom-4 left-4 bg-success text-success-foreground px-3 py-1 rounded-full text-sm font-caption font-medium flex items-center space-x-1">
                                        <Icon name="Leaf" size={14} />
                                        <span>Orgânico</span>
                                    </div>
                                )}
                            </div>

                            {/* Click to zoom hint */}
                            <p className="text-xs text-muted-foreground text-center">
                                Clique na imagem para ampliar
                            </p>

                            {/* Thumbnail Images */}
                            {images.length > 1 && (
                                <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
                                    {images.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentImageIndex(index)}
                                            className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 bg-background shadow-sm flex-shrink-0 ${
                                                index === currentImageIndex
                                                    ? 'border-primary ring-2 ring-primary/20'
                                                    : 'border-border hover:border-primary/50'
                                            }`}
                                        >
                                            <Image
                                                src={image}
                                                alt={`${product.name} ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="space-y-6">
                            {/* Header */}
                            <div>
                                <h1 className="text-3xl font-heading font-bold text-foreground mb-3">
                                    {product.name}
                                </h1>

                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="flex items-center space-x-1">
                                        {renderStars(product.rating)}
                                    </div>
                                    <span className="text-sm font-medium text-foreground">
                                        {product.rating?.toFixed(1)}
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        ({product.reviewCount} avaliações)
                                    </span>
                                </div>

                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="flex items-baseline space-x-2">
                                        <span className="text-3xl font-heading font-bold text-primary">
                                            {formatPrice(product.price)}
                                        </span>
                                        <span className="text-muted-foreground">
                                            por {product.unit}
                                        </span>
                                    </div>
                                    {product.originalPrice && (
                                        <span className="text-lg text-muted-foreground line-through">
                                            {formatPrice(product.originalPrice)}
                                        </span>
                                    )}
                                </div>

                                {product.description && (
                                    <p className="text-muted-foreground leading-relaxed mb-6">
                                        {product.description}
                                    </p>
                                )}
                            </div>

                            {/* Product Type Label */}
                            {product.isOrganic && (
                                <div className="mb-6">
                                    <div className={`inline-flex items-center space-x-2 px-3 py-2 rounded-lg border ${getProductTypeColor('organic')}`}>
                                        <Icon name="Leaf" size={16} />
                                        <span className="text-sm font-body font-medium">
                                            {getProductTypeLabel('organic')}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* Product Details */}
                            <div className="bg-muted/50 rounded-xl p-6 space-y-4">
                                <h3 className="font-body font-semibold text-foreground">
                                    Informações do Produto
                                </h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-muted-foreground">Categoria:</span>
                                        <span className="ml-2 font-medium text-foreground">{product.category}</span>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Estoque:</span>
                                        <span className="ml-2 font-medium text-foreground">
                                            {product.stock} {product.unit}
                                        </span>
                                    </div>
                                    {product.harvestDate && (
                                        <div>
                                            <span className="text-muted-foreground">Colheita:</span>
                                            <span className="ml-2 font-medium text-foreground">
                                                {new Date(product.harvestDate).toLocaleDateString('pt-BR')}
                                            </span>
                                        </div>
                                    )}
                                    {product.shelfLife && (
                                        <div>
                                            <span className="text-muted-foreground">Validade:</span>
                                            <span className="ml-2 font-medium text-foreground">{product.shelfLife}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Nutritional Info */}
                            {product.nutritionalInfo && (
                                <div className="bg-muted/50 rounded-xl p-6">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-body font-semibold text-foreground">
                                            Informações Nutricionais
                                        </h3>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            iconName="Info"
                                            iconPosition="left"
                                            onClick={() => setShowNutritionalModal(true)}
                                        >
                                            Ver Detalhes
                                        </Button>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-2">
                                        Clique para ver informações detalhadas sobre vitaminas, minerais e benefícios
                                    </p>
                                </div>
                            )}

                            {/* Vendor Info */}
                            {vendor && (
                                <div className="bg-card border border-border rounded-xl p-6">
                                    <h3 className="font-body font-semibold text-foreground mb-4">
                                        Vendedor
                                    </h3>
                                    <div className="flex items-center space-x-4">
                                        <div className="w-16 h-16 rounded-full overflow-hidden bg-muted">
                                            <Image
                                                src={vendor.image}
                                                alt={vendor.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-body font-medium text-foreground">{vendor.name}</h4>
                                            <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-2">
                                                <Icon name="MapPin" size={14} />
                                                <span>{vendor.location}</span>
                                                {vendor.distance && (
                                                    <>
                                                        <span>•</span>
                                                        <span>{vendor.distance}</span>
                                                    </>
                                                )}
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <div className="flex items-center space-x-1">
                                                    {renderStars(vendor.rating)}
                                                </div>
                                                <span className="text-sm font-medium text-foreground">
                                                    {vendor.rating?.toFixed(1)}
                                                </span>
                                                <span className="text-sm text-muted-foreground">
                                                    ({vendor.reviewCount} avaliações)
                                                </span>
                                            </div>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={handleVendorClick}
                                        >
                                            Ver Perfil
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* Product Reviews */}
                            <ProductReviewsSection
                                productId={product.id}
                                productName={product.name}
                                reviews={mockProductReviews}
                                averageRating={averageRating}
                                totalReviews={mockProductReviews.length}
                            />

                            {/* Action Buttons */}
                            <div className="space-y-4">
                                <div className="flex space-x-3">
                                    <Button
                                        variant="default"
                                        size="lg"
                                        iconName="MessageCircle"
                                        onClick={handleWhatsAppContact}
                                        className="bg-success hover:bg-success/90 flex-1"
                                        disabled={!product.available}
                                    >
                                        {product.available ? 'Perguntar no WhatsApp' : 'Indisponível'}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        iconName="Share"
                                        onClick={handleShare}
                                    >
                                        Compartilhar
                                    </Button>
                                </div>

                                {/* Stock Status */}
                                <div className="flex items-center justify-center space-x-2 text-sm">
                                    <div className={`w-2 h-2 rounded-full ${product.available ? 'bg-success' : 'bg-error'}`}></div>
                                    <span className={product.available ? 'text-success' : 'text-error'}>
                                        {product.available ? `${product.stock} ${product.unit} disponível` : 'Produto indisponível'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Related Products Section */}
                    <div className="container mx-auto px-4 py-8">
                        <div className="mb-6">
                            <h2 className="text-xl font-heading font-bold text-foreground mb-2">
                                Produtos Relacionados
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Outros produtos que você pode gostar
                            </p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {mockRelatedProducts.map((relatedProduct) => (
                                <div
                                    key={relatedProduct.id}
                                    className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col h-full"
                                    onClick={() => handleRelatedProductClick(relatedProduct)}
                                >
                                    {/* Favorite Button */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            const updatedFavorites = favoriteProducts.includes(relatedProduct.id)
                                                ? favoriteProducts.filter(id => id !== relatedProduct.id)
                                                : [...favoriteProducts, relatedProduct.id];
                                            setFavoriteProducts(updatedFavorites);
                                            localStorage.setItem('favoriteProducts', JSON.stringify(updatedFavorites));
                                        }}
                                        className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                                            favoriteProducts.includes(relatedProduct.id)
                                                ? 'bg-error text-white'
                                                : 'bg-white/80 backdrop-blur-sm text-muted-foreground hover:text-error hover:bg-white'
                                        }`}
                                    >
                                        <Icon
                                            name="Heart"
                                            size={16}
                                            className={favoriteProducts.includes(relatedProduct.id) ? 'fill-current' : ''}
                                        />
                                    </button>

                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <Image
                                            src={relatedProduct.image}
                                            alt={relatedProduct.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                                        {!relatedProduct.available && (
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                                <span className="text-white font-body font-medium bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full">
                                                    Indisponível
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-3 flex-1 flex flex-col">
                                        <h3 className="font-heading font-medium text-sm text-foreground mb-1 line-clamp-2">
                                            {relatedProduct.name}
                                        </h3>
                                        <div className="flex items-center space-x-1 mb-1">
                                            <Icon name="Store" size={12} className="text-muted-foreground" />
                                            <span className="text-xs text-primary">
                                                {relatedProduct.vendor}
                                            </span>
                                        </div>

                                        <div className="flex items-center space-x-1 mb-2">
                                            <div className="flex items-center space-x-1">
                                                {renderStars(relatedProduct.rating).slice(0, 5)}
                                            </div>
                                            <span className="text-xs text-muted-foreground ml-1">
                                                {relatedProduct.rating.toFixed(1)} ({relatedProduct.reviewCount})
                                            </span>
                                        </div>

                                        <div className="flex items-baseline space-x-1">
                                            <span className="text-lg font-heading font-bold text-foreground">
                                                {formatPrice(relatedProduct.price)}
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                /{relatedProduct.unit}
                                            </span>
                                        </div>

                                        <div className="mt-auto pt-2">
                                            <Button
                                                variant="default"
                                                size="xs"
                                                fullWidth
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    const message = encodeURIComponent(`Olá! Tenho interesse no produto: ${relatedProduct.name}.`);
                                                    window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
                                                }}
                                                disabled={!relatedProduct.available}
                                                className="bg-success hover:bg-success/90 text-xs py-2"
                                            >
                                                <div className="flex items-center justify-center space-x-1">
                                                    <span>{relatedProduct.available ? 'Comprar por' : 'Indisponível'}</span>
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                                                    </svg>
                                                </div>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Reviews Section - Full Width */}
                    <div className="bg-muted/30 py-8">
                        <div className="container mx-auto px-4">
                            <ProductReviewsSection
                                productId={product.id}
                                productName={product.name}
                                reviews={mockProductReviews}
                                averageRating={averageRating}
                                totalReviews={mockProductReviews.length}
                            />
                        </div>
                    </div>
                </div>
            </main>

            {/* Image Modal */}
            {showImageModal && (
                <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="relative w-full h-full flex items-center justify-center">
                        <button
                            onClick={() => setShowImageModal(false)}
                            className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200 z-10"
                        >
                            <Icon name="X" size={24} />
                        </button>
                        
                        <div className="relative max-w-5xl max-h-[85vh] flex items-center justify-center">
                            <Image
                                src={images[currentImageIndex]}
                                alt={product.name}
                                className="max-w-full max-h-full object-contain"
                            />
                            
                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                                        className="fixed left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"
                                    >
                                        <Icon name="ChevronLeft" size={28} />
                                    </button>
                                    <button
                                        onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
                                        className="fixed right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"
                                    >
                                        <Icon name="ChevronRight" size={28} />
                                    </button>
                                </>
                            )}
                        </div>
                        
                        {/* Image counter */}
                        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                            {currentImageIndex + 1} / {images.length}
                        </div>
                    </div>
                </div>
            )}

            {/* Share Modal */}
            <ShareModal
                isOpen={showShareModal}
                onClose={() => setShowShareModal(false)}
                product={product}
                vendor={vendor}
                type="product"
            />

            {/* Nutritional Info Modal */}
            <NutritionalInfoModal
                isOpen={showNutritionalModal}
                onClose={() => setShowNutritionalModal(false)}
                nutritionalInfo={product?.nutritionalInfo}
                productName={product?.name}
            />

            <Footer />
        </div>
    );
};

export default ProductDetails;