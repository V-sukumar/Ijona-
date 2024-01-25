// Dashboard.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Replace 'API_URL' with the actual API endpoint for fetching data
      const response = await fetch('API_URL');
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  const createData = async (newData) => {
    try {
      // Replace 'API_URL' with the actual API endpoint for creating data
      await fetch('API_URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });

      // Refetch data to update the table
      fetchData();
    } catch (error) {
      console.error('Error creating data:', error.message);
    }
  };

  const updateData = async (updatedData) => {
    try {
      // Replace 'API_URL' with the actual API endpoint for updating data
      await fetch(`API_URL/${selectedRow.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      // Refetch data to update the table
      fetchData();
      setSelectedRow(null); // Reset selected row after updating
    } catch (error) {
      console.error('Error updating data:', error.message);
    }
  };

  const deleteData = async () => {
    try {
      // Replace 'API_URL' with the actual API endpoint for deleting data
      await fetch(`API_URL/${selectedRow.id}`, {
        method: 'DELETE',
      });

      // Refetch data to update the table
      fetchData();
      setSelectedRow(null); // Reset selected row after deleting
    } catch (error) {
      console.error('Error deleting data:', error.message);
    }
  };

  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  return (
    <div>
      <h2>Welcome, {user.username}!</h2>
      <button type="button" onClick={logout}>
        Logout
      </button>

      {/* Display data in a table */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            {/* Add more columns as needed */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} onClick={() => handleRowClick(row)}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              {/* Add more cells as needed */}
              <td>Edit / Delete</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form for creating or updating data */}
      <form>
        {/* Add input fields for each property in your data */}
        <label>
          Name:
          <input
            type="text"
            value={selectedRow ? selectedRow.name : ''}
            onChange={(e) =>
              setSelectedRow({ ...selectedRow, name: e.target.value })
            }
          />
        </label>
        <br />
        {/* Add more input fields as needed */}
        <button type="button" onClick={() => (selectedRow ? updateData(selectedRow) : createData(selectedRow))}>
          {selectedRow ? 'Update' : 'Create'}
        </button>
        {selectedRow && (
          <button type="button" onClick={deleteData}>
            Delete
          </button>
        )}
      </form>
    </div>
  );
};

export default Dashboard;
