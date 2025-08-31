import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const CategoryChips = ({ className = '' }) => {
    const navigate = useNavigate();

    const categories = [
        { id: 'frutas', label: 'Frutas', icon: 'Apple', color: 'text-red-600', bgColor: 'bg-red-50' },
        { id: 'verduras', label: 'Verduras', icon: 'Carrot', color: 'text-green-600', bgColor: 'bg-green-50' },
        { id: 'legumes', label: 'Legumes', icon: 'Wheat', color: 'text-orange-600', bgColor: 'bg-orange-50' },
        { id: 'organicos', label: 'Orgânicos', icon: 'Leaf', color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
        { id: 'temperos', label: 'Temperos', icon: 'Flower2', color: 'text-purple-600', bgColor: 'bg-purple-50' },
        { id: 'laticinios', label: 'Laticínios', icon: 'Milk', color: 'text-blue-600', bgColor: 'bg-blue-50' },
        { id: 'carnes', label: 'Carnes', icon: 'Beef', color: 'text-amber-600', bgColor: 'bg-amber-50' },
        { id: 'graos', label: 'Grãos', icon: 'Wheat', color: 'text-yellow-600', bgColor: 'bg-yellow-50' }
    ];

    const handleCategoryClick = (categoryId) => {
        navigate(`/products?category=${categoryId}`);
    };

    return (
        <div className={`${className}`}>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-4">
                {categories?.map((category) => (
                    <button
                        key={category?.id}
                        onClick={() => handleCategoryClick(category?.id)}
                        className="flex flex-col items-center p-4 bg-card border border-border rounded-lg hover:shadow-md hover:border-primary/20 transition-all duration-200 group"
                    >
                        <div className={`w-12 h-12 ${category?.bgColor} rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
                            <Icon name={category?.icon} size={24} className={category?.color} />
                        </div>
                        <h3 className="font-body font-semibold text-sm text-foreground mb-1">
                            {category?.label}
                        </h3>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryChips;
