import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log('1. Début du callback de vérification');
        
        // Récupérer et traiter le hash de l'URL
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        
        console.log('2. Tokens trouvés:', { accessToken: !!accessToken, refreshToken: !!refreshToken });

        if (accessToken && refreshToken) {
          // Définir la session avec les tokens
          const { data: { session }, error: setSessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          });

          if (setSessionError) throw setSessionError;

          console.log('4. Session définie:', session);

          if (session?.user) {
            console.log('5. Utilisateur authentifié:', {
              id: session.user.id,
              email: session.user.email,
              metadata: session.user.user_metadata
            });
            
            const { user } = session;
            
            // Vérifier d'abord si l'utilisateur existe
            const { data: existingUser, error: fetchError } = await supabase
              .from('users')
              .select('*')
              .eq('id', user.id)
              .single();

            if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 = not found
              throw fetchError;
            }

            if (!existingUser) {
              // Créer l'utilisateur seulement s'il n'existe pas
              const userData = {
                id: user.id,
                email: user.email!,
                first_name: user.user_metadata.first_name,
                last_name: user.user_metadata.last_name,
                country: user.user_metadata.country,
                marketing_opt_in: user.user_metadata.marketing_opt_in
              };

              const { error: insertError } = await supabase
                .from('users')
                .insert([userData]);

              if (insertError) throw insertError;
            }

            // Rediriger vers le compte
            navigate('/account', { 
              state: { 
                justVerified: true,
                message: "Votre compte a été vérifié avec succès !"
              }
            });
          } else {
            console.log('10. Session définie mais pas d\'utilisateur');
            navigate('/login?error=verification');
          }
        } else {
          console.log('11. Pas de tokens dans l\'URL');
          navigate('/login?error=invalid-callback');
        }
      } catch (error) {
        console.error('12. Erreur globale:', error);
        navigate('/login?error=auth');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#f8f7f5] flex items-center justify-center">
      <div className="text-center">
        <div className="h-8 w-8 border-2 border-black/30 border-t-black rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Vérification de votre compte...</p>
      </div>
    </div>
  );
} 