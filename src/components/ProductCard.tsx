import React from 'react';
import { Shield, Clock, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.id}`, {
      state: { product } // Pass product data through navigation state
    });
  };

  return (
    <div 
      onClick={handleClick}
      className="card-zoom bg-white rounded-xl overflow-hidden cursor-pointer"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute top-4 right-4 flex space-x-2">
          {product.certificateId && (
            <div className="bg-black/80 backdrop-blur-sm rounded-full p-2" title="Certifié sur la blockchain">
              <Shield className="h-5 w-5 text-emerald-400" />
            </div>
          )}
          <button 
            className="bg-black/80 backdrop-blur-sm rounded-full p-2 text-white/80 hover:text-white transition-colors"
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click when clicking favorite
              // Handle favorite logic here
            }}
          >
            <Heart className="h-5 w-5" />
          </button>
        </div>
        
        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="flex items-center justify-between text-white mb-2">
            <h3 className="text-lg font-semibold font-serif">{product.name}</h3>
            <span className="text-sm font-medium uppercase tracking-wider opacity-80">
              {product.category}
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold">{product.price}</span>
              <span className="text-sm text-gray-500 uppercase">{product.currency}</span>
            </div>
            <div className="text-sm text-gray-500">
              ≈ {(product.price * 2500).toLocaleString('fr-FR')} €
            </div>
          </div>
          
          {product.status === 'pending' ? (
            <div className="flex items-center text-amber-600">
              <Clock className="h-4 w-4 mr-1" />
              <span className="text-sm">En attente</span>
            </div>
          ) : (
            <button 
              className="px-4 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors"
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click when clicking buy
                handleClick(); // Still navigate to product page
              }}
            >
              Acheter
            </button>
          )}
        </div>
      </div>
    </div>
  );
}