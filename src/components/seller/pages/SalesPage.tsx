import React from 'react';
import { ArrowUpRight, Download, Filter, Search, TrendingUp, TrendingDown, DollarSign, Wallet } from 'lucide-react';

const mockTransactions = [
  {
    id: '1',
    product: {
      name: 'Rolex Daytona',
      image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80'
    },
    buyer: {
      name: 'Jean Dupont',
      address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
    },
    amount: 42.5,
    currency: 'ETH',
    status: 'completed',
    date: '2024-03-15T10:30:00Z'
  },
  {
    id: '2',
    product: {
      name: 'Bague Cartier',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80'
    },
    buyer: {
      name: 'Marie Martin',
      address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
    },
    amount: 15.8,
    currency: 'ETH',
    status: 'pending',
    date: '2024-03-14T15:45:00Z'
  }
];

const stats = [
  {
    label: 'Ventes du mois',
    value: '€125,000',
    change: '+12.5%',
    trend: 'up'
  },
  {
    label: 'Commandes en cours',
    value: '12',
    change: '-2.3%',
    trend: 'down'
  },
  {
    label: 'Panier moyen',
    value: '€8,500',
    change: '+5.7%',
    trend: 'up'
  },
  {
    label: 'Taux de conversion',
    value: '3.2%',
    change: '+0.8%',
    trend: 'up'
  }
];

export function SalesPage() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-light">Ventes</h1>
        <button className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition-colors">
          <Download className="h-4 w-4" />
          <span>Exporter</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-gray-100 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-600">{stat.label}</div>
              <div className={`flex items-center space-x-1 text-sm ${
                stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span>{stat.change}</span>
              </div>
            </div>
            <div className="text-2xl font-light">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Rechercher une transaction..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select className="pl-2 pr-8 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors">
                <option>Tous les statuts</option>
                <option>Complété</option>
                <option>En attente</option>
                <option>Annulé</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Produit</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Acheteur</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Montant</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Date</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockTransactions.map((transaction) => (
                <tr key={transaction.id} className="group hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={transaction.product.image}
                        alt={transaction.product.name}
                        className="h-10 w-10 rounded-lg object-cover"
                      />
                      <span className="text-sm font-medium">{transaction.product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{transaction.buyer.name}</span>
                      <span className="text-xs text-gray-500">{transaction.buyer.address}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{transaction.amount} {transaction.currency}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${
                      transaction.status === 'completed'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      <Wallet className="h-3 w-3" />
                      <span>{transaction.status === 'completed' ? 'Complété' : 'En attente'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">
                      {new Date(transaction.date).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
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
  );
}