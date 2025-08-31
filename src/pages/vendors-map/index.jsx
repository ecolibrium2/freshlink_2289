import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
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

// Fix for default markers in react-leaflet
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icons
const createCustomIcon = (vendor) => {
  const color = vendor.isOpen ? '#10B981' : '#EF4444';
  const svgIcon = `
    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="14" fill="${color}" stroke="white" stroke-width="3"/>
      <circle cx="16" cy="16" r="8" fill="white"/>
    </svg>
  `;
  
  return L.divIcon({
    html: svgIcon,
    className: 'custom-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

// Component to handle map events
const MapController = ({ center }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);

  return null;
};

const VendorsMap = () => {
    const [vendors, setVendors] = useState([]);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [filteredVendors, setFilteredVendors] = useState([]);
    const [mapCenter, setMapCenter] = useState({ lat: -23.5505, lng: -46.6333 });
    const [userLocation, setUserLocation] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentLocation, setCurrentLocation] = useState({ id: 1, name: "São Paulo, SP", distance: "Atual" });
    const [sortBy, setSortBy] = useState('distance');
    const [activeCategory, setActiveCategory] = useState('all');
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
    const [onlyOpen, setOnlyOpen] = useState(false);
    
    const categoriesRef = useRef(null);
    const [showCategoryArrows, setShowCategoryArrows] = useState(false);

    const categories = [
        { id: 'all', label: 'Todos', icon: 'Grid3X3' },
        { id: 'organicos', label: 'Orgânicos', icon: 'Leaf' },
        { id: 'frutas', label: 'Frutas', icon: 'Apple' },
        { id: 'verduras', label: 'Verduras', icon: 'Carrot' },
        { id: 'legumes', label: 'Legumes', icon: 'Wheat' },
        { id: 'temperos', label: 'Temperos', icon: 'Flower2' },
        { id: 'laticinios', label: 'Laticínios', icon: 'Milk' },
        { id: 'carnes', label: 'Carnes', icon: 'Beef' }
    ];

    const sortOptions = [
        { value: 'distance', label: 'Mais próximos' },
        { value: 'rating', label: 'Melhor avaliados' },
        { value: 'name', label: 'Nome A-Z' },
        { value: 'products', label: 'Mais produtos' },
        { value: 'reviews', label: 'Mais avaliações' }
    ];

    // Mock vendors data with coordinates
    const mockVendors = [
        {
            id: 1,
            name: "Fazenda Verde Orgânicos",
            image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=300&fit=crop",
            rating: 4.8,
            reviewCount: 127,
            location: "Vila Madalena",
            address: "Rua Harmonia, 123 - Vila Madalena",
            coordinates: { lat: -23.5505, lng: -46.6333 },
            categories: ["Orgânicos", "Frutas", "Verduras"],
            isOpen: true,
            hours: "6:00 - 18:00",
            phone: "11987654321",
            productCount: 24,
            distance: 0.8,
            description: "Produtos orgânicos frescos direto da fazenda",
            category: "organicos"
        },
        {
            id: 2,
            name: "Hortifruti do João",
            image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop",
            rating: 4.6,
            reviewCount: 89,
            location: "Pinheiros",
            address: "Av. Faria Lima, 456 - Pinheiros",
            coordinates: { lat: -23.5629, lng: -46.6825 },
            categories: ["Frutas", "Verduras", "Legumes"],
            isOpen: true,
            hours: "7:00 - 19:00",
            phone: "11987654322",
            productCount: 18,
            distance: 1.2,
            description: "Tradição em qualidade há mais de 20 anos",
            category: "frutas"
        },
        {
            id: 3,
            name: "Sítio das Frutas",
            image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&h=300&fit=crop",
            rating: 4.9,
            reviewCount: 156,
            location: "Butantã",
            address: "Rua do Matão, 789 - Butantã",
            coordinates: { lat: -23.5732, lng: -46.7234 },
            categories: ["Frutas", "Sucos", "Polpas"],
            isOpen: false,
            hours: "8:00 - 17:00",
            phone: "11987654323",
            productCount: 32,
            distance: 2.5,
            description: "As melhores frutas da região com entrega rápida",
            category: "frutas"
        },
        {
            id: 4,
            name: "Mercado da Terra",
            image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&h=300&fit=crop",
            rating: 4.4,
            reviewCount: 73,
            location: "Perdizes",
            address: "Rua Cardoso de Almeida, 321 - Perdizes",
            coordinates: { lat: -23.5365, lng: -46.6731 },
            categories: ["Verduras", "Legumes", "Temperos"],
            isOpen: true,
            hours: "6:30 - 18:30",
            phone: "11987654324",
            productCount: 15,
            distance: 1.8,
            description: "Produtos frescos colhidos diariamente",
            category: "verduras"
        },
        {
            id: 5,
            name: "Fazenda Orgânica São José",
            image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop",
            rating: 4.7,
            reviewCount: 112,
            location: "Lapa",
            address: "Rua Clélia, 654 - Lapa",
            coordinates: { lat: -23.5280, lng: -46.7042 },
            categories: ["Orgânicos", "Laticínios", "Ovos"],
            isOpen: true,
            hours: "7:00 - 17:00",
            phone: "11987654325",
            productCount: 28,
            distance: 3.1,
            description: "Fazenda familiar com certificação orgânica",
            category: "laticinios"
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
        setVendors(mockVendors);
        setFilteredVendors(mockVendors);
        
        // Get user location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ lat: latitude, lng: longitude });
                    setMapCenter({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error('Error getting location:', error);
                }
            );
        }
    }, []);

    useEffect(() => {
        filterAndSortVendors();
    }, [vendors, searchQuery, activeCategory, sortBy, onlyOpen]);

    const filterAndSortVendors = () => {
        let filtered = [...vendors];

        // Search filter
        if (searchQuery.trim()) {
            filtered = filtered.filter(vendor =>
                vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                vendor.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                vendor.categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        // Category filter
        if (activeCategory !== 'all') {
            filtered = filtered.filter(vendor => vendor.category === activeCategory);
        }
        
        // Open filter
        if (onlyOpen) {
            filtered = filtered.filter(vendor => vendor.isOpen);
        }

        // Sort vendors
        filtered.sort((a, b) => {
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
                    return a.distance - b.distance;
            }
        });
        
        setFilteredVendors(filtered);
    };

    const handleVendorClick = (vendor) => {
        setSelectedVendor(vendor);
        setMapCenter(vendor.coordinates);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
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

    const handleVendorProfileClick = (vendor, e) => {
        e?.stopPropagation();
        window.open(`/perfil-vendedor/${vendor.id}`, '_blank');
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

    const VendorCard = ({ vendor }) => (
        <div 
            className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md hover:shadow-gray-900/10 transition-all duration-300 cursor-pointer group"
            onClick={() => handleVendorClick(vendor)}
        >
            <div className="p-4">
                <div className="flex items-start space-x-4">
                    {/* Vendor Image */}
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex-shrink-0">
                        <Image
                            src={vendor.image}
                            alt={vendor.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {/* Status badge */}
                        <div className={`absolute top-2 right-2 w-3 h-3 rounded-full border-2 border-white ${
                            vendor.isOpen ? 'bg-green-500' : 'bg-red-500'
                        }`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                        {/* Vendor name and location */}
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-gray-900 text-base leading-tight line-clamp-1 group-hover:text-primary transition-colors duration-200">
                                    {vendor.name}
                                </h3>
                                <div className="flex items-center space-x-2 mt-1">
                                    <Icon name="MapPin" size={14} className="text-gray-400 flex-shrink-0" />
                                    <span className="text-sm text-gray-600 line-clamp-1">{vendor.location}</span>
                                    <span className="text-sm font-medium text-primary">• {vendor.distance}km</span>
                                </div>
                            </div>
                            
                            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                vendor.isOpen 
                                    ? 'bg-green-50 text-green-700 border border-green-200' 
                                    : 'bg-red-50 text-red-700 border border-red-200'
                            }`}>
                                {vendor.isOpen ? 'Aberto' : 'Fechado'}
                            </div>
                        </div>
                        
                        {/* Rating and products */}
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                                <div className="flex items-center space-x-1">{renderStars(vendor.rating)}</div>
                                <span className="text-sm font-bold text-gray-900">{vendor.rating.toFixed(1)}</span>
                                <span className="text-xs text-gray-500">({vendor.reviewCount})</span>
                            </div>
                            <span className="text-sm text-gray-600 font-medium">{vendor.productCount} produtos</span>
                        </div>
                        
                        {/* Categories */}
                        <div className="flex flex-wrap gap-1 mb-3">
                            {vendor.categories.slice(0, 3).map((category, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-md font-medium"
                                >
                                    {category}
                                </span>
                            ))}
                        </div>
                        
                        {/* Action buttons */}
                        <div className="flex space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => handleVendorProfileClick(vendor, e)}
                                className="flex-1 text-sm font-semibold rounded-lg hover:bg-gray-50 hover:border-primary/30 hover:text-primary transition-all duration-200"
                            >
                                Ver Produtos
                            </Button>
                            <Button
                                variant="default"
                                size="sm"
                                onClick={(e) => handleWhatsAppContact(vendor, e)}
                                className="bg-primary hover:bg-accent text-white font-semibold rounded-lg flex items-center space-x-1 transition-all duration-200"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                                </svg>
                                <span>WhatsApp</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex flex-col">
            <ResponsiveHeader />
            
            <main className="pt-16 flex-1 flex flex-col">
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

                        {/* Search and Filter controls */}
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

                            {/* Filter Controls */}
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

                                {/* Location Selector */}
                                <LocationSelector
                                    currentLocation={currentLocation}
                                    onLocationChange={handleLocationChange}
                                />

                                {/* View Mode Toggle */}
                                <div className="flex bg-white border border-gray-200 rounded-2xl p-1 shadow-sm">
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 ${
                                            viewMode === 'list'
                                                ? 'bg-primary text-white shadow-sm'
                                                : 'text-gray-500 hover:text-primary hover:bg-gray-50'
                                        }`}
                                    >
                                        <Icon name="List" size={18} />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 ${
                                            viewMode === 'grid'
                                                ? 'bg-primary text-white shadow-sm'
                                                : 'text-gray-500 hover:text-primary hover:bg-gray-50'
                                        }`}
                                    >
                                        <Icon name="Grid3X3" size={18} />
                                    </button>
                                </div>

                                {/* Only Open Filter */}
                                <button
                                    onClick={() => setOnlyOpen(!onlyOpen)}
                                    className={`flex items-center space-x-2 px-4 py-3 rounded-2xl text-sm font-semibold whitespace-nowrap transition-all duration-300 shadow-sm hover:shadow-md border ${
                                        onlyOpen
                                            ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
                                            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-primary hover:border-primary/30'
                                    }`}
                                >
                                    <Icon name="Clock" size={18} />
                                    <span>Apenas abertos</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 flex">
                    {/* Vendors List/Grid Sidebar */}
                    <div className="w-96 bg-white border-r border-gray-200 overflow-y-auto">
                        <div className="p-4">
                            {/* Results header */}
                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-1">
                                    {activeCategory === 'all' ? 'Todos os Vendedores' : categories.find(c => c.id === activeCategory)?.label}
                                </h2>
                                <p className="text-gray-600 font-medium">
                                    {filteredVendors.length} {filteredVendors.length === 1 ? 'vendedor encontrado' : 'vendedores encontrados'}
                                    {searchQuery && <span className="text-primary"> para "{searchQuery}"</span>}
                                    {onlyOpen && <span className="text-green-600"> • Apenas abertos</span>}
                                </p>
                            </div>
                            
                            {/* Vendors List */}
                            <div className="space-y-4">
                                {filteredVendors.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                                            <Icon name="Store" size={24} className="text-gray-400" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                                            Nenhum vendedor encontrado
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            Não encontramos vendedores que correspondam aos seus critérios.
                                        </p>
                                        <div className="flex flex-col gap-2">
                                            <Button
                                                onClick={handleClearSearch}
                                                variant="outline"
                                                className="rounded-xl font-medium"
                                            >
                                                Limpar busca
                                            </Button>
                                            <Button
                                                onClick={() => setActiveCategory('all')}
                                                className="rounded-xl font-medium bg-primary hover:bg-primary/90"
                                            >
                                                Ver todos os vendedores
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    filteredVendors.map((vendor) => (
                                        <div
                                            key={vendor.id}
                                            className={`transition-all duration-200 ${
                                                selectedVendor?.id === vendor.id ? 'ring-2 ring-primary/20 rounded-xl' : ''
                                            }`}
                                        >
                                            <VendorCard vendor={vendor} />
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Map Container */}
                    <div className="flex-1 relative">
                        <MapContainer
                            center={[mapCenter.lat, mapCenter.lng]}
                            zoom={13}
                            style={{ height: '100%', width: '100%' }}
                            className="z-10"
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            
                            <MapController center={[mapCenter.lat, mapCenter.lng]} />
                            
                            {/* User Location Marker */}
                            {userLocation && (
                                <Marker
                                    position={[userLocation.lat, userLocation.lng]}
                                    icon={L.divIcon({
                                        html: `
                                            <div class="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                                            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-500/20 rounded-full animate-ping"></div>
                                        `,
                                        className: 'user-location-marker',
                                        iconSize: [16, 16],
                                        iconAnchor: [8, 8],
                                    })}
                                >
                                    <Popup>
                                        <div className="text-center p-2">
                                            <div className="flex items-center space-x-2">
                                                <Icon name="MapPin" size={16} className="text-blue-500" />
                                                <span className="font-semibold text-gray-900">Sua localização</span>
                                            </div>
                                        </div>
                                    </Popup>
                                </Marker>
                            )}
                            
                            {/* Vendor Markers */}
                            {filteredVendors.map((vendor) => (
                                <Marker
                                    key={vendor.id}
                                    position={[vendor.coordinates.lat, vendor.coordinates.lng]}
                                    icon={createCustomIcon(vendor)}
                                    eventHandlers={{
                                        click: () => handleVendorClick(vendor),
                                    }}
                                >
                                    <Popup>
                                        <div className="p-3 min-w-72">
                                            <div className="flex items-start space-x-3">
                                                <div className="w-14 h-14 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex-shrink-0">
                                                    <Image
                                                        src={vendor.image}
                                                        alt={vendor.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-bold text-gray-900 text-base mb-1 line-clamp-1">
                                                        {vendor.name}
                                                    </h3>
                                                    <div className="flex items-center space-x-2 mb-2">
                                                        <Icon name="MapPin" size={12} className="text-gray-400 flex-shrink-0" />
                                                        <span className="text-xs text-gray-600 line-clamp-1">{vendor.location}</span>
                                                        <span className="text-xs font-semibold text-primary">• {vendor.distance}km</span>
                                                    </div>
                                                    <div className="flex items-center space-x-2 mb-2">
                                                        <div className="flex items-center space-x-1">{renderStars(vendor.rating).slice(0, 5)}</div>
                                                        <span className="text-xs font-bold text-gray-900">{vendor.rating.toFixed(1)}</span>
                                                        <span className="text-xs text-gray-500">({vendor.reviewCount})</span>
                                                    </div>
                                                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold mb-3 ${
                                                        vendor.isOpen 
                                                            ? 'bg-green-50 text-green-700 border border-green-200' 
                                                            : 'bg-red-50 text-red-700 border border-red-200'
                                                    }`}>
                                                        {vendor.isOpen ? 'Aberto' : 'Fechado'}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{vendor.description}</p>
                                            
                                            <div className="flex space-x-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={(e) => handleVendorProfileClick(vendor, e)}
                                                    className="flex-1 text-sm font-semibold rounded-lg"
                                                >
                                                    Ver Produtos
                                                </Button>
                                                <Button
                                                    variant="default"
                                                    size="sm"
                                                    onClick={(e) => handleWhatsAppContact(vendor, e)}
                                                    className="bg-primary hover:bg-accent text-white font-semibold rounded-lg flex items-center space-x-1"
                                                >
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                                                    </svg>
                                                    <span>WhatsApp</span>
                                                </Button>
                                            </div>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>

                        {/* Map Controls */}
                        <div className="absolute top-4 right-4 z-20 flex flex-col space-y-2">
                            <button
                                onClick={() => setMapCenter(userLocation || { lat: -23.5505, lng: -46.6333 })}
                                className="w-12 h-12 bg-white border border-gray-200 rounded-xl shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-200 flex items-center justify-center"
                                title="Centralizar no meu local"
                            >
                                <Icon name="MapPin" size={20} className="text-primary" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Selected Vendor Details Bottom Bar */}
                {selectedVendor && (
                    <div className="bg-white border-t border-gray-200 shadow-lg">
                        <div className="container mx-auto px-4 py-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                                        <Image
                                            src={selectedVendor.image}
                                            alt={selectedVendor.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-lg">
                                            {selectedVendor.name}
                                        </h3>
                                        <div className="flex items-center space-x-3 text-sm text-gray-600 mb-1">
                                            <div className="flex items-center space-x-1">
                                                <Icon name="MapPin" size={14} />
                                                <span>{selectedVendor.location}</span>
                                            </div>
                                            <span>•</span>
                                            <span className="font-semibold text-primary">{selectedVendor.distance}km</span>
                                            <span>•</span>
                                            <span className={selectedVendor.isOpen ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                                                {selectedVendor.isOpen ? 'Aberto' : 'Fechado'}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="flex items-center space-x-1">
                                                {renderStars(selectedVendor.rating)}
                                                <span className="text-sm font-bold text-gray-900 ml-1">{selectedVendor.rating.toFixed(1)}</span>
                                                <span className="text-sm text-gray-500">({selectedVendor.reviewCount} avaliações)</span>
                                            </div>
                                            <span className="text-sm text-gray-600">• {selectedVendor.productCount} produtos</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center space-x-3">
                                    <Button
                                        variant="outline"
                                        onClick={(e) => handleVendorProfileClick(selectedVendor, e)}
                                        className="font-semibold rounded-xl"
                                    >
                                        Ver Produtos
                                    </Button>
                                    <Button
                                        onClick={(e) => handleWhatsAppContact(selectedVendor, e)}
                                        className="bg-primary hover:bg-accent text-white font-semibold rounded-xl flex items-center space-x-2"
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                                        </svg>
                                        <span>Contatar no WhatsApp</span>
                                    </Button>
                                    <button
                                        onClick={() => setSelectedVendor(null)}
                                        className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors duration-200"
                                    >
                                        <Icon name="X" size={18} className="text-gray-600" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
            
            <Footer />
        </div>
    );
};

export default VendorsMap;