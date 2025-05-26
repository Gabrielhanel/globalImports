import React, {createContext, useState, useEffect} from "react";
import api from "../services/Api";

export const CardProductContext = createContext({});

function CardProductProvider({children}) { 
    const [products, setProducts] = useState([]);

      useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response.data.products);
      } catch (error) {
        console.error("Erro ao buscar os produtos:", error);
      }
    };

    fetchData();
  }, []);

    return(
        <CardProductContext.Provider value={{products}}>
            {children}
        </CardProductContext.Provider>
    )
}
export default CardProductProvider;
