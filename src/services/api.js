import axios from 'axios';
import { API_BASE_URL, ENDPOINTS } from '../constants/api';
import { mapProductCollection } from '../utils/productMappers';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

/**
 * Fetches all products from the remote catalog
 */
export const fetchProducts = async (filters = {}) => {
  const response = await apiClient.get(ENDPOINTS.PRODUCTS, { params: filters });
  
  return {
    products: mapProductCollection(response.data),
    totalCount: parseInt(response.headers['x-total-count'] || '0', 10),
  };
};

/**
 * Fetches available categories for filtering
 */
export const fetchCategories = async () => {
  const response = await apiClient.get(ENDPOINTS.CATEGORIES);
  return response.data;
};

export default apiClient;
