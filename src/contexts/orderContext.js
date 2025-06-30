import { createContext, useState } from "react";
import api from "../services/Api";
import { useAuth } from "./AuthContext";
export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {

  const { user } = useAuth();
  const [order, setOrder] = useState([]);

async function addOrder(newOrder) {
  try {
    const response = await api.post("/orders", { userId: user.id, newOrder });
    setOrder((orders) => [...orders, response.data.order]); // ou conforme sua API
  } catch (error) {
    console.error("Erro ao adicionar pedido", error);
  }
}
  return (
    <OrderContext.Provider value={{ order, addOrder, setOrder }}>
      {children}
    </OrderContext.Provider>
  );
};