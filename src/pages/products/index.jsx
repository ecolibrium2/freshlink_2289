import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ResponsiveHeader from '../../components/ui/ResponsiveHeader';
import Footer from '../../components/ui/Footer';
import LocationSelector from '../../components/ui/LocationSelector';
import ProductModal from '../../components/ui/ProductModal';
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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '../../components/ui/shadcn/popover';

const ProductsPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const categoriesRef = useRef(null);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentLocation, setCurrentLocation] = useState({ id: 1, name: "São Paulo, SP", distance: "Atual" });
    const [sortBy, setSortBy] = useState('relevance');
    const [activeCategory, setActiveCategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showProductModal, setShowProductModal] = useState(false);
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [showCategoryArrows, setShowCategoryArrows] = useState(false);
    const [priceFilter, setPriceFilter] = useState('all');
    const [customPriceMin, setCustomPriceMin] = useState('');
    const [customPriceMax, setCustomPriceMax] = useState('');
    const [isPriceFilterOpen, setIsPriceFilterOpen] = useState(false);
    const [showOnlyOrganic, setShowOnlyOrganic] = useState(false);

    const PRODUCTS_PER_PAGE = 20;

    const categories = [
        { id: 'all', label: 'Todos', icon: 'Grid3X3' },
        { id: 'frutas', label: 'Frutas', icon: 'Apple' },
        { id: 'verduras', label: 'Verduras', icon: 'Carrot' },
        { id: 'organicos', label: 'Orgânicos', icon: 'Leaf' },
        { id: 'legumes', label: 'Legumes', icon: 'Wheat' },
        { id: 'temperos', label: 'Temperos', icon: 'Flower2' },
        { id: 'laticinios', label: 'Laticínios', icon: 'Milk' },
        { id: 'carnes', label: 'Carnes', icon: 'Beef' }
    ];

    const sortOptions = [
        { value: 'relevance', label: 'Relevância' },
        { value: 'price_low', label: 'Menor preço' },
        { value: 'price_high', label: 'Maior preço' },
        { value: 'rating', label: 'Melhor avaliados' },
        { value: 'distance', label: 'Mais próximos' },
        { value: 'newest', label: 'Mais recentes' }
    ];

    const priceRanges = [
        { value: 'all', label: 'Todos os preços', min: 0, max: Infinity },
        { value: 'up-to-50', label: 'Até R$ 50', min: 0, max: 50 },
        { value: '50-to-150', label: 'R$ 50 a R$ 150', min: 50, max: 150 },
        { value: '150-to-300', label: 'R$ 150 a R$ 300', min: 150, max: 300 },
        { value: 'above-500', label: 'Mais de R$ 300', min: 300, max: Infinity }
    ];

    // Mock products data
    const mockProducts = [
        {
            id: 1,
            name: "Tomate Orgânico Premium",
            vendor: "Fazenda Verde Orgânicos",
            vendorId: 1,
            vendorDistance: 0.8,
            price: 8.50,
            originalPrice: 10.00,
            discount: 15,
            unit: "kg",
            image: "https://images.unsplash.com/photo-1546470427-e5ac89c8ba37?w=400&h=400&fit=crop",
            distance: 0.8,
            rating: 4.8,
            reviewCount: 45,
            available: true,
            isOrganic: true,
            category: "organicos",
            categories: ["Orgânicos", "Legumes"]
        },
        {
            id: 2,
            name: "Banana Prata Doce",
            vendor: "Sítio das Frutas",
            vendorId: 3,
            vendorDistance: 1.5,
            price: 6.90,
            unit: "kg",
            image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop",
            distance: 1.5,
            rating: 4.5,
            reviewCount: 34,
            available: true,
            isOrganic: false,
            category: "frutas",
            categories: ["Frutas", "Natural"]
        },
        {
            id: 3,
            name: "Alface Hidropônica",
            vendor: "Hortifruti do João",
            vendorId: 2,
            vendorDistance: 1.2,
            price: 3.20,
            unit: "unidade",
            image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
            distance: 1.2,
            rating: 4.6,
            reviewCount: 18,
            available: true,
            isOrganic: false,
            category: "verduras",
            categories: ["Verduras", "Hidropônico"]
        },
        {
            id: 4,
            name: "Cenoura Orgânica",
            vendor: "Fazenda Orgânica São José",
            vendorId: 5,
            vendorDistance: 2.5,
            price: 5.80,
            originalPrice: 7.25,
            discount: 20,
            unit: "kg",
            image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop",
            distance: 2.5,
            rating: 4.7,
            reviewCount: 29,
            available: true,
            isOrganic: true,
            category: "organicos",
            categories: ["Orgânicos", "Legumes"]
        },
        {
            id: 5,
            name: "Manjericão Fresco",
            vendor: "Horta Urbana",
            vendorId: 6,
            vendorDistance: 1.8,
            price: 2.50,
            unit: "maço",
            image: "https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=400&h=400&fit=crop",
            distance: 1.8,
            rating: 4.9,
            reviewCount: 15,
            available: true,
            isOrganic: true,
            category: "temperos",
            categories: ["Orgânicos", "Temperos"]
        },
        {
            id: 6,
            name: "Maçã Fuji",
            vendor: "Pomar do Vale",
            vendorId: 7,
            vendorDistance: 3.1,
            price: 9.90,
            unit: "kg",
            image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop",
            distance: 3.1,
            rating: 4.4,
            reviewCount: 41,
            available: true,
            isOrganic: false,
            category: "frutas",
            categories: ["Frutas", "Doces"]
        },
        {
            id: 7,
            name: "Rúcula Orgânica",
            vendor: "Verde Vida",
            vendorId: 8,
            vendorDistance: 2.2,
            price: 4.00,
            unit: "maço",
            image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop",
            distance: 2.2,
            rating: 4.6,
            reviewCount: 22,
            available: true,
            isOrganic: true,
            category: "verduras",
            categories: ["Orgânicos", "Verduras"]
        },
        {
            id: 8,
            name: "Abóbora Cabotiá",
            vendor: "Fazenda Verde",
            vendorId: 1,
            vendorDistance: 0.8,
            price: 4.20,
            unit: "kg",
            image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&h=400&fit=crop",
            distance: 0.8,
            rating: 4.3,
            reviewCount: 8,
            available: true,
            isOrganic: true,
            category: "legumes",
            categories: ["Orgânicos", "Legumes"]
        },
        {
            id: 9,
            name: "Leite Orgânico",
            vendor: "Fazenda São José",
            vendorId: 5,
            vendorDistance: 2.5,
            price: 6.50,
            unit: "litro",
            image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=400&fit=crop",
            distance: 2.5,
            rating: 4.8,
            reviewCount: 67,
            available: true,
            isOrganic: true,
            category: "laticinios",
            categories: ["Orgânicos", "Laticínios"]
        },
        {
            id: 10,
            name: "Queijo Minas Frescal",
            vendor: "Laticínios da Serra",
            vendorId: 9,
            vendorDistance: 4.2,
            price: 18.90,
            unit: "kg",
            image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=400&fit=crop",
            distance: 4.2,
            rating: 4.7,
            reviewCount: 33,
            available: true,
            isOrganic: false,
            category: "laticinios",
            categories: ["Laticínios", "Artesanal"]
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
        loadProducts();
        const savedFavorites = JSON.parse(localStorage.getItem('favoriteProducts') || '[]');
        setFavoriteProducts(savedFavorites);
    }, []);

    useEffect(() => {
        filterProducts();
    }, [searchQuery, activeCategory, sortBy, currentLocation, priceFilter, customPriceMin, customPriceMax, showOnlyOrganic]);

    const loadProducts = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProducts(mockProducts);
        setLoading(false);
    };

    const filterProducts = () => {
        let filtered = [...mockProducts];

        if (searchQuery.trim()) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        if (activeCategory !== 'all') {
            filtered = filtered.filter(product => product.category === activeCategory);
        }

        // Filter by organic only
        if (showOnlyOrganic) {
            filtered = filtered.filter(product => product.isOrganic);
        }

        // Price filtering
        if (priceFilter !== 'all') {
            const range = priceRanges.find(r => r.value === priceFilter);
            if (range) {
                filtered = filtered.filter(product =>
                    product.price >= range.min &&
                    (range.max === Infinity ? true : product.price <= range.max)
                );
            }
        }

        // Custom price range
        if (customPriceMin !== '' || customPriceMax !== '') {
            const minPrice = customPriceMin === '' ? 0 : parseFloat(customPriceMin);
            const maxPrice = customPriceMax === '' ? Infinity : parseFloat(customPriceMax);

            filtered = filtered.filter(product =>
                product.price >= minPrice && product.price <= maxPrice
            );
        }

        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'price_low':
                    return a.price - b.price;
                case 'price_high':
                    return b.price - a.price;
                case 'rating':
                    return b.rating - a.rating;
                case 'distance':
                    return a.distance - b.distance;
                case 'newest':
                    return b.id - a.id;
                case 'relevance':
                default:
                    return b.rating - a.rating;
            }
        });

        setFilteredProducts(filtered);
        setCurrentPage(1);
        setHasMore(filtered.length > PRODUCTS_PER_PAGE);
    };

    const loadMoreProducts = async () => {
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

    const handleProductClick = (product) => {
        navigate(`/product-details/${product.id}`, {
            state: {
                product,
                vendor: {
                    id: product.vendorId,
                    name: product.vendor,
                    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=300&fit=crop",
                    location: "São Paulo, SP",
                    distance: `${product.vendorDistance}km`,
                    phone: "11999999999"
                }
            }
        });
    };

    const handleWhatsAppContact = (product, e) => {
        e?.stopPropagation();
        const message = encodeURIComponent(`Olá ${product.vendor}! Vi o produto "${product.name}" no FreshLink e gostaria de saber mais informações.`);
        const whatsappUrl = `https://wa.me/5511999999999?text=${message}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleFavoriteToggle = (productId, e) => {
        e?.stopPropagation();
        const updatedFavorites = favoriteProducts.includes(productId)
            ? favoriteProducts.filter(id => id !== productId)
            : [...favoriteProducts, productId];

        setFavoriteProducts(updatedFavorites);
        localStorage.setItem('favoriteProducts', JSON.stringify(updatedFavorites));
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

    const handlePriceFilterApply = () => {
        setIsPriceFilterOpen(false);
    };

    const handlePriceFilterClear = () => {
        setPriceFilter('all');
        setCustomPriceMin('');
        setCustomPriceMax('');
    };

    const displayedProducts = filteredProducts.slice(0, currentPage * PRODUCTS_PER_PAGE);
    const hasMoreToShow = displayedProducts.length < filteredProducts.length;

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

    const ProductCard = ({ product }) => {
        const [hoverImage, setHoverImage] = useState(false);
        const [hoverProductName, setHoverProductName] = useState(false);
        const [hoverVendorName, setHoverVendorName] = useState(false);

        const imageScale = (hoverImage || hoverProductName) && !hoverVendorName ? 'scale(1.05)' : 'scale(1)';
        const productNameColor = (hoverProductName || hoverImage) && !hoverVendorName ? '#3b82f6' : '#374151';
        const vendorNameColor = hoverVendorName ? '#3b82f6' : '#4b5563';

        return (
            <div
                className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md hover:shadow-gray-900/10 transition-all duration-300 group cursor-pointer flex flex-col h-full backdrop-blur-sm"
                onClick={() => handleProductClick(product)}
            >
                {/* Imagem com zoom e badge de distância no canto superior direito */}
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                    <Image
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300"
                        style={{
                            transform: imageScale,
                        }}
                        onMouseEnter={() => {
                            setHoverImage(true);
                            setHoverProductName(true);
                        }}
                        onMouseLeave={() => {
                            setHoverImage(false);
                            setHoverProductName(false);
                        }}
                    />

                    {/* Badge de distância */}
                    <div className="absolute top-2 right-2 bg-accent text-white px-2 py-1 rounded-full text-xs font-medium shadow-lg z-10">
                        {product.vendorDistance} km
                    </div>

                    {/* Indisponível */}
                    {!product.available && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                            <div className="bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold px-4 py-2 rounded-full">
                                Indisponível
                            </div>
                        </div>
                    )}
                </div>

                {/* Conteúdo do produto */}
                <div className="p-4 flex-1 flex flex-col space-y-3">
                    {/* Nome do produto */}
                    <h3
                        className="font-bold text-base leading-tight line-clamp-2 cursor-pointer transition-all duration-200"
                        style={{ color: productNameColor }}
                        onMouseEnter={() => {
                            setHoverImage(true);
                            setHoverProductName(true);
                        }}
                        onMouseLeave={() => {
                            setHoverImage(false);
                            setHoverProductName(false);
                        }}
                    >
                        {product.name}
                    </h3>

                    {/* Vendedor */}
                    <div className="flex items-center space-x-2 text-sm transition-all duration-200">
                        <Icon name="Store" size={14} className="text-gray-400 flex-shrink-0" />
                        <span
                            className="font-medium cursor-pointer transition-colors duration-200"
                            style={{ color: vendorNameColor }}
                            onMouseEnter={() => {
                                setHoverVendorName(true);
                                setHoverImage(false);
                                setHoverProductName(false);
                            }}
                            onMouseLeave={() => setHoverVendorName(false)}
                            onClick={(e) => {
                                e.stopPropagation();
                                window.location.href = `/perfil-vendedor/${product.vendorId}`;
                            }}
                        >
                            {product.vendor}
                        </span>
                    </div>

                    {/* Avaliação */}
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">{renderStars(product.rating)}</div>
                        <span className="text-sm font-bold text-gray-900">{product.rating.toFixed(1)}</span>
                        <span className="text-xs text-gray-500">({product.reviewCount})</span>
                    </div>

                    <div className="flex items-center">
                        {/* Preço atual */}
                        <span className="font-bold text-md text-gray-900">{formatPrice(product.price)}</span>
                        {/* Unidade */}
                        <span className="text-sm text-gray-500">/{product.unit}</span>

                        {/* Preço original riscado e badge de desconto lado a lado */}
                        {product.originalPrice && (
                            <>
                                <span className="text-sm text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                                <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                                    -{product.discount}%
                                </div>
                            </>
                        )}
                    </div>

                    {/* Botões */}
                    <div className="mt-auto pt-2">
                        <div className="flex items-center gap-2">
                            <Button
                                variant="default"
                                size="sm"
                                onClick={(e) => handleWhatsAppContact(product, e)}
                                disabled={!product.available}
                                className="flex-1 bg-primary hover:bg-accent text-white font-semibold py-2.5 rounded-md"
                            >
                                <div className="flex items-center justify-center space-x-2">
                                    <span className="text-sm">{product.available ? 'Comprar por' : 'Indisponível'}</span>
                                    {product.available && (
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                                        </svg>
                                    )}
                                </div>
                            </Button>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => handleFavoriteToggle(product.id, e)}
                                className={`aspect-square p-0 w-9 h-9 rounded-md border transition-all duration-200 ${favoriteProducts.includes(
                                    product.id
                                )
                                    ? 'bg-red-50 border-red-200 text-error hover:bg-red-100 hover:text-error'
                                    : 'bg-white border-gray-200 text-gray-400 hover:bg-red-50 hover:text-error hover:border-error'
                                    }`}
                            >
                                <Icon
                                    name="Heart"
                                    size={16}
                                    className={favoriteProducts.includes(product.id) ? 'fill-current' : ''}
                                />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const LoadingSkeleton = () => (
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden animate-pulse">
            <div className="aspect-square bg-gray-200" />
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
                <div className="h-8 bg-gray-200 rounded" />
                <div className="flex gap-2">
                    <div className="flex-1 h-10 bg-gray-200 rounded-xl" />
                    <div className="w-10 h-10 bg-gray-200 rounded-xl" />
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex flex-col">
            <ResponsiveHeader />

            <main className="pt-16 flex-1">
                {/* Modern Fixed Search and Filter Bar */}
                <div className={`bg-white border-b border-gray-200/50 sticky z-40 transition-all duration-300 ease-in-out shadow-sm ${isHeaderVisible ? 'top-16' : 'top-0'
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
                                        className={`flex items-center space-x-3 px-6 py-3 rounded-2xl text-sm font-semibold whitespace-nowrap transition-all duration-300 shadow-sm hover:shadow-md border ${activeCategory === category.id
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
                            {/* Enhanced Search Bar - Always 60-70% width on mobile */}
                            <div className="flex-1 lg:max-w-md">
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <Icon name="Search" size={20} />
                                    </div>
                                    <Input
                                        type="text"
                                        placeholder="Buscar produtos frescos..."
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
                                {/* Sort Select - Responsive width */}
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

                                {/* Price Filter - Select with custom inputs */}
                                <div className="min-w-[140px] lg:min-w-[220px] flex-1 lg:flex-none">
                                    <Select value={priceFilter} onValueChange={setPriceFilter}>
                                        <SelectTrigger className="bg-white border-gray-200 rounded-2xl shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-200 py-3 font-medium">
                                            <div className="flex items-center space-x-2">
                                                <Icon name="CircleDollarSign" size={18} className="text-primary" />
                                                <SelectValue placeholder="Filtrar por preço..." />
                                            </div>
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-gray-200 rounded-xl shadow-xl w-[220px]">
                                            {/* Fixed price ranges */}
                                            {priceRanges.map((range) => (
                                                <SelectItem
                                                    key={range.value}
                                                    value={range.value}
                                                    className="py-3 px-8 hover:bg-gray-50 focus:bg-primary/10 focus:text-primary rounded-md transition-colors duration-200"
                                                >
                                                    {range.label}
                                                </SelectItem>
                                            ))}

                                            {/* Separator */}
                                            <div className="border-t border-gray-200 my-1 mx-2" />

                                            {/* Custom price inputs */}
                                            <div className="p-2 space-y-2">
                                                <div className="flex gap-2">
                                                    <div className="flex-1">
                                                        <label className="text-xs text-gray-500 mb-1 block">Mín (R$)</label>
                                                        <Input
                                                            type="number"
                                                            placeholder="0"
                                                            value={customPriceMin}
                                                            onChange={(e) => setCustomPriceMin(e.target.value)}
                                                            min="0"
                                                            step="0.01"
                                                            className="h-10 text-sm"
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <label className="text-xs text-gray-500 mb-1 block">Máx (R$)</label>
                                                        <Input
                                                            type="number"
                                                            placeholder="1000"
                                                            value={customPriceMax}
                                                            onChange={(e) => setCustomPriceMax(e.target.value)}
                                                            min="0"
                                                            step="0.01"
                                                            className="h-10 text-sm"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button
                                                        onClick={handlePriceFilterClear}
                                                        size="sm"
                                                        className="flex-1 rounded-md h-8 text-xs"
                                                    >
                                                        Limpar
                                                    </Button>
                                                </div>
                                            </div>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products Grid with enhanced spacing */}
                <div className="container mx-auto px-4 py-8">
                    {/* Results header */}
                    {!loading && (
                        <div className="mb-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-black text-gray-900 mb-1">
                                        {activeCategory === 'all' ? 'Todos os Produtos' : categories.find(c => c.id === activeCategory)?.label}
                                    </h2>
                                    <p className="text-gray-600 font-medium">
                                        {filteredProducts.length} {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
                                        {searchQuery && <span className="text-primary"> para "{searchQuery}"</span>}
                                        {showOnlyOrganic && <span className="text-green-600"> • Apenas orgânicos</span>}
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
                    ) : displayedProducts.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="max-w-md mx-auto">
                                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                                    <Icon name="Package" size={32} className="text-gray-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                    Nenhum produto encontrado
                                </h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Não encontramos produtos que correspondam aos seus critérios de busca.
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
                                        onClick={() => setActiveCategory('all')}
                                        className="rounded-xl font-medium bg-primary hover:bg-primary/90"
                                    >
                                        Ver todos os produtos
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                {displayedProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>

                            {hasMoreToShow && (
                                <div className="text-center mt-16">
                                    <Button
                                        onClick={loadMoreProducts}
                                        loading={loadingMore}
                                        variant="outline"
                                        size="lg"
                                        className="bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-primary/50 rounded-2xl px-8 py-4 font-semibold text-base shadow-sm hover:shadow-lg transition-all duration-200"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <Icon name="Plus" size={20} />
                                            <span>Carregar mais produtos</span>
                                        </div>
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </div>
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

            <Footer />
        </div>
    );
};

export default ProductsPage;