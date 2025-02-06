import React from 'react';
import { Header } from './Header';
import { Hero } from './Hero';
import { ProductCard } from './ProductCard';
import { ArrowRight, Shield, Wallet, CreditCard, CheckCircle } from 'lucide-react';

const testimonials = [
  {
    name: 'Jean Dupont',
    role: 'Collectionneur',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80',
    content: 'La certification blockchain apporte une vraie tranquillité d\'esprit. Je recommande vivement.'
  },
  {
    name: 'Marie Martin',
    role: 'Acheteuse Privée',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80',
    content: 'Une plateforme qui révolutionne l\'achat de produits de luxe. Service impeccable.'
  }
];

const featuredProducts = [
  {
    id: '1',
    name: 'Rolex Daytona',
    description: 'Chronographe automatique en or rose 18 carats avec cadran noir',
    price: 42.5,
    currency: 'ETH',
    category: 'watches',
    images: ['https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80'],
    seller: {
      id: '1',
      name: 'Luxury Watches Paris',
      verified: true
    },
    certificateId: '0x123...',
    status: 'approved'
  },
  {
    id: '2',
    name: 'Bague Cartier',
    description: 'Bague Trinity classique, or blanc, or jaune, or rose',
    price: 15.8,
    currency: 'ETH',
    category: 'jewelry',
    images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80'],
    seller: {
      id: '2',
      name: 'Joaillerie Moderne',
      verified: true
    },
    certificateId: '0x456...',
    status: 'approved'
  },
  {
    id: '3',
    name: 'Ferrari F40',
    description: 'Supercar iconique des années 90, état concours, historique complet',
    price: 380,
    currency: 'ETH',
    category: 'cars',
    images: ['https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80'],
    seller: {
      id: '3',
      name: 'Classic Cars Paris',
      verified: true
    },
    certificateId: '0x789...',
    status: 'pending'
  }
];

const categories = [
  {
    id: 'cars',
    title: 'Voitures de Collection',
    subtitle: 'Ferrari, Lamborghini, Porsche',
    image: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80'
  },
  {
    id: 'real-estate',
    title: 'Immobilier de Prestige',
    subtitle: 'Villas, Penthouses, Propriétés',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80'
  },
  {
    id: 'art',
    title: 'Art & Œuvres Iconiques',
    subtitle: 'Peintures, Sculptures, NFTs',
    image: 'https://images.unsplash.com/photo-1577720643272-265f09367456?auto=format&fit=crop&q=80'
  },
  {
    id: 'watches',
    title: 'Montres de Luxe',
    subtitle: 'Rolex, Patek Philippe, AP',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80'
  },
  {
    id: 'jewelry',
    title: 'Haute Joaillerie',
    subtitle: 'Cartier, Bulgari, Van Cleef',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80'
  },
  {
    id: 'collectibles',
    title: 'Objets de Collection',
    subtitle: 'Whisky, Sacs Hermès, Raretés',
    image: 'https://images.unsplash.com/photo-1584727638096-042c45049ebe?auto=format&fit=crop&q=80'
  }
];

export function LandingPage() {
  return (
    <>
      <Header />
      <Hero />
      
      {/* Categories Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif text-gray-900 mb-4">
              Explorez l'Excellence. Achetez l'Exceptionnel.
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Voitures d'exception, montres de prestige, œuvres d'art iconiques… 
              Découvrez les catégories qui redéfinissent le luxe authentifié.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <a
                key={category.id}
                href={`/category/${category.id}`}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="text-2xl font-serif text-white mb-2">
                    {category.title}
                  </h3>
                  <p className="text-white/80 text-sm mb-4">
                    {category.subtitle}
                  </p>
                  <div className="flex items-center space-x-2 text-white/80 text-sm transition-colors group-hover:text-white">
                    <span>Découvrir</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-4xl font-serif text-gray-900 mb-4">
                Collections Exclusives
              </h2>
              <p className="text-gray-600 max-w-2xl text-lg">
                Découvrez notre sélection d'objets de luxe, tous authentifiés 
                et certifiés sur la blockchain pour une transparence totale.
              </p>
            </div>
            
            <button className="group flex items-center space-x-2 text-gray-900 hover:text-gray-600 transition-colors">
              <span className="text-sm font-medium">Voir tout</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-[#f8f7f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-gray-900 mb-4">
              Pourquoi Choisir Notre Marketplace ?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Une nouvelle ère pour les objets d'exception, où la technologie 
              blockchain garantit l'authenticité de chaque pièce.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Shield,
                title: 'Authenticité garantie',
                description: 'Chaque produit est certifié sur la blockchain avec un NFT unique.'
              },
              {
                icon: Wallet,
                title: 'Paiements sécurisés',
                description: 'Transactions sécurisées en crypto et monnaies traditionnelles.'
              },
              {
                icon: CheckCircle,
                title: 'Vendeurs vérifiés',
                description: 'Processus de vérification KYB rigoureux pour les vendeurs.'
              }
            ].map(({ icon: Icon, title, description }) => (
              <div key={title} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black text-white mb-6">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-medium mb-4">{title}</h3>
                <p className="text-gray-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-gray-900 mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Un processus simple et sécurisé pour acheter des objets d'exception.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: '01',
                title: 'Trouvez votre pièce',
                description: 'Parcourez notre sélection d\'objets d\'exception.'
              },
              {
                step: '02',
                title: 'Paiement sécurisé',
                description: 'Payez en crypto ou carte bancaire en toute sécurité.'
              },
              {
                step: '03',
                title: 'Certificat NFT',
                description: 'Recevez votre certificat d\'authenticité blockchain.'
              }
            ].map(({ step, title, description }) => (
              <div key={step} className="relative">
                <div className="text-8xl font-serif text-black/5 absolute -top-8 left-0">
                  {step}
                </div>
                <div className="relative">
                  <h3 className="text-xl font-medium mb-4">{title}</h3>
                  <p className="text-gray-600">{description}</p>
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
            <h2 className="text-4xl font-serif text-gray-900 mb-4">
              Ils nous font confiance
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Découvrez les témoignages de nos clients satisfaits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="bg-white p-8 rounded-2xl">
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full"
                  />
                  <div>
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-600">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif mb-8">
            Rejoignez l'expérience LuxChain
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href="/register"
              className="px-8 py-3 bg-white text-black rounded-full hover:bg-gray-100 transition-colors"
            >
              Créer un compte acheteur
            </a>
            <a
              href="/seller/register"
              className="px-8 py-3 border border-white rounded-full hover:bg-white/10 transition-colors"
            >
              Devenir vendeur vérifié
            </a>
          </div>
        </div>
      </section>
    </>
  );
}