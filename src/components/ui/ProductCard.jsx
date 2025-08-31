import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Image from '../AppImage';
import Button from './Button';

const ProductCard = ({ product, vendor, onProductClick, onFavoriteToggle, isFavorited = false }) => {
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const images = Array.isArray(product.images) ? product.images : [product.image];

    const formatPrice = (price) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price);
    };

    const handlePrevImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNextImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const handleFavoriteClick = (e) => {
        e.stopPropagation();
        onFavoriteToggle?.(product.id);
    };

    const handleVendorClick = (e) => {
        e.stopPropagation();
        navigate('/vendor-profile-products', { state: { vendorId: vendor?.id } });
    };

    const handleProductInquiry = (e) => {
        e.stopPropagation();
        const message = encodeURIComponent(`Olá! Tenho interesse no produto: ${product.name} (${product.unit}). Está disponível?`);
        const whatsappUrl = `https://wa.me/5511999999999?text=${message}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div
            className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer"
            onClick={() => onProductClick?.(product)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Product Image */}
            <div className="relative aspect-square bg-muted overflow-hidden">
                <Image
                    src={images[currentImageIndex]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Image Navigation */}
                {images.length > 1 && isHovered && (
                    <>
                        <button
                            onClick={handlePrevImage}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/50 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors duration-200"
                        >
                            <Icon name="ChevronLeft" size={16} />
                        </button>
                        <button
                            onClick={handleNextImage}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/50 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors duration-200"
                        >
                            <Icon name="ChevronRight" size={16} />
                        </button>
                    </>
                )}

                {/* Image Indicators */}
                {images.length > 1 && (
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                        {images.map((_, index) => (
                            <div
                                key={index}
                                className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                                    }`}
                            />
                        ))}
                    </div>
                )}

                {/* Favorite Button */}
                <button
                    onClick={handleFavoriteClick}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isFavorited ? 'opacity-100 scale-100' : 'opacity-100 scale-100'
                        } ${isFavorited
                            ? 'bg-error text-white'
                            : 'bg-white/80 backdrop-blur-sm text-muted-foreground hover:text-error'
                        }`}
                >
                    <Icon name="Heart" size={16} className={isFavorited ? 'fill-current' : ''} />
                </button>

                {/* Product Status */}
                {!product.available && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white text-sm font-body font-medium">Indisponível</span>
                    </div>
                )}

                {product.isOrganic && (
                    <div className="absolute top-3 left-3 bg-success text-success-foreground px-2 py-1 rounded-full text-xs font-caption font-medium">
                        Orgânico
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="p-4">
                <h3 className="font-body font-medium text-foreground mb-1 line-clamp-2">
                    {product.name}
                </h3>

                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                        <span className="text-lg font-heading font-bold text-foreground">
                            {formatPrice(product.price)}
                        </span>
                        <span className="text-sm text-muted-foreground">
                            /{product.unit}
                        </span>
                    </div>
                    {product.available && (
                        <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-success rounded-full"></div>
                            <span className="text-xs font-caption text-success">Disponível</span>
                        </div>
                    )}
                </div>

                {/* Vendor Name */}
                {vendor && (
                    <button
                        onClick={handleVendorClick}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 mb-3 block"
                    >
                        {vendor.name}
                    </button>
                )}

                {/* Action Button */}
                <Button
                    variant="default"
                    size="sm"
                    iconName="MessageCircle"
                    fullWidth
                    disabled={!product.available}
                    onClick={handleProductInquiry}
                    className="bg-success hover:bg-success/90 flex-1 py-5"
                    Button
                >
                    {product.available ? 'Perguntar' : 'Indisponível'}
                </Button>
            </div>
        </div>
    );
};

export default ProductCard;