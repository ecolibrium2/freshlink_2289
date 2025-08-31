import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ResponsiveHeader from '../../components/ui/ResponsiveHeader';
import Footer from '../../components/ui/Footer';
import LocationSelector from '../../components/ui/LocationSelector';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import Button from '../../components/ui/shadcn/button';
import Input from '../../components/ui/shadcn/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../../components/ui/shadcn/select';

const VendorsPage = () => {
    const navigate = useNavigate();
    const categoriesRef = useRef(null);
    const [vendors, setVendors] = useState([]);
    const [filteredVendors, setFilteredVendors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentLocation, setCurrentLocation] = useState({ id: 1, name: "São Paulo, SP", distance: "Atual" });
    const [sortBy, setSortBy] = useState('distance');
    const [activeCategory, setActiveCategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [statusFilter, setStatusFilter] = useState('all');
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [showCategoryArrows, setShowCategoryArrows] = useState(false);
    const [distanceFilter, setDistanceFilter] = useState('all');

    const VENDORS_PER_PAGE = 20;

    const categories = [
        { id: 'all', label: 'Todos', icon: 'Grid3X3' },
        { id: 'organicos', label: 'Orgânicos', icon: 'Leaf' },
        { id: 'frutas', label: 'Frutas', icon: 'Apple' },
        { id: 'verduras', label: 'Verduras', icon: 'Carrot' },
        { id: 'laticinios', label: 'Laticínios', icon: 'Milk' },
        { id: 'temperos', label: 'Temperos', icon: 'Flower2' },
        { id: 'legumes', label: 'Legumes', icon: 'Wheat' },
        { id: 'grãos', label: 'Grãos', icon: 'Wheat' }
    ];

    const sortOptions = [
        { value: 'distance', label: 'Mais próximos' },
        { value: 'rating', label: 'Melhor avaliados' },
        { value: 'name', label: 'Nome A-Z' },
        { value: 'products', label: 'Mais produtos' },
        { value: 'reviews', label: 'Mais avaliações' },
        { value: 'newest', label: 'Mais recentes' }
    ];

    const statusOptions = [
        { value: 'all', label: 'Todos' },
        { value: 'open', label: 'Aberto agora' },
        { value: 'popular', label: 'Populares' },
        { value: 'sponsored', label: 'Em destaque' }
    ];

    const distanceOptions = [
        { value: 'all', label: 'Qualquer distância' },
        { value: '1km', label: 'Até 1km' },
        { value: '3km', label: 'Até 3km' },
        { value: '5km', label: 'Até 5km' },
        { value: '10km', label: 'Até 10km' }
    ];

    // Mock vendors data with enhanced information
    const mockVendors = [
        {
            id: 1,
            name: "Fazenda Verde Orgânicos",
            image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=300&fit=crop",
            rating: 4.8,
            reviewCount: 127,
            distance: 0.8,
            location: "Vila Madalena",
            categories: ["organicos", "frutas", "verduras"],
            categoryLabels: ["Orgânicos", "Frutas", "Verduras"],
            isOpen: true,
            hours: "6:00 - 18:00",
            phone: "11987654321",
            isSponsored: true,
            productCount: 24,
            description: "Produtos orgânicos frescos direto da fazenda",
            deliveryTime: "30-45 min"
        },
        {
            id: 2,
            name: "Hortifruti do João",
            image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop",
            rating: 4.6,
            reviewCount: 89,
            distance: 1.2,
            location: "Pinheiros",
            categories: ["frutas", "verduras", "legumes"],
            categoryLabels: ["Frutas", "Verduras", "Legumes"],
            isOpen: true,
            hours: "7:00 - 19:00",
            phone: "11987654322",
            isSponsored: false,
            productCount: 18,
            description: "Tradição em qualidade há mais de 20 anos",
            deliveryTime: "25-40 min"
        },
        {
            id: 3,
            name: "Sítio das Frutas",
            image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&h=300&fit=crop",
            rating: 4.9,
            reviewCount: 156,
            distance: 1.5,
            location: "Butantã",
            categories: ["frutas"],
            categoryLabels: ["Frutas", "Sucos", "Polpas"],
            isOpen: false,
            hours: "8:00 - 17:00",
            phone: "11987654323",
            isSponsored: true,
            productCount: 32,
            description: "As melhores frutas da região com entrega rápida",
            deliveryTime: "35-50 min"
        },
        {
            id: 4,
            name: "Mercado da Terra",
            image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&h=300&fit=crop",
            rating: 4.4,
            reviewCount: 73,
            distance: 2.1,
            location: "Perdizes",
            categories: ["verduras", "legumes", "temperos"],
            categoryLabels: ["Verduras", "Legumes", "Temperos"],
            isOpen: true,
            hours: "6:30 - 18:30",
            phone: "11987654324",
            isSponsored: false,
            productCount: 15,
            description: "Produtos frescos colhidos diariamente",
            deliveryTime: "40-55 min"
        },
        {
            id: 5,
            name: "Fazenda Orgânica São José",
            image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop",
            rating: 4.7,
            reviewCount: 112,
            distance: 2.5,
            location: "Lapa",
            categories: ["organicos", "laticinios"],
            categoryLabels: ["Orgânicos", "Laticínios", "Ovos"],
            isOpen: true,
            hours: "7:00 - 17:00",
            phone: "11987654325",
            isSponsored: false,
            productCount: 28,
            description: "Fazenda familiar com certificação orgânica",
            deliveryTime: "45-60 min"
        },
        {
            id: 6,
            name: "Empório Natural",
            image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400&h=300&fit=crop",
            rating: 4.5,
            reviewCount: 94,
            distance: 3.2,
            location: "Vila Madalena",
            categories: ["organicos", "grãos"],
            categoryLabels: ["Orgânicos", "Grãos", "Cereais"],
            isOpen: false,
            hours: "8:00 - 19:00",
            phone: "11987654326",
            isSponsored: false,
            productCount: 22,
            description: "Alimentação natural e saudável",
            deliveryTime: "50-65 min"
        },
        {
            id: 7,
            name: "Quintal da Vovó",
            image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
            rating: 4.8,
            reviewCount: 168,
            distance: 3.8,
            location: "Pompéia",
            categories: ["frutas", "verduras"],
            categoryLabels: ["Frutas", "Verduras", "Conservas"],
            isOpen: true,
            hours: "6:00 - 18:00",
            phone: "11987654327",
            isSponsored: false,
            productCount: 28,
            description: "Produtos caseiros e tradicionais",
            deliveryTime: "55-70 min"
        },
        {
            id: 8,
            name: "Feira do Produtor",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
            rating: 4.3,
            reviewCount: 67,
            distance: 4.2,
            location: "Barra Funda",
            categories: ["frutas", "verduras", "legumes", "temperos"],
            categoryLabels: ["Frutas", "Verduras", "Legumes", "Temperos"],
            isOpen: true,
            hours: "5:00 - 14:00",
            phone: "11987654328",
            isSponsored: false,
            productCount: 15,
            description: "Direto do produtor para sua mesa",
            deliveryTime: "60-75 min"
        },
        {
            id: 9,
            name: "Horta Comunitária",
            image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop",
            rating: 4.6,
            reviewCount: 92,
            distance: 2.8,
            location: "Vila Olímpia",
            categories: ["organicos", "verduras", "temperos"],
            categoryLabels: ["Orgânicos", "Verduras", "Temperos"],
            isOpen: false,
            hours: "7:00 - 16:00",
            phone: "11987654329",
            isSponsored: false,
            productCount: 20,
            description: "Cultivo sustentável e comunitário",
            deliveryTime: "45-60 min"
        }
    ];

    // Header visibility tracking
    useEffect(() => {
        const controlHeader = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsHeaderVisible(false);
            } else if (currentScrollY < lastScrollY) {
                setIsHeaderVisible(true);
            }

            if (currentScrollY < 10) {
                setIsHeaderVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    controlHeader();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    // Check if category arrows are needed
    useEffect(() => {
        const checkCategoryOverflow = () => {
            if (categoriesRef.current) {
                const container = categoriesRef.current;
                const isOverflowing = container.scrollWidth > container.clientWidth;
                setShowCategoryArrows(isOverflowing);
            }
        };

        checkCategoryOverflow();
        window.addEventListener('resize', checkCategoryOverflow);
        return () => window.removeEventListener('resize', checkCategoryOverflow);
    }, []);

    useEffect(() => {
        loadVendors();
    }, []);

    useEffect(() => {
        filterAndSortVendors();
    }, [searchQuery, activeCategory, sortBy, currentLocation, statusFilter, distanceFilter]);

    const loadVendors = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setVendors(mockVendors);
        setLoading(false);
    };

    const filterAndSortVendors = useCallback(() => {
        let filtered = [...mockVendors];

        // Filter by search query
        if (searchQuery.trim()) {
            filtered = filtered.filter(vendor =>
                vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                vendor.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                vendor.categoryLabels.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase())) ||
                vendor.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Filter by category
        if (activeCategory !== 'all') {
            filtered = filtered.filter(vendor => vendor.categories.includes(activeCategory));
        }

        // Filter by status
        if (statusFilter === 'open') {
            filtered = filtered.filter(vendor => vendor.isOpen);
        } else if (statusFilter === 'popular') {
            filtered = filtered.filter(vendor => vendor.rating >= 4.5);
        } else if (statusFilter === 'sponsored') {
            filtered = filtered.filter(vendor => vendor.isSponsored);
        }

        // Filter by distance
        if (distanceFilter !== 'all') {
            const maxDistance = parseFloat(distanceFilter.replace('km', ''));
            filtered = filtered.filter(vendor => vendor.distance <= maxDistance);
        }

        // Sort vendors
        filtered.sort((a, b) => {
            // Sponsored vendors first
            if (a.isSponsored && !b.isSponsored) return -1;
            if (!a.isSponsored && b.isSponsored) return 1;

            switch (sortBy) {
                case 'distance':
                    return a.distance - b.distance;
                case 'rating':
                    return b.rating - a.rating;
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'products':
                    return b.productCount - a.productCount;
                case 'reviews':
                    return b.reviewCount - a.reviewCount;
                case 'newest':
                    return b.id - a.id;
                default:
                    return a.distance - b.distance;
            }
        });

        setFilteredVendors(filtered);
        setCurrentPage(1);
        setHasMore(filtered.length > VENDORS_PER_PAGE);
    }, [searchQuery, activeCategory, sortBy, statusFilter, distanceFilter]);

    const loadMoreVendors = async () => {
        setLoadingMore(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        setCurrentPage(prev => prev + 1);
        setLoadingMore(false);
    };

    const handleSearch = (query) => {
        setSearchQuery(query.trim());
    };

    const handleClearSearch = () => {
        setSearchQuery('');
    };

    const handleLocationChange = (location) => {
        setCurrentLocation(location);
    };

    const handleWhatsAppContact = (vendor, e) => {
        e?.stopPropagation();
        const message = encodeURIComponent(`Olá ${vendor.name}! Vi seu perfil no FreshLink e gostaria de saber mais sobre seus produtos.`);
        const whatsappUrl = `https://wa.me/55${vendor.phone}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    };

    const scrollCategories = (direction) => {
        if (categoriesRef.current) {
            const scrollAmount = 200;
            categoriesRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const displayedVendors = filteredVendors.slice(0, currentPage * VENDORS_PER_PAGE);
    const hasMoreToShow = displayedVendors.length < filteredVendors.length;

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <Icon key={i} name="Star" size={14} className="text-yellow-400 fill-current" />
            );
        }

        if (hasHalfStar && stars.length < 5) {
            stars.push(
                <Icon key="half" name="StarHalf" size={14} className="text-yellow-400 fill-current" />
            );
        }

        while (stars.length < 5) {
            stars.push(
                <Icon key={`empty-${stars.length}`} name="Star" size={14} className="text-gray-300" />
            );
        }

        return stars;
    };

    const VendorCard = ({ vendor }) => {
        const [hoverImage, setHoverImage] = useState(false);
        const [hoverVendorName, setHoverVendorName] = useState(false);

        const imageScale = hoverImage || hoverVendorName ? 'scale(1.05)' : 'scale(1)';
        const vendorNameColor = hoverVendorName || hoverImage ? '#3b82f6' : '#374151';

        return (
            <div
                className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md hover:shadow-gray-900/10 transition-all duration-300 group cursor-pointer flex flex-col h-full backdrop-blur-sm"
                onClick={() => navigate(`/vendor-profile-products/${vendor.id}`, { state: { vendorId: vendor.id } })}
            >
                {/* Imagem com badges */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                    <Image
                        src={vendor.image}
                        alt={vendor.name}
                        className="w-full h-full object-cover transition-transform duration-300"
                        style={{ transform: imageScale }}
                        onMouseEnter={() => {
                            setHoverImage(true);
                            setHoverVendorName(true);
                        }}
                        onMouseLeave={() => {
                            setHoverImage(false);
                            setHoverVendorName(false);
                        }}
                    />

                    {/* Badge de distância */}
                    <div className="absolute top-2 right-2 bg-accent text-white px-2 py-1 rounded-full text-xs font-medium shadow-lg z-10">
                        {vendor.distance} km
                    </div>

                    {/* Badge de patrocinado */}
                    {vendor.isSponsored && (
                        <div className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg z-10">
                            Destaque
                        </div>
                    )}

                    {/* Status overlay */}
                    {!vendor.isOpen && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                            <div className="bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold px-4 py-2 rounded-full">
                                Fechado
                            </div>
                        </div>
                    )}
                </div>

                {/* Conteúdo do vendedor */}
                <div className="p-4 flex-1 flex flex-col space-y-3">
                    {/* Nome do vendedor */}
                    <h3
                        className="font-bold text-base leading-tight line-clamp-1 cursor-pointer transition-all duration-200"
                        style={{ color: vendorNameColor }}
                        onMouseEnter={() => {
                            setHoverImage(true);
                            setHoverVendorName(true);
                        }}
                        onMouseLeave={() => {
                            setHoverImage(false);
                            setHoverVendorName(false);
                        }}
                    >
                        {vendor.name}
                    </h3>

                    {/* Localização */}
                    <div className="flex items-center space-x-2 text-sm">
                        <Icon name="MapPin" size={14} className="text-gray-400 flex-shrink-0" />
                        <span className="text-gray-600 font-medium">
                            {vendor.location} • {vendor.distance}km
                        </span>
                    </div>

                    {/* Avaliação */}
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">{renderStars(vendor.rating)}</div>
                        <span className="text-sm font-bold text-gray-900">{vendor.rating.toFixed(1)}</span>
                        <span className="text-xs text-gray-500">({vendor.reviewCount})</span>
                    </div>

                    {/* Status e horário */}
                    <div className="flex items-center space-x-2">
                        <Icon
                            name="Clock"
                            size={14}
                            className={vendor.isOpen ? 'text-green-500' : 'text-red-500'}
                        />
                        <span className={`text-sm font-medium ${vendor.isOpen ? 'text-green-600' : 'text-red-600'}`}>
                            {vendor.isOpen ? 'Aberto agora' : 'Fechado'}
                        </span>
                        <span className="text-xs text-gray-500">
                            • {vendor.hours}
                        </span>
                    </div>

                    {/* Descrição */}
                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        {vendor.description}
                    </p>

                    {/* Categorias */}
                    <div className="flex flex-wrap gap-1">
                        {vendor.categoryLabels.slice(0, 3).map((category, index) => (
                            <span
                                key={index}
                                className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium"
                            >
                                {category}
                            </span>
                        ))}
                        {vendor.categoryLabels.length > 3 && (
                            <span className="text-xs text-gray-500 px-2 py-1">
                                +{vendor.categoryLabels.length - 3}
                            </span>
                        )}
                    </div>

                    {/* Info adicional */}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{vendor.productCount} produtos</span>
                        <span>{vendor.deliveryTime}</span>
                    </div>

                    {/* Botão */}
                    <div className="mt-auto pt-2">
                        <Button
                            variant="default"
                            size="sm"
                            onClick={(e) => vendor.isOpen ? 
                                navigate(`/vendor-profile-products/${vendor.id}`, { state: { vendorId: vendor.id } }) :
                                handleWhatsAppContact(vendor, e)
                            }
                            className="w-full bg-primary hover:bg-accent text-white font-semibold py-2.5 rounded-md"
                        >
                            <div className="flex items-center justify-center space-x-2">
                                <span className="text-sm">
                                    {vendor.isOpen ? 'Ver Produtos' : 'Contatar'}
                                </span>
                                {vendor.isOpen ? (
                                    <Icon name="ArrowRight" size={16} />
                                ) : (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                                    </svg>
                                )}
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
        );
    };

    const LoadingSkeleton = () => (
        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden animate-pulse">
            <div className="aspect-[4/3] bg-gray-200" />
            <div className="p-4 space-y-3">
                <div className="space-y-2">
                    <div className="h-5 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
                <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-4 h-4 bg-gray-200 rounded" />
                    ))}
                </div>
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
                <div className="flex gap-2">
                    <div className="h-6 bg-gray-200 rounded-full w-16" />
                    <div className="h-6 bg-gray-200 rounded-full w-20" />
                </div>
                <div className="h-10 bg-gray-200 rounded-md" />
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex flex-col">
            <ResponsiveHeader />

            <main className="pt-16 flex-1">
                {/* Modern Fixed Search and Filter Bar */}
                <div className={`bg-white border-b border-gray-200/50 sticky z-40 transition-all duration-300 ease-in-out shadow-sm ${
                    isHeaderVisible ? 'top-16' : 'top-0'
                }`}>
                    <div className="container mx-auto px-4 py-4">
                        {/* Categories with modern styling */}
                        <div className="relative mb-4">
                            {showCategoryArrows && (
                                <button
                                    onClick={() => scrollCategories('left')}
                                    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-200"
                                >
                                    <Icon name="ChevronLeft" size={18} />
                                </button>
                            )}

                            <div
                                ref={categoriesRef}
                                className="flex space-x-3 overflow-x-auto scrollbar-hide pb-1"
                                style={{
                                    paddingLeft: showCategoryArrows ? '3rem' : '0',
                                    paddingRight: showCategoryArrows ? '3rem' : '0'
                                }}
                            >
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => setActiveCategory(category.id)}
                                        className={`flex items-center space-x-3 px-6 py-3 rounded-2xl text-sm font-semibold whitespace-nowrap transition-all duration-300 shadow-sm hover:shadow-md border ${
                                            activeCategory === category.id
                                                ? 'bg-primary text-white border-primary shadow-primary/25 hover:shadow-primary/40'
                                                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-primary hover:border-primary/30 hover:shadow-lg'
                                        }`}
                                    >
                                        <Icon name={category.icon} size={18} />
                                        <span>{category.label}</span>
                                    </button>
                                ))}
                            </div>

                            {showCategoryArrows && (
                                <button
                                    onClick={() => scrollCategories('right')}
                                    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-200"
                                >
                                    <Icon name="ChevronRight" size={18} />
                                </button>
                            )}
                        </div>

                        {/* Search and Filter controls with responsive design */}
                        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
                            {/* Enhanced Search Bar */}
                            <div className="flex-1 lg:max-w-md">
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <Icon name="Search" size={20} />
                                    </div>
                                    <Input
                                        type="text"
                                        placeholder="Buscar vendedores..."
                                        value={searchQuery}
                                        onChange={(e) => handleSearch(e.target.value)}
                                        className="pl-12 pr-12 py-3 bg-white border-gray-200 rounded-2xl shadow-sm hover:shadow-md focus:shadow-md placeholder:text-gray-400"
                                    />
                                    {searchQuery && (
                                        <button
                                            onClick={handleClearSearch}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 hover:bg-gray-100 rounded-full"
                                        >
                                            <Icon name="X" size={16} />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Filter Controls Container */}
                            <div className="flex items-center gap-2 flex-wrap lg:flex-nowrap">
                                {/* Sort Select */}
                                <div className="min-w-[140px] lg:min-w-[190px] flex-1 lg:flex-none">
                                    <Select value={sortBy} onValueChange={setSortBy}>
                                        <SelectTrigger className="bg-white border-gray-200 rounded-2xl shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-200 py-3 font-medium">
                                            <div className="flex items-center space-x-2">
                                                <Icon name="ArrowUpDown" size={18} className="text-primary" />
                                                <SelectValue placeholder="Ordenar por..." />
                                            </div>
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-gray-200 rounded-xl shadow-xl">
                                            {sortOptions.map((option) => (
                                                <SelectItem
                                                    key={option.value}
                                                    value={option.value}
                                                    className="py-3 px-8 hover:bg-gray-50 focus:bg-primary/10 focus:text-primary rounded-md transition-colors duration-200"
                                                >
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Status Filter */}
                                <div className="min-w-[140px] lg:min-w-[180px] flex-1 lg:flex-none">
                                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                                        <SelectTrigger className="bg-white border-gray-200 rounded-2xl shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-200 py-3 font-medium">
                                            <div className="flex items-center space-x-2">
                                                <Icon name="Clock" size={18} className="text-primary" />
                                                <SelectValue placeholder="Status..." />
                                            </div>
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-gray-200 rounded-xl shadow-xl">
                                            {statusOptions.map((option) => (
                                                <SelectItem
                                                    key={option.value}
                                                    value={option.value}
                                                    className="py-3 px-8 hover:bg-gray-50 focus:bg-primary/10 focus:text-primary rounded-md transition-colors duration-200"
                                                >
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Distance Filter */}
                                <div className="min-w-[140px] lg:min-w-[180px] flex-1 lg:flex-none">
                                    <Select value={distanceFilter} onValueChange={setDistanceFilter}>
                                        <SelectTrigger className="bg-white border-gray-200 rounded-2xl shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-200 py-3 font-medium">
                                            <div className="flex items-center space-x-2">
                                                <Icon name="MapPin" size={18} className="text-primary" />
                                                <SelectValue placeholder="Distância..." />
                                            </div>
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-gray-200 rounded-xl shadow-xl">
                                            {distanceOptions.map((option) => (
                                                <SelectItem
                                                    key={option.value}
                                                    value={option.value}
                                                    className="py-3 px-8 hover:bg-gray-50 focus:bg-primary/10 focus:text-primary rounded-md transition-colors duration-200"
                                                >
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Location Selector */}
                                <LocationSelector
                                    currentLocation={currentLocation}
                                    onLocationChange={handleLocationChange}
                                />

                                {/* Map View Button */}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => navigate('/vendors-map')}
                                    className="whitespace-nowrap bg-white border-gray-200 hover:bg-gray-50 hover:text-primary hover:border-primary/50 rounded-2xl font-medium shadow-sm hover:shadow-md transition-all duration-200 py-3"
                                >
                                    <div className="flex items-center space-x-2">
                                        <Icon name="Map" size={18} className="text-primary" />
                                        <span className="hidden sm:inline">Ver no Mapa</span>
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vendors Grid with enhanced spacing */}
                <div className="container mx-auto px-4 py-8">
                    {/* Results header */}
                    {!loading && (
                        <div className="mb-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-black text-gray-900 mb-1">
                                        {activeCategory === 'all' ? 'Todos os Vendedores' : categories.find(c => c.id === activeCategory)?.label}
                                    </h2>
                                    <p className="text-gray-600 font-medium">
                                        {filteredVendors.length} {filteredVendors.length === 1 ? 'vendedor encontrado' : 'vendedores encontrados'}
                                        {searchQuery && <span className="text-primary"> para "{searchQuery}"</span>}
                                        {statusFilter !== 'all' && (
                                            <span className="text-green-600"> • {statusOptions.find(s => s.value === statusFilter)?.label}</span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {[...Array(10)].map((_, index) => (
                                <LoadingSkeleton key={index} />
                            ))}
                        </div>
                    ) : displayedVendors.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="max-w-md mx-auto">
                                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                                    <Icon name="Store" size={32} className="text-gray-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                    Nenhum vendedor encontrado
                                </h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Não encontramos vendedores que correspondam aos seus critérios de busca.
                                    Tente ajustar os filtros ou expandir o raio de busca.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                    <Button
                                        onClick={handleClearSearch}
                                        variant="outline"
                                        className="rounded-xl font-medium"
                                    >
                                        Limpar busca
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            setActiveCategory('all');
                                            setStatusFilter('all');
                                            setDistanceFilter('all');
                                        }}
                                        className="rounded-xl font-medium bg-primary hover:bg-primary/90"
                                    >
                                        Ver todos os vendedores
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                {displayedVendors.map((vendor) => (
                                    <VendorCard key={vendor.id} vendor={vendor} />
                                ))}
                            </div>

                            {hasMoreToShow && (
                                <div className="text-center mt-16">
                                    <Button
                                        onClick={loadMoreVendors}
                                        loading={loadingMore}
                                        variant="outline"
                                        size="lg"
                                        className="bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-primary/50 rounded-2xl px-8 py-4 font-semibold text-base shadow-sm hover:shadow-lg transition-all duration-200"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <Icon name="Plus" size={20} />
                                            <span>Carregar mais vendedores</span>
                                        </div>
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default VendorsPage;