import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/database.types"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseReady = Boolean(supabaseUrl && supabaseAnonKey)

export const supabase = isSupabaseReady
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : null

export async function getCurrentUser() {
  if (!supabase) return null
  const { data } = await supabase.auth.getUser()
  return data.user
}

export async function getCurrentUserWithProfile() {
  if (!supabase) return null
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) return null

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle()

  if (error) return { user, profile: null }
  return { user, profile }
}

export async function isAdmin() {
  if (!supabase) return false
  const result = await getCurrentUserWithProfile()
  return Boolean(result?.profile?.role === "admin")
}

export async function ensureCartForUser(userId: string) {
  if (!supabase) throw new Error("Supabase not configured")

  const { data: existing } = await supabase
    .from("carts")
    .select("id")
    .eq("user_id", userId)
    .maybeSingle()

  if (existing) return existing.id

  const { data: created, error } = await supabase
    .from("carts")
    .insert({ user_id: userId })
    .select("id")
    .single()

  if (error) throw error
  return created.id
}

/**
 * Anh xa hang products (snake_case DB) -> doi tuong camelCase giao dien dang su dung.
 * Giu cung cau truc store hien tai (ko lam vo UI).
 */
export function mapProduct(
  row: Database["public"]["Tables"]["products"]["Row"]
) {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    format: row.format_slug,
    category: row.shelf_slug,
    categoryName: row.category_name,
    price: row.price,
    rating: row.rating,
    sold: row.sold,
    isNew: row.is_new,
    hot: row.hot,
    color: row.color,
    tint: row.tint,
    image: row.image,
    description: row.description,
    tags: row.tags,
    notes: row.notes,
    stock: { 14: row.stock_floor_14, 20: row.stock_floor_20 },
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}
