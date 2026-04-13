import axios from 'axios';
import { API_BASE_URL, ENDPOINTS } from '../constants/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

/**
 * Fetches products with pagination and filter parameters
 */
export const fetchProducts = async (params = {}) => {
  try {
    const response = await api.get(ENDPOINTS.PRODUCTS, { params });
    return {
      data: response.data,
      total: parseInt(response.headers['x-total-count'] || '0', 10),
    };
  } catch (error) {
    console.error('API Error (fetchProducts):', error);
    throw error;
  }
};

/**
 * Fetches all available categories
 */
export const fetchCategories = async () => {
  try {
    const response = await api.get(ENDPOINTS.CATEGORIES);
    return response.data;
  } catch (error) {
    console.error('API Error (fetchCategories):', error);
    throw error;
  }
};

export default api;
