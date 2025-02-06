import React, { useState, useRef } from 'react';
import { Search, Filter, Shield, QrCode, ArrowUpRight, Upload, X, Plus, ChevronDown } from 'lucide-react';

// Type definitions
interface FormData {
  images: File[];
  title: string;
  description: string;
  category: string;
  type: string;
  customType?: string;
  serialNumber: string;
  manufacturer: string;
  certificationDate: string;
  ownerHistory: string;
  documents: File[];
  recipientAddress: string;
  blockchain: string;
  customMetadata: {
    key: string;
    value: string;
  }[];
}

const initialFormData: FormData = {
  images: [],
  title: '',
  description: '',
  category: '',
  type: '',
  customType: '',
  serialNumber: '',
  manufacturer: '',
  certificationDate: new Date().toISOString().split('T')[0],
  ownerHistory: '',
  documents: [],
  recipientAddress: '',
  blockchain: 'ethereum',
  customMetadata: []
};

const categories = [
  { id: 'watches', label: 'Montres' },
  { id: 'jewelry', label: 'Bijoux' },
  { id: 'cars', label: 'Voitures' },
  { id: 'art', label: 'Art' }
];

const productTypes: Record<string, string[]> = {
  watches: ['Montre-bracelet', 'Montre de poche', 'Chronographe', 'Montre connectée'],
  jewelry: ['Bague', 'Collier', 'Bracelet', 'Boucles d\'oreilles', 'Broche'],
  cars: ['Voiture de sport', 'Voiture de collection', 'Supercar', 'Hypercar'],
  art: ['Peinture', 'Sculpture', 'Photographie', 'Art numérique'],
  fashion: ['Sac', 'Accessoire', 'Vêtement', 'Chaussures'],
  other: ['Autre']
};

const blockchains = [
  { 
    id: 'ethereum', 
    name: 'Ethereum', 
    icon: '⟠',
    description: 'Blockchain la plus utilisée pour les NFTs, frais de transaction variables' 
  },
  { 
    id: 'avalanche', 
    name: 'Avalanche', 
    icon: '🔺',
    description: 'Transactions rapides et peu coûteuses, forte adoption' 
  }
];

export function CertificatesPage() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [imagesPreviews, setImagesPreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length + formData.images.length > 5) {
      alert('Vous ne pouvez pas ajouter plus de 5 images');
      return;
    }

    setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagesPreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormData(prev => ({ ...prev, documents: [...prev.documents, ...files] }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    setImagesPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const removeDocument = (index: number) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }));
  };

  const addCustomMetadataField = () => {
    setFormData(prev => ({
      ...prev,
      customMetadata: [...prev.customMetadata, { key: '', value: '' }]
    }));
  };

  const updateCustomMetadata = (index: number, field: 'key' | 'value', value: string) => {
    setFormData(prev => ({
      ...prev,
      customMetadata: prev.customMetadata.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const removeCustomMetadata = (index: number) => {
    setFormData(prev => ({
      ...prev,
      customMetadata: prev.customMetadata.filter((_, i) => i !== index)
    }));
  };

  const getProductTypeOptions = (category: string): string[] => {
    return productTypes[category] || [];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate blockchain interaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reset form and close
      setFormData(initialFormData);
      setImagesPreviews([]);
      setShowForm(false);
    } catch (error) {
      console.error('Error minting NFT:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-light mb-2">Certificats</h1>
          <p className="text-sm text-gray-600">
            Gestion des certificats d'authenticité blockchain
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Émettre un certificat</span>
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-medium">Émettre un certificat NFT</h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Images Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Images du produit (max. 5)
                </label>
                <div className="grid grid-cols-5 gap-4">
                  {imagesPreviews.map((preview, index) => (
                    <div key={index} className="relative aspect-square">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  {imagesPreviews.length < 5 && (
                    <label className="aspect-square border-2 border-dashed border-gray-200 rounded-lg hover:border-gray-300 transition-colors cursor-pointer flex flex-col items-center justify-center">
                      <Upload className="h-6 w-6 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600">Ajouter</span>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Titre du certificat
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Catégorie
                  </label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData(prev => ({ 
                      ...prev, 
                      category: e.target.value,
                      type: '' 
                    }))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                    required
                  >
                    <option value="">Sélectionner une catégorie</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {formData.category && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type de produit
                  </label>
                  <select
                    value={formData.type}
                    onChange={e => setFormData(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                    required
                  >
                    <option value="">Sélectionner un type</option>
                    {getProductTypeOptions(formData.category).map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {formData.type === 'Autre' && (
                    <input
                      type="text"
                      value={formData.customType}
                      onChange={e => setFormData(prev => ({ ...prev, customType: e.target.value }))}
                      className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                      placeholder="Préciser le type"
                      required
                    />
                  )}
                </div>
              )}

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                  required
                />
              </div>

              {/* Serial Number & Manufacturer */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Numéro de série
                  </label>
                  <input
                    type="text"
                    value={formData.serialNumber}
                    onChange={e => setFormData(prev => ({ ...prev, serialNumber: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fabricant
                  </label>
                  <input
                    type="text"
                    value={formData.manufacturer}
                    onChange={e => setFormData(prev => ({ ...prev, manufacturer: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Custom Metadata */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Métadonnées personnalisées
                  </label>
                  <button
                    type="button"
                    onClick={addCustomMetadataField}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    + Ajouter un champ
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.customMetadata.map((field, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={field.key}
                        onChange={e => updateCustomMetadata(index, 'key', e.target.value)}
                        placeholder="Nom du champ"
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                      />
                      <input
                        type="text"
                        value={field.value}
                        onChange={e => updateCustomMetadata(index, 'value', e.target.value)}
                        placeholder="Valeur"
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => removeCustomMetadata(index)}
                        className="p-2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documents */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Documents d'authenticité
                </label>
                <div className="space-y-2">
                  {formData.documents.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="text-sm">{doc.name}</span>
                      <button
                        type="button"
                        onClick={() => removeDocument(index)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <label className="block w-full border-2 border-dashed border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors cursor-pointer">
                    <div className="flex items-center justify-center">
                      <Upload className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">Ajouter un document</span>
                    </div>
                    <input
                      ref={documentInputRef}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      multiple
                      onChange={handleDocumentUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Blockchain Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blockchain
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {blockchains.map(chain => (
                    <button
                      key={chain.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, blockchain: chain.id }))}
                      className={`p-4 rounded-xl border-2 text-left transition-colors ${
                        formData.blockchain === chain.id
                          ? 'border-black'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-2xl">{chain.icon}</span>
                        <span className="font-medium">{chain.name}</span>
                      </div>
                      <p className="text-sm text-gray-600">{chain.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recipient Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adresse du destinataire
                </label>
                <input
                  type="text"
                  value={formData.recipientAddress}
                  onChange={e => setFormData(prev => ({ ...prev, recipientAddress: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors font-mono"
                  placeholder="0x..."
                  required
                />
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2 text-gray-700 hover:text-gray-900"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center space-x-2 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Émission en cours...</span>
                    </>
                  ) : (
                    <>
                      <Shield className="h-4 w-4" />
                      <span>Émettre le certificat</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}