import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  ArrowRight,
  ChevronRight,
  Wallet,
  Link as LinkIcon,
  ExternalLink,
  Play,
  CheckCircle,
  Building2,
  History,
  X
} from 'lucide-react';

// Mock data for the iconic product
const iconicProduct = {
  id: 'rolex-daytona-paul-newman',
  name: 'Rolex Daytona Paul Newman',
  subtitle: 'L\'Horlogerie de Collection Redéfinie',
  description: `La Rolex Daytona "Paul Newman" est l'une des montres les plus emblématiques et recherchées au monde. Son histoire fascinante, liée à l'acteur et pilote Paul Newman, en fait un véritable mythe horloger.

Cette référence particulière se distingue par son cadran "exotique" caractéristique, avec ses compteurs Art Déco et son échelle de secondes périphérique. Une combinaison unique qui a redéfini les codes de l'horlogerie de collection.`,
  image: 'https://images.unsplash.com/photo-1627225924765-552d49cf47ad?auto=format&fit=crop&q=80',
  images: [
    'https://images.unsplash.com/photo-1627225924765-552d49cf47ad?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1604242692760-2f7b0c26856d?auto=format&fit=crop&q=80'
  ],
  history: [
    {
      year: '1963',
      event: 'Lancement de la Rolex Daytona',
      description: 'Rolex introduit le chronographe Cosmograph, plus tard renommé Daytona.'
    },
    {
      year: '1969',
      event: 'L\'Ère Paul Newman',
      description: 'Paul Newman commence à porter sa Daytona, offerte par sa femme Joanne Woodward.'
    },
    {
      year: '1980s',
      event: 'Naissance d\'une Légende',
      description: 'Les collectionneurs italiens commencent à s\'intéresser particulièrement aux cadrans "exotiques".'
    },
    {
      year: '2017',
      event: 'Vente Record',
      description: 'La Daytona personnelle de Paul Newman est vendue pour 17,8 millions de dollars.'
    }
  ],
  features: [
    {
      title: 'Cadran Exotique',
      description: 'Reconnaissable à ses compteurs Art Déco et son échelle de secondes périphérique.'
    },
    {
      title: 'Mouvement Valjoux',
      description: 'Calibre mécanique à remontage manuel Valjoux 722.'
    },
    {
      title: 'Boîtier Acier',
      description: 'Boîtier en acier inoxydable de 37mm.'
    }
  ],
  marketValue: {
    range: '500,000€ - 17,800,000€',
    trend: 'En constante augmentation depuis les années 1980'
  },
  blockchain: {
    benefits: [
      {
        title: 'Authentification Garantie',
        description: 'Chaque montre est liée à un NFT unique contenant son historique complet.'
      },
      {
        title: 'Traçabilité Totale',
        description: 'Historique de propriété transparent et immuable sur la blockchain.'
      },
      {
        title: 'Certification Digitale',
        description: 'Documents d\'authenticité accessibles en permanence via le NFT.'
      }
    ]
  },
  experts: [
    {
      name: 'Jean Dupont',
      role: 'Expert Horloger',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80',
      quote: 'La Daytona Paul Newman représente le Saint Graal de l\'horlogerie de collection.'
    },
    {
      name: 'Marie Martin',
      role: 'Spécialiste Rolex',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80',
      quote: 'Son histoire unique et sa rareté en font un investissement exceptionnel.'
    }
  ],
  resources: [
    {
      type: 'video',
      title: 'L\'Histoire de la Daytona Paul Newman',
      platform: 'YouTube',
      url: 'https://youtube.com/watch?v=example'
    },
    {
      type: 'article',
      title: 'Guide Complet de la Rolex Daytona',
      source: 'Hodinkee',
      url: 'https://hodinkee.com/example'
    }
  ]
};

export function IconicProductPage() {
  const [showVideo, setShowVideo] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src={iconicProduct.image}
            alt={iconicProduct.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="relative h-full flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
            <div className="max-w-3xl">
              <h1 className="font-serif text-white">
                <span className="block text-6xl mb-4">{iconicProduct.name}</span>
                <span className="block text-2xl font-light opacity-90">
                  {iconicProduct.subtitle}
                </span>
              </h1>
              <p className="mt-6 text-lg text-white/80 font-light leading-relaxed">
                {iconicProduct.description.split('\n\n')[0]}
              </p>
              <div className="mt-8 flex items-center space-x-6">
                <button 
                  onClick={() => setShowVideo(true)}
                  className="flex items-center space-x-3 px-6 py-3 bg-white text-black rounded-full hover:bg-gray-100 transition-colors"
                >
                  <Play className="h-5 w-5" />
                  <span>Voir la vidéo</span>
                </button>
                <a 
                  href="#history"
                  className="flex items-center space-x-2 text-white hover:text-white/80"
                >
                  <span>Découvrir l'histoire</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* History Section */}
      <section id="history" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-serif mb-8">Une Histoire Légendaire</h2>
              <div className="relative">
                <div className="absolute left-2 top-0 bottom-0 w-px bg-gray-200" />
                <div className="space-y-12">
                  {iconicProduct.history.map((event, index) => (
                    <div key={event.year} className="relative pl-10">
                      <div className={`absolute left-0 p-1 rounded-full ${
                        index === 0 ? 'bg-black' : 'bg-gray-200'
                      }`}>
                        <History className={`h-4 w-4 ${
                          index === 0 ? 'text-white' : 'text-gray-500'
                        }`} />
                      </div>
                      <div>
                        <div className="text-2xl font-light mb-2">{event.year}</div>
                        <div className="font-medium mb-2">{event.event}</div>
                        <p className="text-gray-600">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="aspect-square rounded-xl overflow-hidden">
                <img
                  src={iconicProduct.images[selectedImage]}
                  alt={`${iconicProduct.name} - Vue ${selectedImage + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {iconicProduct.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-black' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${iconicProduct.name} - Miniature ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-[#f8f7f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif text-center mb-16">
            Caractéristiques Uniques
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {iconicProduct.features.map((feature) => (
              <div key={feature.title} className="text-center">
                <h3 className="text-xl font-medium mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blockchain Section */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4">
              La Blockchain au Service de l'Authenticité
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Une nouvelle ère pour la certification des objets d'exception.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {iconicProduct.blockchain.benefits.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white text-black mb-6">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-medium mb-4">{benefit.title}</h3>
                <p className="text-white/80">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Value Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-serif mb-4">Valeur sur le Marché</h2>
            <div className="text-2xl font-light mb-4">
              {iconicProduct.marketValue.range}
            </div>
            <p className="text-gray-600">
              {iconicProduct.marketValue.trend}
            </p>
          </div>
        </div>
      </section>

      {/* Experts Section */}
      <section className="py-24 bg-[#f8f7f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif text-center mb-16">
            Avis d'Experts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {iconicProduct.experts.map((expert) => (
              <div key={expert.name} className="bg-white p-8 rounded-xl">
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={expert.avatar}
                    alt={expert.name}
                    className="h-16 w-16 rounded-full"
                  />
                  <div>
                    <div className="font-medium">{expert.name}</div>
                    <div className="text-sm text-gray-600">{expert.role}</div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{expert.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-serif mb-6">
                Possédez une Pièce d'Histoire
              </h2>
              <div className="space-y-6">
                <Link
                  to="/seller/register"
                  className="flex items-center justify-between group p-6 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <Building2 className="h-6 w-6" />
                    <div>
                      <div className="font-medium">Vous êtes Vendeur ?</div>
                      <div className="text-white/80">
                        Proposez votre Daytona Paul Newman
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/category/watches"
                  className="flex items-center justify-between group p-6 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <Wallet className="h-6 w-6" />
                    <div>
                      <div className="font-medium">Vous êtes Acheteur ?</div>
                      <div className="text-white/80">
                        Découvrez les modèles disponibles
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-2xl font-serif">Ressources</h3>
              <div className="space-y-4">
                {iconicProduct.resources.map((resource) => (
                  <a
                    key={resource.title}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      {resource.type === 'video' ? (
                        <Play className="h-5 w-5" />
                      ) : (
                        <LinkIcon className="h-5 w-5" />
                      )}
                      <div>
                        <div className="font-medium">{resource.title}</div>
                        <div className="text-sm text-white/60">
                          {resource.type === 'video' ? resource.platform : resource.source}
                        </div>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <button
            onClick={() => setShowVideo(false)}
            className="absolute top-4 right-4 text-white"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="w-full max-w-4xl aspect-video">
            <iframe
              src="https://www.youtube.com/embed/example"
              title="Video"
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}