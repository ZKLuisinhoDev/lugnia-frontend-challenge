import { useState, useEffect } from 'react';
import axios from 'axios';
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
        // Fetch both products and categories in parallel
        const [productsRes, categoriesRes] = await Promise.all([
          getProducts(page, limit),
          axios.get('https://api.fake-rest.refine.dev/categories').then(res => res.data)
        ]);

        if (isMounted) {
          // Create a lookup map for categories
          const categoryMap = categoriesRes.reduce((acc, cat) => {
            acc[cat.id] = cat.title;
            return acc;
          }, {});

          // Enrich products with category names
          const enrichedProducts = productsRes.data.map(product => ({
            ...product,
            categoryName: categoryMap[product.category?.id] || 'Otras'
          }));

          setProducts(enrichedProducts);
          setTotalCount(productsRes.totalCount);
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
