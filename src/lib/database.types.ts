export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          first_name: string;
          last_name: string;
          email: string;
          country: string;
          marketing_opt_in: boolean;
          created_at: string;
        };
        Insert: {
          first_name: string;
          last_name: string;
          email: string;
          country: string;
          marketing_opt_in?: boolean;
        };
      };
      // Autres tables...
    };
  };
} 