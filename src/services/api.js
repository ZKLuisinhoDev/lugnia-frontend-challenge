import axios from 'axios';
import { API_BASE_URL, ENDPOINTS } from '../constants/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

/**
 * Normalizes product data to fix "bad data" issues from the mock API.
 * Specifically handles the "1.999" price issue where thousands are represented as decimals.
 */
const normalizeProduct = (product) => {
  let normalizedPrice = product.price;

  // Logic: In this mock API, expensive items like TVs or laptops are often 
  // mistakenly sent as floats (e.g., 1.999 instead of 1999).
  // If the price is below 10 and category suggests higher value, or if it has exactly 3 decimals.
  if (normalizedPrice && normalizedPrice < 10) {
    normalizedPrice = normalizedPrice * 1000;
  }

  return {
    ...product,
    price: normalizedPrice,
    // Ensure categoryName is easily accessible
    categoryName: product.category?.title || 'General'
  };
};

/**
 * Fetches products with pagination and filter parameters
 */
export const fetchProducts = async (params = {}) => {
  try {
    const response = await api.get(ENDPOINTS.PRODUCTS, { params });
    const normalizedData = (response.data || []).map(normalizeProduct);
    
    return {
      data: normalizedData,
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
