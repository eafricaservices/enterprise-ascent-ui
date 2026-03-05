import { createClient } from "@supabase/supabase-js";

// ─────────────────────────────────────────────────────────────
// Database type definitions (inlined to ensure reliable LS resolution)
// To regenerate after schema changes run:
//   npx supabase gen types typescript --project-id YOUR_PROJECT_REF \
//     --schema public >> src/lib/supabase.ts  (then replace this block)
// ─────────────────────────────────────────────────────────────

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          avatar_url: string | null;
          role: "admin" | "staff";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: "admin" | "staff";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: "admin" | "staff";
          created_at?: string;
          updated_at?: string;
        };
      };
      contact_submissions: {
        Row: {
          id: string;
          name: string;
          email: string;
          subject: string;
          message: string;
          status: Database["public"]["Enums"]["contact_status"];
          ip_address: string | null;
          user_agent: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          subject: string;
          message: string;
          status?: Database["public"]["Enums"]["contact_status"];
          ip_address?: string | null;
          user_agent?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          subject?: string;
          message?: string;
          status?: Database["public"]["Enums"]["contact_status"];
          ip_address?: string | null;
          user_agent?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      talent_applications: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          phone: string | null;
          country: string;
          city: string | null;
          role_applied_for: string;
          years_experience: number | null;
          skills: string[] | null;
          languages: string[] | null;
          cv_storage_path: string | null;
          loom_video_url: string | null;
          intro_video_path: string | null;
          terms_accepted: boolean;
          terms_accepted_at: string | null;
          status: Database["public"]["Enums"]["application_status"];
          interview_notes: string | null;
          placed_company: string | null;
          placed_at: string | null;
          ip_address: string | null;
          user_agent: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          email: string;
          phone?: string | null;
          country: string;
          city?: string | null;
          role_applied_for: string;
          years_experience?: number | null;
          skills?: string[] | null;
          languages?: string[] | null;
          cv_storage_path?: string | null;
          loom_video_url?: string | null;
          intro_video_path?: string | null;
          terms_accepted?: boolean;
          terms_accepted_at?: string | null;
          status?: Database["public"]["Enums"]["application_status"];
          interview_notes?: string | null;
          placed_company?: string | null;
          placed_at?: string | null;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          email?: string;
          phone?: string | null;
          country?: string;
          city?: string | null;
          role_applied_for?: string;
          years_experience?: number | null;
          skills?: string[] | null;
          languages?: string[] | null;
          cv_storage_path?: string | null;
          loom_video_url?: string | null;
          intro_video_path?: string | null;
          terms_accepted?: boolean;
          terms_accepted_at?: string | null;
          status?: Database["public"]["Enums"]["application_status"];
          interview_notes?: string | null;
          placed_company?: string | null;
          placed_at?: string | null;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      testimonials: {
        Row: {
          id: string;
          quote: string;
          author_name: string;
          author_title: string;
          avatar_url: string | null;
          row_group: 1 | 2;
          sort_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          quote: string;
          author_name: string;
          author_title: string;
          avatar_url?: string | null;
          row_group?: 1 | 2;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          quote?: string;
          author_name?: string;
          author_title?: string;
          avatar_url?: string | null;
          row_group?: 1 | 2;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      faqs: {
        Row: {
          id: string;
          question: string;
          answer: string;
          sort_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          question: string;
          answer: string;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          question?: string;
          answer?: string;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      pricing_plans: {
        Row: {
          id: string;
          tier: Database["public"]["Enums"]["pricing_tier"];
          name: string;
          price_display: string;
          price_unit: string;
          description: string;
          cta_label: string;
          is_featured: boolean;
          is_active: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          tier: Database["public"]["Enums"]["pricing_tier"];
          name: string;
          price_display: string;
          price_unit: string;
          description: string;
          cta_label?: string;
          is_featured?: boolean;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          tier?: Database["public"]["Enums"]["pricing_tier"];
          name?: string;
          price_display?: string;
          price_unit?: string;
          description?: string;
          cta_label?: string;
          is_featured?: boolean;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      pricing_plan_features: {
        Row: {
          id: string;
          plan_id: string;
          feature_text: string;
          sort_order: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          plan_id: string;
          feature_text: string;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          plan_id?: string;
          feature_text?: string;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
        };
      };
      client_logos: {
        Row: {
          id: string;
          company_name: string;
          logo_url: string | null;
          website_url: string | null;
          sort_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          company_name: string;
          logo_url?: string | null;
          website_url?: string | null;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          company_name?: string;
          logo_url?: string | null;
          website_url?: string | null;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      site_stats: {
        Row: {
          id: string;
          value_display: string;
          label: string;
          sort_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          value_display: string;
          label: string;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          value_display?: string;
          label?: string;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      impact_items: {
        Row: {
          id: string;
          icon_name: string;
          title: string;
          description: string;
          sort_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          icon_name: string;
          title: string;
          description: string;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          icon_name?: string;
          title?: string;
          description?: string;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      contact_status: "new" | "in_review" | "responded" | "closed";
      application_status:
        | "submitted"
        | "screening"
        | "interview"
        | "pooled"
        | "placed"
        | "rejected"
        | "withdrawn";
      pricing_tier: "pay_as_you_go" | "build_my_team" | "scale_large_team";
    };
    CompositeTypes: Record<string, never>;
  };
}

// ─────────────────────────────────────────────────────────────
// Environment variable validation
// ─────────────────────────────────────────────────────────────
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

const isMissingEnv = !supabaseUrl || !supabaseAnonKey;

if (isMissingEnv) {
  console.warn(
    "Missing Supabase environment variables. Database features will be unavailable.\n" +
      "To enable them, connect Lovable Cloud or set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY."
  );
}

// ─────────────────────────────────────────────────────────────
// Singleton Supabase client (creates a no-op client if env is missing)
// ─────────────────────────────────────────────────────────────
export const supabase = isMissingEnv
  ? (null as unknown as ReturnType<typeof createClient<Database>>)
  : createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });

// ─────────────────────────────────────────────────────────────
// Convenience type helpers
// ─────────────────────────────────────────────────────────────
export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type TablesInsert<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
export type TablesUpdate<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];
export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];

