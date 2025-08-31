import React, { useState, useRef, useEffect } from 'react';
import { Star, X, MapPin, MessageCircle, Share, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../../components/ui/Button';

const ProductModal = ({ product, vendor, isOpen, onClose, onFavoriteToggle = false }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const imageRef = useRef(null);

    // Mock data to match the reference image
    const mockProduct = {
        name: "Beats Studio Pro Wireless Headphones — Navy",
        brand: "Beats",
        rating: 4.6,
        reviewCount: 261,
        watchCount: 3100,
        price: 349.99,
        images: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&h=500&fit=crop"
        ],
        colors: ['#2B4F72', '#E8E8E8', '#4A4A4A', '#1A1A1A'],
        description: "The Beats Studio Pro custom acoustic platform delivers an immersive listening experience. Each custom 40mm driver has been engineered for optimal clarity, with near...",
        available: true,
        isOrganic: false,
        productType: "organic", // orgânico, natural, convencional
        category: "Headphones",
        stock: 15,
        unit: "unit"
    };

    const displayProduct = product || mockProduct;

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const images = Array.isArray(displayProduct.images) ? displayProduct.images : [displayProduct.image];

    const handleMouseMove = (e) => {
        if (!isZoomed || !imageRef.current) return;
        const rect = imageRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setZoomPosition({ x, y });
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const handleWhatsAppContact = () => {
        const message = encodeURIComponent(`Olá! Tenho interesse no produto: ${displayProduct.name}. Está disponível?`);
        const whatsappUrl = `https://wa.me/55${vendor?.phone}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: displayProduct.name,
                text: `Confira este produto: ${displayProduct.name}`,
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copiado!');
        }
    };

    const handleFavoriteClick = (e) => {
        e.stopPropagation();
        onFavoriteToggle?.(displayProduct.id);
    };

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
            stars.push(
                <Star key={i} size={16} className="text-warning fill-current" />
            );
        }

        if (hasHalfStar) {
            stars.push(
                <Star key="half" size={16} className="text-warning fill-current opacity-50" />
            );
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <Star key={`empty-${i}`} size={16} className="text-muted-foreground" />
            );
        }

        return stars;
    };

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
            'organic': 'text-success',
            'natural': 'text-primary',
            'conventional': 'text-muted-foreground'
        };
        return colors[type] || 'text-muted-foreground';
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden animate-scale-in border-2 border-gray-200">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-black text-gray-900">
                        Detalhes do Produto
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-2xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row min-h-0">
                    {/* Image Section */}
                    <div className="lg:w-3/5 p-6 bg-gradient-to-br from-gray-50 to-gray-100">
                        {/* Main Image */}
                        <div className="relative"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}>
                            <div
                                className="aspect-square bg-white rounded-2xl overflow-hidden mb-4 cursor-zoom-in shadow-lg relative border-2 border-gray-200"
                                onMouseMove={handleMouseMove}
                                onMouseEnter={() => setIsZoomed(true)}
                                onMouseLeave={() => setIsZoomed(false)}
                            >
                                <img
                                    ref={imageRef}
                                    src={images[currentImageIndex]}
                                    alt={displayProduct.name}
                                    className={`w-full h-full object-contain transition-transform duration-300 ${isZoomed ? 'scale-150' : 'scale-100'
                                        }`}
                                    style={
                                        isZoomed
                                            ? {
                                                transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                                            }
                                            : {}
                                    }
                                />

                                {/* Navigation Arrows */}
                                {images.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevImage}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg flex items-center justify-center hover:bg-white transition-all duration-200"
                                        >
                                            <ChevronLeft size={20} className="text-gray-900" />
                                        </button>
                                        <button
                                            onClick={nextImage}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg flex items-center justify-center hover:bg-white transition-all duration-200"
                                        >
                                            <ChevronRight size={20} className="text-gray-900" />
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Thumbnail Images */}
                            {images.length > 1 && (
                                <div className="flex space-x-3 justify-center overflow-x-auto scrollbar-hide">
                                    {images.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentImageIndex(index)}
                                            className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 bg-white shadow-sm flex-shrink-0 ${index === currentImageIndex
                                                ? 'border-primary ring-2 ring-primary/20 shadow-lg'
                                                : 'border-gray-200 hover:border-primary/50'
                                                }`}
                                        >
                                            <img
                                                src={image}
                                                alt={`${displayProduct.name} ${index + 1}`}
                                                className="w-full h-full object-contain"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="lg:w-3/5 p-6 overflow-y-auto">
                        <div className="space-y-6">
                            {/* Product Title and Rating */}
                            <div>
                                <h1 className="text-3xl font-black text-gray-900 mb-2">
                                    {displayProduct.name}
                                </h1>

                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="flex items-center space-x-1">
                                        {renderStars(displayProduct.rating || 4.6)}
                                    </div>
                                    <span className="text-sm font-bold text-gray-900">
                                        {(displayProduct.rating || 4.6).toFixed(1)}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        ({displayProduct.reviewCount || 261} avaliações)
                                    </span>
                                </div>

                                <div className="flex items-center text-sm text-gray-600 mb-4">
                                    <span>Categoria: <span className="font-semibold text-gray-900">{displayProduct.category || 'Não informado'}</span></span>
                                    {(displayProduct.productType === 'organic' || displayProduct.productType === 'natural') && (
                                        <>
                                            <div className="w-px h-4 bg-gray-300 mx-4"></div>
                                            <span className="font-semibold text-green-600">
                                                {getProductTypeLabel(displayProduct.productType)}
                                            </span>
                                        </>
                                    )}
                                </div>

                                {displayProduct.description && (
                                    <p className="text-gray-600 leading-relaxed mb-6">
                                        {displayProduct.description}
                                        {displayProduct.description && displayProduct.description.length > 100 && (
                                            <button className="text-primary hover:text-primary/80 font-semibold ml-1">
                                                Read more
                                            </button>
                                        )}
                                    </p>
                                )}

                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="text-3xl font-black text-primary">
                                        {formatPrice(displayProduct.price)}
                                    </div>
                                    <div className="text-gray-600">
                                        por {displayProduct.unit}
                                    </div>
                                </div>

                                <div className="border-b border-gray-200"></div>
                            </div>

                            {/* Vendor Info */}
                            {vendor && (
                                <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-100">
                                    <h3 className="font-bold text-gray-900 mb-3">
                                        Vendedor
                                    </h3>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                                            <img
                                                src={vendor?.image || 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=100&h=100&fit=crop'}
                                                alt={vendor?.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-bold text-gray-900">{vendor?.name}</div>
                                            <div className="flex items-center space-x-1 text-sm text-gray-600">
                                                <MapPin size={14} />
                                                <span>{vendor?.location}</span>
                                                {vendor?.distance && (
                                                    <>
                                                        <span>•</span>
                                                        <span>{vendor.distance}</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <Button
                                            variant="default"
                                            size="sm"
                                            className="bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold"
                                        >
                                            Ver Perfil
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="pt-4 border-gray-200 transition-all duration-200">
                                <div className="flex space-x-3">
                                    <Button
                                        variant="default"
                                        size="lg"
                                        iconName="MessageCircle"
                                        onClick={handleWhatsAppContact}
                                        className="bg-primary hover:bg-accent flex-1 py-4 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl"
                                    >
                                        Perguntar
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        iconName="Share"
                                        onClick={handleShare}
                                        className="border-2 border-gray-200 hover:border-primary/50 flex-1 py-4 rounded-2xl font-semibold"
                                    >
                                        Compartilhar
                                    </Button>
                                </div>
                            </div>

                            {/* Product Details */}
                            {displayProduct.stock && (
                                <div className="space-y-3">
                                    <h3 className="font-bold text-gray-900">
                                        Informações Adicionais
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="text-gray-500">Estoque:</span>
                                            <span className="ml-2 font-semibold text-gray-900">
                                                {displayProduct.stock} unidades
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;