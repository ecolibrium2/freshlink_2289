import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ResponsiveHeader from '../../components/ui/ResponsiveHeader';
import Footer from '../../components/ui/Footer';
import LocationSelector from '../../components/ui/LocationSelector';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import Button from '../../components/ui/Button';

const VendorsPage = () => {
    const navigate = useNavigate();
    const [vendors, setVendors] = useState([]);
    const [filteredVendors, setFilteredVendors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentLocation, setCurrentLocation] = useState({ id: 1, name: "São Paulo, SP", distance: "Atual" });
    const [sortBy, setSortBy] = useState('distance');
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [statusFilter, setStatusFilter] = useState('');
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const VENDORS_PER_PAGE = 8;

    const sortOptions = [
        { value: 'distance', label: 'Mais próximos' },
        { value: 'rating', label: 'Melhor avaliados' },
        { value: 'name', label: 'Nome A-Z' },
        { value: 'products', label: 'Mais produtos' },
        { value: 'reviews', label: 'Mais avaliações' }
    ];

    const statusOptions = [
        { value: '', label: 'Todos' },
        { value: 'open', label: 'Aberto' },
        { value: 'popular', label: 'Populares' }
    ];

    // Mock suggestions for search
    const mockSuggestions = [
        { id: 1, type: 'vendor', name: 'Fazenda Verde Orgânicos', category: 'Vendedor', vendorId: 1 },
        { id: 2, type: 'vendor', name: 'Hortifruti do João', category: 'Vendedor', vendorId: 2 },
        { id: 3, type: 'vendor', name: 'Sítio das Frutas', category: 'Vendedor', vendorId: 3 },
        { id: 4, type: 'location', name: 'Vila Madalena', category: 'Localização' },
        { id: 5, type: 'vendor', name: 'Mercado da Terra', category: 'Vendedor', vendorId: 4 }
    ];

    // Mock vendors data
    const mockVendors = [
        {
            id: 1,
            name: "Fazenda Verde Orgânicos",
            image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=300&fit=crop",
            rating: 4.8,
            reviewCount: 127,
            distance: 0.8,
            location: "Vila Madalena",
            categories: ["Orgânicos", "Frutas", "Verduras"],
            isOpen: true,
            hours: "6:00 - 18:00",
            phone: "11987654321",
            isSponsored: true,
            productCount: 24,
            description: "Produtos orgânicos frescos direto da fazenda"
        },
        {
            id: 2,
            name: "Hortifruti do João",
            image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop",
            rating: 4.6,
            reviewCount: 89,
            distance: 1.2,
            location: "Pinheiros",
            categories: ["Frutas", "Verduras", "Legumes"],
            isOpen: true,
            hours: "7:00 - 19:00",
            phone: "11987654322",
            isSponsored: false,
            productCount: 18,
            description: "Tradição em qualidade há mais de 20 anos"
        },
        {
            id: 3,
            name: "Sítio das Frutas",
            image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&h=300&fit=crop",
            rating: 4.9,
            reviewCount: 156,
            distance: 1.5,
            location: "Butantã",
            categories: ["Frutas", "Sucos", "Polpas"],
            isOpen: false,
            hours: "8:00 - 17:00",
            phone: "11987654323",
            isSponsored: true,
            productCount: 32,
            description: "As melhores frutas da região com entrega rápida"
        },
        {
            id: 4,
            name: "Mercado da Terra",
            image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&h=300&fit=crop",
            rating: 4.4,
            reviewCount: 73,
            distance: 2.1,
            location: "Perdizes",
            categories: ["Verduras", "Legumes", "Temperos"],
            isOpen: true,
            hours: "6:30 - 18:30",
            phone: "11987654324",
            isSponsored: false,
            productCount: 15,
            description: "Produtos frescos colhidos diariamente"
        },
        {
            id: 5,
            name: "Fazenda Orgânica São José",
            image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop",
            rating: 4.7,
            reviewCount: 112,
            distance: 2.5,
            location: "Lapa",
            categories: ["Orgânicos", "Laticínios", "Ovos"],
            isOpen: true,
            hours: "7:00 - 17:00",
            phone: "11987654325",
            isSponsored: false,
            productCount: 28,
            description: "Fazenda familiar com certificação orgânica"
        },
        {
            id: 6,
            name: "Empório Natural",
            image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400&h=300&fit=crop",
            rating: 4.5,
            reviewCount: 94,
            distance: 3.2,
            location: "Vila Madalena",
            categories: ["Orgânicos", "Grãos", "Cereais"],
            isOpen: false,
            hours: "8:00 - 19:00",
            phone: "11987654326",
            isSponsored: false,
            productCount: 22,
            description: "Alimentação natural e saudável"
        }
    ];

    // Adicionar mais vendedores para mostrar todos, não apenas os em destaque
    const allVendors = [
        ...mockVendors,
        {
            id: 7,
            name: "Quintal da Vovó",
            image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
            rating: 4.8,
            reviewCount: 168,
            distance: 3.8,
            location: "Pompéia",
            categories: ["Frutas", "Verduras", "Conservas"],
            isOpen: true,
            hours: "6:00 - 18:00",
            phone: "11987654327",
            isSponsored: false,
            productCount: 28,
            description: "Produtos caseiros e tradicionais"
        },
        {
            id: 8,
            name: "Feira do Produtor",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
            rating: 4.3,
            reviewCount: 67,
            distance: 4.2,
            location: "Barra Funda",
            categories: ["Frutas", "Verduras", "Legumes", "Temperos"],
            isOpen: true,
            hours: "5:00 - 14:00",
            phone: "11987654328",
            isSponsored: false,
            productCount: 15,
            description: "Direto do produtor para sua mesa"
        },
        {
            id: 9,
            name: "Horta Comunitária",
            image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop",
            rating: 4.6,
            reviewCount: 92,
            distance: 2.8,
            location: "Vila Olímpia",
            categories: ["Orgânicos", "Verduras", "Temperos"],
            isOpen: false,
            hours: "7:00 - 16:00",
            phone: "11987654329",
            isSponsored: false,
            productCount: 20,
            description: "Cultivo sustentável e comunitário"
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

    // Load initial vendors
    useEffect(() => {
        loadVendors();
    }, []);

    // Filter and sort vendors
    useEffect(() => {
        filterAndSortVendors();
    }, [vendors, searchQuery, currentLocation, sortBy, statusFilter]);

    const loadVendors = async () => {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setVendors(allVendors);
        setLoading(false);
    };

    const filterAndSortVendors = useCallback(() => {
        let filtered = [...allVendors];

        // Filter by search query
        if (searchQuery.trim()) {
            filtered = filtered.filter(vendor =>
                vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                vendor.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                vendor.categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        // Filter by status
        if (statusFilter === 'open') {
            filtered = filtered.filter(vendor => vendor.isOpen);
        } else if (statusFilter === 'popular') {
            filtered = filtered.filter(vendor => vendor.rating >= 4.5);
        }

        // Filter by distance (mock - in real app would use actual location)
        filtered = filtered.filter(vendor => vendor.distance <= 5);

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
                default:
                    return 0;
            }
        });

        setFilteredVendors(filtered);
        setCurrentPage(1);
        setHasMore(filtered.length > VENDORS_PER_PAGE);
    }, [searchQuery, sortBy, statusFilter]);

    const loadMoreVendors = async () => {
        setLoadingMore(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        setCurrentPage(prev => prev + 1);
        setLoadingMore(false);
    };

    const handleSearch = (query) => {
        const trimmedQuery = query?.trim() || '';
        setSearchQuery(trimmedQuery);
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        filterAndSortVendors();
    };

    const handleLocationChange = (location) => {
        setCurrentLocation(location);
    };

    const handleWhatsAppContact = (vendor) => {
        const message = encodeURIComponent(`Olá ${vendor.name}! Vi seu perfil no FreshLink e gostaria de saber mais sobre seus produtos.`);
        const whatsappUrl = `https://wa.me/55${vendor.phone}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    };

    const displayedVendors = filteredVendors.slice(0, currentPage * VENDORS_PER_PAGE);
    const hasMoreToShow = displayedVendors.length < filteredVendors.length;

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

    const VendorCard = ({ vendor, viewMode = 'grid' }) => {
        return (
            <div className="bg-white border-2 border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-gray-900/10 transition-all duration-300 group cursor-pointer flex flex-col h-full transform hover:scale-105">
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                    <Image
                        src={vendor.image}
                        alt={vendor.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                <div className="p-3 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                            <h3 className="font-bold text-base text-gray-900 mb-1 line-clamp-1">
                                {vendor.name}
                            </h3>
                            <div className="flex items-center space-x-1 mb-2">
                                <Icon name="MapPin" size={12} className="text-gray-400" />
                                <span className="text-xs text-gray-600">
                                    {vendor.location}
                                </span>
                                <span className="text-xs text-gray-600">
                                    • {vendor.distance}km
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 mb-3">
                        <div className="flex items-center space-x-1">
                            {renderStars(vendor.rating).slice(0, 5)}
                        </div>
                        <span className="text-sm font-bold text-gray-900">
                            {vendor.rating.toFixed(1)}
                        </span>
                        <span className="text-xs text-gray-500">
                            ({vendor.reviewCount})
                        </span>
                    </div>

                    <div className="flex items-center space-x-2 mb-4">
                        <Icon
                            name="Clock"
                            size={12}
                            className={vendor.isOpen ? 'text-green-500' : 'text-red-500'}
                        />
                        <span className={`text-xs font-medium ${vendor.isOpen ? 'text-green-600' : 'text-red-600'}`}>
                            {vendor.isOpen ? 'Aberto agora' : 'Fechado'}
                        </span>
                        <span className="text-xs text-gray-500">
                            • {vendor.hours}
                        </span>
                    </div>

                    <div className="mt-auto">
                        <Button
                            variant="default"
                            size="sm"
                            fullWidth
                            onClick={() => navigate('/vendor-profile-products', { state: { vendorId: vendor.id } })}
                            disabled={!vendor.isOpen}
                            className="bg-primary hover:bg-accent text-white font-semibold py-2.5 rounded-xl"
                        >
                            <div className="flex items-center justify-center space-x-1">
                                <span>{vendor.isOpen ? 'Ver Produtos' : 'Fechado'}</span>
                                {vendor.isOpen && (
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
    };

    const LoadingSkeleton = () => (
        <div className="bg-white border-2 border-gray-100 rounded-2xl overflow-hidden animate-pulse">
            <div className="aspect-[4/3] bg-gray-200" />
            <div className="p-3 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
                <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-3 h-3 bg-gray-200 rounded" />
                    ))}
                </div>
                <div className="h-6 bg-gray-200 rounded" />
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex flex-col">
            <ResponsiveHeader />

            <main className="pt-16 flex-1">
                {/* Fixed Header */}
                <div className={`bg-white border-b border-gray-200/50 sticky z-40 transition-all duration-300 ease-in-out shadow-sm ${
                    isHeaderVisible ? 'top-16' : 'top-0'
                }`}>
                    <div className="container mx-auto px-4 py-6">
                        <div>
                            <h1 className="text-2xl font-black text-gray-900 mb-4">
                                Vendedores
                            </h1>
                        </div>

                        {/* Search and Filters */}
                        <div className="flex items-center gap-3 mb-4">
                            {/* Search Bar */}
                            <div className="flex-1 max-w-md">
                                <div className="relative">
                                    <Icon 
                                        name="Search" 
                                        size={20} 
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
                                    />
                                    <input
                                        type="text"
                                        placeholder="Buscar vendedores..."
                                        value={searchQuery}
                                        onChange={(e) => handleSearch(e.target.value)}
                                        className="w-full pl-12 pr-12 py-3 bg-white border-2 border-gray-200 rounded-2xl text-sm font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary shadow-sm hover:shadow-md transition-all duration-200"
                                    />
                                    {searchQuery && (
                                        <button
                                            onClick={handleClearSearch}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 hover:bg-gray-100 rounded-full"
                                        >
                                            <Icon name="X" size={14} />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Filters and Actions */}
                            <div className="flex items-center space-x-3">
                                {/* Status Filter */}
                                <div className="flex space-x-2">
                                    {statusOptions.map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => setStatusFilter(option.value)}
                                            className={`px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300 border-2 shadow-sm hover:shadow-md ${
                                                statusFilter === option.value
                                                    ? 'bg-primary text-white border-primary shadow-primary/25'
                                                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-primary hover:border-primary/30'
                                            }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>

                                {/* Sort Dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() => setShowSortDropdown(!showSortDropdown)}
                                        className="flex items-center space-x-2 px-4 py-2.5 bg-white border-2 border-gray-200 hover:border-primary/50 rounded-2xl text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-primary transition-all duration-200 whitespace-nowrap shadow-sm hover:shadow-md"
                                    >
                                        <Icon name="ArrowUpDown" size={16} className="text-primary" />
                                        <span className="hidden sm:inline">
                                            {sortOptions.find(opt => opt.value === sortBy)?.label}
                                        </span>
                                        <Icon name="ChevronDown" size={16} className={`transition-transform duration-200 ${showSortDropdown ? 'rotate-180' : ''}`} />
                                    </button>

                                    {showSortDropdown && (
                                        <>
                                            <div className="fixed inset-0 z-40" onClick={() => setShowSortDropdown(false)} />
                                            <div className="absolute top-full right-0 mt-2 bg-white border-2 border-gray-200 rounded-2xl shadow-xl z-50 min-w-48">
                                                {sortOptions.map((option) => (
                                                    <button
                                                        key={option.value}
                                                        onClick={() => {
                                                            setSortBy(option.value);
                                                            setShowSortDropdown(false);
                                                        }}
                                                        className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors duration-200 first:rounded-t-2xl last:rounded-b-2xl ${
                                                            sortBy === option.value
                                                                ? 'bg-primary/10 text-primary font-semibold'
                                                                : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
                                                        }`}
                                                    >
                                                        {option.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>

                                <LocationSelector
                                    currentLocation={currentLocation}
                                    onLocationChange={handleLocationChange}
                                />
                                
                                <Button
                                    variant="default"
                                    size="sm"
                                    iconName="Map"
                                    onClick={() => navigate('/vendors-map')}
                                    className="whitespace-nowrap bg-primary hover:bg-primary/90 text-white rounded-2xl font-semibold shadow-sm hover:shadow-lg"
                                >
                                    Ver no Mapa
                                </Button>
                            </div>
                        </div>

                        {/* Results Count */}
                        <p className="text-gray-600 font-medium">
                            {filteredVendors.length} vendedores encontrados
                        </p>
                    </div>
                </div>

                {/* Vendors Grid */}
                <div className="container mx-auto px-4 py-8">
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {[...Array(8)].map((_, index) => (
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
                                Tente ajustar os filtros ou expandir o raio de busca
                            </p>
                                <Button
                                    onClick={handleClearSearch}
                                    className="bg-primary hover:bg-primary/90 text-white rounded-2xl font-semibold"
                                >
                                    Limpar Filtros
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                {displayedVendors.map((vendor) => (
                                    <VendorCard key={vendor.id} vendor={vendor} />
                                ))}
                            </div>

                            {/* Load More Button */}
                            {hasMoreToShow && (
                                <div className="text-center mt-16">
                                    <Button
                                        onClick={loadMoreVendors}
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
                        </>
                    )}
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default VendorsPage;