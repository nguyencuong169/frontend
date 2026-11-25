import { defineStore } from "pinia"
import { ref, computed } from "vue"
import {
  isSupabaseReady,
  supabase,
  mapProduct,
} from "@/lib/supabase"
import type { Database } from "@/types/database.types"
import { seedProducts } from "@/data/products"
import { applyCatalogFilters } from "@/data/catalog"

type ProductRow = Database["public"]["Tables"]["products"]["Row"]
type ShelfRow = Database["public"]["Tables"]["shelves"]["Row"]
type FormatRow = Database["public"]["Tables"]["formats"]["Row"]

interface ProductUI {
  id: number
  slug: string
  name: string
  format: string
  category: string
  categoryName: string
  price: number
  rating: number
  sold: number
  isNew: boolean
  hot: boolean
  color: string
  tint: string
  image: string | null
  description: string
  tags: string[]
  notes: string[][]
  stock: { 14: number; 20: number }
  createdAt: string | null
  updatedAt: string | null
}

export const useProductStore = defineStore("product", () => {
  const products = ref<ProductUI[]>([])
  const categories = ref<string[]>([])
  const formats = ref<string[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const _initialized = ref(false)
  const quickProduct = ref<ProductUI | null>(null)
  const query = ref("")

  const bySlug = computed(() => (slug: string) =>
    products.value.find((p) => p.slug === slug) ?? null
  )

  const byCategory = computed(() => (slug: string) =>
    products.value.filter((p) => p.category === slug)
  )

  const filtered = computed(() => {
    const list = [...products.value]
    if (query.value) {
      const q = query.value.toLowerCase()
      return list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      )
    }
    return list
  })

  function useSeedFallback() {
    if (!products.value.length) products.value = seedProducts as ProductUI[]
    if (!categories.value.length) categories.value = [
      "snack-man", "do-cay", "ngot", "suc-khoe", "bua-nhanh", "do-uong",
    ]
    if (!formats.value.length) formats.value = [
      "chips", "noodles", "instant", "chocolate", "drinks", "spicy", "candy", "healthy",
    ]
  }

  async function init() {
    if (_initialized.value && products.value.length) return
    _initialized.value = true
    if (!isSupabaseReady) {
      useSeedFallback()
      loading.value = false
      return
    }
    loading.value = true
    error.value = null
    await Promise.all([fetchProducts(), fetchCategories(), fetchFormats()])
    useSeedFallback()
    loading.value = false
  }

  async function fetchProducts() {
    if (!isSupabaseReady) return
    const { data, error: err } = await supabase!
      .from("products")
      .select("*")
      .order("id", { ascending: true })
    if (err) {
      error.value = err.message
      if (!products.value.length) useSeedFallback()
    } else {
      products.value = (data || []).map((row: ProductRow) => mapProduct(row))
    }
  }

  async function fetchCategories() {
    if (!isSupabaseReady) return
    const { data, error: err } = await supabase!
      .from("shelves")
      .select("name")
      .order("name")
    if (err) {
      error.value = err.message
    } else {
      categories.value = (data || []).map((row: ShelfRow) => row.name)
    }
  }

  async function fetchFormats() {
    if (!isSupabaseReady) return
    const { data, error: err } = await supabase!
      .from("formats")
      .select("name")
      .order("name")
    if (err) {
      error.value = err.message
    } else {
      formats.value = (data || []).map((row: FormatRow) => row.name)
    }
  }

  function openQuick(product: ProductUI) {
    quickProduct.value = product
  }

  function closeQuick() {
    quickProduct.value = null
  }

  function setQuery(q: string) {
    query.value = q
  }

  return {
    products,
    categories,
    formats,
    loading,
    error,
    quickProduct,
    query,
    bySlug,
    byCategory,
    filtered,
    init,
    fetchProducts,
    fetchCategories,
    fetchFormats,
    openQuick,
    closeQuick,
    setQuery,
    useSeedFallback,
  }
})
