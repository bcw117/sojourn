'use client';

import { useState } from 'react';
import {insert} from './actions';
import { useRouter } from 'next/navigation';

const ErrorModal = ({ message, onClose }: { message: string; onClose: () => void }) => (
  <div className="modal">
    <div className="modal-content">
      <h2>Error</h2>
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  </div>
);

export default function AccountCreation() {
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({
    location: '',
    gender: false,
    rentPrice: 0,
    rooms: 0,
    sharedRoomPreference: 0,
    washroomPreference: 0,
    address: '' 
  });

  const handleUserTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserType(e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;

    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const submissionData = {
      userType,
      ...formData
    };


    try {
      await insert(submissionData);
      //router.push('/preferences');
    } catch (error){
      if (error instanceof Error) {
        setErrorMessage(error.message);
        setShowError(true);
      } else {
        console.log('An unknown error occurred');
      }
    }
    console.log('Form submitted:', submissionData);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Finalize your Account!</h1>
      <h2> These options will dictate what is shown </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Location (City):</label>
          <input  
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-blue-200 border-blue-500 text-blue-800"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Gender:</label>
            <select
              value={userType}
              onChange={handleUserTypeChange}
              className="w-full p-2 border rounded bg-blue-200 border-blue-500 text-blue-800"
              required
            >
              <option value="true">Male</option>
              <option value="false">Female</option>
            </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">User Type:</label>
          <select
            value={userType}
            onChange={handleUserTypeChange}
            className="w-full p-2 border rounded bg-blue-200 border-blue-500 text-blue-800"
            required
          >
            <option value="">Select user type</option>
            <option value="sublet">Sublet</option>
            <option value="renter">Renter</option>
          </select>
        </div>

        {userType === 'sublet' && (
        <>
          <div className="mb-4">
            <label className="block mb-2">Rent Price:</label>
            <input
              type="number"
              name="rentPrice"
              value={formData.rentPrice}
              onChange={handleInputChange}
              className="w-full p-2 border rounded bg-blue-200 border-blue-500 text-blue-800"
              required
            />
          </div>
          <div className="mb-4">
          <label className="block mb-2">Address:</label>
          <input
            type="string"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-blue-200 border-blue-500 text-blue-800"
            required
          />
        </div>
        </>
          
        )}

        {userType === 'renter' && (
          <>
            <div className="mb-4">
              <label className="block mb-2">Rooms:</label>
              <input
                type="number"
                name="rooms"
                value={formData.rooms}
                onChange={handleInputChange}
                className="w-full p-2 border rounded bg-blue-200 border-blue-500 text-blue-800"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Are you fine with sharing a bedroom?</label>
              <select
                name="sharedRoomPreference"
                value={formData.sharedRoomPreference}
                onChange={handleInputChange}
                className="w-full p-2 border rounded bg-blue-200 border-blue-500 text-blue-800"
                required
              >
                <option value="">Select preference</option>
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Are you fine with sharing a washroom?</label>
              <select
                name="washroomPreference"
                value={formData.washroomPreference}
                onChange={handleInputChange}
                className="w-full p-2 border rounded bg-blue-200 border-blue-500 text-blue-800"
                required
              >
                <option value="">Select preference</option>
                <option value={0}>Private</option>
                <option value={1}>Shared</option>
              </select>
            </div>
          </>
        )}

        {showError && (
          <ErrorModal 
            message={errorMessage} 
            onClose={() => setShowError(false)} 
          />
        )}

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit!
        </button>
      </form>
    </div>
  );
}
