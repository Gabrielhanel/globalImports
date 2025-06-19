import { createContext, useState } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addProduct(newItem) {
    // Verificar se o item já existe no carrinho
    const indexItem = cart.findIndex((item) => item.id === newItem.id);

    if (indexItem !== -1) {
      // se entrou aqui quer dizer que temos que adicionar +1 quantidade pois ele ja esta na sua lista
      let cartList = cart;
      cartList[indexItem].amount = cartList[indexItem].amount + 1;
      cartList[indexItem].total =
        cartList[indexItem].amount * cartList[indexItem].price;
      setCart(cartList);
      return;
    }

    //TODO: Ajustar a questão do amount
    let data = {
      ...newItem,
      amount: 1,
      total: newItem.price,
    };

    setCart((products) => [...products, data]);
  }

  function removeFromCart(productId) {
    setCart((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  }

    function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider value={{ cart, addProduct, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;