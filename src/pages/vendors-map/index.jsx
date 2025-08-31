import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import ResponsiveHeader from '../../components/ui/ResponsiveHeader';
import Footer from '../../components/ui/Footer';
import SearchBar from '../../components/ui/SearchBar';
import LocationSelector from '../../components/ui/LocationSelector';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';

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
  const color = vendor.isOpen ? '#10B981' : '#EF4444'; // success or error color
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
const MapController = ({ center, onMapClick }) => {
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
    const [mapCenter, setMapCenter] = useState({ lat: -23.5505, lng: -46.6333 }); // São Paulo
    const [userLocation, setUserLocation] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentLocation, setCurrentLocation] = useState({ id: 1, name: "São Paulo, SP", distance: "Atual" });
    const [filters, setFilters] = useState({
        category: '',
        isOpen: false,
        distance: 10
    });

    // Mock vendors data with coordinates
    const mockVendors = [
        {
            id: 1,
            name: "Fazenda Verde Orgânicos",
            image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=300&fit=crop",
            rating: 4.8,
            reviewCount: 127,
            location: "Vila Madalena",
            coordinates: { lat: -23.5505, lng: -46.6333 },
            categories: ["Orgânicos", "Frutas", "Verduras"],
            isOpen: true,
            hours: "6:00 - 18:00",
            phone: "11987654321",
            productCount: 24,
            description: "Produtos orgânicos frescos direto da fazenda"
        },
        {
            id: 2,
            name: "Hortifruti do João",
            image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop",
            rating: 4.6,
            reviewCount: 89,
            location: "Pinheiros",
            coordinates: { lat: -23.5629, lng: -46.6825 },
            categories: ["Frutas", "Verduras", "Legumes"],
            isOpen: true,
            hours: "7:00 - 19:00",
            phone: "11987654322",
            productCount: 18,
            description: "Tradição em qualidade há mais de 20 anos"
        },
        {
            id: 3,
            name: "Sítio das Frutas",
            image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&h=300&fit=crop",
            rating: 4.9,
            reviewCount: 156,
            location: "Butantã",
            coordinates: { lat: -23.5732, lng: -46.7234 },
            categories: ["Frutas", "Sucos", "Polpas"],
            isOpen: false,
            hours: "8:00 - 17:00",
            phone: "11987654323",
            productCount: 32,
            description: "As melhores frutas da região com entrega rápida"
        },
        {
            id: 4,
            name: "Mercado da Terra",
            image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&h=300&fit=crop",
            rating: 4.4,
            reviewCount: 73,
            location: "Perdizes",
            coordinates: { lat: -23.5365, lng: -46.6731 },
            categories: ["Verduras", "Legumes", "Temperos"],
            isOpen: true,
            hours: "6:30 - 18:30",
            phone: "11987654324",
            productCount: 15,
            description: "Produtos frescos colhidos diariamente"
        },
        {
            id: 5,
            name: "Fazenda Orgânica São José",
            image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop",
            rating: 4.7,
            reviewCount: 112,
            location: "Lapa",
            coordinates: { lat: -23.5280, lng: -46.7042 },
            categories: ["Orgânicos", "Laticínios", "Ovos"],
            isOpen: true,
            hours: "7:00 - 17:00",
            phone: "11987654325",
            productCount: 28,
            description: "Fazenda familiar com certificação orgânica"
        }
    ];

    // Mock suggestions for search
    const mockSuggestions = [
        { id: 1, type: 'vendor', name: 'Fazenda Verde Orgânicos', category: 'Vendedor', vendorId: 1 },
        { id: 2, type: 'vendor', name: 'Hortifruti do João', category: 'Vendedor', vendorId: 2 },
        { id: 3, type: 'vendor', name: 'Sítio das Frutas', category: 'Vendedor', vendorId: 3 },
        { id: 4, type: 'location', name: 'Vila Madalena', category: 'Localização' },
        { id: 5, type: 'vendor', name: 'Mercado da Terra', category: 'Vendedor', vendorId: 4 }
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
        filterVendors();
    }, [vendors, searchQuery, filters]);

    const filterVendors = () => {
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
        if (filters.category && !vendor.categories.some(cat => 
            cat.toLowerCase().includes(filters.category.toLowerCase())
        )) {
            return false;
        }
        
        // Open filter
        if (filters.isOpen && !vendor.isOpen) {
            return false;
        }
        
        setFilteredVendors(filtered);
    };

    const handleVendorClick = (vendor) => {
        setSelectedVendor(vendor);
        setMapCenter(vendor.coordinates);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleSuggestionClick = (suggestion) => {
        if (suggestion.type === 'vendor') {
            const vendor = vendors.find(v => v.id === suggestion.vendorId);
            if (vendor) {
                handleVendorClick(vendor);
            }
        }
    };

    const handleLocationChange = (location) => {
        setCurrentLocation(location);
        // In a real app, this would update the map center and reload vendors
    };

    const handleWhatsAppContact = (vendor) => {
        const message = encodeURIComponent(`Olá ${vendor.name}! Vi seu perfil no FreshLink e gostaria de saber mais sobre seus produtos.`);
        const whatsappUrl = `https://wa.me/55${vendor.phone}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleVendorProfileClick = (vendor) => {
        window.open(`/vendor-profile-products?id=${vendor.id}`, '_blank');
    };

    // Filter suggestions based on search query
    const filteredSuggestions = searchQuery && searchQuery.trim().length > 0
        ? mockSuggestions.filter(item =>
            item?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
        ).slice(0, 5)
        : [];

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        
        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <Icon key={i} name="Star" size={12} className="text-warning fill-current" />
            );
        }
        
        return stars;
    };

    // Category Filter Component
    const CategoryFilter = () => {
        const categoryOptions = [
            { value: '', label: 'Todas as categorias' },
            { value: 'organicos', label: 'Orgânicos' },
            { value: 'frutas', label: 'Frutas' },
            { value: 'verduras', label: 'Verduras' },
            { value: 'legumes', label: 'Legumes' },
            { value: 'temperos', label: 'Temperos' },
            { value: 'laticinios', label: 'Laticínios' }
        ];

        const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

        return (
            <div className="relative">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowCategoryDropdown(!showCategoryDropdown);
                    }}
                    className="flex items-center space-x-2 px-3 py-2 bg-muted border border-border rounded-lg text-sm font-body font-medium text-foreground hover:bg-muted/80 transition-colors duration-200 whitespace-nowrap"
                >
                    <Icon name="Filter" size={16} className="text-primary" />
                    <span className="hidden sm:inline">
                        {categoryOptions.find(opt => opt.value === filters.category)?.label || 'Categoria'}
                    </span>
                    <Icon
                        name="ChevronDown"
                        size={16}
                        className={`transition-transform duration-200 ${showCategoryDropdown ? 'rotate-180' : ''}`}
                    />
                </button>

                {showCategoryDropdown && (
                    <>
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setShowCategoryDropdown(false)}
                        />
                        <div className="absolute top-full right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 min-w-64">
                            <div className="max-h-60 overflow-y-auto">
                                {categoryOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => {
                                            setFilters(prev => ({ ...prev, category: option.value }));
                                            setShowCategoryDropdown(false);
                                        }}
                                        className={`w-full flex items-center justify-between px-4 py-3 text-sm font-body transition-colors duration-200 ${
                                            filters.category === option.value
                                                ? 'bg-primary/10 text-primary'
                                                : 'text-foreground hover:bg-muted'
                                        }`}
                                    >
                                        <span className="font-medium">{option.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        );
    };

    const VendorCard = ({ vendor }) => (
        <div className="bg-card border border-border rounded-xl p-4 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start space-x-3">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <Image
                        src={vendor.image}
                        alt={vendor.name}
                        className="w-full h-full object-cover"
                    />
                </div>
                
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                            <h3 className="font-body font-medium text-foreground truncate">
                                {vendor.name}
                            </h3>
                            <div className="flex items-center space-x-1 mb-1">
                                <Icon name="MapPin" size={12} className="text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">{vendor.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                {renderStars(vendor.rating)}
                                <span className="text-xs font-medium text-foreground ml-1">
                                    {vendor.rating.toFixed(1)}
                                </span>
                            </div>
                        </div>
                        
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                            vendor.isOpen 
                                ? 'bg-success/10 text-success' 
                                : 'bg-error/10 text-error'
                        }`}>
                            {vendor.isOpen ? 'Aberto' : 'Fechado'}
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                        {vendor.categories.slice(0, 2).map((category, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                            >
                                {category}
                            </span>
                        ))}
                    </div>
                    
                    <div className="flex space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleVendorProfileClick(vendor)}
                            className="flex-1 text-xs"
                        >
                            Ver Produtos
                        </Button>
                        <Button
                            variant="default"
                            size="sm"
                            iconName="MessageCircle"
                            onClick={() => handleWhatsAppContact(vendor)}
                            className="bg-success hover:bg-success/90 text-xs"
                        >
                            WhatsApp
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <ResponsiveHeader />
            
            <main className="pt-16 flex-1 flex flex-col">
                {/* Header */}
                <div className="bg-card border-b border-border">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h1 className="text-xl font-heading font-bold text-foreground">
                                    Mapa de Vendedores
                                </h1>
                                <p className="text-sm text-muted-foreground">
                                    {filteredVendors.length} vendedores próximos
                                </p>
                            </div>
                        </div>

                        {/* Search and Filters */}
                        <div className="flex items-center gap-3">
                            {/* Search Bar */}
                            <div className="flex-1">
                                <SearchBar
                                    onSearch={handleSearch}
                                    onSuggestionClick={handleSuggestionClick}
                                    suggestions={filteredSuggestions}
                                    placeholder="Buscar vendedores..."
                                    value={searchQuery}
                                    showSuggestionsOnFocus={false}
                                />
                            </div>

                            {/* Filters */}
                            <div className="flex items-center space-x-3">
                                <CategoryFilter />
                                <LocationSelector
                                    currentLocation={currentLocation}
                                    onLocationChange={handleLocationChange}
                                />
                            <Button
                                variant="outline"
                                size="sm"
                                iconName="Filter"
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                Filtros
                            </Button>
                            </div>
                        </div>
                        
                        {/* Filters */}
                        {showFilters && (
                            <div className="mt-4 bg-card border border-border rounded-lg p-4">
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="openOnly"
                                            checked={filters.isOpen}
                                            onChange={(e) => setFilters(prev => ({ ...prev, isOpen: e.target.checked }))}
                                            className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                                        />
                                        <label htmlFor="openOnly" className="text-sm font-body font-medium text-foreground">
                                            Apenas abertos agora
                                        </label>
                                    </div>
                                    
                                    <div className="flex items-center space-x-3">
                                        <label className="text-sm font-body font-medium text-foreground">
                                            Raio: {filters.distance}km
                                        </label>
                                        <input
                                            type="range"
                                            min="1"
                                            max="20"
                                            value={filters.distance}
                                            onChange={(e) => setFilters(prev => ({ ...prev, distance: parseInt(e.target.value) }))}
                                            className="w-24"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex-1 flex">
                    {/* Map Container */}
                    <div className="flex-1 relative">
                        {/* Real Interactive Map */}
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
                                        <div className="text-center">
                                            <p className="font-medium">Sua localização</p>
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
                                        <div className="p-2 min-w-64">
                                            <div className="flex items-start space-x-3">
                                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                                                    <Image
                                                        src={vendor.image}
                                                        alt={vendor.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-body font-medium text-foreground mb-1">
                                                        {vendor.name}
                                                    </h3>
                                                    <div className="flex items-center space-x-1 mb-2">
                                                        <Icon name="MapPin" size={12} className="text-muted-foreground" />
                                                        <span className="text-xs text-muted-foreground">{vendor.location}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-1 mb-2">
                                                        {renderStars(vendor.rating).slice(0, 5)}
                                                        <span className="text-xs font-medium text-foreground ml-1">
                                                            {vendor.rating.toFixed(1)}
                                                        </span>
                                                    </div>
                                                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                        vendor.isOpen 
                                                            ? 'bg-success/10 text-success' 
                                                            : 'bg-error/10 text-error'
                                                    }`}>
                                                        {vendor.isOpen ? 'Aberto' : 'Fechado'}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex space-x-2 mt-3">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleVendorProfileClick(vendor)}
                                                    className="flex-1 text-xs"
                                                >
                                                    Ver Produtos
                                                </Button>
                                                <Button
                                                    variant="default"
                                                    size="sm"
                                                    iconName="MessageCircle"
                                                    onClick={() => handleWhatsAppContact(vendor)}
                                                    className="bg-success hover:bg-success/90 text-xs"
                                                >
                                                    WhatsApp
                                                </Button>
                                            </div>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>

                    {/* Sidebar */}
                    <div className="w-80 bg-card border-l border-border overflow-y-auto">
                        <div className="p-4">
                            <h2 className="font-heading font-semibold text-foreground mb-4">
                                Vendedores Próximos
                            </h2>
                            
                            <div className="space-y-3">
                                {filteredVendors.map((vendor) => (
                                    <div
                                        key={vendor.id}
                                        className={`cursor-pointer transition-all duration-200 ${
                                            selectedVendor?.id === vendor.id ? 'ring-2 ring-primary/20' : ''
                                        }`}
                                        onClick={() => handleVendorClick(vendor)}
                                    >
                                        <VendorCard vendor={vendor} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Selected Vendor Details */}
                {selectedVendor && (
                    <div className="bg-card border-t border-border p-4">
                        <div className="container mx-auto">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                                        <Image
                                            src={selectedVendor.image}
                                            alt={selectedVendor.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-body font-semibold text-foreground">
                                            {selectedVendor.name}
                                        </h3>
                                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                            <Icon name="MapPin" size={14} />
                                            <span>{selectedVendor.location}</span>
                                            <span>•</span>
                                            <span className={selectedVendor.isOpen ? 'text-success' : 'text-error'}>
                                                {selectedVendor.isOpen ? 'Aberto' : 'Fechado'}
                                            </span>
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {selectedVendor.description}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleVendorProfileClick(selectedVendor)}
                                    >
                                        Ver Produtos
                                    </Button>
                                    <Button
                                        variant="default"
                                        size="sm"
                                        iconName="MessageCircle"
                                        onClick={() => handleWhatsAppContact(selectedVendor)}
                                        className="bg-success hover:bg-success/90"
                                    >
                                        WhatsApp
                                    </Button>
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