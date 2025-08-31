import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ResponsiveHeader from '../../components/ui/ResponsiveHeader';
import Footer from '../../components/ui/Footer';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';

const RecipePage = () => {
    const { recipeId } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [servings, setServings] = useState(4);

    // Mock recipes data
    const mockRecipes = {
        'salada-tomate-organico': {
            id: 'salada-tomate-organico',
            title: 'Salada de Tomate Orgânico com Manjericão',
            description: 'Uma receita simples e deliciosa que realça o sabor natural dos tomates orgânicos',
            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop',
            prepTime: '15 min',
            cookTime: '0 min',
            totalTime: '15 min',
            difficulty: 'Fácil',
            servings: 4,
            category: 'Saladas',
            author: 'Chef Maria Silva',
            authorImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
            ingredients: [
                { name: 'Tomates orgânicos grandes', amount: '4', unit: 'unidades' },
                { name: 'Manjericão fresco', amount: '1', unit: 'maço' },
                { name: 'Mussarela de búfala', amount: '200', unit: 'g' },
                { name: 'Azeite extra virgem', amount: '3', unit: 'colheres de sopa' },
                { name: 'Vinagre balsâmico', amount: '1', unit: 'colher de sopa' },
                { name: 'Sal marinho', amount: 'a gosto', unit: '' },
                { name: 'Pimenta-do-reino', amount: 'a gosto', unit: '' }
            ],
            instructions: [
                'Lave bem os tomates orgânicos e corte em fatias de aproximadamente 1cm de espessura.',
                'Corte a mussarela de búfala em fatias da mesma espessura dos tomates.',
                'Lave e seque as folhas de manjericão fresco.',
                'Em um prato, alterne as fatias de tomate e mussarela, intercalando com folhas de manjericão.',
                'Em uma tigela pequena, misture o azeite, vinagre balsâmico, sal e pimenta.',
                'Regue a salada com o molho preparado.',
                'Deixe descansar por 10 minutos para os sabores se integrarem.',
                'Sirva imediatamente como entrada ou acompanhamento.'
            ],
            tips: [
                'Use tomates bem maduros para melhor sabor',
                'O manjericão deve ser adicionado na hora de servir para manter o aroma',
                'Experimente adicionar um fio de mel ao molho para um toque especial'
            ],
            nutritionalInfo: {
                calories: 180,
                protein: 12,
                carbs: 8,
                fat: 14,
                fiber: 3
            },
            relatedProducts: [
                { id: 1, name: 'Tomates Orgânicos', vendor: 'Fazenda Verde' },
                { id: 5, name: 'Manjericão Fresco', vendor: 'Horta Urbana' }
            ]
        },
        'suco-detox-verde': {
            id: 'suco-detox-verde',
            title: 'Suco Detox Verde Energizante',
            description: 'Suco nutritivo e energizante com vegetais frescos e orgânicos',
            image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=800&h=600&fit=crop',
            prepTime: '10 min',
            cookTime: '0 min',
            totalTime: '10 min',
            difficulty: 'Fácil',
            servings: 2,
            category: 'Bebidas',
            author: 'Nutricionista Ana Costa',
            authorImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
            ingredients: [
                { name: 'Couve orgânica', amount: '3', unit: 'folhas' },
                { name: 'Maçã verde', amount: '1', unit: 'unidade' },
                { name: 'Pepino', amount: '1/2', unit: 'unidade' },
                { name: 'Limão', amount: '1/2', unit: 'unidade' },
                { name: 'Gengibre fresco', amount: '1', unit: 'cm' },
                { name: 'Água gelada', amount: '200', unit: 'ml' },
                { name: 'Mel orgânico', amount: '1', unit: 'colher de chá' }
            ],
            instructions: [
                'Lave bem todos os ingredientes.',
                'Retire o talo da couve e pique grosseiramente.',
                'Descasque e corte a maçã em pedaços.',
                'Corte o pepino em rodelas.',
                'Esprema o limão e reserve o suco.',
                'Descasque e corte o gengibre.',
                'No liquidificador, adicione primeiro a água, depois os ingredientes sólidos.',
                'Bata por 2-3 minutos até ficar homogêneo.',
                'Coe se preferir uma textura mais lisa.',
                'Adoce com mel a gosto e sirva imediatamente.'
            ],
            tips: [
                'Beba logo após o preparo para aproveitar todos os nutrientes',
                'Pode substituir o mel por tâmaras para adoçar naturalmente',
                'Adicione gelo para uma bebida mais refrescante'
            ],
            nutritionalInfo: {
                calories: 95,
                protein: 2,
                carbs: 22,
                fat: 0.5,
                fiber: 4
            },
            relatedProducts: [
                { id: 2, name: 'Couve Orgânica', vendor: 'Hortifruti do João' },
                { id: 6, name: 'Maçã Fuji', vendor: 'Pomar do Vale' }
            ]
        }
    };

    useEffect(() => {
        const loadRecipe = async () => {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 800));
            
            const foundRecipe = mockRecipes[recipeId];
            if (foundRecipe) {
                setRecipe(foundRecipe);
                setServings(foundRecipe.servings);
            }
            
            setLoading(false);
        };

        loadRecipe();
    }, [recipeId]);

    const adjustIngredientAmount = (amount, originalServings, newServings) => {
        if (amount === 'a gosto' || isNaN(parseFloat(amount))) {
            return amount;
        }
        
        const ratio = newServings / originalServings;
        const adjustedAmount = parseFloat(amount) * ratio;
        
        // Round to reasonable decimal places
        if (adjustedAmount < 1) {
            return adjustedAmount.toFixed(2);
        } else if (adjustedAmount < 10) {
            return adjustedAmount.toFixed(1);
        } else {
            return Math.round(adjustedAmount).toString();
        }
    };

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
                        <p className="text-muted-foreground">Carregando receita...</p>
                    </div>
                </main>
            </div>
        );
    }

    if (!recipe) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <ResponsiveHeader />
                <main className="pt-16 flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <Icon name="ChefHat" size={48} className="text-muted-foreground mx-auto mb-4" />
                        <h2 className="text-xl font-heading font-semibold text-foreground mb-2">
                            Receita não encontrada
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            A receita que você está procurando não existe.
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
                {/* Hero Image */}
                <div className="relative h-64 md:h-80 overflow-hidden">
                    <Image
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    <div className="absolute bottom-6 left-0 right-0">
                        <div className="container mx-auto px-4">
                            <div className="text-white">
                                <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">
                                    {recipe.title}
                                </h1>
                                <p className="text-lg opacity-90 mb-4">
                                    {recipe.description}
                                </p>
                                <div className="flex items-center space-x-6 text-sm">
                                    <div className="flex items-center space-x-1">
                                        <Icon name="Clock" size={16} />
                                        <span>{recipe.totalTime}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Icon name="Users" size={16} />
                                        <span>{recipe.servings} porções</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Icon name="BarChart" size={16} />
                                        <span>{recipe.difficulty}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Recipe Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Recipe Info */}
                            <div className="bg-card border border-border rounded-xl p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-heading font-semibold text-foreground">
                                        Informações da Receita
                                    </h2>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-sm text-muted-foreground">Porções:</span>
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => setServings(Math.max(1, servings - 1))}
                                                    className="w-8 h-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center"
                                                >
                                                    <Icon name="Minus" size={14} />
                                                </button>
                                                <span className="w-8 text-center font-medium">{servings}</span>
                                                <button
                                                    onClick={() => setServings(servings + 1)}
                                                    className="w-8 h-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center"
                                                >
                                                    <Icon name="Plus" size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="text-center p-3 bg-muted rounded-lg">
                                        <Icon name="Clock" size={24} className="text-primary mx-auto mb-2" />
                                        <p className="text-sm font-medium text-foreground">Preparo</p>
                                        <p className="text-xs text-muted-foreground">{recipe.prepTime}</p>
                                    </div>
                                    <div className="text-center p-3 bg-muted rounded-lg">
                                        <Icon name="Flame" size={24} className="text-warning mx-auto mb-2" />
                                        <p className="text-sm font-medium text-foreground">Cozimento</p>
                                        <p className="text-xs text-muted-foreground">{recipe.cookTime}</p>
                                    </div>
                                    <div className="text-center p-3 bg-muted rounded-lg">
                                        <Icon name="Users" size={24} className="text-accent mx-auto mb-2" />
                                        <p className="text-sm font-medium text-foreground">Porções</p>
                                        <p className="text-xs text-muted-foreground">{servings}</p>
                                    </div>
                                    <div className="text-center p-3 bg-muted rounded-lg">
                                        <Icon name="BarChart" size={24} className="text-success mx-auto mb-2" />
                                        <p className="text-sm font-medium text-foreground">Dificuldade</p>
                                        <p className="text-xs text-muted-foreground">{recipe.difficulty}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Ingredients */}
                            <div className="bg-card border border-border rounded-xl p-6">
                                <h2 className="text-xl font-heading font-semibold text-foreground mb-6">
                                    Ingredientes
                                </h2>
                                <div className="space-y-3">
                                    {recipe.ingredients.map((ingredient, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                                            <span className="font-body text-foreground">
                                                {ingredient.name}
                                            </span>
                                            <span className="font-medium text-primary">
                                                {adjustIngredientAmount(ingredient.amount, recipe.servings, servings)} {ingredient.unit}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Instructions */}
                            <div className="bg-card border border-border rounded-xl p-6">
                                <h2 className="text-xl font-heading font-semibold text-foreground mb-6">
                                    Modo de Preparo
                                </h2>
                                <div className="space-y-4">
                                    {recipe.instructions.map((instruction, index) => (
                                        <div key={index} className="flex space-x-4">
                                            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 font-medium">
                                                {index + 1}
                                            </div>
                                            <p className="font-body text-foreground leading-relaxed pt-1">
                                                {instruction}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Tips */}
                            {recipe.tips && recipe.tips.length > 0 && (
                                <div className="bg-warning/10 border border-warning/20 rounded-xl p-6">
                                    <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center">
                                        <Icon name="Lightbulb" size={20} className="text-warning mr-2" />
                                        Dicas do Chef
                                    </h3>
                                    <ul className="space-y-2">
                                        {recipe.tips.map((tip, index) => (
                                            <li key={index} className="flex items-start space-x-2">
                                                <Icon name="Check" size={16} className="text-warning mt-0.5 flex-shrink-0" />
                                                <span className="text-sm font-body text-foreground">{tip}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Author */}
                            <div className="bg-card border border-border rounded-xl p-6">
                                <h3 className="font-heading font-semibold text-foreground mb-4">
                                    Chef
                                </h3>
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                                        <Image
                                            src={recipe.authorImage}
                                            alt={recipe.author}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-body font-medium text-foreground">{recipe.author}</p>
                                        <p className="text-sm text-muted-foreground">Chef especialista</p>
                                    </div>
                                </div>
                            </div>

                            {/* Nutritional Info */}
                            {recipe.nutritionalInfo && (
                                <div className="bg-card border border-border rounded-xl p-6">
                                    <h3 className="font-heading font-semibold text-foreground mb-4">
                                        Informações Nutricionais
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-sm text-muted-foreground">Calorias</span>
                                            <span className="text-sm font-medium text-foreground">
                                                {Math.round(recipe.nutritionalInfo.calories * (servings / recipe.servings))} kcal
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-muted-foreground">Proteínas</span>
                                            <span className="text-sm font-medium text-foreground">
                                                {Math.round(recipe.nutritionalInfo.protein * (servings / recipe.servings))}g
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-muted-foreground">Carboidratos</span>
                                            <span className="text-sm font-medium text-foreground">
                                                {Math.round(recipe.nutritionalInfo.carbs * (servings / recipe.servings))}g
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-muted-foreground">Gorduras</span>
                                            <span className="text-sm font-medium text-foreground">
                                                {Math.round(recipe.nutritionalInfo.fat * (servings / recipe.servings))}g
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-muted-foreground">Fibras</span>
                                            <span className="text-sm font-medium text-foreground">
                                                {Math.round(recipe.nutritionalInfo.fiber * (servings / recipe.servings))}g
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Related Products */}
                            {recipe.relatedProducts && recipe.relatedProducts.length > 0 && (
                                <div className="bg-card border border-border rounded-xl p-6">
                                    <h3 className="font-heading font-semibold text-foreground mb-4">
                                        Produtos Relacionados
                                    </h3>
                                    <div className="space-y-3">
                                        {recipe.relatedProducts.map((product) => (
                                            <button
                                                key={product.id}
                                                onClick={() => handleProductClick(product.id)}
                                                className="w-full flex items-center space-x-3 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors duration-200"
                                            >
                                                <Icon name="Package" size={16} className="text-primary" />
                                                <div className="flex-1 text-left">
                                                    <p className="text-sm font-medium text-foreground">{product.name}</p>
                                                    <p className="text-xs text-muted-foreground">{product.vendor}</p>
                                                </div>
                                                <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="bg-card border border-border rounded-xl p-6">
                                <div className="space-y-3">
                                    <Button
                                        variant="default"
                                        size="lg"
                                        fullWidth
                                        iconName="Heart"
                                        iconPosition="left"
                                    >
                                        Salvar Receita
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        fullWidth
                                        iconName="Share"
                                        iconPosition="left"
                                    >
                                        Compartilhar
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        fullWidth
                                        iconName="Printer"
                                        iconPosition="left"
                                        onClick={() => window.print()}
                                    >
                                        Imprimir
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            
            <Footer />
        </div>
    );
};

export default RecipePage;