import React from 'react';
import { Shield, Wallet, Link as LinkIcon, ChevronRight } from 'lucide-react';

const settingsSections = [
  {
    title: 'Blockchain',
    items: [
      {
        icon: Wallet,
        label: 'Portefeuille administrateur',
        description: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        action: 'Changer'
      },
      {
        icon: Shield,
        label: 'Contrat des certificats',
        description: 'Configuration du smart contract NFT',
        action: 'Configurer'
      }
    ]
  },
  {
    title: 'Intégrations',
    items: [
      {
        icon: LinkIcon,
        label: 'API Blockchain',
        description: 'Configuration des endpoints et des clés API',
        action: 'Configurer'
      }
    ]
  }
];

export function SettingsPage() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-light mb-2">Paramètres</h1>
          <p className="text-sm text-gray-600">
            Configuration de l'interface d'administration
          </p>
        </div>
      </div>

      <div className="max-w-3xl">
        {settingsSections.map((section) => (
          <div key={section.title} className="mb-8">
            <h2 className="text-lg font-medium mb-4">{section.title}</h2>
            <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100">
              {section.items.map((item) => (
                <div key={item.label} className="p-4 flex items-center">
                  <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0 mx-4">
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  <button className="group flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="text-sm text-gray-600">{item.action}</span>
                    <ChevronRight className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}