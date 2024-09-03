"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import 'tailwindcss/tailwind.css';

function App() {
  const [cars, setCars] = useState([]);
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [showAddCarModal, setShowAddCarModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const [allCars, setAllCars] = useState([]);
  
  const getCars = async () => {
    try {
      const res = await axios.get("http://localhost/cars/getcars.php");
      console.log("RES NAKO: ", res);
      if (Array.isArray(res.data)) {
        setAllCars(res.data);
        setCars(res.data);
      } else {
        setAllCars([]);
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };
  
  const addCar = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!make || !model || !year) {
      setModalMessage('Please complete all fields before submitting.');
      setShowAddCarModal(true);
      return;
    }

    try {
      const jsonData = {
        make: make,
        model: model,
        year: year,
      };
      const formData = new FormData();
      formData.append('json', JSON.stringify(jsonData));
      const res = await axios.post('http://localhost/cars/addcar.php', formData);
      console.log(res);
      if (res.data == 1) {
        toast.success('Car added successfully');
        getCars();
        setMake('');
        setModel('');
        setYear('');
        setShowAddCarModal(false);

      }
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  useEffect(() => {
    getCars();
  }, []);

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Car Show</h1>
      </div>

      <div className="flex">
        <div className="w-1/3 p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add New Car</h2>
          {modalMessage && <div className="mb-4 p-3 bg-red-100 text-red-800 border border-red-300 rounded">{modalMessage}</div>}
          <form onSubmit={addCar}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Car Make"
                value={make}
                onChange={e => setMake(e.target.value)}
                className="form-input rounded-md border-gray-300 shadow-sm w-full"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Car Model"
                value={model}
                onChange={e => setModel(e.target.value)}
                className="form-input rounded-md border-gray-300 shadow-sm w-full"
              />
            </div>
            <div className="mb-4">
              <input
                type="number"
                placeholder="Year"
                value={year}
                onChange={e => setYear(e.target.value)}
                className="form-input rounded-md border-gray-300 shadow-sm w-full"
              />
            </div>
            <button type='submit' className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              Add Car
            </button>
          </form>
        </div>

        <div className="w-2/3 ml-6">
          <table className="min-w-full divide-y divide-gray-200 bg-white rounded-lg shadow-md">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Make</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cars.map(car => (
                <tr key={car.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{car.make}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{car.model}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{car.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddCarModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white rounded-lg shadow-lg max-w-sm w-full">
            <div className="px-4 py-2 border-b border-gray-200 flex justify-between items-center">
              <h5 className="text-lg font-semibold">Add Car</h5>
              <button 
                type="button" 
                className="text-gray-500 hover:text-gray-700" 
                onClick={() => setShowAddCarModal(false)}
              >
                <span className="text-xl">&times;</span>
              </button>
            </div>
            <div className="px-4 py-4">
              {modalMessage && <div className="mb-4 p-3 bg-red-100 text-red-800 border border-red-300 rounded">{modalMessage}</div>}
              <form onSubmit={addCar}>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Car Make"
                    value={make}
                    onChange={e => setMake(e.target.value)}
                    className="form-input rounded-md border-gray-300 shadow-sm w-full"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Car Model"
                    value={model}
                    onChange={e => setModel(e.target.value)}
                    className="form-input rounded-md border-gray-300 shadow-sm w-full"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="number"
                    placeholder="Year"
                    value={year}
                    onChange={e => setYear(e.target.value)}
                    className="form-input rounded-md border-gray-300 shadow-sm w-full"
                  />
                </div>
                <button type='submit' className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  Add Car
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
