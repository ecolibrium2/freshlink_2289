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
            className="bg-white border-2 border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-gray-900/10 transition-all duration-300 group cursor-pointer flex flex-col h-full transform hover:scale-105"
            onClick={() => handleVendorClick(vendor)}
        >
            {/* Sponsored Badge */}
            {vendor?.isSponsored && (
                <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    Patrocinado
                </div>
            )}

            {/* Image */}
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                <Image
                    src={vendor?.image}
                    alt={vendor?.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-4 flex-1 flex flex-col space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-1">
                            {vendor?.name}
                        </h3>
                        <div className="flex items-center space-x-1 mb-1">
                            <Icon name="MapPin" size={14} className="text-gray-400" />
                            <span className="text-sm text-gray-600">
                                {vendor?.distance} • {vendor?.location}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                        {renderStars(vendor?.rating)}
                    </div>
                    <span className="text-sm font-bold text-gray-900">
                        {vendor?.rating?.toFixed(1)}
                    </span>
                    <span className="text-sm text-gray-500">
                        ({vendor?.reviewCount} avaliações)
                    </span>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-2">
                    {vendor?.categories?.slice(0, 3)?.map((category, index) => (
                        <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full"
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
                <div className="flex items-center space-x-2">
                    <Icon
                        name="Clock"
                        size={14}
                        className={vendor?.isOpen ? 'text-green-500' : 'text-red-500'}
                    />
                    <span className={`text-sm font-medium ${vendor?.isOpen ? 'text-green-600' : 'text-red-600'}`}>
                        {vendor?.isOpen ? 'Aberto agora' : 'Fechado'}
                    </span>
                    <span className="text-sm text-gray-500">
                        • {vendor?.hours}
                    </span>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 mt-auto pt-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                            e?.stopPropagation();
                            handleVendorClick(vendor);
                        }}
                        className="flex-1 bg-white border-2 border-gray-200 hover:bg-gray-50 hover:text-primary hover:border-primary/30 rounded-xl font-semibold"
                    >
                        Ver Produtos
                    </Button>
                    <Button
                        variant="default"
                        size="sm"
                        iconName="MessageCircle"
                        onClick={(e) => handleWhatsAppContact(vendor, e)}
                        className="bg-primary hover:bg-accent text-white rounded-xl font-semibold"
                    >
                        WhatsApp
                    </Button>
                </div>
            </div>
        </div>
    );

    const SkeletonCard = () => (
        <div className="bg-white border-2 border-gray-100 rounded-2xl overflow-hidden animate-pulse">
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
                    <div className="h-10 bg-gray-200 rounded-xl flex-1" />
                    <div className="h-10 bg-gray-200 rounded-xl w-20" />
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
                    <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        Nenhum vendedor encontrado
                    </h3>
                    <p className="text-gray-600 mb-6 text-center max-w-md leading-relaxed">
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
                        variant="default"
                        size="lg"
                        iconName="Plus"
                        iconPosition="left"
                        className="bg-primary hover:bg-primary/90 text-white rounded-2xl px-8 py-4 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                        Carregar mais vendedores
                    </Button>
                </div>
            )}
        </div>
    );
};

export default VendorGrid;