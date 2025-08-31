import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { 
    Search, 
    MapPin, 
    Star, 
    StarHalf, 
    Clock, 
    List, 
    Grid3X3, 
    ChevronLeft, 
    ChevronRight, 
    X, 
    ArrowUpDown,
    Store,
    Apple,
    Leaf,
    Carrot,
    Wheat,
    Flower2,
    Milk,
    Beef,
    Phone
} from 'lucide-react';

// Fix for default markers in react-leaflet
const L = window.L || {};
if (L.Icon) {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
}

// Custom marker icons
const createCustomIcon = (vendor) => {
    const color = vendor.isOpen ? '#10B981' : '#EF4444';
    const svgIcon = `
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="14" fill="${color}" stroke="white" stroke-width="3"/>
            <circle cx="16" cy="16" r="8" fill="white"/>
        </svg>
    `;
    
    return L.divIcon ? L.divIcon({
        html: svgIcon,
        className: 'custom-marker',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
    }) : null;
};

// Component to handle map events
const MapController = ({ center }) => {
    const map = useMap();
    
    useEffect(() => {
        if (map && center) {
            map.setView(center, map.getZoom());
        }
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
    const [currentLocation, setCurrentLocation] = useState('São Paulo, SP');
    const [sortBy, setSortBy] = useState('distance');
    const [activeCategory, setActiveCategory] = useState('all');
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
    const [onlyOpen, setOnlyOpen] = useState(false);
    
    const categoriesRef = useRef(null);
    const [showCategoryArrows, setShowCategoryArrows] = useState(false);

    const categories = [
        { id: 'all', label: 'Todos', icon: Grid3X3 },
        { id: 'organicos', label: 'Orgânicos', icon: Leaf },
        { id: 'frutas', label: 'Frutas', icon: Apple },
        { id: 'verduras', label: 'Verduras', icon: Carrot },
        { id: 'legumes', label: 'Legumes', icon: Wheat },
        { id: 'temperos', label: 'Temperos', icon: Flower2 },
        { id: 'laticinios', label: 'Laticínios', icon: Milk },
        { id: 'carnes', label: 'Carnes', icon: Beef }
    ];

    const sortOptions = [
        { value: 'distance', label: 'Mais próximos' },
        { value: 'rating', label: 'Melhor avaliados' },
        { value: 'name', label: 'Nome A-Z' },
        { value: 'products', label: 'Mais produtos' },
        { value: 'reviews', label: 'Mais avaliações' }
    ];

    const locationOptions = [
        { value: 'sao-paulo', label: 'São Paulo, SP' },
        { value: 'rio-janeiro', label: 'Rio de Janeiro, RJ' },
        { value: 'belo-horizonte', label: 'Belo Horizonte, MG' },
        { value: 'salvador', label: 'Salvador, BA' },
        { value: 'curitiba', label: 'Curitiba, PR' }
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

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <Star key={i} size={14} className="text-yellow-400 fill-current" />
            );
        }

        if (hasHalfStar && stars.length < 5) {
            stars.push(
                <StarHalf key="half" size={14} className="text-yellow-400 fill-current" />
            );
        }

        while (stars.length < 5) {
            stars.push(
                <Star key={`empty-${stars.length}`} size={14} className="text-gray-300" />
            );
        }

        return stars;
    };

    const VendorCard = ({ vendor }) => (
        <div 
            className={`bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-blue-300 transition-all duration-300 cursor-pointer group ${
                selectedVendor?.id === vendor.id ? 'ring-2 ring-blue-500 border-blue-500' : ''
            }`}
            onClick={() => handleVendorClick(vendor)}
        >
            <div className="p-6">
                <div className="flex items-start space-x-4">
                    {/* Vendor Image */}
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex-shrink-0">
                        <img
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
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1 group-hover:text-blue-600 transition-colors duration-200">
                                    {vendor.name}
                                </h3>
                                <div className="flex items-center space-x-2">
                                    <MapPin size={14} className="text-gray-400 flex-shrink-0" />
                                    <span className="text-sm text-gray-600">{vendor.location}</span>
                                    <span className="text-sm font-semibold text-blue-600">• {vendor.distance}km</span>
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
                        <div className="flex flex-wrap gap-2 mb-4">
                            {vendor.categories.slice(0, 3).map((category, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium"
                                >
                                    {category}
                                </span>
                            ))}
                        </div>
                        
                        {/* Description */}
                        <p className="text-gray-600 text-sm mb-4">{vendor.description}</p>
                        
                        {/* Action buttons */}
                        <div className="flex space-x-3">
                            <button
                                onClick={(e) => handleVendorProfileClick(vendor, e)}
                                className="flex-1 px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-all duration-200"
                            >
                                Ver Produtos
                            </button>
                            <button
                                onClick={(e) => handleWhatsAppContact(vendor, e)}
                                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg flex items-center space-x-2 transition-all duration-200"
                            >
                                <Phone size={16} />
                                <span>WhatsApp</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const VendorGridCard = ({ vendor }) => (
        <div 
            className={`bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-blue-300 transition-all duration-300 cursor-pointer group ${
                selectedVendor?.id === vendor.id ? 'ring-2 ring-blue-500 border-blue-500' : ''
            }`}
            onClick={() => handleVendorClick(vendor)}
        >
            <div className="relative h-40 bg-gradient-to-br from-gray-50 to-gray-100">
                <img
                    src={vendor.image}
                    alt={vendor.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className={`absolute top-3 right-3 w-3 h-3 rounded-full border-2 border-white ${
                    vendor.isOpen ? 'bg-green-500' : 'bg-red-500'
                }`} />
                <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold ${
                    vendor.isOpen 
                        ? 'bg-green-50/90 text-green-700 border border-green-200/50' 
                        : 'bg-red-50/90 text-red-700 border border-red-200/50'
                }`}>
                    {vendor.isOpen ? 'Aberto' : 'Fechado'}
                </div>
            </div>
            
            <div className="p-4">
                <h3 className="font-bold text-gray-900 text-base mb-2 group-hover:text-blue-600 transition-colors duration-200">
                    {vendor.name}
                </h3>
                
                <div className="flex items-center space-x-2 mb-2">
                    <MapPin size={12} className="text-gray-400 flex-shrink-0" />
                    <span className="text-xs text-gray-600">{vendor.location}</span>
                    <span className="text-xs font-semibold text-blue-600">• {vendor.distance}km</span>
                </div>
                
                <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center space-x-1">{renderStars(vendor.rating).slice(0, 5)}</div>
                    <span className="text-xs font-bold text-gray-900">{vendor.rating.toFixed(1)}</span>
                    <span className="text-xs text-gray-500">({vendor.reviewCount})</span>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-3">
                    {vendor.categories.slice(0, 2).map((category, index) => (
                        <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md font-medium"
                        >
                            {category}
                        </span>
                    ))}
                </div>
                
                <div className="flex space-x-2">
                    <button
                        onClick={(e) => handleVendorProfileClick(vendor, e)}
                        className="flex-1 px-3 py-2 text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-all duration-200"
                    >
                        Ver Produtos
                    </button>
                    <button
                        onClick={(e) => handleWhatsAppContact(vendor, e)}
                        className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all duration-200"
                    >
                        <Phone size={14} />
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <h1 className="text-2xl font-bold text-gray-900">FreshLink - Mapa de Vendedores</h1>
                </div>
            </header>
            
            <main className="max-w-7xl mx-auto px-4 py-6">
                {/* Filter Bar */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm mb-6">
                    <div className="p-6">
                        {/* Categories */}
                        <div className="mb-6">
                            <div className="flex space-x-3 overflow-x-auto pb-2">
                                {categories.map((category) => {
                                    const IconComponent = category.icon;
                                    return (
                                        <button
                                            key={category.id}
                                            onClick={() => setActiveCategory(category.id)}
                                            className={`flex items-center space-x-2 px-4 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 border ${
                                                activeCategory === category.id
                                                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                                                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                                            }`}
                                        >
                                            <IconComponent size={18} />
                                            <span>{category.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Search and Controls */}
                        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
                            {/* Search Bar */}
                            <div className="flex-1 lg:max-w-md">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Buscar vendedores..."
                                        value={searchQuery}
                                        onChange={(e) => handleSearch(e.target.value)}
                                        className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    {searchQuery && (
                                        <button
                                            onClick={handleClearSearch}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            <X size={16} />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="flex items-center gap-3">
                                {/* Sort Select */}
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="px-4 py-3 border border-gray-200 rounded-xl bg-white font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    {sortOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>

                                {/* Location Selector */}
                                <select
                                    value={currentLocation}
                                    onChange={(e) => setCurrentLocation(e.target.value)}
                                    className="px-4 py-3 border border-gray-200 rounded-xl bg-white font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    {locationOptions.map((option) => (
                                        <option key={option.value} value={option.label}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>

                                {/* View Mode Toggle */}
                                <div className="flex bg-white border border-gray-200 rounded-xl p-1">
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 ${
                                            viewMode === 'list'
                                                ? 'bg-blue-500 text-white'
                                                : 'text-gray-500 hover:text-blue-500 hover:bg-blue-50'
                                        }`}
                                    >
                                        <List size={18} />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 ${
                                            viewMode === 'grid'
                                                ? 'bg-blue-500 text-white'
                                                : 'text-gray-500 hover:text-blue-500 hover:bg-blue-50'
                                        }`}
                                    >
                                        <Grid3X3 size={18} />
                                    </button>
                                </div>

                                {/* Only Open Filter */}
                                <button
                                    onClick={() => setOnlyOpen(!onlyOpen)}
                                    className={`flex items-center space-x-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                                        onlyOpen
                                            ? 'bg-green-50 text-green-700 border-green-200'
                                            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                                    }`}
                                >
                                    <Clock size={18} />
                                    <span>Apenas abertos</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Vendors List/Grid */}
                    <div className="lg:col-span-2">
                        <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
                            <div className="p-6">
                                {/* Results header */}
                                <div className="mb-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-1">
                                        {activeCategory === 'all' ? 'Todos os Vendedores' : categories.find(c => c.id === activeCategory)?.label}
                                    </h2>
                                    <p className="text-gray-600">
                                        {filteredVendors.length} {filteredVendors.length === 1 ? 'vendedor encontrado' : 'vendedores encontrados'}
                                        {searchQuery && <span className="text-blue-600"> para "{searchQuery}"</span>}
                                    </p>
                                </div>
                                
                                {/* Vendors List/Grid */}
                                {filteredVendors.length === 0 ? (
                                    <div className="text-center py-12">
                                        <Store size={48} className="text-gray-400 mx-auto mb-4" />
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                                            Nenhum vendedor encontrado
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            Não encontramos vendedores que correspondam aos seus critérios.
                                        </p>
                                        <div className="flex flex-col gap-2 max-w-sm mx-auto">
                                            <button
                                                onClick={handleClearSearch}
                                                className="px-4 py-2 text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 font-medium"
                                            >
                                                Limpar busca
                                            </button>
                                            <button
                                                onClick={() => setActiveCategory('all')}
                                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
                                            >
                                                Ver todos os vendedores
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className={viewMode === 'grid' 
                                        ? 'grid grid-cols-1 md:grid-cols-2 gap-4' 
                                        : 'space-y-4'
                                    }>
                                        {filteredVendors.map((vendor) => (
                                            <div key={vendor.id}>
                                                {viewMode === 'grid' ? (
                                                    <VendorGridCard vendor={vendor} />
                                                ) : (
                                                    <VendorCard vendor={vendor} />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Map Container */}
                    <div className="lg:col-span-1">
                        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                            <div className="h-96 lg:h-[600px] relative">
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
                                    {userLocation && L.divIcon && (
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
                                                        <MapPin size={16} className="text-blue-500" />
                                                        <span className="font-semibold text-gray-900">Sua localização</span>
                                                    </div>
                                                </div>
                                            </Popup>
                                        </Marker>
                                    )}
                                    
                                    {/* Vendor Markers */}
                                    {filteredVendors.map((vendor) => {
                                        const icon = createCustomIcon(vendor);
                                        return icon ? (
                                            <Marker
                                                key={vendor.id}
                                                position={[vendor.coordinates.lat, vendor.coordinates.lng]}
                                                icon={icon}
                                                eventHandlers={{
                                                    click: () => handleVendorClick(vendor),
                                                }}
                                            >
                                                <Popup>
                                                    <div className="p-3 min-w-72">
                                                        <div className="flex items-start space-x-3">
                                                            <div className="w-14 h-14 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex-shrink-0">
                                                                <img
                                                                    src={vendor.image}
                                                                    alt={vendor.name}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <h3 className="font-bold text-gray-900 text-base mb-1">
                                                                    {vendor.name}
                                                                </h3>
                                                                <div className="flex items-center space-x-2 mb-2">
                                                                    <MapPin size={12} className="text-gray-400 flex-shrink-0" />
                                                                    <span className="text-xs text-gray-600">{vendor.location}</span>
                                                                    <span className="text-xs font-semibold text-blue-600">• {vendor.distance}km</span>
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
                                                        
                                                        <p className="text-sm text-gray-600 mb-3">{vendor.description}</p>
                                                        
                                                        <div className="flex space-x-2">
                                                            <button
                                                                onClick={(e) => handleVendorProfileClick(vendor, e)}
                                                                className="flex-1 px-3 py-2 text-sm font-semibold text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100"
                                                            >
                                                                Ver Produtos
                                                            </button>
                                                            <button
                                                                onClick={(e) => handleWhatsAppContact(vendor, e)}
                                                                className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg flex items-center space-x-1"
                                                            >
                                                                <Phone size={14} />
                                                                <span>WhatsApp</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </Popup>
                                            </Marker>
                                        ) : null;
                                    })}
                                </MapContainer>

                                {/* Map Controls */}
                                <div className="absolute top-4 right-4 z-20">
                                    <button
                                        onClick={() => setMapCenter(userLocation || { lat: -23.5505, lng: -46.6333 })}
                                        className="w-10 h-10 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-50 hover:shadow-lg transition-all duration-200 flex items-center justify-center"
                                        title="Centralizar no meu local"
                                    >
                                        <MapPin size={18} className="text-blue-600" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Selected Vendor Details Bottom Bar */}
                {selectedVendor && (
                    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
                        <div className="max-w-7xl mx-auto px-4 py-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                                        <img
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
                                                <MapPin size={14} />
                                                <span>{selectedVendor.location}</span>
                                            </div>
                                            <span>•</span>
                                            <span className="font-semibold text-blue-600">{selectedVendor.distance}km</span>
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
                                    <button
                                        onClick={(e) => handleVendorProfileClick(selectedVendor, e)}
                                        className="px-4 py-2 text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 font-semibold"
                                    >
                                        Ver Produtos
                                    </button>
                                    <button
                                        onClick={(e) => handleWhatsAppContact(selectedVendor, e)}
                                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg flex items-center space-x-2"
                                    >
                                        <Phone size={18} />
                                        <span>Contatar no WhatsApp</span>
                                    </button>
                                    <button
                                        onClick={() => setSelectedVendor(null)}
                                        className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                                    >
                                        <X size={18} className="text-gray-600" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default VendorsMap;