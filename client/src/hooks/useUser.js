import { useState, useEffect } from 'react';
import { getAuthToken } from '../utils/authApi';

/**
 * Hook to fetch and manage user data from /api/user endpoint
 * @returns {object} - { user, loading, error }
 */
export const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = getAuthToken();
        
        if (!token) {
          setError('No token found');
          setLoading(false);
          return;
        }

        const response = await fetch('https://evpass.pnglin.byenoob.com/api/user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUser(data.user);
        setError(null);
      } catch (err) {
        console.error('Error fetching user:', err);
        setError(err.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  console.log('useUser - user data:', user); // Debug log

  return { user, loading, error };
};
