import React from 'react';
import { QrCode, ArrowUpRight, Shield, Download } from 'lucide-react';

const mockCertificates = [
  {
    id: '1',
    product: {
      name: 'Rolex Daytona',
      image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80',
      serialNumber: '7439852'
    },
    blockchain: {
      network: 'Ethereum',
      tokenId: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      verificationUrl: 'https://etherscan.io/token/0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
    },
    documents: [
      { name: 'Certificat d\'authenticité', type: 'pdf' },
      { name: 'Garantie internationale', type: 'pdf' }
    ],
    date: '2024-03-15T10:30:00Z'
  },
  {
    id: '2',
    product: {
      name: 'Bague Cartier',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80',
      serialNumber: '9876543'
    },
    blockchain: {
      network: 'Avalanche',
      tokenId: '0x912d35Cc6634C0532925a3b844Bc454e4438f55f',
      verificationUrl: 'https://snowtrace.io/token/0x912d35Cc6634C0532925a3b844Bc454e4438f55f'
    },
    documents: [
      { name: 'Certificat d\'authenticité', type: 'pdf' }
    ],
    date: '2024-03-14T15:45:00Z'
  }
];

export function CertificatesPage() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-light">Certificats d'authenticité</h1>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {mockCertificates.map((certificate) => (
          <div
            key={certificate.id}
            className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
          >
            <div className="p-6">
              <div className="flex items-start space-x-4">
                <img
                  src={certificate.product.image}
                  alt={certificate.product.name}
                  className="h-24 w-24 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-1">
                    {certificate.product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    N° série: {certificate.product.serialNumber}
                  </p>
                  <div className="flex items-center space-x-2">
                    <div className="inline-flex items-center space-x-1 px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm">
                      <Shield className="h-4 w-4" />
                      <span>Authentifié sur {certificate.blockchain.network}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Blockchain Info */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm font-medium mb-1">Token ID</div>
                    <div className="text-sm text-gray-600 font-mono">
                      {certificate.blockchain.tokenId}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <QrCode className="h-5 w-5" />
                    </button>
                    <a
                      href={certificate.blockchain.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-400 hover:text-gray-600"
                    >
                      <ArrowUpRight className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-3">Documents associés</h4>
                <div className="space-y-2">
                  {certificate.documents.map((doc, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                    >
                      <span className="text-sm">{doc.name}</span>
                      <Download className="h-4 w-4 text-gray-400" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}