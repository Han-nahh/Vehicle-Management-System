import React, {useState,useEffect} from 'react'
import DefLayout from '../Components/DefLayout'
import VehicleForm from '../Components/VehicleForm';
import axios from 'axios';
import { FaTh, FaList } from 'react-icons/fa'; 

const Home = () => {

  const [vehicles, setVehicles] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editVehicleId, setEditVehicleId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); 

  const fetchVehicles = async () => {
    console.log(process.env.REACT_APP_API_URL)
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/vehicles`);
      setVehicles(response.data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

   const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/vehicles/${vehicleToDelete}`);
      setIsDeleteModalOpen(false);
      fetchVehicles();
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setVehicleToDelete(null);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditVehicleId(null);
  };
  return (
    <DefLayout >
      <div className="bg-gray-50 min-h-screen py-4 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold font-playwrite text-gray-900 ml-14 mb-8">Vehicle Management Dashboard</h1>

        <div className="mb-6 ml-6 flex gap-6 items-center">
  <button
    onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
    className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300 flex items-center space-x-2 h-full"
  >
    {viewMode === 'grid' ? (
      <>
        <FaList /> 
        <span>List View</span>
      </>
    ) : (
      <>
        <FaTh /> 
        <span>Icon View</span>
      </>
    )}
  </button>

  <button
    onClick={() => {
      setIsFormOpen(true);
      setEditVehicleId(null);
    }}
    className="bg-blue-300 p-3 font-extrabold px-4 py-2 rounded-md hover:bg-green-400 h-full"
  >
    Add New Vehicle
  </button>
</div>

        {isFormOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <VehicleForm vehicleId={editVehicleId} closeForm={handleCloseForm} fetchVehicles={fetchVehicles} />
            </div>
          </div>
        )}

        {isDeleteModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Are you sure you want to delete this vehicle?</h2>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleCancelDelete}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 mx-10 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.map((vehicle) => (
              <div key={vehicle._id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <div className="relative">
                  <img
                    src="https://via.placeholder.com/300x200"
                    alt={vehicle.vehicleName}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-white px-4 py-2 rounded-full text-sm font-semibold text-gray-800">
                    {vehicle.status}
                  </div>
                </div>

                <div className="px-6 py-4">
                  <h3 className="text-xl font-bold text-gray-800">{vehicle.vehicleName}</h3>
                  <p className="text-gray-600 text-sm">Last Updated: {new Date(vehicle.lastUpdated).toLocaleDateString()}</p>
                </div>
                <div className="px-6 py-4 bg-gray-100">
                  <button
                    onClick={() => {
                      setIsFormOpen(true);
                      setEditVehicleId(vehicle._id);
                    }}
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setIsDeleteModalOpen(true);
                      setVehicleToDelete(vehicle._id);
                    }}
                    className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors duration-200 mt-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto mx-10 bg-white rounded-lg shadow-md">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left text-gray-700">Vehicle Name</th>
                  <th className="px-4 py-2 text-left text-gray-700">Status</th>
                  <th className="px-4 py-2 text-left text-gray-700">Last Updated</th>
                  <th className="px-4 py-2 text-left text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((vehicle) => (
                  <tr key={vehicle._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2 text-gray-800">{vehicle.vehicleName}</td>
                    <td className="px-4 py-2 text-gray-600">{vehicle.status}</td>
                    <td className="px-4 py-2 text-gray-600">{new Date(vehicle.lastUpdated).toLocaleDateString()}</td>
                    <td className="px-4 py-2 ">
                      <button
                        onClick={() => {
                          setIsFormOpen(true);
                          setEditVehicleId(vehicle._id);
                        }}
                        className="bg-blue-500 text-white py-2 px-4 mr-3 rounded-md hover:bg-blue-600 transition-colors duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setIsDeleteModalOpen(true);
                          setVehicleToDelete(vehicle._id);
                        }}
                        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-200 mt-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
    </DefLayout >
  )
}

export default Home