import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product, QuoteCartItem } from "../types";

interface QuoteContextType {
  items: QuoteCartItem[];
  addToQuote: (product: Product, quantity?: number, color?: string) => void;
  removeFromQuote: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearQuote: () => void;
  totalItemsCount: number;
  totalEstimatedPrice: number;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export const QuoteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // LocalStorage se saved items load karna
  const [items, setItems] = useState<QuoteCartItem[]>(() => {
    try {
      const saved = localStorage.getItem("saddat_quote_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Jab bhi items update hon, LocalStorage me save karna
  useEffect(() => {
    try {
      localStorage.setItem("saddat_quote_cart", JSON.stringify(items));
    } catch (e) {
      console.error("Quote save error", e);
    }
  }, [items]);

  // Product ko Quote me add karna
  const addToQuote = (product: Product, quantity = 1, color?: string) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          product,
          quantity,
          selectedColor: color || product.specs.colorOptions[0] || "Standard",
        },
      ];
    });
  };

  // Product ko remove karna
  const removeFromQuote = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Quantity update karna
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromQuote(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Clear All
  const clearQuote = () => setItems([]);

  // Total Quantity Calculation
  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Total PKR Price Calculation
  const totalEstimatedPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <QuoteContext.Provider
      value={{
        items,
        addToQuote,
        removeFromQuote,
        updateQuantity,
        clearQuote,
        totalItemsCount,
        totalEstimatedPrice,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
};

// Custom Hook taake kisi bhi component me asani se use ho sake
export const useQuote = () => {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error("useQuote must be used within a QuoteProvider");
  }
  return context;
};