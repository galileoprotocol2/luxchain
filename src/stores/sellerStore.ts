import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface SellerState {
  sellers: any[];
  isLoading: boolean;
  error: Error | null;
  fetchSellers: (filters?: { verified?: boolean }) => Promise<void>;
  createSeller: (sellerData: any) => Promise<void>;
  updateSeller: (id: string, updates: any) => Promise<void>;
}

export const useSellerStore = create<SellerState>((set) => ({
  sellers: [],
  isLoading: false,
  error: null,

  fetchSellers: async (filters) => {
    set({ isLoading: true });
    try {
      let query = supabase
        .from('sellers')
        .select(`
          *,
          user:users(
            first_name,
            last_name,
            avatar_url
          )
        `);

      if (filters?.verified !== undefined) {
        query = query.eq('verified', filters.verified);
      }

      const { data, error } = await query;
      if (error) throw error;

      set({ sellers: data || [], isLoading: false });
    } catch (error) {
      set({ error: error as Error, isLoading: false });
    }
  },

  createSeller: async (sellerData) => {
    try {
      const { data, error } = await supabase
        .from('sellers')
        .insert(sellerData)
        .select()
        .single();

      if (error) throw error;

      set(state => ({
        sellers: [...state.sellers, data]
      }));
    } catch (error) {
      set({ error: error as Error });
    }
  },

  updateSeller: async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from('sellers')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      set(state => ({
        sellers: state.sellers.map(s => s.id === id ? data : s)
      }));
    } catch (error) {
      set({ error: error as Error });
    }
  }
}));