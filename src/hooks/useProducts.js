import { useState, useEffect, useMemo, useCallback } from 'react';
import { fetchProducts, fetchCategories } from '../services/api';

/**
 * Custom hook for managing products, including fetching, filtering, and pagination.
 */
export const useProducts = (page = 1, limit = 12) => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    priceMin: 0,
    priceMax: Infinity
  });

  // Fetch initial data
  useEffect(() => {
    let isMounted = true;

    const loadInitialData = async () => {
      setLoading(true);
      setError(null);

      try {
        // We fetch all products and categories for client-side filtering/pagination
        // in a real app, filtering should be done server-side if data is large.
        const [productsRes, categoriesRes] = await Promise.all([
          fetchProducts({ _start: 0, _end: 1000 }), // Fetching a larger batch for client-side demo
          fetchCategories()
        ]);

        if (isMounted) {
          const categoryMap = (categoriesRes || []).reduce((acc, cat) => {
            acc[cat.id] = cat.title;
            return acc;
          }, {});

          const enrichedProducts = (productsRes.data || []).map(product => ({
            ...product,
            categoryName: categoryMap[product.category?.id] || 'Otras',
            image: product.image?.url || `https://picsum.photos/id/${product.id}/500/500`
          }));

          setAllProducts(enrichedProducts);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Error al cargar los productos');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadInitialData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Compute filtered products directly during render (Solves react-doctor error)
  const filteredProducts = useMemo(() => {
    if (!allProducts.length) return [];

    let result = [...allProducts];

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(p => 
        p.name?.toLowerCase().includes(searchTerm) || 
        p.description?.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.category) {
      result = result.filter(p => p.category?.id === filters.category);
    }

    if (filters.priceMin > 0) {
      result = result.filter(p => p.price >= filters.priceMin);
    }

    if (filters.priceMax < Infinity) {
      result = result.filter(p => p.price <= filters.priceMax);
    }

    return result;
  }, [allProducts, filters]);

  // Compute current page products
  const products = useMemo(() => {
    const start = (page - 1) * limit;
    return filteredProducts.slice(start, start + limit);
  }, [filteredProducts, page, limit]);

  const totalCount = filteredProducts.length;

  const setFilter = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  return {
    products,
    loading,
    error,
    totalCount,
    filters,
    setFilter
  };
};
