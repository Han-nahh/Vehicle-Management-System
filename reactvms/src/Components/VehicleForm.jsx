import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VehicleForm = ({ vehicleId, closeForm, fetchVehicles }) => {
  const [vehicleName, setVehicleName] = useState('');
  const [status, setStatus] = useState('Active');

  useEffect(() => {
    if (vehicleId) {
        axios.get(`https://vehicle-management-system-be.onrender.com/api/vehicles/${vehicleId}`)
        .then((res) => {
          setVehicleName(res.data.vehicleName);
          setStatus(res.data.status);
        })
        .catch((err) => console.log(err));
    }
  }, [vehicleId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (vehicleId) {
      axios.put(`https://vehicle-management-system-be.onrender.com/api/vehicles/${vehicleId}`, { vehicleName, status })
        .then(() => {
          fetchVehicles();
          closeForm();
        })
        .catch((err) => console.log(err));
    } else {
      axios.post(`https://vehicle-management-system-be.onrender.com/api/vehicles`, { vehicleName, status })
        .then(() => {
          fetchVehicles();
          closeForm();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">{vehicleId ? 'Update Vehicle' : 'Add New Vehicle'}</h2>
      <div className="mb-4">
        <label htmlFor="vehicleName" className="block text-sm font-medium text-gray-700">Vehicle Name</label>
        <input
          type="text"
          id="vehicleName"
          value={vehicleName}
          onChange={(e) => setVehicleName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Under Maintenance">Under Maintenance</option>
        </select>
      </div>
      <div className="flex justify-between">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">{vehicleId ? 'Update' : 'Add'}</button>
        <button type="button" onClick={closeForm} className="bg-gray-500 text-white px-4 py-2 rounded-md">Cancel</button>
      </div>
    </form>
  );
};

export default VehicleForm;
