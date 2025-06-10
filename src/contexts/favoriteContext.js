import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem('@favorites');
      if (stored) setFavorites(JSON.parse(stored));
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('@favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(prev => prev.filter(id => id !== productId));
    } else {
      setFavorites(prev => [...prev, productId]);
    }
  };

  const isFavorite = (productId) => favorites.includes(productId);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};