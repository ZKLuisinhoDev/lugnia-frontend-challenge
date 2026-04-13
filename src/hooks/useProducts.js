import { useState, useEffect } from 'react';
import { getProducts } from '../services/api';

export const useProducts = (page = 1, limit = 10) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const { data, totalCount } = await getProducts(page, limit);
        if (isMounted) {
          setProducts(data);
          setTotalCount(totalCount);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Ocurrió un error al cargar los productos');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [page, limit]);

  return { products, loading, error, totalCount };
};
