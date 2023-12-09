import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HistoryPage = () => {
  const [historyItems, setHistoryItems] = useState([]);
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    if (!token) {
      console.error('JWT token not found in local storage.');
      // Redirect the user to the unauthorized page or login page
      navigate('/unauthorized'); // Replace '/unauthorized' with the actual path of your unauthorized page
      return;
    }

    if (username) {
      fetch(`https://localhost:7107/api/history?username=${encodeURIComponent(username)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => setHistoryItems(data))
        .catch(error => console.error('Error fetching filter history:', error));
    }
  }, [token, username, navigate]);

  const handleHistoryItemClick = (item) => {
    navigate(`/dashboard2`, { state: { filterHistory: item } });
  };

  const handleDeleteClick = (id) => {
    // Send a DELETE request to remove the item from the database
    fetch(`https://localhost:7107/api/history/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Remove the deleted item from the local state
        setHistoryItems(prevItems => prevItems.filter(item => item.id !== id));
      })
      .catch(error => console.error('Error deleting filter history:', error));
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f4f4' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Filter History</h2>
        <Link to="/dashboard">
          <button style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none' }}>
            Back
          </button>
        </Link>
      </div>
      {historyItems.length > 0 ? (
        <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Category</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Genre Name</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {historyItems.map(item => (
              <tr key={item.id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.category}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.genreName}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  <button
                    onClick={() => handleHistoryItemClick(item)}
                    style={{
                      backgroundColor: '#28a745',
                      color: '#fff',
                      padding: '5px 10px',
                      border: 'none',
                      marginRight: '5px',
                    }}
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDeleteClick(item.id)}
                    style={{
                      backgroundColor: '#dc3545',
                      color: '#fff',
                      padding: '5px 10px',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                    title="Delete"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No filter history available.</p>
      )}
    </div>
  );
};

export default HistoryPage;
