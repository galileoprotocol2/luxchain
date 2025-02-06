import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Scale, 
  FileText, 
  Lock,
  ArrowRight,
  ChevronDown,
  AlertCircle,
  CheckCircle,
  HelpCircle,
  Wallet
} from 'lucide-react';

const legalSections = [
  {
    id: 'terms',
    title: 'Conditions Générales de Vente',
    icon: FileText,
    sections: [
      {
        title: 'Objet et Champ d\'Application',
        content: `Les présentes Conditions Générales de Vente (CGV) régissent l'ensemble des relations entre LuxChain, les vendeurs et les acheteurs utilisant la plateforme.

Elles définissent les droits et obligations des parties dans le cadre de la vente de produits de luxe authentifiés par blockchain.`
      },
      {
        title: 'Processus de Vente',
        content: `Chaque produit listé sur LuxChain fait l'objet d'une authentification rigoureuse et d'une certification blockchain.

Le processus de vente inclut :
- Vérification de l'authenticité
- Création du certificat NFT
- Mise en vente sécurisée
- Paiement et livraison`
      },
      {
        title: 'Prix et Paiement',
        content: `Les prix sont affichés en euros et en crypto-monnaies (ETH, USDC).

Les frais de service incluent :
- Commission plateforme : 2-5%
- Frais de certification blockchain
- Frais de transaction variables selon le mode de paiement`
      }
    ]
  },
  {
    id: 'privacy',
    title: 'Politique de Confidentialité',
    icon: Lock,
    sections: [
      {
        title: 'Collecte des Données',
        content: `Nous collectons uniquement les données nécessaires au bon fonctionnement du service :

- Informations d'identification
- Données de transaction
- Adresses wallet
- Historique d'achat`
      },
      {
        title: 'Utilisation des Données',
        content: `Vos données sont utilisées pour :
- Authentification et sécurité
- Traitement des transactions
- Certification blockchain
- Service client
- Amélioration du service`
      },
      {
        title: 'Protection des Données',
        content: `Conformément au RGPD, nous garantissons :
- Sécurité maximale des données
- Droit d'accès et de rectification
- Droit à l'oubli
- Portabilité des données`
      }
    ]
  },
  {
    id: 'returns',
    title: 'Politique de Retour',
    icon: Scale,
    sections: [
      {
        title: 'Conditions de Retour',
        content: `Délai de rétractation : 14 jours
Conditions :
- Produit non utilisé
- Emballage d'origine
- Documents et certificats inclus`
      },
      {
        title: 'Procédure de Retour',
        content: `1. Demande via l'espace client
2. Validation par notre service qualité
3. Envoi sécurisé et assuré
4. Remboursement après vérification`
      },
      {
        title: 'Remboursements',
        content: `Le remboursement est effectué :
- Dans la devise d'origine
- Sous 14 jours maximum
- Frais de retour à la charge de l'acheteur`
      }
    ]
  },
  {
    id: 'disputes',
    title: 'Résolution des Litiges',
    icon: Shield,
    sections: [
      {
        title: 'Processus de Médiation',
        content: `En cas de litige :
1. Contact du service client
2. Médiation interne
3. Expertise indépendante si nécessaire
4. Résolution à l'amiable privilégiée`
      },
      {
        title: 'Garanties',
        content: `Nous garantissons :
- Authenticité des produits
- Conformité des certificats blockchain
- Protection des transactions
- Médiation impartiale`
      }
    ]
  }
];

const quickLinks = [
  { label: 'Centre d\'Aide', href: '/support', icon: HelpCircle },
  { label: 'Paiements Sécurisés', href: '/payments', icon: Wallet },
  { label: 'Protection des Données', href: '/privacy', icon: Lock },
  { label: 'Contactez-nous', href: '/support/contact', icon: AlertCircle }
];

export function LegalPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [expandedSubSection, setExpandedSubSection] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[40vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80"
            alt="Legal"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-serif mb-4">
              Légal & Conformité
            </h1>
            <p className="text-xl text-white/80 font-light">
              Transparence, sécurité et conformité au cœur de nos services.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-[#f8f7f5] py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-8">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <link.icon className="h-5 w-5" />
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <h2 className="text-2xl font-serif mb-6">Documents Légaux</h2>
              <nav className="space-y-2">
                {legalSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setExpandedSection(
                      expandedSection === section.id ? null : section.id
                    )}
                    className="w-full"
                  >
                    <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-3">
                        <section.icon className="h-5 w-5 text-gray-500" />
                        <span className="font-medium">{section.title}</span>
                      </div>
                      <ChevronDown className={`h-5 w-5 transition-transform ${
                        expandedSection === section.id ? 'rotate-180' : ''
                      }`} />
                    </div>
                  </button>
                ))}
              </nav>

              {/* Contact Box */}
              <div className="bg-[#f8f7f5] rounded-xl p-6">
                <h3 className="font-medium mb-2">Besoin d'aide ?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Notre équipe juridique est à votre disposition pour toute question.
                </p>
                <Link
                  to="/support/contact"
                  className="flex items-center justify-center space-x-2 w-full bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-800 transition-colors"
                >
                  <span>Contacter le support</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-2 space-y-12">
            {legalSections.map((section) => (
              <div key={section.id} id={section.id} className="scroll-mt-8">
                <div className="flex items-center space-x-3 mb-6">
                  <section.icon className="h-6 w-6" />
                  <h2 className="text-2xl font-serif">{section.title}</h2>
                </div>

                <div className="space-y-6">
                  {section.sections.map((subSection) => (
                    <div
                      key={subSection.title}
                      className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedSubSection(
                          expandedSubSection === subSection.title ? null : subSection.title
                        )}
                        className="w-full flex items-center justify-between p-6 text-left"
                      >
                        <span className="font-medium">{subSection.title}</span>
                        <ChevronDown className={`h-5 w-5 transition-transform ${
                          expandedSubSection === subSection.title ? 'rotate-180' : ''
                        }`} />
                      </button>
                      
                      {expandedSubSection === subSection.title && (
                        <div className="px-6 pb-6">
                          <div className="prose prose-gray max-w-none">
                            {subSection.content.split('\n\n').map((paragraph, index) => (
                              <p key={index} className="text-gray-600 whitespace-pre-line">
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white text-black mb-6">
            <Shield className="h-8 w-8" />
          </div>
          <h2 className="text-3xl font-serif mb-4">
            Votre Confiance, Notre Priorité
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Nous nous engageons à maintenir les plus hauts standards de sécurité et de conformité 
            pour protéger vos intérêts.
          </p>
          <div className="flex items-center justify-center space-x-8">
            {[
              { icon: Lock, label: 'Protection des Données' },
              { icon: Shield, label: 'Transactions Sécurisées' },
              { icon: Scale, label: 'Conformité RGPD' }
            ].map((item) => (
              <div key={item.label} className="flex items-center space-x-2">
                <item.icon className="h-5 w-5" />
                <span className="text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}