import React from 'react';
import Icon from '../../../components/AppIcon';

const VendorAboutSection = ({ vendor }) => {
  return (
    <div className="space-y-6">
      {/* Business Story */}
      <div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-3">
          Nossa História
        </h3>
        <p className="font-body text-muted-foreground leading-relaxed">
          {vendor?.story}
        </p>
      </div>
      {/* Certifications */}
      {vendor?.certifications && vendor?.certifications?.length > 0 && (
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground mb-3">
            Certificações
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {vendor?.certifications?.map((cert, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 bg-muted rounded-lg"
              >
                <Icon name="Award" size={20} className="text-primary flex-shrink-0" />
                <div>
                  <p className="font-body font-medium text-foreground">{cert?.name}</p>
                  <p className="text-sm font-caption text-muted-foreground">{cert?.issuer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Delivery Information */}
      <div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-3">
          Entrega e Retirada
        </h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <Icon name="Truck" size={20} className="text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-body font-medium text-foreground">Entrega</p>
              <p className="text-sm font-caption text-muted-foreground">
                {vendor?.deliveryInfo?.available 
                  ? `Raio de ${vendor?.deliveryInfo?.radius}km - Taxa: ${vendor?.deliveryInfo?.fee}`
                  : 'Não disponível'
                }
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Icon name="MapPin" size={20} className="text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-body font-medium text-foreground">Retirada no Local</p>
              <p className="text-sm font-caption text-muted-foreground">
                {vendor?.pickupInfo?.available 
                  ? vendor?.pickupInfo?.address
                  : 'Não disponível'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Payment Methods */}
      <div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-3">
          Formas de Pagamento
        </h3>
        <div className="flex flex-wrap gap-2">
          {vendor?.paymentMethods?.map((method, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 px-3 py-2 bg-muted rounded-lg"
            >
              <Icon 
                name={method?.icon} 
                size={16} 
                className="text-primary" 
              />
              <span className="text-sm font-body text-foreground">{method?.name}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Contact Information */}
      <div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-3">
          Contato
        </h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <Icon name="Phone" size={16} className="text-muted-foreground" />
            <span className="font-body text-muted-foreground">{vendor?.phone}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Icon name="Mail" size={16} className="text-muted-foreground" />
            <span className="font-body text-muted-foreground">{vendor?.email}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Icon name="MapPin" size={16} className="text-muted-foreground" />
            <span className="font-body text-muted-foreground">{vendor?.fullAddress}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorAboutSection;