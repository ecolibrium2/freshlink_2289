import React, { useEffect } from 'react';
import Icon from '../AppIcon';
import Image from '../AppImage';

const ShareModal = ({ isOpen, onClose, vendor }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !vendor) return null;

  const shareOptions = [
    {
      name: 'Copiar link',
      icon: 'Copy',
      action: () => {
        navigator.clipboard.writeText(window.location.href);
        alert('Link copiado para a área de transferência!');
        onClose();
      }
    },
    {
      name: 'Email',
      icon: 'Mail',
      action: () => {
        const subject = encodeURIComponent(`Confira o perfil da ${vendor.name} no FreshLink`);
        const body = encodeURIComponent(`Olá! Encontrei este vendedor incrível no FreshLink: ${vendor.name}\n\nConfira os produtos frescos: ${window.location.href}`);
        window.open(`mailto:?subject=${subject}&body=${body}`);
        onClose();
      }
    },
    {
      name: 'WhatsApp',
      icon: 'MessageCircle',
      action: () => {
        const message = encodeURIComponent(`Confira o perfil da ${vendor.name} no FreshLink: ${window.location.href}`);
        window.open(`https://wa.me/?text=${message}`);
        onClose();
      }
    },
    {
      name: 'Facebook',
      icon: 'Facebook',
      action: () => {
        const url = encodeURIComponent(window.location.href);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
        onClose();
      }
    },
    {
      name: 'Twitter',
      icon: 'Twitter',
      action: () => {
        const text = encodeURIComponent(`Confira os produtos frescos da ${vendor.name} no FreshLink`);
        const url = encodeURIComponent(window.location.href);
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`);
        onClose();
      }
    },
    {
      name: 'LinkedIn',
      icon: 'Linkedin',
      action: () => {
        const url = encodeURIComponent(window.location.href);
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`);
        onClose();
      }
    },
    {
      name: 'Telegram',
      icon: 'Send',
      action: () => {
        const text = encodeURIComponent(`Confira o perfil da ${vendor.name} no FreshLink: ${window.location.href}`);
        window.open(`https://t.me/share/url?url=${window.location.href}&text=${text}`);
        onClose();
      }
    },
    {
      name: 'Mais opções',
      icon: 'MoreHorizontal',
      action: () => {
        if (navigator.share) {
          navigator.share({
            title: `${vendor.name} - FreshLink`,
            text: `Confira os produtos frescos da ${vendor.name}`,
            url: window.location.href
          });
        }
        onClose();
      }
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-2xl shadow-modal max-w-md w-full animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-heading font-semibold text-foreground">
            Compartilhar perfil
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors duration-200"
          >
            <Icon name="X" size={16} />
          </button>
        </div>

        {/* Vendor Preview */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-muted flex-shrink-0">
              <Image
                src={vendor.image}
                alt={vendor.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-body font-semibold text-foreground truncate">
                {vendor.name}
              </h3>
              <p className="text-sm text-muted-foreground truncate">
                {vendor.description || `Produtos frescos em ${vendor.location}`}
              </p>
              <div className="flex items-center space-x-1 mt-1">
                <Icon name="Star" size={14} className="text-warning fill-current" />
                <span className="text-sm font-body font-medium text-foreground">
                  {vendor.rating?.toFixed(1)}
                </span>
                <span className="text-sm text-muted-foreground">
                  • {vendor.productCount} produtos
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Share Options */}
        <div className="p-6">
          <div className="grid grid-cols-2 gap-3">
            {shareOptions.map((option) => (
              <button
                key={option.name}
                onClick={option.action}
                className="flex items-center space-x-3 p-3 rounded-xl border border-border hover:bg-muted/50 hover:border-primary/20 transition-all duration-200 group"
              >
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-200">
                  <Icon 
                    name={option.icon} 
                    size={18} 
                    className="text-muted-foreground group-hover:text-primary transition-colors duration-200" 
                  />
                </div>
                <span className="text-sm font-body font-medium text-foreground">
                  {option.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;