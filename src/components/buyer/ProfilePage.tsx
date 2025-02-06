import React, { useState } from 'react';
import { useProfile } from '../../hooks/useProfile';

export function ProfilePage() {
  const { profile, loading, error, updateProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error.message}</div>;
  if (!profile) return <div>Profil non trouvé</div>;

  const handleUpdateNewsletter = async (newValue: boolean) => {
    try {
      await updateProfile({ marketing_opt_in: newValue });
      // Afficher un message de succès
    } catch (error) {
      // Gérer l'erreur
    }
  };

  // ... reste du composant
} 