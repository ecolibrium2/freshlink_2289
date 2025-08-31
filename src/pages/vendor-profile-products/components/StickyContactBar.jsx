import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StickyContactBar = ({ vendor, onWhatsAppContact, onDirections }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 md:hidden">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <p className="font-body font-medium text-foreground text-sm">
              {vendor?.name}
            </p>
            <div className="flex items-center space-x-2">
              <Icon name="MapPin" size={14} className="text-muted-foreground" />
              <span className="font-caption text-xs text-muted-foreground">
                {vendor?.distance}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Navigation"
              onClick={onDirections}
            />
            <Button
              variant="default"
              size="sm"
              iconName="MessageCircle"
              iconPosition="left"
              onClick={onWhatsAppContact}
            >
              WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyContactBar;