import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedProducts = ({ className = '', onProductClick }) => {
    const navigate = useNavigate();
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    const PRODUCTS_PER_VIEW = 4;

    // Mock featured products data
    const mockFeaturedProducts = [
        {
            id: 1,
            name: "Tomate Orgânico",
            vendor: "Fazenda Verde Orgânicos",
            price: 8.50,
            unit: "kg",
            image: "https://images.unsplash.com/photo-1546470427-e5ac89c8ba37?w=300&h=300&fit=crop",
            distance: 0.8,
            rating: 4.8,
            reviewCount: 45,
            available: true,
            isOrganic: true,
            vendorId: 1,
            discount: 15,
            originalPrice: 10.00,
            description: "Tomates frescos cultivados sem agrotóxicos, direto da nossa horta familiar.",
            categories: ["Orgânicos", "Verduras", "Legumes"],
            rating: 4.8,
            reviewCount: 23
        },
        {
            id: 2,
            name: "Banana Prata",
            vendor: "Sítio das Frutas",
            price: 6.90,
            unit: "kg",
            image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=300&fit=crop",
            distance: 2.1,
            rating: 4.9,
            reviewCount: 78,
            available: true,
            isOrganic: false,
            vendorId: 3,
            discount: 10,
            originalPrice: 7.67,
            description: "Bananas doces e maduras, ricas em potássio.",
            categories: ["Frutas", "Natural"],
            rating: 4.5,
            reviewCount: 34
        },
        {
            id: 3,
            name: "Alface Hidropônica",
            vendor: "Hortifruti do João",
            price: 3.20,
            unit: "unidade",
            image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop",
            distance: 1.2,
            rating: 4.6,
            reviewCount: 32,
            available: true,
            isOrganic: false,
            vendorId: 2,
            discount: null,
            originalPrice: null,
            description: "Alface fresca cultivada em sistema hidropônico, crocante e saborosa.",
            categories: ["Verduras", "Hidropônico"],
            rating: 4.6,
            reviewCount: 18
        },
        {
            id: 4,
            name: "Cenoura Orgânica",
            vendor: "Fazenda Orgânica São José",
            price: 5.80,
            unit: "kg",
            image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=300&h=300&fit=crop",
            distance: 1.5,
            rating: 4.7,
            reviewCount: 67,
            available: true,
            isOrganic: true,
            vendorId: 5,
            discount: 20,
            originalPrice: 7.25,
            description: "Cenouras orgânicas doces e crocantes, perfeitas para qualquer receita.",
            categories: ["Orgânicos", "Legumes"],
            rating: 4.7,
            reviewCount: 29
        }
    ];

    useEffect(() => {
        const loadFeaturedProducts = async () => {
            setLoading(true);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 800));
            setFeaturedProducts(mockFeaturedProducts);
            setLoading(false);
        };

        loadFeaturedProducts();

        // Load favorite products from localStorage (but don't use it in artifacts)
        // const savedFavorites = JSON.parse(localStorage.getItem('favoriteProducts') || '[]');
        // setFavoriteProducts(savedFavorites);
    }, []);

    const handleProductClick = (product) => {
        // Navigate to product details page instead of opening modal
        navigate(`/product-details/${product.id}`, {
            state: {
                product,
                vendor: {
                    id: product.vendorId,
                    name: product.vendor,
                    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=300&fit=crop",
                    location: "São Paulo, SP",
                    distance: `${product.distance}km`,
                    phone: "11999999999"
                }
            }
        });
    };

    const handleVendorClick = (product, e) => {
        e?.stopPropagation();
        navigate('/vendor-profile-products', { state: { vendorId: product.vendorId } });
    };

    const handleCategoryClick = (category, e) => {
        e?.stopPropagation();
        navigate('/products', { state: { categoryFilter: category } });
    };

    const handleProductInquiry = (product, e) => {
        e?.stopPropagation();
        const message = encodeURIComponent(`Olá ${product.vendor}! Vi o produto "${product.name}" no FreshLink e gostaria de saber mais informações.`);
        const whatsappUrl = `https://wa.me/5511999999999?text=${message}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleFavoriteToggle = (productId, e) => {
        e?.stopPropagation();
        const updatedFavorites = favoriteProducts.includes(productId)
            ? favoriteProducts.filter(id => id !== productId)
            : [...favoriteProducts, productId];

        setFavoriteProducts(updatedFavorites);
        // localStorage.setItem('favoriteProducts', JSON.stringify(updatedFavorites));
    };

    const navigateProducts = (direction) => {
        const maxIndex = Math.max(0, featuredProducts.length - PRODUCTS_PER_VIEW);
        if (direction === 'prev') {
            setCurrentIndex(Math.max(0, currentIndex - 1));
        } else {
            setCurrentIndex(Math.min(maxIndex, currentIndex + 1));
        }
    };

    const visibleProducts = featuredProducts.slice(currentIndex, currentIndex + PRODUCTS_PER_VIEW);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price);
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars?.push(
                <Icon key={i} name="Star" size={14} className="text-warning fill-current" />
            );
        }

        if (hasHalfStar) {
            stars?.push(
                <Icon key="half" name="StarHalf" size={14} className="text-warning fill-current" />
            );
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars?.push(
                <Icon key={`empty-${i}`} name="Star" size={14} className="text-muted-foreground" />
            );
        }

        return stars;
    };

    const ProductCard = ({ product }) => (
        <div
            className="bg-white border-2 border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-gray-900/10 transition-all duration-300 group cursor-pointer flex flex-col h-full"
            onClick={() => handleProductClick(product)}
        >
            {/* Discount Badge */}
            {product?.discount && (
                <div className="absolute top-3 left-3 z-10 bg-destructive text-destructive-foreground text-xs font-caption font-medium px-2 py-1 rounded-full">
                    -{product?.discount}%
                </div>
            )}

            {/* Favorite Button */}
            <button
                onClick={(e) => handleFavoriteToggle(product?.id, e)}
                className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm ${favoriteProducts.includes(product?.id)
                    ? 'bg-red-500 text-white'
                    : 'bg-white/90 backdrop-blur-sm text-gray-400 hover:text-red-500 hover:bg-white'
                    }`}
            >
                <Icon
                    name="Heart"
                    size={16}
                    className={favoriteProducts.includes(product?.id) ? 'fill-current' : ''}
                />
            </button>

            {/* Image */}
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                <Image
                    src={product?.image}
                    alt={product?.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                {/* Availability Status */}
                {!product?.available && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white font-body font-medium bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full">
                            Indisponível
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4 flex-1 flex flex-col space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <h3 className="font-bold text-base leading-tight line-clamp-2 text-gray-900">
                            {product?.name}
                        </h3>
                        <div className="flex items-center space-x-2 text-sm mt-1">
                            <Icon name="Store" size={14} className="text-gray-400 flex-shrink-0" />
                            <button
                                onClick={(e) => handleVendorClick(product, e)}
                                className="font-medium text-gray-600 hover:text-primary transition-colors duration-200"
                            >
                                {product?.vendor}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                        {renderStars(product?.rating || 4.5)}
                    </div>
                    <span className="text-sm font-bold text-gray-900">
                        {(product?.rating || 4.5).toFixed(1)}
                    </span>
                    <span className="text-xs text-gray-500">
                        ({product?.reviewCount || 12})
                    </span>
                </div>

                {/* Price */}
                <div className="flex items-center">
                    <div className="flex items-baseline space-x-1">
                        <span className="font-bold text-lg text-gray-900">
                            {formatPrice(product?.price)}
                        </span>
                        <span className="text-sm text-gray-500">
                            /{product?.unit}
                        </span>
                    </div>
                    {product?.originalPrice && (
                        <>
                            <span className="text-sm text-gray-400 line-through ml-2">
                                {formatPrice(product?.originalPrice)}
                            </span>
                            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-0.5 rounded-full text-xs font-bold ml-2">
                                -{product?.discount}%
                            </div>
                        </>
                    )}
                </div>

                {/* Actions */}
                <div className="mt-auto pt-2">
                    <Button
                        variant="default"
                        size="sm"
                        fullWidth
                        onClick={(e) => handleProductInquiry(product, e)}
                        disabled={!product?.available}
                        className="bg-primary hover:bg-accent text-white font-semibold py-2.5 rounded-xl"
                    >
                        <div className="flex items-center justify-center space-x-2">
                            <span className="text-sm">{product?.available ? 'Comprar por' : 'Indisponível'}</span>
                            {product?.available && (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                             </svg>
                            )}
                        </div>
                    </Button>
                </div>
            </div>
        </div>
    );

    const SkeletonCard = () => (
        <div className="bg-card border border-border rounded-lg overflow-hidden animate-pulse h-full">
            <div className="h-32 bg-muted" />
            <div className="p-3 space-y-2">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
                <div className="flex space-x-1">
                    {[...Array(5)]?.map((_, i) => (
                        <div key={i} className="w-3 h-3 bg-muted rounded" />
                    ))}
                </div>
                <div className="flex space-x-1">
                    <div className="h-6 bg-muted rounded" />
                </div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className={`${className}`}>
                <div className="flex items-center justify-between mb-6">
                    <div className="mb-6">
                        <h2 className="text-2xl font-black text-gray-900 mb-1">
                            Produtos em Destaque
                        </h2>
                        <p className="text-gray-600 font-medium">
                            Ofertas especiais selecionadas para você
                        </p>
                    </div>
                    <div className="flex space-x-2">
                        <button className="w-8 h-8 rounded-full bg-muted flex items-center justify-center opacity-50">
                            <Icon name="ChevronLeft" size={16} />
                        </button>
                        <button className="w-8 h-8 rounded-full bg-muted flex items-center justify-center opacity-50">
                            <Icon name="ChevronRight" size={16} />
                        </button>
                    </div>
                </div>
                <div className="mb-6">
                    <h2 className="font-heading font-bold text-xl text-foreground mb-1">
                        Produtos em Destaque
                    </h2>
                    <p className="text-sm font-body text-muted-foreground">
                        Ofertas especiais selecionadas para você
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {[...Array(4)]?.map((_, index) => (
                        <SkeletonCard key={index} />
                    ))}
                </div>
            </div>
        );
    }

    if (featuredProducts?.length === 0) {
        return (
            <div className={`${className}`}>
                <div className="flex items-center justify-between mb-6">
                    <div className="mb-6">
                        <h2 className="font-heading font-bold text-xl text-foreground mb-1">
                            Produtos em Destaque
                        </h2>
                        <p className="text-sm font-body text-muted-foreground">
                            Ofertas especiais selecionadas para você
                        </p>
                    </div>
                    <div className="w-16"></div>
                </div>

                <div className="mb-6">
                    <h2 className="font-heading font-bold text-xl text-foreground mb-1">
                        Produtos em Destaque
                    </h2>
                    <p className="text-sm font-body text-muted-foreground">
                        Ofertas especiais selecionadas para você
                    </p>
                </div>

                <div className="flex flex-col items-center justify-center py-16">
                    <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
                        <Icon name="Package" className="w-12 h-12 text-muted-foreground" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                        Nenhum produto em destaque
                    </h3>
                    <p className="text-sm font-body text-muted-foreground text-center max-w-md">
                        Não há produtos em destaque no momento. Volte em breve para conferir nossas ofertas especiais.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className={`${className}`}>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="font-heading font-bold text-xl text-foreground mb-1">
                        Produtos em Destaque
                    </h2>
                    <p className="text-sm font-body text-muted-foreground">
                        Ofertas especiais selecionadas para você
                    </p>
                </div>
                
                {/* Navigation Arrows */}
                <div className="flex space-x-2">
                    <button
                        onClick={() => navigateProducts('prev')}
                        disabled={currentIndex === 0}
                        className="w-8 h-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                        <Icon name="ChevronLeft" size={16} />
                    </button>
                    <button
                        onClick={() => navigateProducts('next')}
                        disabled={currentIndex + PRODUCTS_PER_VIEW >= featuredProducts.length}
                        className="w-8 h-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                        <Icon name="ChevronRight" size={16} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {visibleProducts.map((product) => (
                    <ProductCard key={product?.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default FeaturedProducts;