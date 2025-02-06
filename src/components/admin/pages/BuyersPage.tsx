import React from 'react';
import { Search, Filter, Shield, Wallet } from 'lucide-react';

const mockBuyers = [
  {
    id: '1',
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    walletAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    totalPurchases: 3,
    totalSpent: 58.3,
    lastPurchase: '2024-03-15T10:30:00Z',
    status: 'active'
  },
  {
    id: '2',
    name: 'Marie Martin',
    email: 'marie.martin@example.com',
    walletAddress: '0x912d35Cc6634C0532925a3b844Bc454e4438f55f',
    totalPurchases: 1,
    totalSpent: 15.8,
    lastPurchase: '2024-03-14T15:45:00Z',
    status: 'active'
  }
];

export function BuyersPage() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-light mb-2">Acheteurs</h1>
          <p className="text-sm text-gray-600">
            Liste des acheteurs inscrits sur la plateforme
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Rechercher un acheteur..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select className="pl-2 pr-8 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors">
                <option>Tous les statuts</option>
                <option>Actif</option>
                <option>Inactif</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Acheteur</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Wallet</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Achats</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Total dépensé</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Dernier achat</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockBuyers.map((buyer) => (
                <tr key={buyer.id} className="group hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{buyer.name}</span>
                      <span className="text-sm text-gray-500">{buyer.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Wallet className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-mono text-gray-600">
                        {buyer.walletAddress.slice(0, 6)}...{buyer.walletAddress.slice(-4)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm">{buyer.totalPurchases}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm">{buyer.totalSpent} ETH</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">
                      {new Date(buyer.lastPurchase).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="inline-flex items-center space-x-1 px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs">
                      <Shield className="h-3 w-3" />
                      <span>Actif</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}