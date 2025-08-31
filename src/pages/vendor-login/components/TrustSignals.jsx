import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustSignals = () => {
  const securityFeatures = [
    {
      icon: "Shield",
      title: "Segurança SSL",
      description: "Seus dados protegidos com criptografia"
    },
    {
      icon: "Lock",
      title: "Login Seguro",
      description: "Autenticação de dois fatores disponível"
    },
    {
      icon: "CheckCircle",
      title: "Verificado",
      description: "Plataforma certificada para vendedores"
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Maria Silva",
      business: "Hortifruti da Maria",
      location: "São Paulo, SP",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      quote: "Desde que comecei a usar o FreshLink, minhas vendas aumentaram 40%. A plataforma é muito fácil de usar!"
    },
    {
      id: 2,
      name: "João Santos",
      business: "Fazenda Orgânica Santos",
      location: "Campinas, SP",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      quote: "Consegui alcançar novos clientes na região. O WhatsApp integrado facilita muito o atendimento."
    }
  ];

  return (
    <div className="space-y-8">
      {/* Security Features */}
      <div className="bg-muted/50 rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 text-center">
          Sua segurança é nossa prioridade
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {securityFeatures?.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Icon name={feature?.icon} size={20} className="text-primary" />
              </div>
              <h4 className="text-sm font-body font-medium text-foreground mb-1">
                {feature?.title}
              </h4>
              <p className="text-xs font-caption text-muted-foreground">
                {feature?.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Testimonials */}
      <div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 text-center">
          Vendedores que confiam no FreshLink
        </h3>
        <div className="space-y-4">
          {testimonials?.map((testimonial) => (
            <div key={testimonial?.id} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Image
                  src={testimonial?.avatar}
                  alt={testimonial?.name}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-1 mb-1">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon key={i} name="Star" size={14} className="text-warning fill-current" />
                    ))}
                  </div>
                  <p className="text-sm font-body text-foreground mb-2">
                    "{testimonial?.quote}"
                  </p>
                  <div className="text-xs font-caption text-muted-foreground">
                    <span className="font-medium">{testimonial?.name}</span>
                    <span className="mx-1">•</span>
                    <span>{testimonial?.business}</span>
                    <span className="mx-1">•</span>
                    <span>{testimonial?.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Stats */}
      <div className="bg-primary/5 rounded-lg p-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-heading font-bold text-primary mb-1">500+</div>
            <div className="text-xs font-caption text-muted-foreground">Vendedores ativos</div>
          </div>
          <div>
            <div className="text-2xl font-heading font-bold text-primary mb-1">10k+</div>
            <div className="text-xs font-caption text-muted-foreground">Produtos cadastrados</div>
          </div>
          <div>
            <div className="text-2xl font-heading font-bold text-primary mb-1">50+</div>
            <div className="text-xs font-caption text-muted-foreground">Cidades atendidas</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;