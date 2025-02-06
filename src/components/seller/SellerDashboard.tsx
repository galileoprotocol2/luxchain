import React from 'react';
import { Link, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutGrid,
  Package,
  BadgeEuro,
  Users,
  Settings,
  PlusCircle,
  Bell,
  ChevronDown,
  Search
} from 'lucide-react';

import { ProductsPage } from './pages/ProductsPage';
import { ProductsManagementPage } from './pages/ProductsManagementPage';
import { SalesPage } from './pages/SalesPage';
import { CustomersPage } from './pages/CustomersPage';
import { SettingsPage } from './pages/SettingsPage';
import { NewProductPage } from './pages/NewProductPage';

export function SellerDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutGrid, label: "Vue d'ensemble", path: '/seller/dashboard' },
    { icon: Package, label: 'Produits', path: '/seller/dashboard/products' },
    { icon: BadgeEuro, label: 'Ventes', path: '/seller/dashboard/sales' },
    { icon: Users, label: 'Clients', path: '/seller/dashboard/customers' },
    { icon: Settings, label: 'Paramètres', path: '/seller/dashboard/settings' }
  ];

  // Check if we're on the new product page
  const isNewProductPage = location.pathname === '/seller/dashboard/products/new';

  return (
    <div className="min-h-screen bg-[#f8f7f5]">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-100">
        <div className="flex flex-col h-full">
          <div className="p-6">
            <Link to="/" className="text-xl font-light">LuxChain</Link>
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
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=48&h=48&q=80"
                alt="Profile"
                className="h-8 w-8 rounded-full"
              />
              <div className="flex-1 text-left">
                <div className="text-sm font-medium">John Doe</div>
                <div className="text-xs text-gray-500">Luxury Watches Paris</div>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        {!isNewProductPage && (
          <header className="bg-white border-b border-gray-100">
            <div className="flex items-center justify-between px-8 py-4">
              <div className="flex items-center flex-1">
                <div className="relative w-64">
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                  />
                  <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Bell className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => navigate('/seller/dashboard/products/new')}
                  className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition-colors"
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>Nouveau produit</span>
                </button>
              </div>
            </div>
          </header>
        )}

        <div className={`${isNewProductPage ? 'animate-fadeIn' : ''}`}>
          <Routes>
            <Route index element={<ProductsManagementPage />} />
            <Route path="products" element={<ProductsManagementPage />} />
            <Route path="products/new" element={<NewProductPage />} />
            <Route path="sales" element={<SalesPage />} />
            <Route path="customers" element={<CustomersPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}