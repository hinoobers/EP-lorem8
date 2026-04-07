/**
 * Make authenticated API requests with JWT token
 * The token is automatically included in the Authorization header
 */

export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const setAuthToken = (token) => {
  localStorage.setItem('authToken', token);
};

export const clearAuthToken = () => {
  localStorage.removeItem('authToken');
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('authToken');
};

/**
 * Make an authenticated fetch request
 * @param {string} url - The API endpoint URL
 * @param {object} options - Fetch options (method, body, etc.)
 * @returns {Promise} - The fetch promise
 */
export const authenticatedFetch = (url, options = {}) => {
  const token = getAuthToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return fetch(url, {
    ...options,
    headers,
  });
};

/**
 * Example usage in a component:
 * 
 * import { authenticatedFetch, getAuthToken } from '../utils/authApi'
 * 
 * const fetchUserData = async () => {
 *   try {
 *     const response = await authenticatedFetch('/api/user');
 *     const data = await response.json();
 *     console.log(data);
 *   } catch (error) {
 *     console.error('Error:', error);
 *   }
 * }
 */
