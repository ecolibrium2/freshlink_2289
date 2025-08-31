import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Image from '../AppImage';
import Button from './Button';

const ResponsiveHeader = ({ className = '' }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [userAuth, setUserAuth] = useState(null);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const dropdownRef = useRef(null);

    useEffect(() => {
        // Check for authentication
        const clientAuth = localStorage.getItem('clientAuth');
        const vendorAuth = localStorage.getItem('vendorAuth');

        if (clientAuth) {
            setUserAuth({ ...JSON.parse(clientAuth), type: 'client' });
        } else if (vendorAuth) {
            setUserAuth({ ...JSON.parse(vendorAuth), type: 'vendor' });
        }
    }, [location]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Controle de scroll para esconder/mostrar navbar
    useEffect(() => {
        const controlNavbar = () => {
            const currentScrollY = window.scrollY;
            
            // Se scrollar para baixo e passou de 100px, esconde
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
                // Fecha menus abertos quando esconde
                setIsMobileMenuOpen(false);
                setIsProfileDropdownOpen(false);
            }
            // Se scrollar para cima, mostra
            else if (currentScrollY < lastScrollY) {
                setIsVisible(true);
            }
            
            // Se estiver no topo da página, sempre mostra
            if (currentScrollY < 10) {
                setIsVisible(true);
            }
            
            setLastScrollY(currentScrollY);
        };

        // Throttle function para melhor performance
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    controlNavbar();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const handleLogoClick = () => {
        navigate('/consumer-home-search');
        setIsMobileMenuOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('clientAuth');
        localStorage.removeItem('vendorAuth');
        setUserAuth(null);
        setIsProfileDropdownOpen(false);
        navigate('/consumer-home-search');
    };

    const handleProfileClick = () => {
        if (userAuth?.type === 'vendor') {
            navigate('/vendor-profile');
        } else {
            navigate('/client-profile');
        }
        setIsProfileDropdownOpen(false);
    };

    const getProfileImage = () => {
        if (userAuth?.profileImage) {
            return userAuth.profileImage;
        }
        return userAuth?.type === 'vendor'
            ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
            : 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face';
    };

    const getUserName = () => {
        return userAuth?.name || userAuth?.businessName || 'Usuário';
    };

    const getNavLinkClass = (path) => {
        const isActive = location.pathname === path;
        return `flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-body transition-colors duration-200 ${
            isActive
                ? 'text-foreground bg-muted shadow-sm font-semibold'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/60 font-medium'
        }`;
    };

    return (
        <header 
            className={`bg-card border-b border-border fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
                isVisible ? 'translate-y-0' : '-translate-y-full'
            } ${className}`}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
                    >
                        <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
                    </button>

                    {/* Logo */}
                    <div className="flex-1 flex justify-center min-[768px]:justify-start min-[768px]:flex-none">
                        <button
                            onClick={handleLogoClick}
                            className="hover:opacity-80 transition-opacity duration-200"
                        >
                            {/* Logo para desktop (>767px) - esquerda */}
                            <img 
                                src="/path-to-your-logotext.png" 
                                alt="FreshLink" 
                                className="hidden min-[768px]:block h-8"
                            />
                            {/* Logo para mobile (≤767px) - centro */}
                            <img 
                                src="/path-to-your-logotext.png" 
                                alt="FreshLink" 
                                className="block min-[768px]:hidden h-8"
                            />
                        </button>
                    </div>

                    {/* Navigation Links - Desktop */}
                    <nav className="hidden md:flex items-center space-x-1 flex-1 justify-center">
                        <button
                            onClick={() => navigate('/consumer-home-search')}
                            className={getNavLinkClass('/consumer-home-search')}
                        >
                            <Icon name="Home" size={18} />
                            <span className="font-medium">Início</span>
                        </button>

                        <button
                            onClick={() => navigate('/products')}
                            className={getNavLinkClass('/products')}
                        >
                            <Icon name="Package" size={18} />
                            <span className="font-medium">Produtos</span>
                        </button>

                        <button
                            onClick={() => navigate('/vendors')}
                            className={getNavLinkClass('/vendors')}
                        >
                            <Icon name="Store" size={18} />
                            <span className="font-medium">Vendedores</span>
                        </button>

                        <button
                            onClick={() => navigate('/vendors-map')}
                            className={getNavLinkClass('/vendors-map')}
                        >
                            <Icon name="Map" size={18} />
                            <span className="font-medium">Mapa</span>
                        </button>
                    </nav>

                    {/* User Profile or Login Button */}
                    <div className="flex items-center">
                        {userAuth ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted transition-all duration-200"
                                >
                                    <div className="w-9 h-9 rounded-full overflow-hidden">
                                        <Image
                                            src={getProfileImage()}
                                            alt="Perfil"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <span className="hidden lg:inline text-sm font-body font-medium text-foreground">
                                        {getUserName()}
                                    </span>
                                    <Icon name="ChevronDown" size={16} className="hidden lg:inline text-muted-foreground" />
                                </button>

                                {/* Profile Dropdown */}
                                {isProfileDropdownOpen && (
                                    <div className="absolute right-0 top-full mt-2 w-60 bg-card border border-border rounded-lg shadow-lg py-2 z-50">
                                        {/* User Info Header */}
                                        <div className="px-4 py-3 border-b border-border">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 rounded-full overflow-hidden">
                                                    <Image
                                                        src={getProfileImage()}
                                                        alt="Perfil"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-foreground">{getUserName()}</p>
                                                    <p className="text-xs text-muted-foreground capitalize">{userAuth?.type || 'Usuário'}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Menu Items */}
                                        <div className="py-2">
                                            <button
                                                onClick={handleProfileClick}
                                                className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors duration-200"
                                            >
                                                <Icon name="User" size={18} className="text-muted-foreground" />
                                                <span>Meu Perfil</span>
                                            </button>

                                            {userAuth?.type === 'vendor' && (
                                                <>
                                                    <button
                                                        onClick={() => {
                                                            navigate('/vendor-dashboard');
                                                            setIsProfileDropdownOpen(false);
                                                        }}
                                                        className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors duration-200"
                                                    >
                                                        <Icon name="BarChart3" size={18} className="text-muted-foreground" />
                                                        <span>Dashboard</span>
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            navigate('/product-management');
                                                            setIsProfileDropdownOpen(false);
                                                        }}
                                                        className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors duration-200"
                                                    >
                                                        <Icon name="Package" size={18} className="text-muted-foreground" />
                                                        <span>Gerenciar Produtos</span>
                                                    </button>
                                                </>
                                            )}
                                        </div>

                                        <div className="border-t border-border pt-2">
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
                                            >
                                                <Icon name="LogOut" size={18} />
                                                <span>Sair</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center">
                                {/* Botão de login desktop (>767px) */}
                                <div className="hidden min-[768px]:flex items-center space-x-2">
                                    <button
                                        onClick={() => navigate('/auth')}
                                        className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-300 transition-colors duration-200"
                                    >
                                        <Icon name="User" size={16} />
                                    </button>
                                    <button
                                        onClick={() => navigate('/auth')}
                                        className="flex flex-col leading-tight text-gray-700 hover:text-gray-900 transition-colors duration-200"
                                    >
                                        <span className="text-xs font-medium">Entre ou</span>
                                        <span className="text-xs font-medium">cadastre-se</span>
                                    </button>
                                </div>
                                
                                {/* Botão de login mobile/tablet (≤767px) */}
                                <button
                                    onClick={() => navigate('/auth')}
                                    className="min-[768px]:hidden w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-300 transition-colors duration-200"
                                >
                                    <Icon name="User" size={16} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && isVisible && (
                    <div className="md:hidden absolute top-16 left-0 right-0 bg-card border-b border-border shadow-lg max-h-96 overflow-y-auto">
                        <nav className="px-4 py-6 space-y-1">
                            <button
                                onClick={() => {
                                    navigate('/consumer-home-search');
                                    setIsMobileMenuOpen(false);
                                }}
                                className="w-full flex items-center space-x-4 px-4 py-3.5 rounded-lg text-sm font-body font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
                            >
                                <Icon name="Home" size={20} />
                                <span>Início</span>
                            </button>

                            <button
                                onClick={() => {
                                    navigate('/products');
                                    setIsMobileMenuOpen(false);
                                }}
                                className="w-full flex items-center space-x-4 px-4 py-3.5 rounded-lg text-sm font-body font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
                            >
                                <Icon name="Package" size={20} />
                                <span>Produtos</span>
                            </button>

                            <button
                                onClick={() => {
                                    navigate('/vendors');
                                    setIsMobileMenuOpen(false);
                                }}
                                className="w-full flex items-center space-x-4 px-4 py-3.5 rounded-lg text-sm font-body font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
                            >
                                <Icon name="Store" size={20} />
                                <span>Vendedores</span>
                            </button>

                            <button
                                onClick={() => {
                                    navigate('/vendors-map');
                                    setIsMobileMenuOpen(false);
                                }}
                                className="w-full flex items-center space-x-4 px-4 py-3.5 rounded-lg text-sm font-body font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
                            >
                                <Icon name="Map" size={20} />
                                <span>Mapa</span>
                            </button>

                            {!userAuth && (
                                <div className="pt-6 border-t border-border">
                                    <button
                                        onClick={() => {
                                            navigate('/auth');
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="w-full flex items-center space-x-4 px-4 py-3.5 rounded-lg text-sm font-body font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
                                    >
                                        <Icon name="User" size={20} />
                                        <span>Entre ou cadastre-se</span>
                                    </button>
                                </div>
                            )}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default ResponsiveHeader;