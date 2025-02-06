import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { 
  Shield, 
  QrCode, 
  ArrowRight, 
  ChevronRight, 
  ChevronLeft,
  Wallet,
  CreditCard,
  Building2,
  ZoomIn,
  Share2,
  X,
  Heart,
  Info,
  MessageSquare,
  Clock,
  Truck,
  ArrowUpRight,
  CheckCircle,
  Send
} from 'lucide-react';
import type { Product } from '../types';

// Extended product type with additional details
interface DetailedProduct extends Product {
  brand?: string;
  cryptoPrice?: number;
  specifications?: Record<string, string>;
  blockchain?: {
    network: string;
    certificateId: string;
    verificationUrl: string;
  };
  seller?: {
    name: string;
    verified: boolean;
    joinedDate: string;
    rating: number;
    sales: number;
    avatar: string;
    responseTime?: string;
  };
  shipping?: {
    estimated: string;
    returns: string;
    insurance: boolean;
  };
  history?: {
    date: string;
    event: string;
    location: string;
  }[];
  reviews?: {
    rating: number;
    count: number;
    featured?: {
      author: string;
      avatar: string;
      rating: number;
      date: string;
      content: string;
    }[];
  };
}

// Mock products database with enhanced details
const mockProducts: Record<string, DetailedProduct> = {
  '1': {
    id: '1',
    name: 'Rolex Daytona',
    brand: 'Rolex',
    description: `Chronographe automatique en or rose 18 carats avec cadran noir. Une pièce d'exception qui incarne l'excellence horlogère suisse et le prestige de la marque Rolex.

Cette Rolex Daytona représente le summum du luxe et de la précision horlogère. Son boîtier en or rose 18 carats abrite le célèbre calibre 4130, un mouvement chronographe automatique développé et manufacturé par Rolex.

Le cadran noir laqué offre un contraste saisissant avec les index et aiguilles en or rose, garantissant une lisibilité optimale. Les trois compteurs du chronographe sont disposés de manière équilibrée, témoignant du souci du détail caractéristique de la marque.`,
    price: 42500,
    cryptoPrice: 15.8,
    currency: 'USD',
    cryptoCurrency: 'ETH',
    category: 'watches',
    images: [
      'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1627225924765-552d49cf47ad?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1604242692760-2f7b0c26856d?auto=format&fit=crop&q=80'
    ],
    specifications: {
      reference: '116500LN',
      year: '2024',
      material: 'Or rose 18 carats',
      movement: 'Automatique',
      case: '40mm',
      condition: 'Neuf',
      serialNumber: '7439852',
      waterResistance: '100m',
      functions: 'Chronographe, Tachymètre',
      bracelet: 'Or rose 18 carats, Oyster'
    },
    blockchain: {
      network: 'Ethereum',
      certificateId: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      verificationUrl: 'https://etherscan.io/token/0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
    },
    seller: {
      name: 'Luxury Watches Paris',
      verified: true,
      joinedDate: '2023',
      rating: 4.9,
      sales: 128,
      responseTime: '< 2h',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=48&h=48&q=80'
    },
    shipping: {
      estimated: '3-5 jours',
      returns: '14 jours',
      insurance: true
    },
    history: [
      { date: '2024', event: 'Acquisition par Luxury Watches Paris', location: 'Genève, Suisse' },
      { date: '2024', event: 'Certification Rolex', location: 'Genève, Suisse' },
      { date: '2024', event: 'Production', location: 'Manufacture Rolex, Suisse' }
    ],
    reviews: {
      rating: 4.9,
      count: 24,
      featured: [
        {
          author: 'Jean Dupont',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=48&h=48&q=80',
          rating: 5,
          date: '2024-02-15',
          content: 'Service impeccable et montre magnifique. La certification blockchain apporte une vraie tranquillité d\'esprit.'
        }
      ]
    },
    status: 'approved'
  },
  '2': {
    id: '2',
    name: 'Bague Cartier',
    brand: 'Cartier',
    description: 'Bague Trinity classique, or blanc, or jaune, or rose. Un symbole intemporel d\'élégance et de raffinement.',
    price: 15800,
    cryptoPrice: 5.8,
    currency: 'USD',
    cryptoCurrency: 'ETH',
    category: 'jewelry',
    images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80'],
    seller: {
      name: 'Joaillerie Moderne',
      verified: true,
      joinedDate: '2023',
      rating: 4.7,
      sales: 85,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=48&h=48&q=80'
    },
    blockchain: {
      network: 'Ethereum',
      certificateId: '0x912d35Cc6634C0532925a3b844Bc454e4438f55f',
      verificationUrl: 'https://etherscan.io/token/0x912d35Cc6634C0532925a3b844Bc454e4438f55f'
    },
    status: 'approved'
  }
};

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [product, setProduct] = useState<DetailedProduct | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showZoom, setShowZoom] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'crypto' | 'card'>('crypto');
  const [showContactForm, setShowContactForm] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'history'>('description');
  const mainImageRef = useRef<HTMLImageElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);
  const [contactMessage, setContactMessage] = useState('');

  useEffect(() => {
    // Try to get product from navigation state first
    const productFromState = location.state?.product as DetailedProduct;
    if (productFromState) {
      // If coming from state, merge with mock data to get full details
      const fullProduct = mockProducts[productFromState.id];
      setProduct(fullProduct || productFromState);
      return;
    }

    // Fallback to mock database lookup
    if (id && mockProducts[id]) {
      setProduct(mockProducts[id]);
    }
  }, [id, location.state]);

  const handleImageHover = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!mainImageRef.current || !isZooming) return;

    const { left, top, width, height } = mainImageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  const handleShare = async () => {
    if (!product) return;

    try {
      await navigator.share({
        title: product.name,
        text: `Découvrez ${product.name} sur LuxChain`,
        url: window.location.href
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement contact form submission logic here
    console.log('Message sent:', contactMessage);
    setShowContactForm(false);
    setContactMessage('');
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif mb-4">Produit non trouvé</h2>
          <p className="text-gray-600">Le produit que vous recherchez n'existe pas.</p>
          <Link to="/" className="inline-block mt-4 text-black hover:underline">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center space-x-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-gray-900">Accueil</Link>
          <ChevronRight className="h-4 w-4" />
          <Link to={`/category/${product.category}`} className="hover:text-gray-900 capitalize">
            {product.category}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900">{product.name}</span>
        </nav>
      </div>

      {/* Product Hero */}
      <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2">
        {/* Image Gallery */}
        <div className="relative h-[80vh] bg-[#f8f7f5]">
          {/* Main Image */}
          <div 
            className="relative h-full overflow-hidden"
            onMouseEnter={() => setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
            onMouseMove={handleImageHover}
          >
            <img
              ref={mainImageRef}
              src={product.images[selectedImage]}
              alt={product.name}
              className={`w-full h-full object-cover transition-transform duration-200 ${
                isZooming ? 'scale-150' : ''
              }`}
              style={isZooming ? {
                transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
              } : undefined}
            />
            
            {/* Navigation Arrows */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedImage(prev => prev === 0 ? product.images.length - 1 : prev - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={() => setSelectedImage(prev => prev === product.images.length - 1 ? 0 : prev + 1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Top Actions */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <button 
                onClick={handleShare}
                className="p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
              >
                <Share2 className="h-5 w-5" />
              </button>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowZoom(true)}
                  className="p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
                >
                  <ZoomIn className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-2 rounded-full transition-colors ${
                    isFavorite 
                      ? 'bg-red-500 text-white' 
                      : 'bg-white/90 hover:bg-white'
                  }`}
                >
                  <Heart className="h-5 w-5" fill={isFavorite ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-black' : 'border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-12 lg:p-16">
          <div className="max-w-xl">
            {/* Brand & Title */}
            <div className="mb-8">
              <h1 className="font-serif">
                {product.brand && (
                  <span className="block text-lg text-gray-500 mb-2">{product.brand}</span>
                )}
                <span className="block text-4xl">{product.name}</span>
              </h1>
              {product.reviews && (
                <div className="flex items-center space-x-4 mt-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i}
                        className={`text-lg ${
                          i < Math.floor(product.reviews.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    {product.reviews.count} avis
                  </span>
                </div>
              )}
            </div>

            {/* Price & Authentication */}
            <div className="flex items-start justify-between mb-8 pb-8 border-b border-gray-100">
              <div>
                <div className="text-3xl font-light mb-2">
                  ${product.price.toLocaleString()}
                </div>
                {product.cryptoPrice && (
                  <div className="text-sm text-gray-500">
                    ≈ {product.cryptoPrice} {product.cryptoCurrency}
                  </div>
                )}
              </div>
              {product.blockchain && (
                <div className="flex items-center space-x-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full">
                  <Shield className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    Authentifié sur {product.blockchain.network}
                  </span>
                </div>
              )}
            </div>

            {/* Shipping Info */}
            {product.shipping && (
              <div className="mb-8 space-y-4">
                <div className="flex items-center space-x-3 text-sm">
                  <Truck className="h-5 w-5 text-gray-400" />
                  <span>
                    Livraison estimée : <strong>{product.shipping.estimated}</strong>
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <ArrowUpRight className="h-5 w-5 text-gray-400" />
                  <span>
                    Retours acceptés sous {product.shipping.returns}
                  </span>
                </div>
                {product.shipping.insurance && (
                  <div className="flex items-center space-x-3 text-sm">
                    <Shield className="h-5 w-5 text-gray-400" />
                    <span>Transport assuré et sécurisé</span>
                  </div>
                )}
              </div>
            )}

            {/* Payment Method Selection */}
            <div className="space-y-6 mb-8">
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setPaymentMethod('crypto')}
                  className={`p-4 rounded-xl border-2 text-left transition-colors ${
                    paymentMethod === 'crypto'
                      ? 'border-black'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <Wallet className="h-5 w-5" />
                    <span className="font-medium">Payer en Crypto</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    ETH, USDC, BTC acceptés
                  </p>
                </button>

                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-xl border-2 text-left transition-colors ${
                    paymentMethod === 'card'
                      ? 'border-black'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <CreditCard className="h-5 w-5" />
                    <span className="font-medium">Carte Bancaire</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Visa, Mastercard, Amex
                  </p>
                </button>
              </div>

              <button className="w-full flex items-center justify-center space-x-2 bg-black text-white rounded-lg px-8 py-4 hover:bg-gray-900 transition-colors">
                <span>Acheter maintenant</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Blockchain Certificate */}
            {product.blockchain && (
              <div className="bg-[#f8f7f5] rounded-xl p-6 mb-8">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium mb-2">Certificat Blockchain</h3>
                    <p className="text-sm text-gray-600 font-mono mb-2">
                      {product.blockchain.certificateId.slice(0, 10)}...
                      {product.blockchain.certificateId.slice(-8)}
                    </p>
                    <a
                      href={product.blockchain.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-black hover:underline"
                    >
                      Voir sur {product.blockchain.network}
                    </a>
                  </div>
                  <button className="p-2 bg-white rounded-lg">
                    <QrCode className="h-6 w-6" />
                  </button>
                </div>
              </div>
            )}

            {/* Seller Info */}
            {product.seller && (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={product.seller.avatar}
                        alt={product.seller.name}
                        className="h-12 w-12 rounded-full"
                      />
                      {product.seller.verified && (
                        <Shield className="h-4 w-4 text-emerald-500 absolute -right-1 -bottom-1" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{product.seller.name}</div>
                      <div className="text-sm text-gray-500">
                        {product.seller.rating} ★ · {product.seller.sales} ventes
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowContactForm(true)}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Contacter</span>
                  </button>
                </div>

                {product.seller.responseTime && (
                  <div className="flex items-center space-x-3 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>Temps de réponse moyen : {product.seller.responseTime}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <div className="flex space-x-8">
            {[
              { id: 'description', label: 'Description' },
              { id: 'specifications', label: 'Spécifications' },
              { id: 'history', label: 'Historique' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`pb-4 relative ${
                  activeTab === tab.id
                    ? 'text-black'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {activeTab === 'description' && (
              <div className="prose prose-lg">
                <h2 className="text-2xl font-serif mb-6">Description</h2>
                {product.description.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            )}

            {activeTab === 'specifications' && product.specifications && (
              <div>
                <h2 className="text-2xl font-serif mb-6">Spécifications</h2>
                <div className="bg-[#f8f7f5] rounded-xl p-6">
                  <div className="space-y-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-200 last:border-0">
                        <span className="text-gray-600 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'history' && product.history && (
              <div>
                <h2 className="text-2xl font-serif mb-6">Historique</h2>
                <div className="relative">
                  <div className="absolute left-2 top-0 bottom-0 w-px bg-gray-200" />
                  <div className="space-y-8">
                    {product.history.map((event, index) => (
                      <div key={index} className="relative pl-10">
                        <div className={`absolute left-0 p-1 rounded-full ${
                          index === 0 ? 'bg-emerald-500' : 'bg-gray-200'
                        }`}>
                          <CheckCircle className={`h-4 w-4 ${
                            index === 0 ? 'text-white' : 'text-gray-500'
                          }`} />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <div className="font-medium">{event.event}</div>
                            <div className="text-sm text-gray-500">{event.date}</div>
                          </div>
                          <p className="text-sm text-gray-600">{event.location}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Reviews */}
          {product.reviews && (
            <div>
              <h2 className="text-2xl font-serif mb-6">Avis Clients</h2>
              <div className="space-y-6">
                <div className="bg-[#f8f7f5] rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-3xl font-light">{product.reviews.rating}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span 
                            key={i}
                            className={i < Math.floor(product.reviews.rating) ? 'text-yellow-400' : 'text-gray-300'}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {product.reviews.count} avis
                    </span>
                  </div>
                </div>

                {product.reviews.featured?.map((review, index) => (
                  <div key={index} className="bg-white rounded-xl border border-gray-100 p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={review.avatar}
                        alt={review.author}
                        className="h-10 w-10 rounded-full"
                      />
                      <div>
                        <div className="font-medium">{review.author}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(review.date).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <span 
                          key={i}
                          className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-600">{review.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Image Zoom Modal */}
      {showZoom && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <button
            onClick={() => setShowZoom(false)}
            className="absolute top-4 right-4 text-white"
          >
            <X className="h-6 w-6" />
          </button>
          <img
            src={product.images[selectedImage]}
            alt={product.name}
            className="max-w-full max-h-[90vh] object-contain"
          />
        </div>
      )}

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className=" fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-medium">Contacter le vendeur</h3>
              <button onClick={() => setShowContactForm(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="Votre message au vendeur..."
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Send className="h-4 w-4" />
                  <span>Envoyer</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}