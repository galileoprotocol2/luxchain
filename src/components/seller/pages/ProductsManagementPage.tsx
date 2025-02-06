import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  Plus,
  MoreVertical,
  Shield,
  Clock,
  CheckCircle,
  ArrowUpRight,
  TrendingUp,
  DollarSign,
  Wallet,
  Megaphone,
  X,
  ChevronDown,
  CreditCard,
  Package,
  Eye
} from 'lucide-react';

// Mock data for products
const mockProducts = [
  {
    id: '1',
    name: 'Rolex Daytona',
    description: 'Chronographe automatique en or rose 18 carats avec cadran noir',
    price: 42.5,
    currency: 'ETH',
    category: 'watches',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80',
    status: 'active',
    promoted: true,
    views: 1245,
    likes: 89,
    sales: {
      total: 3,
      amount: 127.5,
      lastSale: '2024-03-15T10:30:00Z'
    },
    certificateId: '0x123...',
    createdAt: '2024-03-10T08:00:00Z'
  },
  {
    id: '2',
    name: 'Bague Cartier',
    description: 'Bague Trinity classique, or blanc, or jaune, or rose',
    price: 15.8,
    currency: 'ETH',
    category: 'jewelry',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80',
    status: 'pending',
    promoted: false,
    views: 856,
    likes: 45,
    sales: {
      total: 1,
      amount: 15.8,
      lastSale: '2024-03-14T15:45:00Z'
    },
    certificateId: '0x456...',
    createdAt: '2024-03-12T09:30:00Z'
  }
];

const categories = ['Toutes', 'Montres', 'Bijoux', 'Voitures', 'Art'];
const statuses = ['Tous', 'En vente', 'En attente', 'Vendu'];

export function ProductsManagementPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const [selectedStatus, setSelectedStatus] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPromoteModal, setShowPromoteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<typeof mockProducts[0] | null>(null);

  const handlePromote = (product: typeof mockProducts[0]) => {
    setSelectedProduct(product);
    setShowPromoteModal(true);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-light mb-2">Gestion des Produits</h1>
          <p className="text-sm text-gray-600">
            Gérez vos produits, suivez les ventes et boostez votre visibilité
          </p>
        </div>
        <button
          onClick={() => navigate('/seller/dashboard/products/new')}
          className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Nouveau produit</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          {
            label: 'Produits actifs',
            value: '12',
            change: '+2',
            trend: 'up',
            icon: Package
          },
          {
            label: 'Ventes du mois',
            value: '42.5 ETH',
            change: '+12.5%',
            trend: 'up',
            icon: Wallet
          },
          {
            label: 'Vues totales',
            value: '2,456',
            change: '+5.3%',
            trend: 'up',
            icon: Eye
          },
          {
            label: 'Taux de conversion',
            value: '3.2%',
            change: '+0.8%',
            trend: 'up',
            icon: TrendingUp
          }
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-gray-100 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-600">{stat.label}</div>
              <div className="text-sm text-emerald-600 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>{stat.change}</span>
              </div>
            </div>
            <div className="text-2xl font-light">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-2 pr-8 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="pl-2 pr-8 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {mockProducts.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="relative aspect-[4/3]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Top Actions */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  {product.promoted && (
                    <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      En vedette
                    </div>
                  )}
                  <button className="p-2 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-medium">{product.name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-1">{product.description}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {product.status === 'active' && (
                      <div className="flex items-center space-x-1 text-emerald-600 text-sm">
                        <Shield className="h-4 w-4" />
                        <span>En vente</span>
                      </div>
                    )}
                    {product.status === 'pending' && (
                      <div className="flex items-center space-x-1 text-amber-600 text-sm">
                        <Clock className="h-4 w-4" />
                        <span>En attente</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-baseline space-x-2 mb-4">
                  <span className="text-2xl font-light">{product.price}</span>
                  <span className="text-sm text-gray-500 uppercase">{product.currency}</span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg mb-4">
                  <div className="text-center">
                    <div className="text-sm font-medium">{product.views}</div>
                    <div className="text-xs text-gray-500">Vues</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium">{product.likes}</div>
                    <div className="text-xs text-gray-500">Favoris</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium">{product.sales.total}</div>
                    <div className="text-xs text-gray-500">Ventes</div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handlePromote(product)}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-lg text-sm hover:from-amber-500 hover:to-amber-600 transition-colors"
                  >
                    <Megaphone className="h-4 w-4" />
                    <span>Promouvoir</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-900 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                    <ArrowUpRight className="h-4 w-4" />
                    <span>Modifier</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Promote Modal */}
      {showPromoteModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-lg">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-medium">Promouvoir le produit</h3>
                <button onClick={() => setShowPromoteModal(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="h-16 w-16 rounded-lg object-cover"
                />
                <div>
                  <h4 className="font-medium">{selectedProduct.name}</h4>
                  <p className="text-sm text-gray-600">
                    {selectedProduct.price} {selectedProduct.currency}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Promotion Plans */}
              <div className="space-y-4">
                {[
                  {
                    id: 'featured',
                    name: 'Produit en Vedette',
                    description: 'Affichage prioritaire dans les résultats de recherche',
                    price: 0.1,
                    duration: '7 jours'
                  },
                  {
                    id: 'premium',
                    name: 'Pack Premium',
                    description: 'Bannière exclusive + Réseaux sociaux',
                    price: 0.25,
                    duration: '14 jours'
                  }
                ].map((plan) => (
                  <label
                    key={plan.id}
                    className="block p-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 cursor-pointer transition-colors"
                  >
                    <div className="flex items-start">
                      <input
                        type="radio"
                        name="plan"
                        value={plan.id}
                        className="mt-1 h-4 w-4 border-gray-300 text-black focus:ring-black"
                      />
                      <div className="ml-3">
                        <div className="font-medium">{plan.name}</div>
                        <p className="text-sm text-gray-600 mb-2">{plan.description}</p>
                        <div className="flex items-baseline space-x-2">
                          <span className="text-lg font-medium">{plan.price} ETH</span>
                          <span className="text-sm text-gray-500">/ {plan.duration}</span>
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              {/* Payment Method */}
              <div>
                <h4 className="font-medium mb-4">Mode de paiement</h4>
                <div className="grid grid-cols-2 gap-4">
                  <label className="block p-4 rounded-xl border-2 border-black cursor-pointer">
                    <div className="flex items-center space-x-3 mb-2">
                      <Wallet className="h-5 w-5" />
                      <span className="font-medium">Crypto</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      ETH, USDC acceptés
                    </p>
                  </label>
                  <label className="block p-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 cursor-pointer">
                    <div className="flex items-center space-x-3 mb-2">
                      <CreditCard className="h-5 w-5" />
                      <span className="font-medium">Carte</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Visa, Mastercard
                    </p>
                  </label>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100">
              <button className="w-full flex items-center justify-center space-x-2 bg-black text-white rounded-lg px-8 py-3 hover:bg-gray-800 transition-colors">
                <Megaphone className="h-4 w-4" />
                <span>Promouvoir maintenant</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}