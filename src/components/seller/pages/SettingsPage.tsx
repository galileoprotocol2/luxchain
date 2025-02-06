import React from 'react';
import { Bell, Wallet, Shield, Link, ChevronRight } from 'lucide-react';

const settingsSections = [
  {
    title: 'Profil',
    items: [
      {
        icon: Shield,
        label: "Informations de l'entreprise",
        description: 'Gérez les informations de votre entreprise',
        action: 'Modifier'
      },
      {
        icon: Bell,
        label: 'Notifications',
        description: 'Gérez vos préférences de notification',
        action: 'Configurer'
      }
    ]
  },
  {
    title: 'Paiements',
    items: [
      {
        icon: Wallet,
        label: 'Portefeuille Ethereum',
        description: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        action: 'Changer'
      }
    ]
  },
  {
    title: 'Intégrations',
    items: [
      {
        icon: Link,
        label: 'API Blockchain',
        description: 'Gérez vos intégrations blockchain',
        action: 'Configurer'
      }
    ]
  }
];

export function SettingsPage() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-light">Paramètres</h1>
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

        {/* Danger Zone */}
        <div className="mt-12">
          <h2 className="text-lg font-medium text-red-600 mb-4">Zone de danger</h2>
          <div className="bg-white rounded-xl border border-red-100">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-600">Supprimer le compte</p>
                  <p className="text-sm text-gray-600">
                    Cette action est irréversible et supprimera toutes vos données
                  </p>
                </div>
                <button className="px-4 py-2 border border-red-200 text-red-600 rounded-lg text-sm hover:bg-red-50 transition-colors">
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}