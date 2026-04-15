/**
 * Mappers to transform raw API responses into clean application models.
 * This separates network data format from the UI needs.
 */

/**
 * Normalizes a product from the API.
 * Fixes the common "decimal as thousands" issue in mock data.
 */
export const mapProductResponse = (rawProduct) => {
  const { price, category, ...rest } = rawProduct;
  
  // Business logic: normalize prices that arrive as decimals but represent thousands
  const normalizedPrice = price < 10 ? price * 1000 : price;

  return {
    ...rest,
    price: normalizedPrice,
    categoryId: category?.id,
    categoryName: category?.title || 'General',
  };
};

/**
 * Maps an array of products
 */
export const mapProductCollection = (rawCollection) => {
  return (rawCollection || []).map(mapProductResponse);
};
