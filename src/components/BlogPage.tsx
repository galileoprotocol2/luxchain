import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Clock, User, ArrowRight, TrendingUp, Shield, Wallet } from 'lucide-react';

const categories = [
  { id: 'all', label: 'Tous les articles' },
  { id: 'market', label: 'Analyses du Marché' },
  { id: 'blockchain', label: 'Blockchain & NFTs' },
  { id: 'watches', label: 'Montres' },
  { id: 'cars', label: 'Voitures' },
  { id: 'jewelry', label: 'Joaillerie' }
];

const featuredArticles = [
  {
    id: '1',
    title: 'La Blockchain Révolutionne l\'Authentification des Produits de Luxe',
    excerpt: 'Comment la technologie blockchain transforme la traçabilité et la certification des objets de luxe.',
    category: 'blockchain',
    image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80',
    author: {
      name: 'Sophie Martin',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=48&h=48&q=80'
    },
    date: '2024-03-15',
    readTime: '8 min'
  },
  {
    id: '2',
    title: 'Tendances du Marché des Montres de Luxe en 2024',
    excerpt: 'Analyse des tendances et prévisions pour le marché des montres de collection.',
    category: 'market',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80',
    author: {
      name: 'Jean Dupont',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=48&h=48&q=80'
    },
    date: '2024-03-14',
    readTime: '6 min'
  },
  {
    id: '3',
    title: 'Guide Complet des NFTs dans le Luxe',
    excerpt: 'Tout ce que vous devez savoir sur les certificats d\'authenticité blockchain.',
    category: 'blockchain',
    image: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28?auto=format&fit=crop&q=80',
    author: {
      name: 'Marie Bernard',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=48&h=48&q=80'
    },
    date: '2024-03-13',
    readTime: '10 min'
  }
];

const trendingTopics = [
  { label: 'NFTs', count: 28 },
  { label: 'Rolex', count: 24 },
  { label: 'Ferrari', count: 19 },
  { label: 'Cartier', count: 15 },
  { label: 'Ethereum', count: 12 }
];

export function BlogPage() {
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[40vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80"
            alt="Blog Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-serif mb-4">
              Blog & Éducation
            </h1>
            <p className="text-xl text-white/80 font-light">
              Découvrez nos articles sur le luxe, la blockchain et les tendances du marché.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Articles Column */}
          <div className="flex-1">
            {/* Search & Filters */}
            <div className="mb-8 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un article..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black focus:border-black transition-colors"
                />
              </div>

              <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Articles */}
            <div className="space-y-12">
              {featuredArticles.map((article) => (
                <article key={article.id} className="group">
                  <Link to={`/blog/${article.id}`} className="block">
                    <div className="aspect-[2/1] rounded-xl overflow-hidden mb-6">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="capitalize">{article.category}</span>
                        <span>·</span>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                      <h2 className="text-2xl font-serif group-hover:text-gray-600 transition-colors">
                        {article.title}
                      </h2>
                      <p className="text-gray-600">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img
                            src={article.author.avatar}
                            alt={article.author.name}
                            className="h-8 w-8 rounded-full"
                          />
                          <span className="text-sm text-gray-600">{article.author.name}</span>
                        </div>
                        <time className="text-sm text-gray-500">
                          {new Date(article.date).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </time>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 space-y-8">
            {/* Trending Topics */}
            <div className="bg-[#f8f7f5] rounded-xl p-6">
              <h3 className="text-lg font-medium mb-4">Sujets Tendances</h3>
              <div className="space-y-2">
                {trendingTopics.map((topic) => (
                  <button
                    key={topic.label}
                    className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-white/50 transition-colors"
                  >
                    <span className="text-sm">{topic.label}</span>
                    <span className="text-sm text-gray-500">{topic.count} articles</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Resources */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Ressources</h3>
              {[
                {
                  title: 'Guide Blockchain & NFTs',
                  description: 'Comprendre la technologie blockchain',
                  icon: Shield
                },
                {
                  title: 'Analyses du Marché',
                  description: 'Tendances et prévisions',
                  icon: TrendingUp
                },
                {
                  title: 'Guide des Paiements',
                  description: 'Crypto & méthodes traditionnelles',
                  icon: Wallet
                }
              ].map((resource) => (
                <Link
                  key={resource.title}
                  to={`/blog/guides/${resource.title.toLowerCase().replace(/ /g, '-')}`}
                  className="flex items-center space-x-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors"
                >
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <resource.icon className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">{resource.title}</h4>
                    <p className="text-sm text-gray-600">{resource.description}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}