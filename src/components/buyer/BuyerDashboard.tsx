import React, { useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  Package,
  Shield,
  Settings,
  Search,
  Bell,
  ChevronDown,
  Wallet,
  Clock,
  History
} from 'lucide-react';

import { OrdersPage } from './pages/OrdersPage';
import { PurchaseHistoryPage } from './pages/PurchaseHistoryPage';
import { CertificatesPage } from './pages/CertificatesPage';
import { SettingsPage } from './pages/SettingsPage';

const recentNotifications = [
  {
    id: '1',
    title: 'Livraison en cours',
    message: 'Votre Rolex Daytona est en cours de livraison',
    time: '2h',
    read: false
  },
  {
    id: '2',
    title: 'Certificat disponible',
    message: 'Le certificat NFT de votre Bague Cartier est disponible',
    time: '1j',
    read: true
  }
];

export function BuyerDashboard() {
  const location = useLocation();
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [showWelcome, setShowWelcome] = React.useState(false);

  useEffect(() => {
    // Check if user just logged in
    if (location.state?.justLoggedIn) {
      setShowWelcome(true);
      // Hide welcome message after 5 seconds
      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  const menuItems = [
    { icon: Package, label: 'Mes achats', path: '/account' },
    { icon: History, label: 'Historique', path: '/account/history' },
    { icon: Shield, label: 'Certificats', path: '/account/certificates' },
    { icon: Settings, label: 'Paramètres', path: '/account/settings' }
  ];

  return (
    <div className="min-h-screen bg-[#f8f7f5]">
      {/* Welcome Message */}
      {showWelcome && (
        <div className="fixed top-4 right-4 z-50 animate-fadeIn">
          <div className="bg-black text-white px-6 py-3 rounded-lg shadow-lg">
            <p className="text-sm">
              Bienvenue {location.state?.userEmail?.split('@')[0]} 👋
            </p>
          </div>
        </div>
      )}

      {/* Rest of the dashboard */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-100">
        <div className="flex flex-col h-full">
          <div className="p-6">
            <Link to="/" className="text-xl font-serif">LuxChain</Link>
          </div>

          <nav className="flex-1 px-4">
            <div className="space-y-1">
              {menuItems.map(({ icon: Icon, label, path }) => (
                <Link
                  key={path}
                  to={path}
                  className={`w-full flex items-center space-x-3 px-4 py-2 text-sm rounded-lg transition-colors ${
                    location.pathname === path
                      ? 'bg-gray-100 text-gray-900'
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
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=facearea&facepad=2&w=48&h=48&q=80"
                alt="Profile"
                className="h-8 w-8 rounded-full"
              />
              <div className="flex-1 text-left">
                <div className="text-sm font-medium">Alex Martin</div>
                <div className="text-xs text-gray-500">alex.martin@example.com</div>
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
                <input
                  type="text"
                  placeholder="Rechercher une commande..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                />
                <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Wallet */}
              <div className="flex items-center space-x-3 px-4 py-2 bg-gray-100 rounded-lg">
                <Wallet className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium">2.45 ETH</span>
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

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl border border-gray-100 shadow-lg overflow-hidden animate-fadeIn">
                    <div className="p-4 border-b border-gray-100">
                      <h3 className="font-medium">Notifications</h3>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {recentNotifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 hover:bg-gray-50 transition-colors ${
                            !notification.read ? 'bg-gray-50' : ''
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-full ${
                              !notification.read ? 'bg-blue-100' : 'bg-gray-100'
                            }`}>
                              <Clock className="h-4 w-4 text-gray-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{notification.title}</p>
                              <p className="text-sm text-gray-600">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 border-t border-gray-100">
                      <button className="text-sm text-gray-600 hover:text-gray-900">
                        Voir toutes les notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="animate-fadeIn">
          <Routes>
            <Route index element={<OrdersPage />} />
            <Route path="history" element={<PurchaseHistoryPage />} />
            <Route path="certificates" element={<CertificatesPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}