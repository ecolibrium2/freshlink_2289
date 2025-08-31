import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const VendorGrid = ({ vendors, loading, onLoadMore, hasMore, loadingMore, className = '' }) => {
    const navigate = useNavigate();

    const handleVendorClick = (vendor) => {
        navigate('/vendor-profile-products', { state: { vendorId: vendor?.id } });
    };

    const handleWhatsAppContact = (vendor, e) => {
        e?.stopPropagation();
        const message = encodeURIComponent(`Olá ${vendor?.name}! Vi seus produtos no FreshLink e gostaria de saber mais informações.`);
        const whatsappUrl = `https://wa.me/55${vendor?.phone}?text=${message}`;
        window.open(whatsappUrl, '_blank');
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

    const VendorCard = ({ vendor }) => (
        <div
            className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col h-full"
            onClick={() => handleVendorClick(vendor)}
        >
            {/* Sponsored Badge */}
            {vendor?.isSponsored && (
                <div className="absolute top-3 left-3 z-10 bg-accent text-accent-foreground text-xs font-caption font-medium px-2 py-1 rounded-full">
                    Patrocinado
                </div>
            )}

            {/* Image */}
            <div className="relative h-48 overflow-hidden">
                <Image
                    src={vendor?.image}
                    alt={vendor?.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-4 flex-1 flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                        <h3 className="font-heading font-semibold text-lg text-foreground mb-1 line-clamp-1">
                            {vendor?.name}
                        </h3>
                        <div className="flex items-center space-x-1 mb-2">
                            <Icon name="MapPin" size={14} className="text-muted-foreground" />
                            <span className="text-sm font-caption text-muted-foreground">
                                {vendor?.distance} • {vendor?.location}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center space-x-1">
                        {renderStars(vendor?.rating)}
                    </div>
                    <span className="text-sm font-body font-medium text-foreground">
                        {vendor?.rating?.toFixed(1)}
                    </span>
                    <span className="text-sm font-caption text-muted-foreground">
                        ({vendor?.reviewCount} avaliações)
                    </span>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-1 mb-4">
                    {vendor?.categories?.slice(0, 3)?.map((category, index) => (
                        <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 bg-muted text-muted-foreground text-xs font-caption rounded-full"
                        >
                            {category}
                        </span>
                    ))}
                    {vendor?.categories?.length > 3 && (
                        <span className="inline-flex items-center px-2 py-1 bg-muted text-muted-foreground text-xs font-caption rounded-full">
                            +{vendor?.categories?.length - 3}
                        </span>
                    )}
                </div>

                {/* Operating Hours */}
                <div className="flex items-center space-x-2 mb-4">
                    <Icon
                        name="Clock"
                        size={14}
                        className={vendor?.isOpen ? 'text-success' : 'text-error'}
                    />
                    <span className={`text-sm font-caption ${vendor?.isOpen ? 'text-success' : 'text-error'}`}>
                        {vendor?.isOpen ? 'Aberto agora' : 'Fechado'}
                    </span>
                    <span className="text-sm font-caption text-muted-foreground">
                        • {vendor?.hours}
                    </span>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 mt-auto">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                            e?.stopPropagation();
                            handleVendorClick(vendor);
                        }}
                        className="text-muted-foreground border hover:bg-muted hover:text-foreground hover:border-primary/30 flex-1"
                    >
                        Ver Produtos
                    </Button>
                    <Button
                        variant="default"
                        size="sm"
                        iconName="MessageCircle"
                        onClick={(e) => handleWhatsAppContact(vendor, e)}
                        className="bg-success hover:bg-success/90"
                    >
                        WhatsApp
                    </Button>
                </div>
            </div>
        </div>
    );

    const SkeletonCard = () => (
        <div className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
            <div className="h-48 bg-muted" />
            <div className="p-4 space-y-3">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
                <div className="flex space-x-1">
                    {[...Array(5)]?.map((_, i) => (
                        <div key={i} className="w-3 h-3 bg-muted rounded" />
                    ))}
                </div>
                <div className="flex space-x-1">
                    {[...Array(3)]?.map((_, i) => (
                        <div key={i} className="h-6 bg-muted rounded-full w-16" />
                    ))}
                </div>
                <div className="h-3 bg-muted rounded w-2/3" />
                <div className="flex space-x-2">
                    <div className="h-8 bg-muted rounded flex-1" />
                    <div className="h-8 bg-muted rounded w-20" />
                </div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className={`${className}`}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(8)]?.map((_, index) => (
                        <SkeletonCard key={index} />
                    ))}
                </div>
            </div>
        );
    }

    if (vendors?.length === 0) {
        return (
            <div className={`${className}`}>
                <div className="flex flex-col items-center justify-center py-16">
                    <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
                        <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                        Nenhum vendedor encontrado
                    </h3>
                    <p className="text-sm font-body text-muted-foreground text-center max-w-md">
                        Não encontramos vendedores na sua região. Tente ajustar os filtros ou expandir a área de busca.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className={`${className}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {vendors?.map((vendor) => (
                    <VendorCard key={vendor?.id} vendor={vendor} />
                ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
                <div className="flex justify-center mt-8">
                    <Button
                        onClick={onLoadMore}
                        loading={loadingMore}
                        variant="outline"
                        size="lg"
                        iconName="Plus"
                        iconPosition="left"
                    >
                        Carregar mais vendedores
                    </Button>
                </div>
            )}
        </div>
    );
};

export default VendorGrid;