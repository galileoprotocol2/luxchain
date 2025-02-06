import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Shield, 
  QrCode, 
  ArrowUpRight, 
  MessageSquare,
  Clock,
  Truck,
  Package,
  CheckCircle,
  MapPin,
  Download,
  ChevronDown
} from 'lucide-react';

// Mock purchase data
const mockPurchases = [
  {
    id: '1',
    product: {
      name: 'Rolex Daytona',
      image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80',
      price: 42500,
      currency: 'USD'
    },
    seller: {
      name: 'Luxury Watches Paris',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=48&h=48&q=80'
    },
    date: '2024-03-15T10:30:00Z',
    status: 'delivered',
    certificate: {
      network: 'Ethereum',
      tokenId: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      verificationUrl: 'https://etherscan.io/token/0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
    },
    shipping: {
      carrier: 'Brinks',
      trackingNumber: 'LX123456789FR',
      status: 'delivered',
      events: [
        { date: '2024-03-15T10:30:00Z', status: 'delivered', location: 'Paris, France' },
        { date: '2024-03-14T16:45:00Z', status: 'in_transit', location: 'Charles de Gaulle Airport' },
        { date: '2024-03-13T08:30:00Z', status: 'shipped', location: 'Geneva, Switzerland' }
      ]
    },
    documents: [
      { name: 'Certificat d\'authenticité', type: 'pdf' },
      { name: 'Garantie internationale', type: 'pdf' },
      { name: 'Facture', type: 'pdf' }
    ]
  },
  {
    id: '2',
    product: {
      name: 'Bague Cartier',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80',
      price: 15800,
      currency: 'USD'
    },
    seller: {
      name: 'Joaillerie Moderne',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=48&h=48&q=80'
    },
    date: '2024-03-14T15:45:00Z',
    status: 'in_transit',
    certificate: {
      network: 'Ethereum',
      tokenId: '0x912d35Cc6634C0532925a3b844Bc454e4438f55f',
      verificationUrl: 'https://etherscan.io/token/0x912d35Cc6634C0532925a3b844Bc454e4438f55f'
    },
    shipping: {
      carrier: 'Brinks',
      trackingNumber: 'LX123456790FR',
      status: 'in_transit',
      events: [
        { date: '2024-03-14T16:45:00Z', status: 'in_transit', location: 'Charles de Gaulle Airport' },
        { date: '2024-03-13T08:30:00Z', status: 'shipped', location: 'Milan, Italy' }
      ]
    },
    documents: [
      { name: 'Certificat d\'authenticité', type: 'pdf' },
      { name: 'Facture', type: 'pdf' }
    ]
  }
];

const statusConfig = {
  pending: {
    icon: Clock,
    label: 'En attente',
    color: 'text-amber-600',
    bg: 'bg-amber-50'
  },
  shipped: {
    icon: Package,
    label: 'Expédié',
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  },
  in_transit: {
    icon: Truck,
    label: 'En transit',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50'
  },
  delivered: {
    icon: CheckCircle,
    label: 'Livré',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50'
  }
};

export function PurchaseHistoryPage() {
  const [selectedPurchase, setSelectedPurchase] = React.useState(mockPurchases[0]);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactMessage, setContactMessage] = useState('');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement contact form submission logic here
    console.log('Message sent:', contactMessage);
    setShowContactForm(false);
    setContactMessage('');
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-light">Historique des Achats</h1>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Purchases List */}
        <div className="col-span-1 space-y-4">
          {mockPurchases.map((purchase) => (
            <button
              key={purchase.id}
              onClick={() => setSelectedPurchase(purchase)}
              className={`w-full bg-white rounded-xl border p-4 text-left transition-all hover:shadow-md ${
                selectedPurchase.id === purchase.id ? 'border-black' : 'border-gray-100'
              }`}
            >
              <div className="flex items-center space-x-4">
                <img
                  src={purchase.product.image}
                  alt={purchase.product.name}
                  className="h-16 w-16 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium mb-1">{purchase.product.name}</h3>
                  <p className="text-sm text-gray-600">
                    {purchase.product.price.toLocaleString()} {purchase.product.currency}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    {(() => {
                      const config = statusConfig[purchase.status as keyof typeof statusConfig];
                      const Icon = config.icon;
                      return (
                        <div className={`flex items-center space-x-1 text-sm ${config.color}`}>
                          <Icon className="h-4 w-4" />
                          <span>{config.label}</span>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Purchase Details */}
        <div className="col-span-2 space-y-6">
          {/* Product Card */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="flex items-start space-x-6">
              <img
                src={selectedPurchase.product.image}
                alt={selectedPurchase.product.name}
                className="h-24 w-24 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h2 className="text-xl font-medium mb-2">{selectedPurchase.product.name}</h2>
                <p className="text-2xl font-light">
                  {selectedPurchase.product.price.toLocaleString()} {selectedPurchase.product.currency}
                </p>
                <div className="flex items-center space-x-2 mt-4">
                  {(() => {
                    const config = statusConfig[selectedPurchase.status as keyof typeof statusConfig];
                    const Icon = config.icon;
                    return (
                      <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${config.bg} ${config.color}`}>
                        <Icon className="h-4 w-4" />
                        <span>{config.label}</span>
                      </div>
                    );
                  })()}
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <ArrowUpRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Blockchain Certificate */}
          {selectedPurchase.certificate && (
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="text-lg font-medium mb-4">Certificat d'Authenticité</h3>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <Shield className="h-5 w-5 text-emerald-500" />
                    <span className="text-sm font-medium">
                      Authentifié sur {selectedPurchase.certificate.network}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 font-mono mb-2">
                    Token ID: {selectedPurchase.certificate.tokenId}
                  </p>
                  <a
                    href={selectedPurchase.certificate.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-black hover:underline"
                  >
                    Voir sur {selectedPurchase.certificate.network}
                  </a>
                </div>
                <button className="p-2 bg-gray-50 rounded-lg">
                  <QrCode className="h-6 w-6" />
                </button>
              </div>
            </div>
          )}

          {/* Shipping Status */}
          {selectedPurchase.shipping && (
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Suivi de livraison</h3>
                  <div className="text-sm text-gray-600">
                    {selectedPurchase.shipping.carrier} - {selectedPurchase.shipping.trackingNumber}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="relative">
                  <div className="absolute left-2 top-0 bottom-0 w-px bg-gray-200" />
                  <div className="space-y-6">
                    {selectedPurchase.shipping.events.map((event, index) => (
                      <div key={index} className="relative pl-10">
                        <div className={`absolute left-0 p-1 rounded-full ${
                          index === 0 ? 'bg-emerald-500' : 'bg-gray-200'
                        }`}>
                          <MapPin className={`h-4 w-4 ${
                            index === 0 ? 'text-white' : 'text-gray-500'
                          }`} />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <div className="font-medium">
                              {statusConfig[event.status as keyof typeof statusConfig].label}
                            </div>
                            <div className="text-sm text-gray-600">
                              {new Date(event.date).toLocaleDateString('fr-FR', {
                                day: '2-digit',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{event.location}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Documents */}
          {selectedPurchase.documents && (
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="text-lg font-medium mb-4">Documents</h3>
              <div className="space-y-2">
                {selectedPurchase.documents.map((doc, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                  >
                    <span className="text-sm">{doc.name}</span>
                    <Download className="h-4 w-4 text-gray-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Seller Contact */}
          {selectedPurchase.seller && (
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={selectedPurchase.seller.avatar}
                      alt={selectedPurchase.seller.name}
                      className="h-12 w-12 rounded-full"
                    />
                    {selectedPurchase.seller.verified && (
                      <Shield className="h-4 w-4 text-emerald-500 absolute -right-1 -bottom-1" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{selectedPurchase.seller.name}</div>
                    <div className="text-sm text-gray-500">Vendeur</div>
                  </div>
                </div>
                <button 
                  onClick={() => setShowContactForm(true)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Contacter</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-medium">Contacter le vendeur</h3>
              <button onClick={() => setShowContactForm(false)}>
                <ChevronDown className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="Votre message au vendeur..."
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Envoyer</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}