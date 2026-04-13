import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { getAllProducts } from '../services/api';

export const useProducts = (page = 1, limit = 12) => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    priceMin: 0,
    priceMax: Infinity
  });

  // Apply filters to products
  const applyFilters = useCallback(() => {
    let filtered = [...allProducts];

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(product =>
        product.name?.toLowerCase().includes(searchTerm) ||
        product.description?.toLowerCase().includes(searchTerm)
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(product =>
        product.category?.id === filters.category
      );
    }

    // Price filter
    if (filters.priceMin !== 0) {
      filtered = filtered.filter(product =>
        product.price >= filters.priceMin
      );
    }
    if (filters.priceMax !== Infinity) {
      filtered = filtered.filter(product =>
        product.price <= filters.priceMax
      );
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filtered.slice(startIndex, endIndex);

    setProducts(paginatedProducts);
    setTotalCount(filtered.length);
  }, [allProducts, filters, page, limit]);

  // Set filters
  const setFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Apply filters whenever they change
  useEffect(() => {
    if (allProducts.length > 0) {
      applyFilters();
    }
  }, [filters, allProducts, page, limit, applyFilters]);

  // Fetch products from API
  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const [productsRes, categoriesRes] = await Promise.all([
          getAllProducts(),
          axios.get('https://api.fake-rest.refine.dev/categories').then(res => res.data)
        ]);

        if (isMounted) {
          // Create a lookup map for categories
          const categoryMap = categoriesRes.reduce((acc, cat) => {
            acc[cat.id] = cat.title;
            return acc;
          }, {});

          // Enrich products with category names and images
          const enrichedProducts = productsRes.data.map(product => ({
            ...product,
            categoryName: categoryMap[product.category?.id] || 'Otras',
            image: product.image || `https://picsum.photos/id/${product.id}/400/400`
          }));

          setAllProducts(enrichedProducts);
          setTotalCount(productsRes.totalCount || enrichedProducts.length);
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
