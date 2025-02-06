import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';

export function VerifyEmailPage() {
  const location = useLocation();
  const { email, message } = location.state || {};

  return (
    <div className="min-h-screen bg-[#f8f7f5] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md text-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-6">
            <Mail className="h-8 w-8" />
          </div>

          <h2 className="text-2xl font-light mb-4">
            Vérifiez votre email
          </h2>

          <p className="text-gray-600 mb-6">
            {message || `Un email de confirmation a été envoyé à ${email}. Veuillez cliquer sur le lien dans l'email pour activer votre compte.`}
          </p>

          <Link 
            to="/login"
            className="inline-flex items-center space-x-2 text-sm text-black hover:underline"
          >
            <span>Retour à la connexion</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
} 