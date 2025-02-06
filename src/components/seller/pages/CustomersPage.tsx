import React from 'react';
import { Search, Filter, MessageSquare, ArrowUpRight, Shield, Clock } from 'lucide-react';

const mockCustomers = [
  {
    id: '1',
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=48&h=48&q=80',
    walletAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    totalPurchases: 3,
    totalSpent: 58.3,
    kycStatus: 'verified',
    lastPurchase: '2024-03-15T10:30:00Z',
    purchases: [
      {
        id: '1',
        product: 'Rolex Daytona',
        amount: 42.5,
        date: '2024-03-15T10:30:00Z',
        status: 'completed'
      },
      {
        id: '2',
        product: 'Bague Cartier',
        amount: 15.8,
        date: '2024-02-28T15:45:00Z',
        status: 'completed'
      }
    ]
  },
  {
    id: '2',
    name: 'Marie Martin',
    email: 'marie.martin@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=48&h=48&q=80',
    walletAddress: '0x912d35Cc6634C0532925a3b844Bc454e4438f55f',
    totalPurchases: 1,
    totalSpent: 380,
    kycStatus: 'pending',
    lastPurchase: '2024-03-14T15:45:00Z',
    purchases: [
      {
        id: '3',
        product: 'Ferrari F40',
        amount: 380,
        date: '2024-03-14T15:45:00Z',
        status: 'pending'
      }
    ]
  }
];

export function CustomersPage() {
  const [selectedCustomer, setSelectedCustomer] = React.useState(mockCustomers[0]);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-light">Clients</h1>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Customers List */}
        <div className="col-span-1 bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <div className="space-y-4">
              <div className="relative">
                <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Rechercher un client..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <select className="pl-2 pr-8 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors">
                  <option>Tous les statuts KYC</option>
                  <option>Vérifié</option>
                  <option>En attente</option>
                  <option>Rejeté</option>
                </select>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {mockCustomers.map((customer) => (
              <button
                key={customer.id}
                onClick={() => setSelectedCustomer(customer)}
                className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                  selectedCustomer.id === customer.id ? 'bg-gray-50' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={customer.avatar}
                    alt={customer.name}
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium truncate">{customer.name}</p>
                      {customer.kycStatus === 'verified' ? (
                        <Shield className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                      ) : (
                        <Clock className="h-4 w-4 text-amber-500 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 truncate">{customer.email}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Customer Details */}
        <div className="col-span-2 space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedCustomer.avatar}
                  alt={selectedCustomer.name}
                  className="h-16 w-16 rounded-full"
                />
                <div>
                  <h2 className="text-xl font-medium">{selectedCustomer.name}</h2>
                  <p className="text-sm text-gray-600">{selectedCustomer.email}</p>
                  <p className="text-xs text-gray-500 font-mono mt-1">
                    {selectedCustomer.walletAddress}
                  </p>
                </div>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition-colors">
                <MessageSquare className="h-4 w-4" />
                <span>Message</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 py-6 border-y border-gray-100">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total achats</p>
                <p className="text-2xl font-light">{selectedCustomer.totalPurchases}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Montant total</p>
                <p className="text-2xl font-light">{selectedCustomer.totalSpent} ETH</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Statut KYC</p>
                <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${
                  selectedCustomer.kycStatus === 'verified'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-amber-100 text-amber-700'
                }`}>
                  {selectedCustomer.kycStatus === 'verified' ? (
                    <Shield className="h-3 w-3" />
                  ) : (
                    <Clock className="h-3 w-3" />
                  )}
                  <span>
                    {selectedCustomer.kycStatus === 'verified' ? 'Vérifié' : 'En attente'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Purchase History */}
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-lg font-medium">Historique des achats</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Produit</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Montant</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Status</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {selectedCustomer.purchases.map((purchase) => (
                    <tr key={purchase.id} className="group hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium">{purchase.product}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm">{purchase.amount} ETH</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">
                          {new Date(purchase.date).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${
                          purchase.status === 'completed'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {purchase.status === 'completed' ? (
                            <Shield className="h-3 w-3" />
                          ) : (
                            <Clock className="h-3 w-3" />
                          )}
                          <span>
                            {purchase.status === 'completed' ? 'Complété' : 'En attente'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <ArrowUpRight className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}