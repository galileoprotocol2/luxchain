import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, Building2, ArrowRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';

type UserType = 'buyer' | 'seller';

export function LoginPage() {
  const [userType, setUserType] = useState<UserType>('buyer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      // Redirection selon le type d'utilisateur
      if (userType === 'buyer') {
        navigate('/account', { 
          state: { 
            justLoggedIn: true,
            userEmail: email 
          }
        });
      } else {
        navigate('/seller/dashboard');
      }

    } catch (error) {
      console.error('Erreur de connexion:', error);
      // Gérer l'erreur (afficher un message à l'utilisateur)
    }
  };

  const handleRegisterClick = () => {
    if (userType === 'buyer') {
      navigate('/register', {
        state: { email } // Pass email if entered
      });
    } else {
      navigate('/seller/register');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f7f5] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-serif">
            LuxChain
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-light text-center mb-8">
            Connexion
          </h2>

          {/* User Type Selection */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => setUserType('buyer')}
              className={`p-4 rounded-xl border-2 text-left transition-colors ${
                userType === 'buyer'
                  ? 'border-black'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
                <span className="font-medium">Acheteur</span>
              </div>
              <p className="text-sm text-gray-600">
                Accédez à vos achats et certificats
              </p>
            </button>

            <button
              onClick={() => setUserType('seller')}
              className={`p-4 rounded-xl border-2 text-left transition-colors ${
                userType === 'seller'
                  ? 'border-black'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Building2 className="h-5 w-5 text-gray-600" />
                </div>
                <span className="font-medium">Vendeur</span>
              </div>
              <p className="text-sm text-gray-600">
                Gérez vos produits et ventes
              </p>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                placeholder="vous@exemple.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                />
                <span className="ml-2 text-gray-600">Se souvenir de moi</span>
              </label>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Mot de passe oublié ?
              </a>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-800 transition-colors"
            >
              <span>Se connecter</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Pas encore inscrit ?{' '}
              <button
                onClick={handleRegisterClick}
                className="text-black hover:underline"
              >
                Créer un compte
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}