import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem } from '@/services/api';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
  itemCount: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id
          );
          
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          
          return {
            items: [...state.items, { product, quantity }],
          };
        });
      },
      
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },
      
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }));
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      total: () => {
        return get().items.reduce(
          (sum, item) => sum + (item.product.preco ?? 0) * item.quantity,
          0
        );
      },
      
      itemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
      version: 1,
      migrate: (persistedState: { items?: CartItem[] }) => {
        return {
          ...persistedState,
          items: (persistedState.items || []).map((item: CartItem) => ({
            ...item,
            product: {
              ...item.product,
              nome: item.product.nome || item.product.name,
              preco: item.product.preco || item.product.price || 0,
              descricao: item.product.descricao || item.product.description
            }
          }))
        };
      }
    }
  )
);
