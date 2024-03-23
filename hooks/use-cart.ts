import { CartItem, Product } from "@/types";
import { it } from "node:test";
import toast from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CartStore {
  cartItems: CartItem[];
  addItem: (data: CartItem) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
  removeItemQuantity: (id: string) => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      cartItems: [],
      addItem: (data: CartItem) => {
        const currentItems = get().cartItems;

        const index = currentItems.findIndex(
          (item) => item.product.id === data.product.id,
        );
        if (index !== -1) {
          currentItems[index].quantity += 1;
          set({ cartItems: [...currentItems] });
          return toast("Item already in cart.", {
            icon: "🛒",
            style: {
              borderRadius: "12px",
              backgroundImage:
                "linear-gradient(315deg, #A355F6 15%, #2B62EB 90%)",
              color: "#fff",
            },
          });
        }

        set({ cartItems: [...get().cartItems, data] });

        toast("Item added to cart.", {
          icon: "🛒",
          style: {
            borderRadius: "12px",
            backgroundImage:
              "linear-gradient(315deg, #A355F6 15%, #2B62EB 90%)",
            color: "#fff",
          },
        });
      },
      removeItem: (id: string) => {
        set({
          cartItems: [
            ...get().cartItems.filter((item) => item.product.id !== id),
          ],
        });
        toast("Item removed from cart.", {
          icon: "🛒",
          style: {
            borderRadius: "12px",
            backgroundImage:
              "linear-gradient(315deg, #A355F6 15%, #2B62EB 90%)",
            color: "#fff",
          },
        });
      },
      removeAll: () => set({ cartItems: [] }),
      removeItemQuantity: (id: string) => {
        const currentItems = get().cartItems;
        const index = currentItems.findIndex((item) => item.product.id === id);
        if (index !== -1) {
          if (currentItems[index].quantity > 1) {
            currentItems[index].quantity -= 1;
            set({ cartItems: [...currentItems] });
            return toast("Item quantity decreased.", {
              icon: "🛒",
              style: {
                borderRadius: "12px",
                backgroundImage:
                  "linear-gradient(315deg, #A355F6 15%, #2B62EB 90%)",
                color: "#fff",
              },
            });
          }
          set({
            cartItems: [
              ...get().cartItems.filter((item) => item.product.id !== id),
            ],
          });
        }
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
export default useCart;
