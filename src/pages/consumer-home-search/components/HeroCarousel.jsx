import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const HeroCarousel = ({ className = '' }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const slides = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=400&fit=crop",
            title: "Produtos Frescos Direto da Fazenda",
            subtitle: "Conecte-se com produtores locais e tenha acesso aos melhores produtos da região",
            cta: "Explorar Produtos",
            ctaAction: () => console.log('Navigate to products')
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&h=400&fit=crop",
            title: "Apoie Produtores Locais",
            subtitle: "Cada compra fortalece a economia local e garante produtos mais frescos para você",
            cta: "Conhecer Vendedores",
            ctaAction: () => console.log('Navigate to vendors')
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1200&h=400&fit=crop",
            title: "Orgânicos Certificados",
            subtitle: "Encontre produtos orgânicos certificados com garantia de qualidade e procedência",
            cta: "Ver Orgânicos",
            ctaAction: () => console.log('Navigate to organic products')
        }
    ];

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, slides.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    return (
        <div className={`relative overflow-hidden rounded-2xl shadow-lg ${className}`}>
            <div className="relative h-72 md:h-96">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <Image
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

                        <div className="absolute inset-0 flex items-center">
                            <div className="container mx-auto px-8">
                                <div className="max-w-xl text-white">
                                    <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 leading-tight">
                                        {slide.title}
                                    </h2>
                                    <p className="text-base md:text-lg font-body mb-8 opacity-95 leading-relaxed">
                                        {slide.subtitle}
                                    </p>
                                    <button
                                        onClick={slide.ctaAction}
                                        className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl font-body font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                                    >
                                        {slide.cta}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110 shadow-lg"
            >
                <Icon name="ChevronLeft" size={24} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110 shadow-lg"
            >
                <Icon name="ChevronRight" size={24} />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white scale-125' : 'bg-white/60 hover:bg-white/80'
                            }`}
                    />
                ))}
            </div>

            {/* Auto-play indicator */}
            <div className="absolute top-6 right-6">
                <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="w-10 h-10 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110 shadow-lg"
                >
                    <Icon name={isAutoPlaying ? "Pause" : "Play"} size={18} />
                </button>
            </div>
        </div>
    );
};

export default HeroCarousel;