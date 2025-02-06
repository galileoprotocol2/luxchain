import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type UserData = Database['public']['Tables']['users']['Insert'];

export const userService = {
  // Créer un nouvel utilisateur
  async createUser(userData: UserData) {
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Récupérer les données d'un utilisateur
  async getUserById(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('first_name, last_name, email, country, marketing_opt_in')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  },

  // Mettre à jour les données utilisateur
  async updateUser(userId: string, updates: Partial<UserData>) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}; 