import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Footer = () => {
  const navigate = useNavigate();

  const footerSections = [
    {
      title: 'Para Consumidores',
      links: [
        { label: 'Buscar Produtos', href: '/consumer-home-search' },
        { label: 'Vendedores', href: '/vendors' },
        { label: 'Como Funciona', href: '#' },
        { label: 'Criar Conta', href: '/auth' }
      ]
    },
    {
      title: 'Para Vendedores',
      links: [
        { label: 'Vender no FreshLink', href: '/vendor-registration' },
        { label: 'Entrar', href: '/vendor-login' },
        { label: 'Central de Ajuda', href: '#' },
        { label: 'Taxas e Comissões', href: '#' }
      ]
    },
    {
      title: 'Empresa',
      links: [
        { label: 'Sobre Nós', href: '#' },
        { label: 'Carreiras', href: '#' },
        { label: 'Imprensa', href: '#' },
        { label: 'Blog', href: '#' }
      ]
    },
    {
      title: 'Suporte',
      links: [
        { label: 'Central de Ajuda', href: '#' },
        { label: 'Contato', href: '#' },
        { label: 'Segurança', href: '#' },
        { label: 'Status do Sistema', href: '#' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: 'Facebook', href: '#' },
    { name: 'Instagram', icon: 'Instagram', href: '#' },
    { name: 'Twitter', icon: 'Twitter', href: '#' },
    { name: 'LinkedIn', icon: 'Linkedin', href: '#' }
  ];

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Leaf" size={20} color="white" />
              </div>
              <span className="font-heading font-bold text-xl text-foreground">FreshLink</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Conectando produtores locais com consumidores conscientes. 
              Produtos frescos, direto da fonte para sua mesa.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-9 h-9 bg-muted rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
                  aria-label={social.name}
                >
                  <Icon name={social.icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-body font-semibold text-foreground mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => link.href.startsWith('/') ? navigate(link.href) : null}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="bg-muted/50 rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="font-body font-semibold text-foreground mb-2">
                Fique por dentro das novidades
              </h3>
              <p className="text-sm text-muted-foreground">
                Receba ofertas especiais e novos vendedores na sua região
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 md:min-w-80">
              <input
                type="email"
                placeholder="Seu melhor email"
                className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-body font-medium hover:bg-primary/90 transition-colors duration-200">
                Inscrever-se
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-8 border-t border-border">
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <button className="hover:text-primary transition-colors duration-200">
              Termos de Uso
            </button>
            <button className="hover:text-primary transition-colors duration-200">
              Política de Privacidade
            </button>
            <button className="hover:text-primary transition-colors duration-200">
              Cookies
            </button>
            <button className="hover:text-primary transition-colors duration-200">
              Acessibilidade
            </button>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} FreshLink. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;