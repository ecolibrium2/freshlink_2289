import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ResponsiveHeader from '../../components/ui/ResponsiveHeader';
import Footer from '../../components/ui/Footer';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';

const ProductBenefitsPage = () => {
    const { productType } = useParams();
    const navigate = useNavigate();
    const [benefitData, setBenefitData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Mock benefits data
    const mockBenefits = {
        'organicos': {
            id: 'organicos',
            title: 'Benefícios dos Alimentos Orgânicos',
            subtitle: 'Descubra por que escolher orgânicos faz toda a diferença',
            heroImage: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1200&h=600&fit=crop',
            introduction: 'Os alimentos orgânicos são cultivados sem o uso de pesticidas sintéticos, fertilizantes químicos ou organismos geneticamente modificados. Esta forma de agricultura sustentável não apenas protege o meio ambiente, mas também oferece benefícios significativos para sua saúde.',
            benefits: [
                {
                    icon: 'Shield',
                    title: 'Livre de Agrotóxicos',
                    description: 'Sem resíduos de pesticidas que podem ser prejudiciais à saúde'
                },
                {
                    icon: 'Heart',
                    title: 'Mais Nutritivos',
                    description: 'Maiores concentrações de antioxidantes, vitaminas e minerais'
                },
                {
                    icon: 'Leaf',
                    title: 'Sustentável',
                    description: 'Agricultura que preserva o solo e protege a biodiversidade'
                },
                {
                    icon: 'Sparkles',
                    title: 'Sabor Autêntico',
                    description: 'Sabores mais intensos e naturais dos alimentos'
                }
            ],
            healthBenefits: [
                'Redução da exposição a substâncias químicas nocivas',
                'Maior concentração de antioxidantes que combatem o envelhecimento',
                'Melhor digestão devido à ausência de aditivos artificiais',
                'Fortalecimento do sistema imunológico',
                'Redução do risco de alergias alimentares'
            ],
            environmentalBenefits: [
                'Preservação da qualidade do solo',
                'Proteção dos recursos hídricos',
                'Manutenção da biodiversidade',
                'Redução da pegada de carbono',
                'Apoio à agricultura familiar sustentável'
            ],
            tips: [
                'Lave bem os produtos orgânicos antes do consumo',
                'Prefira produtos da estação para melhor qualidade e preço',
                'Armazene adequadamente para manter a frescura',
                'Consuma rapidamente para aproveitar todos os nutrientes'
            ],
            relatedProducts: [
                { id: 1, name: 'Tomates Orgânicos', vendor: 'Fazenda Verde' },
                { id: 4, name: 'Cenouras Orgânicas', vendor: 'Fazenda São José' },
                { id: 7, name: 'Rúcula Orgânica', vendor: 'Verde Vida' }
            ]
        },
        'frutas-vermelhas': {
            id: 'frutas-vermelhas',
            title: 'Poder das Frutas Vermelhas',
            subtitle: 'Antioxidantes naturais para sua saúde',
            heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop',
            introduction: 'As frutas vermelhas são verdadeiros superalimentos, repletas de antioxidantes, vitaminas e compostos bioativos que oferecem inúmeros benefícios para a saúde. Seu consumo regular pode ajudar na prevenção de doenças e no fortalecimento do sistema imunológico.',
            benefits: [
                {
                    icon: 'Zap',
                    title: 'Antioxidantes Poderosos',
                    description: 'Combatem os radicais livres e previnem o envelhecimento precoce'
                },
                {
                    icon: 'Brain',
                    title: 'Saúde Cerebral',
                    description: 'Melhoram a memória e função cognitiva'
                },
                {
                    icon: 'Heart',
                    title: 'Coração Saudável',
                    description: 'Reduzem o risco de doenças cardiovasculares'
                },
                {
                    icon: 'Eye',
                    title: 'Visão Protegida',
                    description: 'Antocianinas protegem a saúde ocular'
                }
            ],
            healthBenefits: [
                'Alto teor de vitamina C fortalece o sistema imunológico',
                'Antocianinas melhoram a circulação sanguínea',
                'Fibras auxiliam na digestão e saciedade',
                'Baixo índice glicêmico, ideal para diabéticos',
                'Propriedades anti-inflamatórias naturais'
            ],
            nutritionalHighlights: [
                { nutrient: 'Vitamina C', benefit: 'Fortalece imunidade' },
                { nutrient: 'Antocianinas', benefit: 'Protege células' },
                { nutrient: 'Fibras', benefit: 'Melhora digestão' },
                { nutrient: 'Potássio', benefit: 'Regula pressão arterial' }
            ],
            tips: [
                'Consuma preferencialmente in natura para máximo benefício',
                'Adicione em smoothies e vitaminas',
                'Congele para conservar por mais tempo',
                'Combine com iogurte natural para um lanche saudável'
            ],
            relatedProducts: [
                { id: 2, name: 'Morangos Orgânicos', vendor: 'Sítio das Frutas' },
                { id: 3, name: 'Mirtilos Frescos', vendor: 'Fazenda do Vale' }
            ]
        }
    };

    useEffect(() => {
        const loadBenefitData = async () => {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 800));
            
            const foundData = mockBenefits[productType];
            setBenefitData(foundData);
            
            setLoading(false);
        };

        loadBenefitData();
    }, [productType]);

    const handleProductClick = (productId) => {
        navigate(`/product-details/${productId}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <ResponsiveHeader />
                <main className="pt-16 flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-muted-foreground">Carregando informações...</p>
                    </div>
                </main>
            </div>
        );
    }

    if (!benefitData) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <ResponsiveHeader />
                <main className="pt-16 flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <Icon name="Info" size={48} className="text-muted-foreground mx-auto mb-4" />
                        <h2 className="text-xl font-heading font-semibold text-foreground mb-2">
                            Informação não encontrada
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            O conteúdo que você está procurando não existe.
                        </p>
                        <Button onClick={() => navigate('/consumer-home-search')}>
                            Voltar ao Início
                        </Button>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <ResponsiveHeader />
            
            <main className="pt-16 flex-1">
                {/* Hero Section */}
                <div className="relative h-64 md:h-80 overflow-hidden">
                    <Image
                        src={benefitData.heroImage}
                        alt={benefitData.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    <div className="absolute bottom-6 left-0 right-0">
                        <div className="container mx-auto px-4">
                            <div className="text-white">
                                <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">
                                    {benefitData.title}
                                </h1>
                                <p className="text-lg opacity-90">
                                    {benefitData.subtitle}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8">
                    {/* Introduction */}
                    <div className="max-w-4xl mx-auto mb-12">
                        <p className="text-lg font-body text-muted-foreground leading-relaxed text-center">
                            {benefitData.introduction}
                        </p>
                    </div>

                    {/* Main Benefits */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {benefitData.benefits.map((benefit, index) => (
                            <div key={index} className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300">
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Icon name={benefit.icon} size={32} className="text-primary" />
                                </div>
                                <h3 className="font-heading font-semibold text-foreground mb-2">
                                    {benefit.title}
                                </h3>
                                <p className="text-sm font-body text-muted-foreground">
                                    {benefit.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                        {/* Health Benefits */}
                        <div className="bg-card border border-border rounded-xl p-6">
                            <h2 className="text-xl font-heading font-semibold text-foreground mb-6 flex items-center">
                                <Icon name="Heart" size={24} className="text-error mr-3" />
                                Benefícios para a Saúde
                            </h2>
                            <ul className="space-y-3">
                                {benefitData.healthBenefits.map((benefit, index) => (
                                    <li key={index} className="flex items-start space-x-3">
                                        <Icon name="Check" size={16} className="text-success mt-1 flex-shrink-0" />
                                        <span className="font-body text-foreground">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Environmental Benefits or Nutritional Highlights */}
                        <div className="bg-card border border-border rounded-xl p-6">
                            <h2 className="text-xl font-heading font-semibold text-foreground mb-6 flex items-center">
                                {benefitData.environmentalBenefits ? (
                                    <>
                                        <Icon name="Leaf" size={24} className="text-success mr-3" />
                                        Benefícios Ambientais
                                    </>
                                ) : (
                                    <>
                                        <Icon name="Zap" size={24} className="text-warning mr-3" />
                                        Destaques Nutricionais
                                    </>
                                )}
                            </h2>
                            
                            {benefitData.environmentalBenefits ? (
                                <ul className="space-y-3">
                                    {benefitData.environmentalBenefits.map((benefit, index) => (
                                        <li key={index} className="flex items-start space-x-3">
                                            <Icon name="Check" size={16} className="text-success mt-1 flex-shrink-0" />
                                            <span className="font-body text-foreground">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="space-y-4">
                                    {benefitData.nutritionalHighlights?.map((item, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                                            <span className="font-body font-medium text-foreground">
                                                {item.nutrient}
                                            </span>
                                            <span className="text-sm text-muted-foreground">
                                                {item.benefit}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Tips */}
                    <div className="bg-warning/10 border border-warning/20 rounded-xl p-6 mb-12">
                        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center">
                            <Icon name="Lightbulb" size={20} className="text-warning mr-2" />
                            Dicas de Consumo
                        </h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {benefitData.tips.map((tip, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                    <Icon name="Check" size={16} className="text-warning mt-0.5 flex-shrink-0" />
                                    <span className="text-sm font-body text-foreground">{tip}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Related Products */}
                    {benefitData.relatedProducts && benefitData.relatedProducts.length > 0 && (
                        <div className="bg-card border border-border rounded-xl p-6">
                            <h3 className="text-lg font-heading font-semibold text-foreground mb-6">
                                Produtos Relacionados
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {benefitData.relatedProducts.map((product) => (
                                    <button
                                        key={product.id}
                                        onClick={() => handleProductClick(product.id)}
                                        className="flex items-center space-x-3 p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors duration-200 text-left"
                                    >
                                        <Icon name="Package" size={20} className="text-primary flex-shrink-0" />
                                        <div className="flex-1">
                                            <p className="font-body font-medium text-foreground">{product.name}</p>
                                            <p className="text-sm text-muted-foreground">{product.vendor}</p>
                                        </div>
                                        <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CTA Section */}
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-8 text-center mt-12">
                        <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
                            Encontre Produtos {benefitData.title.split(' ').pop()} Próximos a Você
                        </h3>
                        <p className="text-muted-foreground mb-6">
                            Descubra vendedores locais que oferecem produtos frescos e de qualidade
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Button
                                onClick={() => navigate('/products')}
                                iconName="Search"
                                iconPosition="left"
                            >
                                Buscar Produtos
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => navigate('/vendors')}
                                iconName="Store"
                                iconPosition="left"
                            >
                                Ver Vendedores
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
            
            <Footer />
        </div>
    );
};

export default ProductBenefitsPage;