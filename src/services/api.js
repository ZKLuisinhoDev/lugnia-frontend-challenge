import axios from 'axios';

const API_URL = 'https://api.fake-rest.refine.dev';

export const getProducts = async (page = 1, limit = 10) => {
  try {
    const _start = (page - 1) * limit;
    const _end = page * limit;

    // axios handles query parameters automatically with the 'params' config
    const response = await axios.get(`${API_URL}/products`, {
      params: {
        _start,
        _end
      }
    });

    return {
      data: response.data,
      totalCount: parseInt(response.headers['x-total-count'] || '0', 10)
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Get all products (for client-side filtering)
export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    
    return {
      data: response.data,
      totalCount: parseInt(response.headers['x-total-count'] || '0', 10)
    };
  } catch (error) {
    console.error('Error fetching all products:', error);
    throw error;
  }
};
