import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductGrid = ({ products, vendor, onFavoriteToggle, favoriteProducts = [] }) => {
    const navigate = useNavigate();

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
                <Icon key={i} name="Star" size={14} className="text-warning fill-current" />
            );
        }

        if (hasHalfStar) {
            stars.push(
                <Icon key="half" name="StarHalf" size={14} className="text-warning fill-current" />
            );
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <Icon key={`empty-${i}`} name="Star" size={14} className="text-muted-foreground" />
            );
        }

        return stars;
    };

    const handleProductClick = (product) => {
        navigate(`/product-details/${product.id}`, {
            state: {
                product: {
                    ...product,
                    rating: product.rating || 4.5,
                    reviewCount: product.reviewCount || 12
                },
                vendor
            }
        });
    };

    const handleVendorClick = (e) => {
        e?.stopPropagation();
        navigate('/vendor-profile-products', { state: { vendorId: vendor?.id } });
    };

    const handleProductInquiry = (product, e) => {
        e?.stopPropagation();
        const message = encodeURIComponent(`Olá ${vendor?.name}! Vi o produto "${product.name}" no FreshLink e gostaria de saber mais informações.`);
        const whatsappUrl = `https://wa.me/55${vendor?.phone}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleFavoriteClick = (productId, e) => {
        e?.stopPropagation();
        onFavoriteToggle?.(productId);
    };

    const ProductCard = ({ product }) => (
        <div
            className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col h-full"
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
                onClick={(e) => handleFavoriteClick(product?.id, e)}
                className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    favoriteProducts.includes(product?.id)
                        ? 'bg-error text-white'
                        : 'bg-white/80 backdrop-blur-sm text-muted-foreground hover:text-error hover:bg-white'
                }`}
            >
                <Icon
                    name="Heart"
                    size={16}
                    className={favoriteProducts.includes(product?.id) ? 'fill-current' : ''}
                />
            </button>

            {/* Image */}
            <div className="relative h-48 overflow-hidden">
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
            <div className="p-3 flex-1 flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-1">
                    <div className="flex-1">
                        <h3 className="font-heading font-medium text-sm text-foreground mb-1 line-clamp-1">
                            {product?.name}
                        </h3>
                    </div>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-2">
                    <div className="flex items-center space-x-1">
                        {renderStars(product?.rating || 4.5).slice(0, 5).map((star, index) => 
                            React.cloneElement(star, { key: index, size: 12 })
                        )}
                    </div>
                    <span className="text-xs font-body font-medium text-foreground">
                        {(product?.rating || 4.5).toFixed(1)}
                    </span>
                    <span className="text-xs font-caption text-muted-foreground">
                        ({product?.reviewCount || 12})
                    </span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-baseline space-x-1">
                        <span className="text-lg font-heading font-bold text-foreground">
                            {formatPrice(product?.price)}
                        </span>
                        <span className="text-xs font-caption text-muted-foreground">
                            /{product?.unit}
                        </span>
                    </div>
                    {product?.originalPrice && (
                        <span className="text-xs font-caption text-muted-foreground line-through">
                            {formatPrice(product?.originalPrice)}
                        </span>
                    )}
                </div>

                {/* Actions */}
                <div className="mt-auto">
                    <Button
                        variant="default"
                        size="xs"
                        fullWidth
                        onClick={(e) => handleProductInquiry(product, e)}
                        disabled={!product?.available}
                        className="bg-success hover:bg-success/90 text-xs py-2"
                    >
                        <div className="flex items-center justify-center space-x-1">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                            </svg>
                        </div>
                    </Button>
                </div>
            </div>
        </div>
    );

    if (products?.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <Icon name="Package" size={48} className="text-muted-foreground mb-4" />
                <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                    Nenhum produto encontrado
                </h3>
                <p className="text-muted-foreground font-body">
                    Não há produtos disponíveis nesta categoria no momento.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {products?.map((product) => (
                <ProductCard
                    key={product?.id}
                    product={product}
                />
            ))}
        </div>
    );
};

export default ProductGrid;