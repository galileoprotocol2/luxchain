import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, Shield, Building2, Eye, EyeOff, Check } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { userService } from '../../services/userService';

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  country: string;
  marketingOptIn: boolean;
}

const initialForm: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  country: '',
  marketingOptIn: true
};

const countries = [
  { code: 'FR', name: 'France' },
  { code: 'BE', name: 'Belgique' },
  { code: 'CH', name: 'Suisse' },
  { code: 'MC', name: 'Monaco' },
  { code: 'LU', name: 'Luxembourg' }
];

export function BuyerRegistration() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Initialize form with email from login page if available
  const [form, setForm] = useState<FormState>({
    ...initialForm,
    email: (location.state as { email?: string })?.email || ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getPasswordStrength = (password: string): { score: number; text: string; color: string } => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const strengthMap = {
      0: { text: 'Très faible', color: 'bg-red-200' },
      1: { text: 'Faible', color: 'bg-red-400' },
      2: { text: 'Moyen', color: 'bg-yellow-400' },
      3: { text: 'Fort', color: 'bg-green-400' },
      4: { text: 'Très fort', color: 'bg-green-500' },
      5: { text: 'Excellent', color: 'bg-emerald-500' }
    };

    return { score, ...strengthMap[score as keyof typeof strengthMap] };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('1. Tentative d\'inscription avec:', {
        email: form.email,
        firstName: form.firstName,
        lastName: form.lastName,
        country: form.country,
        marketingOptIn: form.marketingOptIn
      });

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            first_name: form.firstName,
            last_name: form.lastName,
            country: form.country,
            marketing_opt_in: form.marketingOptIn
          }
        }
      });

      console.log('2. Réponse inscription:', { authData, authError });

      if (authError) throw authError;

      navigate('/auth/verify-email', {
        state: { 
          email: form.email,
          message: "Un email de confirmation vous a été envoyé. Veuillez vérifier votre boîte de réception pour activer votre compte."
        }
      });

    } catch (error) {
      console.error('3. Erreur lors de l\'inscription:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const passwordStrength = getPasswordStrength(form.password);

  return (
    <div className="min-h-screen bg-[#f8f7f5] animate-fadeIn">
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-black flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80"
            alt="Luxury watches"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif mb-4">
            Créez votre compte et accédez à l'univers du luxe authentifié
          </h1>
          <p className="text-lg md:text-xl text-white/80 font-light max-w-2xl mx-auto">
            Achetez des pièces d'exception avec une garantie blockchain.
          </p>
        </div>
      </div>

      {/* Registration Form */}
      <div className="max-w-xl mx-auto px-4 -mt-24 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="text-center mb-8">
            <Link to="/" className="text-2xl font-serif">
              LuxChain
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prénom
                </label>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={e => setForm(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom
                </label>
                <input
                  type="text"
                  value={form.lastName}
                  onChange={e => setForm(prev => ({ ...prev, lastName: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {form.password && (
                <div className="mt-2">
                  <div className="h-1 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className={`h-full ${passwordStrength.color} transition-all duration-300`}
                      style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Force du mot de passe : {passwordStrength.text}
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pays de résidence
              </label>
              <select
                value={form.country}
                onChange={e => setForm(prev => ({ ...prev, country: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                required
              >
                <option value="">Sélectionnez votre pays</option>
                {countries.map(country => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={form.marketingOptIn}
                onChange={e => setForm(prev => ({ ...prev, marketingOptIn: e.target.checked }))}
                className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
              />
              <span className="text-sm text-gray-600">
                Je souhaite recevoir des offres exclusives et actualités de LuxChain
              </span>
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center space-x-2 bg-black text-white rounded-lg px-6 py-3 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Création du compte...</span>
                </>
              ) : (
                <>
                  <span>Créer mon compte</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Déjà inscrit ?{' '}
                <Link to="/login" className="text-black hover:underline">
                  Se connecter
                </Link>
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">ou</span>
              </div>
            </div>

            <Link
              to="/seller/register"
              className="flex items-center justify-center space-x-2 w-full px-6 py-3 border-2 border-gray-200 rounded-lg text-sm hover:border-gray-300 transition-colors"
            >
              <Building2 className="h-4 w-4" />
              <span>S'inscrire en tant que vendeur</span>
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center space-x-2 text-xs text-gray-500">
            <Shield className="h-4 w-4" />
            <span>Vos données sont protégées et sécurisées</span>
          </div>
        </div>
      </div>
    </div>
  );
}