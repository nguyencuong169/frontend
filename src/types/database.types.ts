/**
 * Database types for Supabase (public schema).
 * Duplicates supabase/schema.sql + migrations 0001-0005.
 * Ten cot luu snake_case giong chinh xet trong PostgreSQL.
 */

export type Database = {
  public: {
    Tables: {
      shelves: {
        Row: {
          slug: string
          name: string
          tagline: string | null
          icon: string | null
          color: string | null
          formats: string[]
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          slug: string
          name: string
          tagline?: string | null
          icon?: string | null
          color?: string | null
          formats?: string[]
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          slug?: string
          name?: string
          tagline?: string | null
          icon?: string | null
          color?: string | null
          formats?: string[]
          created_at?: string | null
          updated_at?: string | null
        }
      }
      formats: {
        Row: {
          slug: string
          name: string
          icon: string
          color: string
          image: string
          photo_shows: string
          photo_keywords: string[]
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          slug: string
          name: string
          icon: string
          color: string
          image: string
          photo_shows: string
          photo_keywords?: string[]
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          slug?: string
          name?: string
          icon?: string
          color?: string
          image?: string
          photo_shows?: string
          photo_keywords?: string[]
          created_at?: string | null
          updated_at?: string | null
        }
      }
      products: {
        Row: {
          id: number
          slug: string
          name: string
          format_slug: string
          shelf_slug: string
          category_name: string
          price: number
          rating: number
          sold: number
          is_new: boolean
          hot: boolean
          color: string
          tint: string
          description: string
          tags: string[]
          notes: string[][]
          stock_floor_14: number
          stock_floor_20: number
          stock: number
          image: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          slug: string
          name: string
          format_slug: string
          shelf_slug: string
          category_name: string
          price: number
          rating?: number
          sold?: number
          is_new?: boolean
          hot?: boolean
          color: string
          tint: string
          description: string
          tags?: string[]
          notes?: string[][]
          stock_floor_14?: number
          stock_floor_20?: number
          stock?: number
          image?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          slug?: string
          name?: string
          format_slug?: string
          shelf_slug?: string
          category_name?: string
          price?: number
          rating?: number
          sold?: number
          is_new?: boolean
          hot?: boolean
          color?: string
          tint?: string
          description?: string
          tags?: string[]
          notes?: string[][]
          stock_floor_14?: number
          stock_floor_20?: number
          stock?: number
          image?: string | null
          updated_at?: string | null
        }
      }
      carts: {
        Row: {
          id: string
          user_id: string
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          created_at?: string | null
          updated_at?: string | null
        }
      }
      cart_items: {
        Row: {
          id: string
          cart_id: string
          product_id: number
          qty: number
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          cart_id: string
          product_id: number
          qty: number
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          cart_id?: string
          product_id?: number
          qty?: number
          created_at?: string | null
          updated_at?: string | null
        }
      }
      favorites: {
        Row: {
          id: string
          user_id: string
          product_id: number
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          product_id: number
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          product_id?: number
          created_at?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          floor: number
          role: string
          is_admin: boolean
          full_name: string | null
          avatar_url: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          floor?: number
          role?: string
          is_admin?: boolean
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          floor?: number
          role?: string
          is_admin?: boolean
          full_name?: string | null
          avatar_url?: string | null
          updated_at?: string | null
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          floor: number
          area_seat: string | null
          status: string
          total: number
          payment_method: string | null
          qr_code: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          floor: number
          area_seat?: string | null
          status?: string
          total?: number
          payment_method?: string | null
          qr_code?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          floor?: number
          area_seat?: string | null
          status?: string
          total?: number
          payment_method?: string | null
          qr_code?: string | null
          updated_at?: string | null
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: number
          qty: number
          price_snapshot: number
          created_at: string | null
        }
        Insert: {
          id?: string
          order_id: string
          product_id: number
          qty: number
          price_snapshot: number
          created_at?: string | null
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: number
          qty?: number
          price_snapshot?: number
          created_at?: string | null
        }
      }
      promotions: {
        Row: {
          id: string
          code: string
          title: string
          description: string
          discount_percent: number
          starts_at: string | null
          ends_at: string | null
          is_active: boolean
          usage_limit: number | null
          created_by: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          code: string
          title: string
          description?: string
          discount_percent: number
          starts_at?: string | null
          ends_at?: string | null
          is_active?: boolean
          usage_limit?: number | null
          created_by?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          code?: string
          title?: string
          description?: string
          discount_percent?: number
          starts_at?: string | null
          ends_at?: string | null
          is_active?: boolean
          usage_limit?: number | null
          created_by?: string | null
          updated_at?: string | null
        }
      }
      promotion_usage: {
        Row: {
          id: string
          promotion_id: string
          user_id: string
          used_at: string | null
        }
        Insert: {
          id?: string
          promotion_id: string
          user_id: string
          used_at?: string | null
        }
        Update: {
          id?: string
          promotion_id?: string
          user_id?: string
          used_at?: string | null
        }
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
    CompositeTypes: {}
  }
}
