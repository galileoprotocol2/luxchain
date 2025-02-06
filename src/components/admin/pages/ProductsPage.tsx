import React, { useState } from 'react';
import { Search, Filter, Shield, Clock, X, Check, Eye, ArrowUpRight } from 'lucide-react';

const mockProducts = [
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
    status: 'pending',
    submittedAt: '2024-03-15T10:30:00Z'
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
    status: 'approved',
    submittedAt: '2024-03-14T15:45:00Z'
  }
];

export function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState(mockProducts[0]);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-light mb-2">Produits</h1>
          <p className="text-sm text-gray-600">
            Gérez les propositions de produits et leur validation
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Products List */}
        <div className="col-span-2 bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <select className="pl-2 pr-8 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors">
                  <option>Tous les statuts</option>
                  <option>En attente</option>
                  <option>Approuvé</option>
                  <option>Rejeté</option>
                </select>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {mockProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  setSelectedProduct(product);
                  setShowDetails(true);
                }}
                className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-20 w-20 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-lg font-medium">{product.name}</h3>
                      <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${
                        product.status === 'pending'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {product.status === 'pending' ? (
                          <Clock className="h-3 w-3" />
                        ) : (
                          <Shield className="h-3 w-3" />
                        )}
                        <span>
                          {product.status === 'pending' ? 'En attente' : 'Approuvé'}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-light">{product.price} {product.currency}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(product.submittedAt).toLocaleDateString('fr-FR', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className={`fixed inset-y-0 right-0 w-1/3 bg-white border-l border-gray-100 transform transition-transform duration-300 ${
          showDetails ? 'translate-x-0' : 'translate-x-full'
        }`}>
          {selectedProduct && (
            <div className="h-full flex flex-col">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-medium">Détails du produit</h2>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="flex-1 flex items-center justify-center space-x-2 bg-emerald-500 text-white rounded-lg px-4 py-2 hover:bg-emerald-600 transition-colors">
                    <Check className="h-4 w-4" />
                    <span>Approuver</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600 transition-colors">
                    <X className="h-4 w-4" />
                    <span>Rejeter</span>
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="p-6 space-y-6">
                  {/* Images */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Images</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedProduct.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${selectedProduct.name} ${index + 1}`}
                          className="rounded-lg object-cover aspect-square"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Informations</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                      <div>
                        <div className="text-sm text-gray-600">Nom</div>
                        <div className="font-medium">{selectedProduct.name}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Description</div>
                        <div className="font-medium">{selectedProduct.description}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Prix</div>
                        <div className="font-medium">
                          {selectedProduct.price} {selectedProduct.currency}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Catégorie</div>
                        <div className="font-medium capitalize">{selectedProduct.category}</div>
                      </div>
                    </div>
                  </div>

                  {/* Seller Info */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Vendeur</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{selectedProduct.seller.name}</div>
                          <div className="text-sm text-gray-600">ID: {selectedProduct.seller.id}</div>
                        </div>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <ArrowUpRight className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* History */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Historique</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <Clock className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">Soumis pour validation</div>
                          <div className="text-sm text-gray-600">
                            {new Date(selectedProduct.submittedAt).toLocaleDateString('fr-FR', {
                              day: '2-digit',
                              month: 'long',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}