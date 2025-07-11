import { createContext, useState } from "react";
import api from "../services/Api";
export const CartContext = createContext();
import { useAuth } from "./AuthContext";

function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
async function addProduct(newItem) {
  if (!user) {
    throw new Error("User not logged in");
  }

  try {
    const response = await fetch("http://localhost:3000/orders/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        ...newItem
      }),
    });
    const data = await response.json();
    setCart(data.cart);
  } catch (error) {
    console.error("Erro ao adicionar produto ao carrinho", error);
  }
}

async function removeFromCart(productId) {
  try {
    await api.delete(`/orders/cart/${user.id}/${productId}`);
    setCart((prev) => prev.filter((item) => item.id !== productId));
  } catch (err) {
    console.error("Erro ao remover item", err);
  }
}

    function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider value={{ cart, setCart,addProduct, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;