import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Crown, Search, Users, HelpCircle, BookOpen, TrendingUp, Newspaper, Building2, Wallet } from 'lucide-react';

export function Footer() {
  const isAdmin = true; // TODO: Replace with actual auth check

  const footerSections = [
    {
      title: 'À propos',
      links: [
        { label: 'Qui sommes-nous ?', href: '/about' },
        { label: 'Authentification & Blockchain', href: '/blockchain' },
        { label: 'Nos engagements', href: '/commitments' }
      ]
    },
    {
      title: 'Découvrir',
      links: [
        { label: 'Catalogue Général', href: '/catalog', icon: Search },
        { label: 'Objets Iconiques', href: '/iconic/rolex-daytona-paul-newman', icon: Crown },
        { label: 'Vendeurs Vérifiés', href: '/sellers', icon: Users },
        { label: 'Dernières Collections', href: '/collections' }
      ]
    },
    {
      title: 'Blog & Éducation',
      links: [
        { label: 'Articles & Actualités', href: '/blog', icon: Newspaper },
        { label: 'Guide Blockchain & Luxe', href: '/blog/blockchain-guide', icon: BookOpen },
        { label: 'Analyses du Marché', href: '/blog/market-insights', icon: TrendingUp }
      ]
    },
    {
      title: 'Vendeurs',
      links: [
        { label: 'Vendre sur LuxChain', href: '/sell', icon: Building2 },
        { label: 'Créer un compte vendeur', href: '/seller/register' },
        { label: 'Accéder au dashboard', href: '/seller/dashboard' },
        { label: 'Politique de vente & frais', href: '/seller/terms' }
      ]
    },
    {
      title: 'Acheteurs',
      links: [
        { label: "S'inscrire en tant qu'acheteur", href: '/register' },
        { label: 'Se connecter à mon espace', href: '/login' },
        { label: "Conditions générales d'achat", href: '/terms' }
      ]
    },
    {
      title: 'Support & Légal',
      links: [
        { label: 'Support & FAQ', href: '/support', icon: HelpCircle },
        { label: 'Paiements Sécurisés', href: '/payments', icon: Wallet },
        { label: 'Service client', href: '/support/contact' },
        { label: 'Mentions légales', href: '/legal' },
        { label: 'Politique de confidentialité', href: '/privacy' }
      ]
    }
  ];

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-serif">LuxChain</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600 leading-relaxed">
              La première marketplace de luxe avec authentification blockchain, 
              garantissant l'authenticité de chaque pièce d'exception.
            </p>
            <div className="mt-6 flex items-center space-x-2 text-sm text-gray-600">
              <Shield className="h-4 w-4" />
              <span>Authentification garantie</span>
            </div>
          </div>

          {/* Links Columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-medium mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="group flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      {link.icon && (
                        <link.icon className="h-4 w-4 mr-2 text-gray-400 group-hover:text-gray-600 transition-colors" />
                      )}
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="text-sm text-gray-600">
            © {new Date().getFullYear()} LuxChain. Tous droits réservés.
          </div>

          <div className="flex items-center space-x-6">
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-600">
                LinkedIn
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600">
                Instagram
              </a>
            </div>

            {/* Admin Link - Only visible to admins */}
            {isAdmin && (
              <Link
                to="/admin"
                className="flex items-center space-x-2 text-sm text-gray-400 hover:text-gray-600"
              >
                <Lock className="h-4 w-4" />
                <span>Espace Administration</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}