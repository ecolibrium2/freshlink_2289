import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ResponsiveHeader from '../../components/ui/ResponsiveHeader';
import Footer from '../../components/ui/Footer';
import ProductModal from '../../components/ui/ProductModal';
import LocationSelector from '../../components/ui/LocationSelector';
import Button from '../../components/ui/Button';
import HeroCarousel from './components/HeroCarousel';
import CategoryChips from './components/CategoryChips';
import PromotionalBanners from './components/PromotionalBanners';
import FeaturedProducts from './components/FeaturedProducts';
import VendorGrid from './components/VendorGrid';
import LoadingSpinner from './components/LoadingSpinner';
import Icon from '../../components/AppIcon';

const ConsumerHomeSearch = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [currentLocation, setCurrentLocation] = useState({ id: 1, name: "São Paulo, SP", distance: "Atual" });
    const [searchQuery, setSearchQuery] = useState('');
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [sortBy, setSortBy] = useState('sponsored');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showProductModal, setShowProductModal] = useState(false);

    // Mock suggestions for search
    const mockSuggestions = [
        { id: 1, type: 'vendor', name: 'Fazenda Verde Orgânicos', category: 'Vendedor', vendorId: 1 },
        { id: 2, type: 'product', name: 'Tomate Orgânico', category: 'Produto', productId: 1, vendorId: 1 },
        { id: 3, type: 'vendor', name: 'Hortifruti do João', category: 'Vendedor', vendorId: 2 },
        { id: 4, type: 'product', name: 'Alface Hidropônica', category: 'Produto', productId: 2, vendorId: 2 },
        { id: 5, type: 'location', name: 'Vila Madalena', category: 'Localização' },
        { id: 6, type: 'product', name: 'Banana Prata', category: 'Produto', productId: 3, vendorId: 3 },
        { id: 7, type: 'vendor', name: 'Sítio das Frutas', category: 'Vendedor', vendorId: 3 }
    ];

    // Mock products for modal
    const mockProducts = [
        {
            id: 1,
            name: "Tomate Orgânico",
            price: 8.50,
            unit: "kg",
            image: "https://images.unsplash.com/photo-1546470427-e5ac89c8ba37?w=300&h=300&fit=crop",
            available: true,
            isOrganic: true,
            description: "Tomates frescos cultivados sem agrotóxicos, direto da nossa horta familiar."
        },
        {
            id: 2,
            name: "Alface Hidropônica",
            price: 3.20,
            unit: "unidade",
            image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop",
            available: true,
            isOrganic: false,
            description: "Alface fresca cultivada em sistema hidropônico, crocante e saborosa."
        },
        {
            id: 3,
            name: "Banana Prata",
            price: 6.90,
            unit: "kg",
            image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=300&fit=crop",
            available: true,
            isOrganic: false,
            description: "Bananas doces e maduras, ricas em potássio."
        }
    ];
    // Mock vendor data
    const mockVendors = [
        {
            id: 1,
            name: "Fazenda Verde Orgânicos",
            image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=300&fit=crop",
            rating: 4.8,
            reviewCount: 127,
            distance: "2.3 km",
            location: "Vila Madalena",
            categories: ["Orgânicos", "Frutas", "Verduras"],
            isOpen: true,
            hours: "6:00 - 18:00",
            phone: "11987654321",
            isSponsored: true
        },
        {
            id: 2,
            name: "Hortifruti do João",
            image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop",
            rating: 4.6,
            reviewCount: 89,
            distance: "1.8 km",
            location: "Pinheiros",
            categories: ["Frutas", "Verduras", "Legumes"],
            isOpen: true,
            hours: "7:00 - 19:00",
            phone: "11987654322",
            isSponsored: false
        },
        {
            id: 3,
            name: "Sítio das Frutas",
            image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&h=300&fit=crop",
            rating: 4.9,
            reviewCount: 156,
            distance: "3.1 km",
            location: "Butantã",
            categories: ["Frutas", "Sucos", "Polpas"],
            isOpen: false,
            hours: "8:00 - 17:00",
            phone: "11987654323",
            isSponsored: true
        },
        {
            id: 4,
            name: "Mercado da Terra",
            image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&h=300&fit=crop",
            rating: 4.4,
            reviewCount: 73,
            distance: "4.2 km",
            location: "Perdizes",
            categories: ["Verduras", "Legumes", "Temperos"],
            isOpen: true,
            hours: "6:30 - 18:30",
            phone: "11987654324",
            isSponsored: false
        },
        {
            id: 5,
            name: "Fazenda Orgânica São José",
            image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop",
            rating: 4.7,
            reviewCount: 112,
            distance: "5.1 km",
            location: "Lapa",
            categories: ["Orgânicos", "Laticínios", "Ovos"],
            isOpen: true,
            hours: "7:00 - 17:00",
            phone: "11987654325",
            isSponsored: false
        },
        {
            id: 6,
            name: "Empório Natural",
            image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400&h=300&fit=crop",
            rating: 4.5,
            reviewCount: 94,
            distance: "2.7 km",
            location: "Vila Madalena",
            categories: ["Orgânicos", "Grãos", "Cereais"],
            isOpen: false,
            hours: "8:00 - 19:00",
            phone: "11987654326",
            isSponsored: false
        },
        {
            id: 7,
            name: "Quintal da Vovó",
            image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
            rating: 4.8,
            reviewCount: 168,
            distance: "3.8 km",
            location: "Pompéia",
            categories: ["Frutas", "Verduras", "Conservas"],
            isOpen: true,
            hours: "6:00 - 18:00",
            phone: "11987654327",
            isSponsored: true
        },
        {
            id: 8,
            name: "Feira do Produtor",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
            rating: 4.3,
            reviewCount: 67,
            distance: "6.2 km",
            location: "Barra Funda",
            categories: ["Frutas", "Verduras", "Legumes", "Temperos"],
            isOpen: true,
            hours: "5:00 - 14:00",
            phone: "11987654328",
            isSponsored: false
        }
    ];

    // Load vendors on component mount
    useEffect(() => {
        loadVendors();
    }, []);

    // Filter vendors based on search and filters
    useEffect(() => {
        filterVendors();
    }, [searchQuery, currentLocation, sortBy]);

    const loadVendors = async () => {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setVendors(mockVendors);
        setLoading(false);
    };

    const handleLoadMore = async () => {
        setLoadingMore(true);
        // Simulate loading more vendors
        await new Promise(resolve => setTimeout(resolve, 1000));
        // In real app, this would load more data
        setLoadingMore(false);
        setHasMore(false); // For demo purposes
    };

    const filterVendors = useCallback(() => {
        let filtered = [...mockVendors];

        // Apply search filter
        if (searchQuery?.trim()) {
            filtered = filtered?.filter(vendor =>
                vendor?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                vendor?.categories?.some(cat => cat?.toLowerCase()?.includes(searchQuery?.toLowerCase())) ||
                vendor?.location?.toLowerCase()?.includes(searchQuery?.toLowerCase())
            );
        }

        // Sort vendors based on selected option
        filtered?.sort((a, b) => {
            // Always prioritize sponsored vendors
            if (a?.isSponsored && !b?.isSponsored) return -1;
            if (!a?.isSponsored && b?.isSponsored) return 1;

            switch (sortBy) {
                case 'distance':
                    return parseFloat(a?.distance) - parseFloat(b?.distance);
                case 'rating':
                    return b?.rating - a?.rating;
                case 'name':
                    return a?.name?.localeCompare(b?.name);
                case 'reviews':
                    return b?.reviewCount - a?.reviewCount;
                case 'sponsored':
                default:
                    return b?.rating - a?.rating;
            }
        });

        setVendors(filtered);
    }, [searchQuery, sortBy, mockVendors]);

    const handleLocationChange = (location) => {
        setCurrentLocation(location);
        // Trigger refresh with new location
        handleRefresh();
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleSuggestionClick = (suggestion) => {
        if (suggestion.type === 'vendor') {
            navigate('/vendor-profile-products', { state: { vendorId: suggestion.vendorId } });
        } else if (suggestion.type === 'product') {
            const product = mockProducts.find(p => p.id === suggestion.productId);
            const vendor = mockVendors.find(v => v.id === suggestion.vendorId);
            if (product && vendor) {
                handleProductClick(product, vendor);
            }
        }
    };

    // Filter suggestions based on search query
    const filteredSuggestions = searchQuery?.length > 1
        ? mockSuggestions.filter(item =>
            item?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
        ).slice(0, 5)
        : [];

    const handleRefresh = async () => {
        setRefreshing(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        await loadVendors();
        setRefreshing(false);
    };

    const handlePullToRefresh = (e) => {
        const startY = e?.touches?.[0]?.clientY;
        let currentY = startY;

        const handleTouchEnd = () => {
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };

        const handleTouchMove = (e) => {
            currentY = e?.touches?.[0]?.clientY;
            const diff = currentY - startY;

            if (diff > 100 && window.scrollY === 0) {
                handleRefresh();
                document.removeEventListener('touchmove', handleTouchMove);
                document.removeEventListener('touchend', handleTouchEnd);
            }
        };

        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);
    };

    const handleProductClick = (product, vendor) => {
        setSelectedProduct({ ...product, vendor });
        setShowProductModal(true);
    };

    const sortOptions = [
        { value: 'sponsored', label: 'Recomendados' },
        { value: 'distance', label: 'Mais próximos' },
        { value: 'rating', label: 'Melhor avaliados' },
        { value: 'name', label: 'Nome A-Z' },
        { value: 'reviews', label: 'Mais avaliações' }
    ];

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Navigation */}
            <ResponsiveHeader />

            {/* Main Content */}
            <main
                className="container mx-auto px-4 py-6 pb-20 md:pb-12 pt-20"
                onTouchStart={handlePullToRefresh}
            >
                {/* Hero Carousel */}
                <HeroCarousel className="mb-8" />

                {/* Category Chips */}
                <div className="mb-8">
                    <div className="mb-6">
                        <h2 className="font-heading font-bold text-xl text-foreground mb-1">
                            Busque por Categorias
                        </h2>
                        <p className="text-sm font-body text-muted-foreground">
                            Encontre exatamente o que você procura
                        </p>
                    </div>
                    <CategoryChips />
                </div>

                {/* Featured Products */}
                <FeaturedProducts className="mb-8" onProductClick={handleProductClick} />

                {/* Promotional Banners */}
                <PromotionalBanners className="mb-8" />

                {/* Location Selector */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                        <LocationSelector
                            currentLocation={currentLocation}
                            onLocationChange={handleLocationChange}
                        />
                        {refreshing && (
                            <LoadingSpinner size="sm" />
                        )}
                    </div>
                </div>

                {/* Results Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="font-heading font-bold text-xl text-foreground mb-1">
                            {searchQuery ? `Resultados para "${searchQuery}"` : 'Vendedores Próximos'}
                        </h2>
                        <p className="text-sm font-body text-muted-foreground">
                            {vendors?.length} {vendors?.length === 1 ? 'vendedor encontrado' : 'vendedores encontrados'} em {currentLocation?.name}
                        </p>
                    </div>

                    {/* Sort Options */}
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            iconName="Map"
                            onClick={() => navigate('/vendors-map')}
                            className="hidden md:flex"
                        >
                            Ver no Mapa
                        </Button>
                        <button className="flex items-center space-x-2 px-3 py-2 bg-muted border border-border rounded-lg text-sm font-body font-medium text-foreground hover:bg-muted/80 transition-colors duration-200">
                            <span>Recomendados</span>
                            <Icon name="ChevronDown" size={16} />
                        </button>
                        {/* <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-3 py-2 bg-muted border border-border rounded-lg text-sm font-body font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            {sortOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select> */}
                    </div>
                </div>

                {/* Vendor Grid */}
                <VendorGrid
                    vendors={vendors}
                    loading={loading}
                    onLoadMore={handleLoadMore}
                    hasMore={hasMore}
                    loadingMore={loadingMore}
                    className="mb-8"
                    id="vendor-grid"
                />
            </main>

            {/* Product Modal */}
            <ProductModal
                product={selectedProduct}
                vendor={selectedProduct?.vendor}
                isOpen={showProductModal}
                onClose={() => {
                    setShowProductModal(false);
                    setSelectedProduct(null);
                }}
            />

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default ConsumerHomeSearch;