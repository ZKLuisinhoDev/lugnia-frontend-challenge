import { useState, useEffect } from 'react';
import { fetchCategories } from '../services/api';

/**
 * Custom hook for fetching and managing product categories.
 */
export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadCategories = async () => {
      setLoading(true);
      try {
        const data = await fetchCategories();
        if (isMounted) {
          setCategories(data || []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Error al cargar categorías');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  return { categories, loading, error };
};
