import React, { useState } from 'react';
import { 
  Shield, 
  Wallet, 
  CreditCard, 
  ArrowRight, 
  CheckCircle, 
  Lock,
  DollarSign,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

const paymentMethods = [
  {
    id: 'crypto',
    title: 'Crypto-monnaies',
    description: 'Paiement direct en ETH ou USDC',
    icon: Wallet,
    methods: [
      { name: 'Ethereum (ETH)', icon: '⟠' },
      { name: 'USD Coin (USDC)', icon: '$' }
    ],
    benefits: [
      'Transaction instantanée',
      'Frais réduits',
      'Traçabilité blockchain'
    ]
  },
  {
    id: 'card',
    title: 'Cartes Bancaires',
    description: 'Visa, Mastercard, American Express',
    icon: CreditCard,
    methods: [
      { name: 'Visa', icon: '💳' },
      { name: 'Mastercard', icon: '💳' },
      { name: 'American Express', icon: '💳' }
    ],
    benefits: [
      'Paiement sécurisé 3D-Secure',
      'Protection acheteur',
      'Conversion automatique'
    ]
  }
];

const guarantees = [
  {
    icon: Shield,
    title: 'Authentification Garantie',
    description: 'Chaque produit est vérifié et certifié sur la blockchain.'
  },
  {
    icon: Lock,
    title: 'Paiement Sécurisé',
    description: 'Transactions cryptées et protocoles de sécurité avancés.'
  },
  {
    icon: DollarSign,
    title: 'Protection Acheteur',
    description: 'Remboursement garanti en cas de problème.'
  }
];

const faqs = [
  {
    question: 'Comment fonctionne le paiement en crypto ?',
    answer: 'Le paiement en crypto se fait directement via votre wallet (MetaMask, etc.). Le montant en ETH ou USDC est calculé en temps réel selon le cours actuel. La transaction est sécurisée et tracée sur la blockchain.'
  },
  {
    question: 'Les paiements par carte sont-ils sécurisés ?',
    answer: 'Oui, tous les paiements par carte sont protégés par le protocole 3D-Secure et nos systèmes de sécurité PCI DSS. Vos données bancaires ne sont jamais stockées sur nos serveurs.'
  },
  {
    question: 'Que se passe-t-il en cas de litige ?',
    answer: 'Notre service client est disponible 24/7. En cas de litige, nous agissons comme tiers de confiance et pouvons bloquer/rembourser le paiement si nécessaire.'
  },
  {
    question: 'Comment sont calculés les frais ?',
    answer: 'Les frais varient selon le mode de paiement : 1-2% pour les paiements crypto, 2.5-3% pour les cartes bancaires. Les frais exacts sont toujours affichés avant la confirmation du paiement.'
  }
];

export function SecurePaymentsPage() {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[40vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80"
            alt="Secure Payments"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-serif mb-4">
              Paiements Sécurisés
            </h1>
            <p className="text-xl text-white/80 font-light">
              Des transactions sûres et transparentes, garanties par la blockchain.
            </p>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4">
              Modes de Paiement
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choisissez le mode de paiement qui vous convient, en toute sécurité.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {paymentMethods.map((method) => (
              <div key={method.id} className="bg-[#f8f7f5] rounded-xl p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 bg-black rounded-xl text-white">
                    <method.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium">{method.title}</h3>
                    <p className="text-gray-600">{method.description}</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  {method.methods.map((subMethod) => (
                    <div key={subMethod.name} className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                      <span className="text-xl">{subMethod.icon}</span>
                      <span>{subMethod.name}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  {method.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center space-x-2 text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-24 bg-[#f8f7f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4">
              Nos Garanties
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une sécurité maximale pour vos transactions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {guarantees.map((guarantee) => (
              <div key={guarantee.title} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black text-white mb-6">
                  <guarantee.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-medium mb-4">{guarantee.title}</h3>
                <p className="text-gray-600">{guarantee.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MetaMask Tutorial */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#f8f7f5] rounded-xl p-8 md:p-12">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-serif mb-6">
                Comment utiliser MetaMask ?
              </h2>
              <p className="text-gray-600 mb-8">
                MetaMask est le wallet le plus utilisé pour les paiements en crypto. 
                Suivez notre guide pour commencer.
              </p>
              <div className="space-y-6">
                {[
                  {
                    step: '01',
                    title: 'Installer MetaMask',
                    description: 'Téléchargez l\'extension MetaMask depuis le site officiel'
                  },
                  {
                    step: '02',
                    title: 'Créer ou Importer un Wallet',
                    description: 'Suivez le processus de configuration sécurisé'
                  },
                  {
                    step: '03',
                    title: 'Ajouter des Fonds',
                    description: 'Achetez ou transférez des crypto-monnaies vers votre wallet'
                  }
                ].map((step) => (
                  <div key={step.step} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center font-light">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <a
                  href="https://metamask.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-black hover:text-gray-600"
                >
                  <span>Visiter MetaMask.io</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[#f8f7f5]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4">
              Questions Fréquentes
            </h2>
            <p className="text-xl text-gray-600">
              Tout ce que vous devez savoir sur nos paiements sécurisés.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq.question ? null : faq.question)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-medium">{faq.question}</span>
                  <ChevronDown className={`h-5 w-5 transition-transform ${
                    expandedFaq === faq.question ? 'rotate-180' : ''
                  }`} />
                </button>
                
                {expandedFaq === faq.question && (
                  <div className="px-6 pb-6 text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Help CTA */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white text-black mb-6">
            <HelpCircle className="h-8 w-8" />
          </div>
          <h2 className="text-4xl font-serif mb-6">
            Besoin d'aide ?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Notre équipe support est disponible 24/7 pour répondre à vos questions.
          </p>
          <a
            href="/support"
            className="inline-flex items-center space-x-2 bg-white text-black px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            <span>Contacter le support</span>
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </section>
    </div>
  );
}