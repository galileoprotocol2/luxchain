import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

console.log('Initialisation Supabase avec URL:', supabaseUrl);

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Auth helpers
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`
    }
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

// Products helpers
export const getProducts = async (filters?: {
  category?: string;
  status?: string;
  seller?: string;
}) => {
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

  if (filters?.seller) {
    query = query.eq('seller_id', filters.seller);
  }

  const { data, error } = await query;
  return { data, error };
};

export const getProduct = async (id: string) => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      seller:sellers(
        id,
        company_name,
        verified,
        rating,
        description,
        logo_url
      ),
      category:categories(
        id,
        name,
        slug
      ),
      certificate:certificates(
        blockchain_id,
        network,
        metadata
      )
    `)
    .eq('id', id)
    .single();

  return { data, error };
};

// Categories helpers
export const getCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  return { data, error };
};

// Sellers helpers
export const getSellers = async (filters?: { verified?: boolean }) => {
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
  return { data, error };
};

// Orders helpers
export const createOrder = async (orderData: {
  product_id: string;
  amount_usd: number;
  amount_eth?: number;
  payment_method: 'crypto' | 'card';
  shipping_address: Record<string, any>;
}) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('orders')
    .insert({
      buyer_id: user.id,
      ...orderData
    })
    .select()
    .single();

  return { data, error };
};

export const getOrders = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      product:products(*),
      seller:sellers(
        company_name,
        verified
      )
    `)
    .eq('buyer_id', user.id)
    .order('created_at', { ascending: false });

  return { data, error };
};