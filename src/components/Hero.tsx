import React from 'react';
import { ArrowRight, Shield, Wallet } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 z-0">
        <div className="relative h-full">
          <img
            src="https://images.unsplash.com/photo-1614786269829-d24616faf56d?auto=format&fit=crop&q=80"
            alt="Luxury watches"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>
      </div>
      
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-sans text-[9vw] sm:text-7xl md:text-8xl text-white font-light tracking-tight mb-8 leading-none">
              Le futur du
              <span className="block font-normal">luxe authentifié</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-white/80 mb-12 leading-relaxed font-light tracking-wide max-w-xl mx-auto">
              Une nouvelle ère pour les objets d'exception, où la blockchain 
              garantit l'authenticité de chaque pièce.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <button className="group w-full sm:w-auto flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-lg text-white border border-white/20 px-8 py-4 rounded-full text-sm font-light tracking-wide hover:bg-white/20 transition-all duration-300">
                <span>Explorer la collection</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              
              <button className="w-full sm:w-auto flex items-center justify-center space-x-3 bg-white text-black px-8 py-4 rounded-full text-sm font-light tracking-wide hover:bg-white/90 transition-all duration-300">
                <Wallet className="h-4 w-4" />
                <span>Vendre un objet</span>
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              {[
                { icon: Shield, label: 'Authentification blockchain' },
                { icon: Wallet, label: 'Paiement sécurisé en crypto' },
                { icon: ArrowRight, label: 'Livraison mondiale' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center space-y-3 text-white/60">
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span className="text-xs font-light tracking-wide text-center">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#f8f7f5] to-transparent z-10" />
    </div>
  );
}