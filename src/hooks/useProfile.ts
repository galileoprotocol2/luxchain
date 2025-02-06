import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { userService } from '../services/userService';
import type { Database } from '../lib/database.types';

type UserProfile = Database['public']['Tables']['users']['Row'];

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadProfile() {
      if (!user?.id) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        const data = await userService.getUserById(user.id);
        setProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load profile'));
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [user]);

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user?.id) throw new Error('User not authenticated');
    
    try {
      const updatedProfile = await userService.updateUser(user.id, updates);
      setProfile(updatedProfile);
      return updatedProfile;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update profile');
    }
  };

  return { profile, loading, error, updateProfile };
} 