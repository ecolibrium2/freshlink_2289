import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PromotionalBanners = ({ className = '' }) => {
    const navigate = useNavigate();

    const banners = [
        {
            id: 1,
            type: 'recipe',
            title: 'Receita: Salada de Tomate Orgânico',
            subtitle: 'Aprenda a fazer uma deliciosa salada com tomates frescos',
            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=300&fit=crop',
            cta: 'Ver Receita',
            link: '/recipes/salada-tomate-organico',
            gradient: 'from-green-500/80 to-emerald-600/80',
            icon: 'ChefHat'
        },
        {
            id: 2,
            type: 'benefits',
            title: 'Benefícios dos Alimentos Orgânicos',
            subtitle: 'Descubra por que escolher orgânicos faz toda a diferença',
            image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=300&fit=crop',
            cta: 'Saiba Mais',
            link: '/benefits/organicos',
            gradient: 'from-blue-500/80 to-cyan-600/80',
            icon: 'Leaf'
        },
        {
            id: 3,
            type: 'recipe',
            title: 'Suco Detox Verde Energizante',
            subtitle: 'Receita nutritiva para começar o dia com energia',
            image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=600&h=300&fit=crop',
            cta: 'Ver Receita',
            link: '/recipes/suco-detox-verde',
            gradient: 'from-purple-500/80 to-pink-600/80',
            icon: 'Coffee'
        },
        {
            id: 4,
            type: 'benefits',
            title: 'Poder das Frutas Vermelhas',
            subtitle: 'Antioxidantes naturais para sua saúde e bem-estar',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=300&fit=crop',
            cta: 'Descobrir',
            link: '/benefits/frutas-vermelhas',
            gradient: 'from-red-500/80 to-rose-600/80',
            icon: 'Heart'
        }
    ];

    const handleBannerClick = (banner) => {
        navigate(banner.link);
    };

    return (
        <div className={`${className}`}>
            <div className="mb-6">
                <h2 className="font-heading font-bold text-xl text-foreground mb-1">
                    Receitas e Dicas Saudáveis
                </h2>
                <p className="text-sm font-body text-muted-foreground">
                    Aprenda a aproveitar ao máximo seus produtos frescos
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {banners.map((banner) => (
                    <div
                        key={banner.id}
                        className="relative group cursor-pointer overflow-hidden rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                        onClick={() => handleBannerClick(banner)}
                    >
                        {/* Background Image */}
                        <div className="aspect-[2/1] relative overflow-hidden">
                            <Image
                                src={banner.image}
                                alt={banner.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            
                            {/* Gradient Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-r ${banner.gradient}`} />
                            
                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-3">
                                            <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                                                <Icon name={banner.icon} size={18} />
                                            </div>
                                            <span className="text-sm font-caption font-medium opacity-90">
                                                {banner.type === 'recipe' ? 'Receita' : 'Benefícios'}
                                            </span>
                                        </div>
                                        
                                        <h3 className="text-xl font-heading font-bold mb-2 leading-tight">
                                            {banner.title}
                                        </h3>
                                        <p className="text-sm opacity-90 leading-relaxed">
                                            {banner.subtitle}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                                    >
                                        {banner.cta}
                                    </Button>
                                    
                                    <Icon 
                                        name="ArrowRight" 
                                        size={20} 
                                        className="opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Additional CTA */}
            <div className="mt-8 text-center">
                <p className="text-sm font-body text-muted-foreground mb-4">
                    Quer mais receitas e dicas? Explore nosso conteúdo completo
                </p>
                <Button
                    variant="outline"
                    onClick={() => navigate('/recipes')}
                    iconName="BookOpen"
                    iconPosition="left"
                >
                    Ver Todas as Receitas
                </Button>
            </div>
        </div>
    );
};

export default PromotionalBanners;