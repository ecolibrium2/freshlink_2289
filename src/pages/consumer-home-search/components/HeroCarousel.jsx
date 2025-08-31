import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/shadcn/button';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '../../../components/ui/shadcn/carousel';

const HeroCarousel = ({ className = '' }) => {
    const navigate = useNavigate();

    const slides = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=400&fit=crop",
            title: "Produtos Frescos Direto da Fazenda",
            subtitle: "Conecte-se com produtores locais e tenha acesso aos melhores produtos da região",
            cta: "Explorar Produtos",
            ctaAction: () => navigate('/products')
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&h=400&fit=crop",
            title: "Apoie Produtores Locais",
            subtitle: "Cada compra fortalece a economia local e garante produtos mais frescos para você",
            cta: "Conhecer Vendedores",
            ctaAction: () => navigate('/vendors')
        },
        {
            id: 3,
                        <div className="absolute inset-0 flex items-center">
                            <div className="container mx-auto px-8">
                                <div className="max-w-xl text-white">
                                    <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
                                        {slide.title}
                                    </h2>
                                    <p className="text-base md:text-lg font-medium mb-8 opacity-95 leading-relaxed">
                                        {slide.subtitle}
                                    </p>
                                    <Button
                                        onClick={slide.ctaAction}
                                        className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                                    >
                                        {slide.cta}
                                    </Button>
                                </div>
                            </div>
                        </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="left-6 bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/30 shadow-lg" />
            <CarouselNext className="right-6 bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/30 shadow-lg" />
        </Carousel>
    );
};

export default HeroCarousel;