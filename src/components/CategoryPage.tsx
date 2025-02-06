import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Shield, 
  ArrowRight, 
  Sliders,
  X,
  Check,
  ChevronDown,
  CreditCard,
  Wallet,
  Truck
} from 'lucide-react';
import { ProductCard } from './ProductCard';
import type { Product } from '../types';

interface Category {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  brands: string[];
}

const categories: Record<string, Category> = {
  watches: {
    id: 'watches',
    title: 'Montres de Luxe',
    subtitle: 'L\'Excellence Horlogère Certifiée',
    description: 'Découvrez notre collection exclusive de montres de luxe, chaque pièce étant authentifiée et traçable sur la blockchain.',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80',
    brands: ['Rolex', 'Patek Philippe', 'Audemars Piguet', 'Richard Mille', 'Vacheron Constantin']
  },
  cars: {
    id: 'cars',
    title: 'Voitures d\'Exception',
    subtitle: 'L\'Excellence Automobile Authentifiée',
    description: 'Des supercars et voitures de collection d\'exception, chacune avec son histoire unique certifiée sur la blockchain.',
    image: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80',
    brands: ['Ferrari', 'Lamborghini', 'Porsche', 'Bugatti', 'McLaren']
  },
  jewelry: {
    id: 'jewelry',
    title: 'Haute Joaillerie',
    subtitle: 'L\'Excellence des Pierres Précieuses',
    description: 'Une sélection raffinée de bijoux d\'exception, chaque pièce étant certifiée et traçable sur la blockchain.',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80',
    brands: ['Cartier', 'Van Cleef & Arpels', 'Bulgari', 'Chopard', 'Graff']
  },
  art: {
    id: 'art',
    title: 'Art & Collections',
    subtitle: 'L\'Excellence Artistique Certifiée',
    description: 'Des œuvres d\'art uniques et authentifiées, de la peinture à la sculpture en passant par l\'art numérique.',
    image: 'https://images.unsplash.com/photo-1577720643272-265f09367456?auto=format&fit=crop&q=80',
    brands: ['Art Contemporain', 'Art Moderne', 'Impressionnisme', 'Art Numérique', 'Sculptures']
  }
};

const conditions = [
  { id: 'new', label: 'Neuf' },
  { id: 'excellent', label: 'Excellent' },
  { id: 'very-good', label: 'Très bon' },
  { id: 'good', label: 'Bon' },
  { id: 'fair', label: 'Acceptable' }
];

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
  }
  // Add more mock products as needed
];

interface Filters {
  priceRange: [number, number];
  condition: string[];
  brands: string[];
  onlyBlockchain: boolean;
}

export function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = categories[categoryId as string];

  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 1000000],
    condition: [],
    brands: [],
    onlyBlockchain: false
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState('recent');

  useEffect(() => {
    // In a real app, this would fetch products based on category and filters
    setProducts(mockProducts.filter(p => p.category === categoryId));
  }, [categoryId, filters]);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif mb-4">Catégorie non trouvée</h2>
          <Link to="/" className="text-black hover:underline">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src={category.image}
            alt={category.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="font-serif">
            <span className="block text-6xl mb-4">{category.title}</span>
            <span className="block text-2xl font-light opacity-90">{category.subtitle}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg font-light leading-relaxed opacity-90">
            {category.description}
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
                  placeholder="Rechercher..."
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
              <span>{products.length} produits</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
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

      {/* Trust Banner */}
      <div className="bg-[#f8f7f5] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif mb-4">
              Achetez en toute confiance
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Une expérience d'achat premium avec des garanties inégalées.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Authenticité Garantie',
                description: 'Chaque produit est certifié sur la blockchain'
              },
              {
                icon: Wallet,
                title: 'Paiement Sécurisé',
                description: 'Crypto ou carte bancaire, à votre choix'
              },
              {
                icon: Truck,
                title: 'Livraison Assurée',
                description: 'Transport sécurisé et suivi en temps réel'
              }
            ].map(({ icon: Icon, title, description }) => (
              <div key={title} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black text-white mb-6">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-medium mb-2">{title}</h3>
                <p className="text-gray-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
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

                {/* Brands */}
                <div>
                  <h3 className="font-medium mb-4">Marques</h3>
                  <div className="space-y-2">
                    {category.brands.map((brand) => (
                      <label key={brand} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={filters.brands.includes(brand)}
                          onChange={(e) => setFilters(prev => ({
                            ...prev,
                            brands: e.target.checked
                              ? [...prev.brands, brand]
                              : prev.brands.filter(b => b !== brand)
                          }))}
                          className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                        />
                        <span>{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Blockchain Certificate */}
                <div>
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