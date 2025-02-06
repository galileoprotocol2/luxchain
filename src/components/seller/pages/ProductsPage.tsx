import React, { useState } from 'react';
import { Search, Filter, Plus, MoreVertical, Shield, Clock, CheckCircle } from 'lucide-react';
import type { Product } from '../../../types';

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
      id: '1',
      name: 'Luxury Watches Paris',
      verified: true
    },
    certificateId: '0x456...',
    status: 'pending'
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
      id: '1',
      name: 'Luxury Watches Paris',
      verified: true
    },
    certificateId: '0x789...',
    status: 'sold'
  }
];

const categories = ['Toutes', 'Montres', 'Bijoux', 'Voitures', 'Art'];
const statuses = ['Tous', 'En vente', 'En attente', 'Vendu'];

export function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const [selectedStatus, setSelectedStatus] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-light">Produits</h1>
        <button className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Nouveau produit</span>
        </button>
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
            <div key={product.id} className="group relative bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="relative aspect-[4/3]">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <button className="absolute top-4 right-4 p-2 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="h-4 w-4 text-gray-600" />
                </button>
              </div>
              
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-medium">{product.name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-1">{product.description}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {product.status === 'approved' && (
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
                    {product.status === 'sold' && (
                      <div className="flex items-center space-x-1 text-blue-600 text-sm">
                        <CheckCircle className="h-4 w-4" />
                        <span>Vendu</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-light">{product.price}</span>
                  <span className="text-sm text-gray-500 uppercase">{product.currency}</span>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <button className="w-full px-4 py-2 bg-gray-100 text-gray-900 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                    Modifier
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}