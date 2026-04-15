import { useState, useEffect, useMemo, useCallback } from 'react';
import { fetchProducts } from '../services/api';

/**
 * Custom hook for managing items in the shop. 
 * Handles client-side filtering and pagination.
 */
export const useProducts = (currentPage = 1, pageSize = 12) => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    priceMin: 0,
    priceMax: Infinity
  });

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch a large batch for client-side filtering demo
        const { products } = await fetchProducts({ _start: 0, _end: 200 });
        
        if (isMounted) {
          setAllProducts(products);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Error al conectar con el catálogo Sumaq');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => { isMounted = false; };
  }, []);

  /**
   * Filter and search logic
   */
  const filteredProducts = useMemo(() => {
    if (!allProducts.length) return [];

    return allProducts.filter(product => {
      const matchesSearch = !filters.search || 
        product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.description?.toLowerCase().includes(filters.search.toLowerCase());

      const matchesCategory = !filters.category || product.categoryId == filters.category;
      
      const matchesPrice = product.price >= filters.priceMin && product.price <= filters.priceMax;

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [allProducts, filters]);

  /**
   * Slice for pagination
   */
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, currentPage, pageSize]);

  const setFilter = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  return {
    products: paginatedProducts,
    loading,
    error,
    totalCount: filteredProducts.length,
    filters,
    setFilter
  };
};
