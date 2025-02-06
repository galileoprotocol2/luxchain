import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Shield, Star, MapPin, Clock, ArrowRight, Building2, ChevronDown } from 'lucide-react';

// Mock sellers data
const mockSellers = [
  {
    id: '1',
    name: 'Luxury Watches Paris',
    logo: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80&w=100&h=100',
    cover: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80',
    description: 'Spécialiste des montres de luxe et de collection depuis 1980.',
    location: 'Paris, France',
    rating: 4.9,
    reviews: 128,
    verified: true,
    joinedDate: '2023',
    specialties: ['Rolex', 'Patek Philippe', 'Audemars Piguet'],
    stats: {
      sales: 245,
      products: 18,
      responseTime: '< 2h'
    },
    featured: [
      {
        id: '1',
        name: 'Rolex Daytona',
        price: 42.5,
        currency: 'ETH',
        image: 'https://images.unsplash.com/photo-1627225924765-552d49cf47ad?auto=format&fit=crop&q=80'
      },
      {
        id: '2',
        name: 'Patek Philippe Nautilus',
        price: 85.2,
        currency: 'ETH',
        image: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&q=80'
      }
    ]
  },
  {
    id: '2',
    name: 'Joaillerie Moderne',
    logo: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=100&h=100',
    cover: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80',
    description: 'Créateur et revendeur de bijoux de luxe certifiés.',
    location: 'Genève, Suisse',
    rating: 4.8,
    reviews: 95,
    verified: true,
    joinedDate: '2023',
    specialties: ['Cartier', 'Van Cleef & Arpels', 'Bulgari'],
    stats: {
      sales: 180,
      products: 24,
      responseTime: '< 3h'
    },
    featured: [
      {
        id: '3',
        name: 'Bague Cartier Trinity',
        price: 15.8,
        currency: 'ETH',
        image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80'
      }
    ]
  }
];

const categories = [
  { id: 'all', label: 'Toutes les catégories' },
  { id: 'watches', label: 'Montres' },
  { id: 'jewelry', label: 'Bijoux' },
  { id: 'cars', label: 'Voitures' },
  { id: 'art', label: 'Art' }
];

const locations = [
  { id: 'all', label: 'Toutes les localisations' },
  { id: 'paris', label: 'Paris' },
  { id: 'geneva', label: 'Genève' },
  { id: 'london', label: 'Londres' },
  { id: 'dubai', label: 'Dubaï' }
];

export function SellersDirectoryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[40vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80"
            alt="Luxury boutiques"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-serif mb-4">
              Vendeurs Vérifiés
            </h1>
            <p className="text-xl font-light">
              Découvrez notre réseau de vendeurs de confiance, tous vérifiés et certifiés 
              pour garantir l'authenticité de chaque transaction.
            </p>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Rechercher un vendeur..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-2 pr-8 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>

              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="pl-2 pr-8 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
              >
                {locations.map(location => (
                  <option key={location.id} value={location.id}>
                    {location.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Sellers Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {mockSellers.map((seller) => (
            <Link
              key={seller.id}
              to={`/seller/${seller.id}`}
              className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
            >
              {/* Cover Image */}
              <div className="relative h-48">
                <img
                  src={seller.cover}
                  alt={seller.name}
                  className="w-full h-full object-cover"
                />
                {seller.verified && (
                  <div className="absolute top-4 right-4 flex items-center space-x-2 px-3 py-1 bg-emerald-500 text-white rounded-full text-sm">
                    <Shield className="h-4 w-4" />
                    <span>Vérifié</span>
                  </div>
                )}
              </div>

              <div className="p-6">
                {/* Header */}
                <div className="flex items-start space-x-4 mb-6">
                  <img
                    src={seller.logo}
                    alt={`${seller.name} logo`}
                    className="h-16 w-16 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-medium mb-1">{seller.name}</h2>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span>{seller.rating}</span>
                        <span className="mx-1">·</span>
                        <span>{seller.reviews} avis</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{seller.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-6">{seller.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-light">{seller.stats.sales}</div>
                    <div className="text-sm text-gray-500">Ventes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-light">{seller.stats.products}</div>
                    <div className="text-sm text-gray-500">Produits</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{seller.stats.responseTime}</span>
                    </div>
                    <div className="text-sm text-gray-500">Réponse</div>
                  </div>
                </div>

                {/* Featured Products */}
                {seller.featured.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">
                      Produits en vedette
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {seller.featured.map((product) => (
                        <div key={product.id} className="group relative aspect-square rounded-lg overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="text-white text-sm font-medium">
                              {product.name}
                            </div>
                            <div className="text-white/80 text-sm">
                              {product.price} {product.currency}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-black text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-serif mb-6">
              Rejoignez notre réseau de vendeurs vérifiés
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Bénéficiez de notre technologie blockchain pour certifier vos produits 
              et accédez à une clientèle premium internationale.
            </p>
            <Link
              to="/seller/register"
              className="inline-flex items-center space-x-2 bg-white text-black px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Building2 className="h-5 w-5" />
              <span>Devenir vendeur</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}