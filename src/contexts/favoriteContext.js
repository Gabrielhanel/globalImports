import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);


  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(prev => prev.filter(id => id !== productId));
    } else {
      setFavorites(prev => [...prev, productId]);
    }
  };

    function removeFavorite(productId) {
    setFavorites((prev) => prev.filter((id) => id !== productId));
  }

  const isFavorite = (productId) => favorites.includes(productId);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};