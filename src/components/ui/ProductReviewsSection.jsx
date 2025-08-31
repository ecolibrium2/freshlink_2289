import React, { useState } from 'react';
import Icon from '../AppIcon';
import Image from '../AppImage';
import Button from './Button';

const ProductReviewsSection = ({ productId, productName, reviews = [], averageRating = 0, totalReviews = 0 }) => {
  const [showAllReviews, setShowAllReviews] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={14}
        className={index < rating ? 'text-warning fill-current' : 'text-muted-foreground'}
      />
    ));
  };

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  if (reviews.length === 0) {
    return (
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Avaliações do Produto
        </h3>
        <div className="text-center py-8">
          <Icon name="MessageSquare" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h4 className="font-body font-medium text-foreground mb-2">
            Nenhuma avaliação ainda
          </h4>
          <p className="text-sm text-muted-foreground">
            Seja o primeiro a avaliar este produto!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Avaliações do Produto
        </h3>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            {renderStars(Math.round(averageRating))}
          </div>
          <span className="text-sm font-body font-medium text-foreground">
            {averageRating.toFixed(1)}
          </span>
          <span className="text-sm text-muted-foreground">
            ({totalReviews})
          </span>
        </div>
      </div>

      {/* Rating Summary */}
      <div className="bg-muted/50 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-2xl font-heading font-bold text-foreground">
                {averageRating.toFixed(1)}
              </span>
              <div className="flex items-center space-x-1">
                {renderStars(Math.round(averageRating))}
              </div>
            </div>
            <p className="text-sm font-body text-muted-foreground">
              Baseado em {totalReviews} avaliações
            </p>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="mt-4 space-y-2">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = reviews.filter(review => review.rating === stars).length;
            const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
            
            return (
              <div key={stars} className="flex items-center space-x-3">
                <span className="text-sm font-body text-muted-foreground w-8">
                  {stars}★
                </span>
                <div className="flex-1 bg-border rounded-full h-2">
                  <div
                    className="bg-warning rounded-full h-2 transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm font-caption text-muted-foreground w-8">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-4">
        {displayedReviews.map((review) => (
          <div key={review.id} className="border-b border-border pb-4 last:border-b-0 last:pb-0">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-muted rounded-full overflow-hidden">
                  <Image
                    src={review.customerAvatar}
                    alt={review.customerName}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-body font-medium text-foreground">
                      {review.customerName}
                    </p>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-sm font-caption text-muted-foreground">
                        {formatDate(review.date)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="font-body text-muted-foreground leading-relaxed">
                  {review.comment}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      {reviews.length > 3 && (
        <div className="mt-6 pt-4 border-t border-border text-center">
          <Button
            variant="outline"
            onClick={() => setShowAllReviews(!showAllReviews)}
            iconName={showAllReviews ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {showAllReviews ? 'Ver menos' : `Ver todas as ${reviews.length} avaliações`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductReviewsSection;