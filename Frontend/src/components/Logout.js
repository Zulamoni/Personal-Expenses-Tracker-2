import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import authService from './authService';

const Logout = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false); // Optional loading state

  const handleLogout = async () => {
    setLoading(true); // Optional: Set loading state while logging out

    try {
      await authService.logout();
      history.push('/login'); // Redirect to login page after successful logout
    } catch (error) {
      console.error('Failed to logout:', error);
      // Handle error if needed
    } finally {
      setLoading(false); // Optional: Reset loading state
    }
  };

  return (
    <div>
      <h2>Logout</h2>
      <p>Are you sure you want to logout?</p>
      {/* Example of a confirmation dialog (can be styled or enhanced further) */}
      <button onClick={handleLogout} disabled={loading}>
        {loading ? 'Logging out...' : 'Logout'}
      </button>
    </div>
  );
};

export default Logout;
