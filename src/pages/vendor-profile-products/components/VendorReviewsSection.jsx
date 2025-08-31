import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const VendorReviewsSection = ({ reviews, averageRating, totalReviews }) => {
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
        size={16}
        className={index < rating ? 'text-warning fill-current' : 'text-muted-foreground'}
      />
    ));
  };

  if (reviews?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Icon name="MessageSquare" size={48} className="text-muted-foreground mb-4" />
        <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
          Nenhuma avaliação ainda
        </h3>
        <p className="text-muted-foreground font-body">
          Seja o primeiro a avaliar este vendedor!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="bg-muted rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-3xl font-heading font-bold text-foreground">
                {averageRating?.toFixed(1)}
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
        <div className="space-y-2">
          {[5, 4, 3, 2, 1]?.map((stars) => {
            const count = reviews?.filter(review => review?.rating === stars)?.length;
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
        {reviews?.map((review) => (
          <div key={review?.id} className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-muted rounded-full overflow-hidden">
                  <Image
                    src={review?.customerAvatar}
                    alt={review?.customerName}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-body font-medium text-foreground">
                      {review?.customerName}
                    </p>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        {renderStars(review?.rating)}
                      </div>
                      <span className="text-sm font-caption text-muted-foreground">
                        {formatDate(review?.date)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="font-body text-muted-foreground mb-3 leading-relaxed">
                  {review?.comment}
                </p>
                
                {review?.vendorResponse && (
                  <div className="bg-muted rounded-lg p-3 mt-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Store" size={16} className="text-primary" />
                      <span className="text-sm font-body font-medium text-foreground">
                        Resposta do vendedor
                      </span>
                      <span className="text-sm font-caption text-muted-foreground">
                        {formatDate(review?.vendorResponse?.date)}
                      </span>
                    </div>
                    <p className="text-sm font-body text-muted-foreground">
                      {review?.vendorResponse?.message}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorReviewsSection;