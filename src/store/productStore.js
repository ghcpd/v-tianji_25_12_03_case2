import { create } from 'zustand'

const useProductStore = create((set, get) => ({
  products: [],
  isLoading: false,
  errorMessage: null,

  fetchProducts: async () => {
    set({ isLoading: true, errorMessage: null })
    try {
      const { getProducts } = await import('../services/product-api')
      const products = await getProducts()
      set({ products, isLoading: false })
    } catch (err) {
      set({ errorMessage: 'Failed to load products', isLoading: false })
    }
  },

  addProduct: async (productData) => {
    try {
      const { addProduct } = await import('../services/product-api')
      const newProduct = await addProduct(productData)
      set((state) => ({ products: [...state.products, newProduct] }))
    } catch (err) {
      set({ errorMessage: 'Failed to add product' })
    }
  },

  updateProduct: async (id, productData) => {
    try {
      const { updateProduct } = await import('../services/product-api')
      const updated = await updateProduct(id, productData)
      set((state) => ({
        products: state.products.map((p) => (p.id === id ? updated : p)),
      }))
    } catch (err) {
      set({ errorMessage: 'Failed to update product' })
    }
  },

  deleteProduct: async (id) => {
    try {
      const { removeProduct } = await import('../services/product-api')
      await removeProduct(id)
      set((state) => ({ products: state.products.filter((p) => p.id !== id) }))
    } catch (err) {
      set({ errorMessage: 'Failed to delete product' })
    }
  },
}))

export default useProductStore

