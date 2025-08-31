import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const VendorHeroSection = ({ vendor, onWhatsAppContact, onDirections, onShare }) => {
    const [isDescriptionExpanded, setIsDescriptionExpanded] = React.useState(false);

    const toggleDescription = () => {
        setIsDescriptionExpanded(!isDescriptionExpanded);
    };
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <Icon key={i} name="Star" size={14} className="text-yellow-400 fill-current" />
            );
        }

        if (hasHalfStar) {
            stars.push(
                <Icon key="half" name="StarHalf" size={14} className="text-yellow-400 fill-current" />
            );
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <Icon key={`empty-${i}`} name="Star" size={14} className="text-gray-300" />
            );
        }

        return stars;
    };

    return (
        <div className="relative w-full">
            {/* Banner Grande */}
            <div className="h-64 md:h-80 bg-gradient-to-r from-orange-200 via-pink-200 to-purple-300 relative overflow-hidden">
                {vendor?.bannerImage && (
                    <Image
                        src={vendor.bannerImage}
                        alt={`${vendor.name} banner`}
                        className="w-full h-full object-cover opacity-80"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>

            {/* Container Principal - Layout com Botões no Topo Direito */}
            <div className="relative -mt-16 px-4 md:px-6 pb-8">
                <div className="container mx-auto">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">

                        {/* Coluna Esquerda - Avatar, Nome, Descrição, Info */}
                        <div className="flex flex-col items-start flex-1">

                            {/* Avatar */}
                            <div className="relative mb-6">
                                <Image
                                    src={vendor?.image}
                                    alt={vendor?.name}
                                    className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-white shadow-lg object-cover bg-white"
                                />
                                {vendor?.isVerified && (
                                    <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1.5">
                                        <Icon name="CheckCircle" size={16} color="white" />
                                    </div>
                                )}
                            </div>

                            {/* Nome com Botões na mesma linha */}
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full mb-4">
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 lg:mb-0">
                                    {vendor?.name}
                                </h1>

                                {/* Botões de Ação - Na altura do nome */}
                                <div className="flex gap-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={onShare}
                                        className="w-10 h-10 p-0 text-muted-foreground border hover:bg-muted hover:text-foreground hover:border-primary/30"
                                    >
                                        <Icon name="Share" size={18} />
                                    </Button>
                                    <Button
                                        variant="default"
                                        size="sm"
                                        onClick={onWhatsAppContact}
                                        className="w-10 h-10 p-0 bg-success hover:bg-success/90"
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                                        </svg>
                                    </Button>
                                </div>
                            </div>

                            {/* Descrição com Ler Mais */}
                            <div className="mb-4 max-w-4xl">
                                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                    {isDescriptionExpanded
                                        ? vendor?.description || vendor?.story
                                        : (vendor?.description || vendor?.story)?.substring(0, 120) + '...'
                                    }
                                </p>
                                {(vendor?.description || vendor?.story)?.length > 120 && (
                                    <button
                                        onClick={toggleDescription}
                                        className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-1 transition-colors"
                                    >
                                        {isDescriptionExpanded ? 'Ver menos' : 'Ler mais'}
                                    </button>
                                )}
                            </div>

                            {/* Informações em linha */}
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-2 mt-6">
                                {/* Localização */}
                                <div className="flex items-center gap-1">
                                    <Icon name="MapPin" size={14} className="text-gray-500" />
                                    <span>{vendor?.location}</span>
                                </div>

                                {/* Produtos */}
                                <div className="flex items-center gap-1">
                                    <Icon name="Package" size={14} className="text-gray-500" />
                                    <span>{vendor?.productCount} produtos</span>
                                </div>

                                {/* Rating */}
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1">
                                        {renderStars(vendor?.rating)}
                                    </div>
                                    <span className="font-medium text-gray-900">
                                        {vendor?.rating?.toFixed(1)}
                                    </span>
                                    <span className="text-gray-500">
                                        ({vendor?.reviewCount})
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorHeroSection;