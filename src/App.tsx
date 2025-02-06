import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { LandingPage } from './components/LandingPage';
import { ProductPage } from './components/ProductPage';
import { CategoryPage } from './components/CategoryPage';
import { IconicProductPage } from './components/IconicProductPage';
import { CatalogPage } from './components/CatalogPage';
import { SellersDirectoryPage } from './components/SellersDirectoryPage';
import { SupportPage } from './components/SupportPage';
import { BlogPage } from './components/BlogPage';
import { SellMarketplacePage } from './components/SellMarketplacePage';
import { SecurePaymentsPage } from './components/SecurePaymentsPage';
import { LegalPage } from './components/LegalPage';
import { SellerRegistration } from './components/seller/SellerRegistration';
import { SellerDashboard } from './components/seller/SellerDashboard';
import { BuyerDashboard } from './components/buyer/BuyerDashboard';
import { LoginPage } from './components/auth/LoginPage';
import { BuyerRegistration } from './components/auth/BuyerRegistration';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Footer } from './components/Footer';
import { AuthProvider } from './contexts/AuthContext';
import { AuthCallback } from './components/auth/AuthCallback';
import { VerifyEmailPage } from './components/auth/VerifyEmailPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/sellers" element={<SellersDirectoryPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/blog/*" element={<BlogPage />} />
          <Route path="/sell" element={<SellMarketplacePage />} />
          <Route path="/payments" element={<SecurePaymentsPage />} />
          <Route path="/legal/*" element={<LegalPage />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/iconic/:id" element={<IconicProductPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<BuyerRegistration />} />
          <Route path="/seller/register" element={<SellerRegistration />} />
          <Route path="/seller/dashboard/*" element={<SellerDashboard />} />
          <Route path="/account/*" element={<BuyerDashboard />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/auth/verify-email" element={<VerifyEmailPage />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;