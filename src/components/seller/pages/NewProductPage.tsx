import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Upload, 
  X, 
  Info,
  Truck,
  Shield,
  CreditCard,
  Wallet
} from 'lucide-react';

interface FormState {
  images: File[];
  name: string;
  description: string;
  category: string;
  brand: string;
  serialNumber: string;
  priceUSD: string;
  condition: string;
  history: string;
  repairs: string;
  shipping: {
    europe: string;
    northAmerica: string;
    asia: string;
    other: string;
  };
  authentication: {
    documents: File[];
    blockchain: boolean;
    chain?: string;
  };
  paymentMethods: {
    card: boolean;
    crypto: boolean;
  };
}

const initialForm: FormState = {
  images: [],
  name: '',
  description: '',
  category: '',
  brand: '',
  serialNumber: '',
  priceUSD: '',
  condition: '',
  history: '',
  repairs: '',
  shipping: {
    europe: '',
    northAmerica: '',
    asia: '',
    other: ''
  },
  authentication: {
    documents: [],
    blockchain: false,
    chain: undefined
  },
  paymentMethods: {
    card: true,
    crypto: true
  }
};

const categories = [
  { id: 'watches', label: 'Montres' },
  { id: 'jewelry', label: 'Bijoux' },
  { id: 'cars', label: 'Voitures' },
  { id: 'art', label: 'Art' }
];

const conditions = [
  { id: 'new', label: 'Neuf' },
  { id: 'excellent', label: 'Excellent' },
  { id: 'good', label: 'Bon' },
  { id: 'fair', label: 'Acceptable' },
  { id: 'restored', label: 'Restauré' }
];

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

export function NewProductPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [imagesPreviews, setImagesPreviews] = useState<string[]>([]);
  const [docPreviews, setDocPreviews] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setForm(prev => ({ ...prev, images: [...prev.images, ...files] }));
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagesPreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDocUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setForm(prev => ({
      ...prev,
      authentication: {
        ...prev.authentication,
        documents: [...prev.authentication.documents, ...files]
      }
    }));
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDocPreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    setImagesPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const removeDoc = (index: number) => {
    setForm(prev => ({
      ...prev,
      authentication: {
        ...prev.authentication,
        documents: prev.authentication.documents.filter((_, i) => i !== index)
      }
    }));
    setDocPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Logique de soumission à implémenter
    console.log('Form submitted:', form);
  };

  return (
    <div className="min-h-screen bg-[#f8f7f5] pb-16">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="flex items-center px-8 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Retour</span>
          </button>
          <h1 className="text-xl font-light ml-8">Nouveau Produit</h1>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto pt-8 px-4">
        {/* Images */}
        <section className="bg-white rounded-xl p-6 mb-8">
          <h2 className="text-lg font-medium mb-4">Images du produit</h2>
          <div className="grid grid-cols-4 gap-4">
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
            {imagesPreviews.length < 8 && (
              <label className="aspect-square border-2 border-dashed border-gray-200 rounded-lg hover:border-gray-300 transition-colors cursor-pointer flex flex-col items-center justify-center">
                <Upload className="h-6 w-6 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">Ajouter une image</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </section>

        {/* Informations produit */}
        <section className="bg-white rounded-xl p-6 mb-8">
          <h2 className="text-lg font-medium mb-4">Informations produit</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom du produit
              </label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                placeholder="ex: Rolex Daytona Or Rose 40mm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={form.description}
                onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                placeholder="Description détaillée du produit..."
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Catégorie
                </label>
                <select
                  value={form.category}
                  onChange={e => setForm(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Marque
                </label>
                <input
                  type="text"
                  value={form.brand}
                  onChange={e => setForm(prev => ({ ...prev, brand: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                  placeholder="ex: Rolex"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Numéro de série
              </label>
              <input
                type="text"
                value={form.serialNumber}
                onChange={e => setForm(prev => ({ ...prev, serialNumber: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                placeholder="ex: 7439852"
              />
            </div>
          </div>
        </section>

        {/* Prix & Livraison */}
        <section className="bg-white rounded-xl p-6 mb-8">
          <h2 className="text-lg font-medium mb-4">Prix & Livraison</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prix HT (USD)
                <div className="inline-flex items-center ml-2 group relative">
                  <Info className="h-4 w-4 text-gray-400" />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    La TVA est calculée dynamiquement en fonction de la localisation de l'acheteur et affichée au moment du paiement.
                  </div>
                </div>
              </label>
              <input
                type="number"
                value={form.priceUSD}
                onChange={e => setForm(prev => ({ ...prev, priceUSD: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                placeholder="ex: 25000"
              />
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                <Truck className="h-4 w-4 mr-2" />
                Frais de livraison par zone
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries({
                  europe: 'Europe',
                  northAmerica: 'Amérique du Nord',
                  asia: 'Asie',
                  other: 'Autres destinations'
                }).map(([key, label]) => (
                  <div key={key}>
                    <label className="block text-sm text-gray-600 mb-1">
                      {label} (USD)
                    </label>
                    <input
                      type="number"
                      value={form.shipping[key as keyof typeof form.shipping]}
                      onChange={e => setForm(prev => ({
                        ...prev,
                        shipping: {
                          ...prev.shipping,
                          [key]: e.target.value
                        }
                      }))}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                      placeholder="0"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* État & Historique */}
        <section className="bg-white rounded-xl p-6 mb-8">
          <h2 className="text-lg font-medium mb-4">État & Historique</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                État du produit
              </label>
              <select
                value={form.condition}
                onChange={e => setForm(prev => ({ ...prev, condition: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
              >
                <option value="">Sélectionner l'état</option>
                {conditions.map(condition => (
                  <option key={condition.id} value={condition.id}>
                    {condition.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Historique de propriété
              </label>
              <textarea
                value={form.history}
                onChange={e => setForm(prev => ({ ...prev, history: e.target.value }))}
                rows={3}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                placeholder="Détaillez l'historique de propriété si disponible..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Réparations ou modifications
              </label>
              <textarea
                value={form.repairs}
                onChange={e => setForm(prev => ({ ...prev, repairs: e.target.value }))}
                rows={3}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                placeholder="Listez les réparations ou modifications effectuées..."
              />
            </div>
          </div>
        </section>

        {/* Authentification */}
        <section className="bg-white rounded-xl p-6 mb-8">
          <h2 className="text-lg font-medium mb-4">Authentification</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                Documents d'authenticité
              </h3>
              <div className="grid grid-cols-4 gap-4">
                {docPreviews.map((preview, index) => (
                  <div key={index} className="relative aspect-square">
                    <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-sm text-gray-600">
                        Document {index + 1}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeDoc(index)}
                      className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                {docPreviews.length < 4 && (
                  <label className="aspect-square border-2 border-dashed border-gray-200 rounded-lg hover:border-gray-300 transition-colors cursor-pointer flex flex-col items-center justify-center">
                    <Upload className="h-6 w-6 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">Ajouter un document</span>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      multiple
                      onChange={handleDocUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={form.authentication.blockchain}
                  onChange={e => setForm(prev => ({
                    ...prev,
                    authentication: {
                      ...prev.authentication,
                      blockchain: e.target.checked
                    }
                  }))}
                  className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                />
                <span className="text-sm font-medium text-gray-700">
                  Émettre un certificat d'authenticité après achat
                </span>
              </label>

              {form.authentication.blockchain && (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {blockchains.map(chain => (
                    <button
                      key={chain.id}
                      type="button"
                      onClick={() => setForm(prev => ({
                        ...prev,
                        authentication: {
                          ...prev.authentication,
                          chain: chain.id
                        }
                      }))}
                      className={`p-4 rounded-xl border-2 text-left transition-colors ${
                        form.authentication.chain === chain.id
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
              )}
            </div>
          </div>
        </section>

        {/* Options de paiement */}
        <section className="bg-white rounded-xl p-6 mb-8">
          <h2 className="text-lg font-medium mb-4">Options de paiement</h2>
          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={form.paymentMethods.card}
                onChange={e => setForm(prev => ({
                  ...prev,
                  paymentMethods: {
                    ...prev.paymentMethods,
                    card: e.target.checked
                  }
                }))}
                className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
              />
              <div className="flex items-center space-x-2">
                <CreditCard className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  Carte bancaire (Visa, Mastercard)
                </span>
              </div>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={form.paymentMethods.crypto}
                onChange={e => setForm(prev => ({
                  ...prev,
                  paymentMethods: {
                    ...prev.paymentMethods,
                    crypto: e.target.checked
                  }
                }))}
                className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
              />
              <div className="flex items-center space-x-2">
                <Wallet className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  Paiement crypto (USDC, Ethereum)
                </span>
              </div>
            </label>
          </div>
        </section>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2 text-gray-700 hover:text-gray-900"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Publier le produit
          </button>
        </div>
      </form>
    </div>
  );
}