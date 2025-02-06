import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface ProductState {
  products: any[];
  categories: any[];
  isLoading: boolean;
  error: Error | null;
  fetchProducts: (filters?: { category?: string; status?: string }) => Promise<void>;
  fetchCategories: () => Promise<void>;
  createProduct: (productData: any) => Promise<void>;
  updateProduct: (id: string, updates: any) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  categories: [],
  isLoading: false,
  error: null,

  fetchProducts: async (filters) => {
    set({ isLoading: true });
    try {
      let query = supabase
        .from('products')
        .select(`
          *,
          seller:sellers(
            id,
            company_name,
            verified,
            rating
          ),
          category:categories(
            id,
            name,
            slug
          ),
          certificate:certificates(
            blockchain_id,
            network
          )
        `);

      if (filters?.category) {
        query = query.eq('category.slug', filters.category);
      }

      if (filters?.status) {
        query = query.eq('status', filters.status);
      }

      const { data, error } = await query;
      if (error) throw error;

      set({ products: data || [], isLoading: false });
    } catch (error) {
      set({ error: error as Error, isLoading: false });
    }
  },

  fetchCategories: async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;
      set({ categories: data });
    } catch (error) {
      set({ error: error as Error });
    }
  },

  createProduct: async (productData) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert(productData)
        .select()
        .single();

      if (error) throw error;

      set(state => ({
        products: [...state.products, data]
      }));
    } catch (error) {
      set({ error: error as Error });
    }
  },

  updateProduct: async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      set(state => ({
        products: state.products.map(p => p.id === id ? data : p)
      }));
    } catch (error) {
      set({ error: error as Error });
    }
  },

  deleteProduct: async (id) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;

      set(state => ({
        products: state.products.filter(p => p.id !== id)
      }));
    } catch (error) {
      set({ error: error as Error });
    }
  }
}));