import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Building2, Upload, Shield } from 'lucide-react';

export function SellerRegistration() {
  const [step, setStep] = React.useState(1);
  const totalSteps = 3;
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8f7f5] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-light tracking-tight text-gray-900 mb-4">
            Rejoignez LuxChain
          </h1>
          <p className="text-lg text-gray-600 font-light">
            Vendez vos pièces d'exception sur la première marketplace de luxe
            certifiée par la blockchain.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="relative mb-12">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-between">
            {[
              { step: 1, label: 'Entreprise' },
              { step: 2, label: 'Documents' },
              { step: 3, label: 'Validation' },
            ].map(({ step: stepNumber, label }) => (
              <div
                key={stepNumber}
                className={`flex flex-col items-center ${
                  stepNumber < step
                    ? 'text-black'
                    : stepNumber === step
                    ? 'text-black'
                    : 'text-gray-400'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                    stepNumber < step
                      ? 'bg-black text-white border-black'
                      : stepNumber === step
                      ? 'border-black bg-white'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  {stepNumber}
                </div>
                <div className="mt-2 text-sm font-light">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Steps */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {step === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-light text-gray-700 mb-1">
                    Nom de l'entreprise
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                    placeholder="Louis Vuitton SA"
                  />
                </div>
                <div>
                  <label className="block text-sm font-light text-gray-700 mb-1">
                    Numéro d'enregistrement
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                    placeholder="123 456 789"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-light text-gray-700 mb-1">
                    Numéro de TVA
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                    placeholder="FR 12 345 678 901"
                  />
                </div>
                <div>
                  <label className="block text-sm font-light text-gray-700 mb-1">
                    Site web
                  </label>
                  <input
                    type="url"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                    placeholder="https://www.louisvuitton.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-light text-gray-700 mb-1">
                  Adresse
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors mb-4"
                  placeholder="22 Avenue Montaigne"
                />
                <div className="grid grid-cols-3 gap-4">
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                    placeholder="Paris"
                  />
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                    placeholder="75008"
                  />
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                    placeholder="France"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <div className="border border-dashed border-gray-200 rounded-xl p-8 text-center">
                <div className="max-w-sm mx-auto">
                  <Upload className="h-8 w-8 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    Documents d'entreprise
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Extrait Kbis, attestation TVA, pièce d'identité du
                    représentant légal
                  </p>
                  <button className="inline-flex items-center px-4 py-2 border border-gray-200 rounded-lg text-sm font-light hover:border-gray-300 transition-colors">
                    <Upload className="h-4 w-4 mr-2" />
                    Sélectionner les fichiers
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-light text-gray-700 mb-1">
                    Prénom du contact
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-light text-gray-700 mb-1">
                    Nom du contact
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-light text-gray-700 mb-1">
                    Email professionnel
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-light text-gray-700 mb-1">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-8">
              <Shield className="h-16 w-16 mx-auto text-emerald-500 mb-6" />
              <h3 className="text-2xl font-light mb-4">
                Demande envoyée avec succès
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Notre équipe va examiner votre dossier dans les plus brefs délais.
                Vous recevrez une réponse par email sous 48h.
              </p>
              <button 
                onClick={() => navigate('/seller/dashboard')}
                className="inline-flex items-center px-6 py-3 bg-black text-white rounded-full text-sm hover:bg-gray-800 transition-colors"
              >
                <Building2 className="h-4 w-4 mr-2" />
                Accéder au tableau de bord
              </button>
            </div>
          )}

          {step < totalSteps && (
            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setStep(step + 1)}
                className="group inline-flex items-center px-6 py-3 bg-black text-white rounded-full text-sm hover:bg-gray-800 transition-colors"
              >
                <span>Continuer</span>
                <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}