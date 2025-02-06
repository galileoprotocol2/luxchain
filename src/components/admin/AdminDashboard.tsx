import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  LayoutGrid,
  Package,
  Users,
  BadgeEuro,
  Shield,
  Settings,
  Bell,
  Search,
  ChevronDown,
  Wallet
} from 'lucide-react';

import { ProductsPage } from './pages/ProductsPage';
import { SellersPage } from './pages/SellersPage';
import { BuyersPage } from './pages/BuyersPage';
import { PaymentsPage } from './pages/PaymentsPage';
import { CertificatesPage } from './pages/CertificatesPage';
import { SettingsPage } from './pages/SettingsPage';

export function AdminDashboard() {
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);

  const menuItems = [
    { icon: LayoutGrid, label: "Vue d'ensemble", path: '/admin' },
    { icon: Package, label: 'Produits', path: '/admin/products' },
    { icon: Users, label: 'Vendeurs', path: '/admin/sellers' },
    { icon: Users, label: 'Acheteurs', path: '/admin/buyers' },
    { icon: BadgeEuro, label: 'Paiements', path: '/admin/payments' },
    { icon: Shield, label: 'Certificats', path: '/admin/certificates' },
    { icon: Settings, label: 'Paramètres', path: '/admin/settings' }
  ];

  return (
    <div className="min-h-screen bg-[#f8f7f5]">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-100">
        <div className="flex flex-col h-full">
          <div className="p-6">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6" />
              <span className="text-xl font-serif">Admin</span>
            </div>
          </div>

          <nav className="flex-1 px-4">
            <div className="space-y-1">
              {menuItems.map(({ icon: Icon, label, path }) => (
                <Link
                  key={path}
                  to={path}
                  className={`w-full flex items-center space-x-3 px-4 py-2 text-sm rounded-lg transition-colors ${
                    location.pathname === path
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          </nav>

          <div className="p-4 border-t border-gray-100">
            <button className="flex items-center space-x-3 p-2 w-full">
              <div className="h-8 w-8 rounded-full bg-gray-900 flex items-center justify-center text-white">
                <span className="text-sm font-medium">SA</span>
              </div>
              <div className="flex-1 text-left">
                <div className="text-sm font-medium">Super Admin</div>
                <div className="text-xs text-gray-500">admin@luxchain.com</div>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-100">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center flex-1">
              <div className="relative w-64">
                <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Wallet Status */}
              <div className="flex items-center space-x-3 px-4 py-2 bg-gray-100 rounded-lg">
                <Wallet className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium">Connected to MetaMask</span>
              </div>

              {/* Notifications */}
              <div className="relative">
                <button 
                  className="p-2 text-gray-400 hover:text-gray-600 relative"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl border border-gray-100 shadow-lg overflow-hidden animate-fadeIn">
                    <div className="p-4 border-b border-gray-100">
                      <h3 className="font-medium">Notifications</h3>
                    </div>
                    <div className="divide-y divide-gray-100">
                      <div className="p-4 hover:bg-gray-50">
                        <p className="text-sm font-medium">Nouveau vendeur en attente</p>
                        <p className="text-sm text-gray-600">Luxury Watches Paris - En attente de validation KYB</p>
                        <p className="text-xs text-gray-500 mt-1">Il y a 2h</p>
                      </div>
                      <div className="p-4 hover:bg-gray-50">
                        <p className="text-sm font-medium">Nouveau produit à valider</p>
                        <p className="text-sm text-gray-600">Rolex Daytona - Prix: 42.5 ETH</p>
                        <p className="text-xs text-gray-500 mt-1">Il y a 3h</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="animate-fadeIn">
          <Routes>
            <Route index element={<ProductsPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="sellers" element={<SellersPage />} />
            <Route path="buyers" element={<BuyersPage />} />
            <Route path="payments" element={<PaymentsPage />} />
            <Route path="certificates" element={<CertificatesPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}