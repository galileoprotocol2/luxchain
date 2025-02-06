import React, { useState } from 'react';
import { Search, Filter, Shield, Clock, X, Check, Building2, ArrowUpRight } from 'lucide-react';

const mockSellers = [
  {
    id: '1',
    companyName: 'Luxury Watches Paris',
    registrationNumber: 'FR12345678',
    vatNumber: 'FR123456789',
    status: 'pending',
    contact: {
      name: 'Jean Dupont',
      email: 'jean@luxurywatches.paris',
      phone: '+33 1 23 45 67 89'
    },
    documents: [
      { type: 'registration', status: 'verified' },
      { type: 'identity', status: 'pending' },
      { type: 'financial', status: 'pending' }
    ],
    submittedAt: '2024-03-15T10:30:00Z'
  },
  {
    id: '2',
    companyName: 'Joaillerie Moderne',
    registrationNumber: 'FR87654321',
    vatNumber: 'FR987654321',
    status: 'approved',
    contact: {
      name: 'Marie Martin',
      email: 'marie@joaillerie-moderne.fr',
      phone: '+33 1 98 76 54 32'
    },
    documents: [
      { type: 'registration', status: 'verified' },
      { type: 'identity', status: 'verified' },
      { type: 'financial', status: 'verified' }
    ],
    submittedAt: '2024-03-14T15:45:00Z'
  }
];

export function SellersPage() {
  const [selectedSeller, setSelectedSeller] = useState(mockSellers[0]);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-light mb-2">Vendeurs</h1>
          <p className="text-sm text-gray-600">
            Gérez les demandes d'inscription et la validation KYB
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Sellers List */}
        <div className="col-span-2 bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Rechercher un vendeur..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <select className="pl-2 pr-8 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors">
                  <option>Tous les statuts</option>
                  <option>En attente</option>
                  <option>Approuvé</option>
                  <option>Rejeté</option>
                </select>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {mockSellers.map((seller) => (
              <div
                key={seller.id}
                onClick={() => {
                  setSelectedSeller(seller);
                  setShowDetails(true);
                }}
                className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-start space-x-4">
                  <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-lg font-medium">{seller.companyName}</h3>
                      <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${
                        seller.status === 'pending'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {seller.status === 'pending' ? (
                          <Clock className="h-3 w-3" />
                        ) : (
                          <Shield className="h-3 w-3" />
                        )}
                        <span>
                          {seller.status === 'pending' ? 'En attente' : 'Approuvé'}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {seller.contact.name} · {seller.contact.email}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        N° TVA: {seller.vatNumber}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(seller.submittedAt).toLocaleDateString('fr-FR', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Seller Details */}
        <div className={`fixed inset-y-0 right-0 w-1/3 bg-white border-l border-gray-100 transform transition-transform duration-300 ${
          showDetails ? 'translate-x-0' : 'translate-x-full'
        }`}>
          {selectedSeller && (
            <div className="h-full flex flex-col">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-medium">Détails du vendeur</h2>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="flex-1 flex items-center justify-center space-x-2 bg-emerald-500 text-white rounded-lg px-4 py-2 hover:bg-emerald-600 transition-colors">
                    <Check className="h-4 w-4" />
                    <span>Approuver</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600 transition-colors">
                    <X className="h-4 w-4" />
                    <span>Rejeter</span>
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="p-6 space-y-6">
                  {/* Company Info */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Informations société</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                      <div>
                        <div className="text-sm text-gray-600">Raison sociale</div>
                        <div className="font-medium">{selectedSeller.companyName}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">N° d'enregistrement</div>
                        <div className="font-medium">{selectedSeller.registrationNumber}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">N° TVA</div>
                        <div className="font-medium">{selectedSeller.vatNumber}</div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Contact</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                      <div>
                        <div className="text-sm text-gray-600">Nom</div>
                        <div className="font-medium">{selectedSeller.contact.name}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Email</div>
                        <div className="font-medium">{selectedSeller.contact.email}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Téléphone</div>
                        <div className="font-medium">{selectedSeller.contact.phone}</div>
                      </div>
                    </div>
                  </div>

                  {/* Documents */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Documents</h3>
                    <div className="space-y-2">
                      {selectedSeller.documents.map((doc, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div>
                            <div className="font-medium capitalize">
                              {doc.type === 'registration' && 'Kbis'}
                              {doc.type === 'identity' && 'Pièce d\'identité'}
                              {doc.type === 'financial' && 'Attestation bancaire'}
                            </div>
                            <div className={`text-sm ${
                              doc.status === 'verified' 
                                ? 'text-emerald-600'
                                : 'text-amber-600'
                            }`}>
                              {doc.status === 'verified' ? 'Vérifié' : 'En attente'}
                            </div>
                          </div>
                          <button className="p-2 text-gray-400 hover:text-gray-600">
                            <ArrowUpRight className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}