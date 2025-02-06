import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  TrendingUp, 
  Users, 
  Wallet,
  ArrowRight,
  CheckCircle,
  Building2,
  Globe2,
  Banknote,
  ChevronRight
} from 'lucide-react';

const benefits = [
  {
    icon: Shield,
    title: 'Authentification Blockchain',
    description: 'Chaque produit est certifié avec un NFT unique, garantissant son authenticité.'
  },
  {
    icon: Globe2,
    title: 'Audience Internationale',
    description: 'Accédez à une clientèle premium mondiale passionnée de luxe.'
  },
  {
    icon: Wallet,
    title: 'Paiements Sécurisés',
    description: 'Recevez vos paiements en crypto ou en monnaie traditionnelle.'
  },
  {
    icon: TrendingUp,
    title: 'Croissance Rapide',
    description: 'Bénéficiez d\'une plateforme en pleine expansion dans le luxe.'
  }
];

const steps = [
  {
    number: '01',
    title: 'Créez votre compte vendeur',
    description: 'Remplissez le formulaire avec les informations de votre entreprise.'
  },
  {
    number: '02',
    title: 'Vérification KYB',
    description: 'Fournissez les documents nécessaires pour la vérification de votre entreprise.'
  },
  {
    number: '03',
    title: 'Configuration du compte',
    description: 'Personnalisez votre profil et configurez vos préférences de paiement.'
  },
  {
    number: '04',
    title: 'Ajoutez vos produits',
    description: 'Commencez à lister vos pièces d\'exception avec certification blockchain.'
  }
];

const testimonials = [
  {
    quote: "La certification blockchain nous a permis d'établir une confiance totale avec nos clients internationaux.",
    author: 'Jean Dupont',
    role: 'CEO, Luxury Watches Paris',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80'
  },
  {
    quote: "Les ventes ont augmenté de 40% depuis que nous avons rejoint LuxChain. Une vraie révolution.",
    author: 'Marie Martin',
    role: 'Directrice, Joaillerie Moderne',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80'
  }
];

export function SellMarketplacePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80"
            alt="Luxury store"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="font-serif text-white">
                <span className="block text-6xl mb-4">Vendez sur LuxChain</span>
                <span className="block text-2xl font-light opacity-90">
                  La première marketplace de luxe avec authentification blockchain
                </span>
              </h1>
              <p className="mt-6 text-xl text-white/80 font-light leading-relaxed">
                Rejoignez notre réseau de vendeurs vérifiés et accédez à une clientèle 
                premium internationale passionnée de luxe.
              </p>
              <div className="mt-8 flex items-center space-x-6">
                <button 
                  onClick={() => navigate('/seller/register')}
                  className="group flex items-center space-x-2 bg-white text-black px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <Building2 className="h-5 w-5" />
                  <span>Créer un compte vendeur</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
                <button 
                  onClick={() => document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-white hover:text-white/80"
                >
                  En savoir plus
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4">
              Pourquoi Vendre sur LuxChain ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une nouvelle ère pour la vente de produits de luxe, où la technologie 
              blockchain garantit l'authenticité de chaque pièce.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black text-white mb-6">
                  <benefit.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-medium mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-[#f8f7f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { number: '150+', label: 'Vendeurs Vérifiés' },
              { number: '€25M+', label: 'Volume Mensuel' },
              { number: '12,000+', label: 'Clients Premium' }
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-5xl font-light mb-4">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4">
              Comment Commencer ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un processus simple et rapide pour rejoindre notre marketplace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {steps.map((step) => (
              <div key={step.number} className="relative">
                <div className="text-8xl font-serif text-black/5 absolute -top-8 left-0">
                  {step.number}
                </div>
                <div className="relative">
                  <h3 className="text-xl font-medium mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-[#f8f7f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4">
              Ils nous font confiance
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {testimonials.map((testimonial) => (
              <div key={testimonial.author} className="bg-white p-8 rounded-2xl">
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="h-12 w-12 rounded-full"
                  />
                  <div>
                    <div className="font-medium">{testimonial.author}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-serif mb-6">
              Prêt à Rejoindre LuxChain ?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Commencez à vendre vos produits de luxe avec la puissance de la blockchain.
            </p>
            <button 
              onClick={() => navigate('/seller/register')}
              className="inline-flex items-center space-x-2 bg-white text-black px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Building2 className="h-5 w-5" />
              <span>Créer un compte vendeur</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}