// import React, { createContext, useContext, useEffect, useState } from "react";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState(() => {
//     const saved = localStorage.getItem("cartItems");
//     return saved ? JSON.parse(saved) : [];
//   });

//   // 👇 drawer open/close state
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   useEffect(() => {
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
//   }, [cartItems]);

//   const addToCart = (item) => {
//     setCartItems((prev) => {
//       const existing = prev.find((p) => p.id === item.id);
//       if (existing) {
//         return prev.map((p) =>
//           p.id === item.id
//             ? { ...p, quantity: (p.quantity || 1) + (item.quantity || 1) }
//             : p
//         );
//       }
//       return [...prev, { ...item, quantity: item.quantity || 1 }];
//     });
//   };

//   const removeFromCart = (id) =>
//     setCartItems((prev) => prev.filter((i) => i.id !== id));

//   const clearCart = () => setCartItems([]);

//   // 👇 control functions for the drawer
//   const openCart = () => setIsCartOpen(true);
//   const closeCart = () => setIsCartOpen(false);
//   const toggleCart = () => setIsCartOpen((v) => !v);

//   const value = {
//     cartItems,
//     addToCart,
//     removeFromCart,
//     clearCart,
//     isCartOpen,
//     openCart,
//     closeCart,
//     toggleCart,
//   };

//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// };

// export const useCart = () => useContext(CartContext);
// export default CartContext;
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext();

function keyOf(item) {
  // Ensure we separate items from different collections (products, sealed_inventory, new_products)
  return `${item.id}::${item.collection || "products"}`;
}

function clampQty(qty, available) {
  const max = Number.isFinite(available) ? Number(available) : Infinity;
  return Math.max(1, Math.min(Number(qty || 1), max));
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    const data = saved ? JSON.parse(saved) : [];
    // Backfill legacy items without collection/available
    return data.map((i) => ({
      ...i,
      collection: i.collection || "products",
      available: Number.isFinite(i.available) ? i.available : Infinity,
      quantity: clampQty(i.quantity || 1, i.available),
      _key: keyOf(i),
    }));
  });

  // Drawer state
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Persist
  useEffect(() => {
    // strip internal _key before saving
    const toSave = cartItems.map(({ _key, ...rest }) => rest);
    localStorage.setItem("cartItems", JSON.stringify(toSave));
  }, [cartItems]);

  const addToCart = (incoming) => {
    const item = {
      ...incoming,
      collection: incoming.collection || "products",
      available: Number.isFinite(incoming.available) ? incoming.available : Infinity,
    };
    const incQty = Number(incoming.quantity || 1);
    const k = keyOf(item);

    setCartItems((prev) => {
      const existing = prev.find((p) => p._key === k);
      if (existing) {
        const nextQty = clampQty(existing.quantity + incQty, existing.available);
        return prev.map((p) => (p._key === k ? { ...p, quantity: nextQty } : p));
      }
      const firstQty = clampQty(incQty, item.available);
      return [...prev, { ...item, quantity: firstQty, _key: k }];
    });
  };

  const removeFromCart = (id, collection) => {
    // If collection is provided, remove that specific keyed item.
    // If not provided, remove any cart entries that match the id (across collections).
    if (collection) {
      const k = `${id}::${collection}`;
      setCartItems((prev) => prev.filter((i) => i._key !== k));
    } else {
      setCartItems((prev) => prev.filter((i) => i.id !== id));
    }
  };

  const clearCart = () => setCartItems([]);

  const setItemQty = (id, collection = "products", qty) => {
    const k = `${id}::${collection}`;
    setCartItems((prev) =>
      prev.map((i) =>
        i._key === k ? { ...i, quantity: clampQty(qty, i.available) } : i
      )
    );
  };

  const increment = (id, collection = "products", step = 1) => {
    const k = `${id}::${collection}`;
    setCartItems((prev) =>
      prev.map((i) =>
        i._key === k
          ? { ...i, quantity: clampQty(i.quantity + step, i.available) }
          : i
      )
    );
  };

  const decrement = (id, collection = "products", step = 1) => {
    const k = `${id}::${collection}`;
    setCartItems((prev) =>
      prev
        .map((i) =>
          i._key === k
            ? { ...i, quantity: clampQty(i.quantity - step, i.available) }
            : i
        )
        // Optional: remove if quantity drops to 0 (we clamp min=1, so this won’t fire unless you change clamp)
        .filter((i) => i.quantity > 0)
    );
  };

  // Derived
  const itemCount = useMemo(
    () => cartItems.reduce((sum, i) => sum + (Number(i.quantity) || 0), 0),
    [cartItems]
  );

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, i) => sum + (Number(i.price || 0) * Number(i.quantity || 0)),
        0
      ),
    [cartItems]
  );

  // Drawer controls
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((v) => !v);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    setItemQty,
    increment,
    decrement,
    itemCount,
    subtotal,
    isCartOpen,
    openCart,
    closeCart,
    toggleCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
export default CartContext;
