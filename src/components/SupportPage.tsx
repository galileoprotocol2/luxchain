import React, { useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  MessageSquare, 
  Send, 
  Shield, 
  Wallet, 
  CreditCard, 
  Truck, 
  HelpCircle,
  ArrowRight,
  X
} from 'lucide-react';

// FAQ Categories with their questions
const faqCategories = [
  {
    id: 'general',
    title: 'Questions Générales',
    icon: HelpCircle,
    questions: [
      {
        question: "Qu'est-ce que LuxChain ?",
        answer: "LuxChain est la première marketplace de luxe avec authentification blockchain, garantissant l'authenticité de chaque pièce d'exception grâce à des certificats NFT inviolables."
      },
      {
        question: "Comment fonctionne l'authentification blockchain ?",
        answer: "Chaque produit vendu sur LuxChain est lié à un NFT unique contenant son historique complet, ses certificats d'authenticité et sa traçabilité. Ce certificat est stocké de manière immuable sur la blockchain."
      }
    ]
  },
  {
    id: 'payment',
    title: 'Paiement & TVA',
    icon: Wallet,
    questions: [
      {
        question: "Quels moyens de paiement acceptez-vous ?",
        answer: "Nous acceptons les paiements en crypto-monnaies (ETH, USDC) ainsi que les cartes bancaires traditionnelles (Visa, Mastercard, American Express)."
      },
      {
        question: "Comment fonctionne la TVA ?",
        answer: "La TVA est calculée en fonction de votre pays de résidence et du type de produit. Le montant exact est affiché avant la finalisation de votre achat."
      }
    ]
  },
  {
    id: 'shipping',
    title: 'Livraison & Retours',
    icon: Truck,
    questions: [
      {
        question: "Comment sont livrés les produits ?",
        answer: "Tous nos produits sont livrés via des transporteurs sécurisés spécialisés dans les objets de valeur. Chaque envoi est assuré et tracé en temps réel."
      },
      {
        question: "Quelle est votre politique de retour ?",
        answer: "Nous offrons une période de retour de 14 jours pour tous les produits dans leur état d'origine. Les frais de retour sont à la charge de l'acheteur."
      }
    ]
  },
  {
    id: 'security',
    title: 'Sécurité & Garanties',
    icon: Shield,
    questions: [
      {
        question: "Comment garantissez-vous l'authenticité des produits ?",
        answer: "Chaque produit passe par un processus de vérification rigoureux. Les vendeurs sont vérifiés (KYB) et chaque pièce est authentifiée par des experts avant d'être mise en vente."
      },
      {
        question: "Que se passe-t-il en cas de litige ?",
        answer: "Notre service client est disponible 24/7 pour résoudre tout litige. Les paiements sont sécurisés et nous agissons comme tiers de confiance entre acheteurs et vendeurs."
      }
    ]
  }
];

const contactReasons = [
  { id: 'purchase', label: 'Question sur un achat' },
  { id: 'product', label: 'Information produit' },
  { id: 'seller', label: 'Devenir vendeur' },
  { id: 'technical', label: 'Problème technique' },
  { id: 'other', label: 'Autre demande' }
];

export function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    reason: '',
    message: ''
  });

  const toggleQuestion = (questionId: string) => {
    setExpandedQuestions(prev => 
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', contactForm);
    setShowContactForm(false);
    setContactForm({ name: '', email: '', reason: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[40vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80"
            alt="Support"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-serif mb-4">
              Comment pouvons-nous vous aider ?
            </h1>
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une réponse..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-[#f8f7f5] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: MessageSquare,
                title: 'Contacter le Support',
                description: 'Une question ? Notre équipe est là pour vous aider',
                action: () => setShowContactForm(true)
              },
              {
                icon: Shield,
                title: 'Centre de Sécurité',
                description: 'Tout sur la sécurité de vos transactions',
                action: () => window.location.href = '/security'
              },
              {
                icon: CreditCard,
                title: 'Guide des Paiements',
                description: 'Comprendre les options de paiement',
                action: () => window.location.href = '/payments'
              }
            ].map((item, index) => (
              <button
                key={index}
                onClick={item.action}
                className="group bg-white p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-all text-left"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-black text-white mb-4">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex items-center text-sm text-black group-hover:translate-x-1 transition-transform">
                  <span>En savoir plus</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif text-center mb-12">
            Questions Fréquentes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqCategories.map((category) => (
              <div key={category.id} className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <category.icon className="h-5 w-5" />
                  <h3 className="text-lg font-medium">{category.title}</h3>
                </div>

                <div className="space-y-2">
                  {category.questions.map((item, index) => {
                    const questionId = `${category.id}-${index}`;
                    const isExpanded = expandedQuestions.includes(questionId);

                    return (
                      <div
                        key={questionId}
                        className="bg-white rounded-xl border border-gray-100 overflow-hidden"
                      >
                        <button
                          onClick={() => toggleQuestion(questionId)}
                          className="w-full flex items-center justify-between p-4 text-left"
                        >
                          <span className="font-medium">{item.question}</span>
                          <ChevronDown className={`h-5 w-5 transition-transform ${
                            isExpanded ? 'rotate-180' : ''
                          }`} />
                        </button>
                        
                        {isExpanded && (
                          <div className="px-4 pb-4 text-gray-600">
                            {item.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-lg">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-medium">Contacter le Support</h3>
                <button onClick={() => setShowContactForm(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <form onSubmit={handleContactSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom complet
                </label>
                <input
                  type="text"
                  value={contactForm.name}
                  onChange={e => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={e => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Raison du contact
                </label>
                <select
                  value={contactForm.reason}
                  onChange={e => setContactForm(prev => ({ ...prev, reason: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                  required
                >
                  <option value="">Sélectionner une raison</option>
                  {contactReasons.map(reason => (
                    <option key={reason.id} value={reason.id}>
                      {reason.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  value={contactForm.message}
                  onChange={e => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                  required
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Send className="h-4 w-4" />
                  <span>Envoyer</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}