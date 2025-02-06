import React, { useState } from 'react';
import { Search, Filter, Sliders, X, ArrowRight } from 'lucide-react';
import { ProductCard } from './ProductCard';
import type { Product } from '../types';

// Mock products - in a real app, this would come from an API
const mockProducts: Product[] = [
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
    status: 'approved'
  }
];

const categories = [
  { id: 'all', label: 'Toutes les catégories' },
  { id: 'watches', label: 'Montres' },
  { id: 'jewelry', label: 'Bijoux' },
  { id: 'cars', label: 'Voitures' },
  { id: 'art', label: 'Art' }
];

const conditions = [
  { id: 'new', label: 'Neuf' },
  { id: 'excellent', label: 'Excellent' },
  { id: 'very-good', label: 'Très bon' },
  { id: 'good', label: 'Bon' },
  { id: 'fair', label: 'Acceptable' }
];

interface Filters {
  category: string;
  priceRange: [number, number];
  condition: string[];
  onlyVerified: boolean;
  onlyBlockchain: boolean;
}

export function CatalogPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    category: 'all',
    priceRange: [0, 1000000],
    condition: [],
    onlyVerified: false,
    onlyBlockchain: false
  });
  const [sortBy, setSortBy] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products based on current filters
  const filteredProducts = mockProducts.filter(product => {
    if (filters.category !== 'all' && product.category !== filters.category) {
      return false;
    }
    if (filters.onlyBlockchain && !product.certificateId) {
      return false;
    }
    if (filters.onlyVerified && !product.seller?.verified) {
      return false;
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[40vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80"
            alt="Luxury collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white text-center">
          <h1 className="text-5xl font-serif mb-4">
            Catalogue des Produits
          </h1>
          <p className="text-xl font-light max-w-2xl mx-auto">
            Découvrez notre collection d'objets d'exception, tous authentifiés et certifiés sur la blockchain.
          </p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative flex-1 max-w-lg">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                />
              </div>
              
              <button
                onClick={() => setShowFilters(true)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="h-5 w-5" />
                <span>Filtres</span>
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-colors"
              >
                <option value="recent">Plus récents</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
              </select>
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>{filteredProducts.length} produits</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">
              Aucun produit trouvé
            </h3>
            <p className="text-gray-600">
              Essayez de modifier vos filtres ou revenez plus tard.
            </p>
          </div>
        )}
      </div>

      {/* Filters Drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
          
          <div className="absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-xl">
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-medium">Filtres</h2>
                <button onClick={() => setShowFilters(false)}>
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Categories */}
                <div>
                  <h3 className="font-medium mb-4">Catégories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category.id} className="flex items-center space-x-3">
                        <input
                          type="radio"
                          checked={filters.category === category.id}
                          onChange={() => setFilters(prev => ({
                            ...prev,
                            category: category.id
                          }))}
                          className="h-4 w-4 border-gray-300 text-black focus:ring-black"
                        />
                        <span>{category.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-medium mb-4 flex items-center">
                    <Sliders className="h-5 w-5 mr-2" />
                    Fourchette de prix
                  </h3>
                  <div className="space-y-4">
                    <input
                      type="range"
                      min="0"
                      max="1000000"
                      step="1000"
                      value={filters.priceRange[1]}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        priceRange: [prev.priceRange[0], parseInt(e.target.value)]
                      }))}
                      className="w-full"
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span>0 €</span>
                      <span>Jusqu'à {filters.priceRange[1].toLocaleString()} €</span>
                    </div>
                  </div>
                </div>

                {/* Condition */}
                <div>
                  <h3 className="font-medium mb-4">État du produit</h3>
                  <div className="space-y-2">
                    {conditions.map((condition) => (
                      <label key={condition.id} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={filters.condition.includes(condition.id)}
                          onChange={(e) => setFilters(prev => ({
                            ...prev,
                            condition: e.target.checked
                              ? [...prev.condition, condition.id]
                              : prev.condition.filter(id => id !== condition.id)
                          }))}
                          className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                        />
                        <span>{condition.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Additional Filters */}
                <div className="space-y-4">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={filters.onlyVerified}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        onlyVerified: e.target.checked
                      }))}
                      className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                    />
                    <span>Uniquement les vendeurs vérifiés</span>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={filters.onlyBlockchain}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        onlyBlockchain: e.target.checked
                      }))}
                      className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                    />
                    <span>Uniquement les produits certifiés blockchain</span>
                  </label>
                </div>
              </div>

              <div className="p-6 border-t border-gray-100">
                <button
                  onClick={() => setShowFilters(false)}
                  className="w-full flex items-center justify-center space-x-2 bg-black text-white rounded-lg px-8 py-3 hover:bg-gray-900 transition-colors"
                >
                  <span>Voir les résultats</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}