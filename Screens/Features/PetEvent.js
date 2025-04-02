import React, { useState } from 'react';

const PetEvent = () => {
  const [eventData, setEventData] = useState({
    petName: '',
    eventType: 'vet',
    date: '',
    time: '',
    notes: '',
  });
  
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Event submitted:', eventData);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setEventData({
        petName: '',
        eventType: 'vet',
        date: '',
        time: '',
        notes: '',
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Add Pet Event</h2>
      
      {submitted ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Event successfully added!
        </div>
      ) : null}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="petName">
            Pet Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="petName"
            name="petName"
            type="text"
            placeholder="Enter pet name"
            value={eventData.petName}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventType">
            Event Type
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="eventType"
            name="eventType"
            value={eventData.eventType}
            onChange={handleChange}
            required
          >
            <option value="vet">Vet Appointment</option>
            <option value="grooming">Grooming</option>
            <option value="medication">Medication</option>
            <option value="walk">Walk</option>
            <option value="feeding">Feeding Schedule</option>
            <option value="training">Training</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
            Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="date"
            name="date"
            type="date"
            value={eventData.date}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">
            Time
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="time"
            name="time"
            type="time"
            value={eventData.time}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="notes">
            Notes
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="notes"
            name="notes"
            rows="3"
            placeholder="Add any additional details"
            value={eventData.notes}
            onChange={handleChange}
          ></textarea>
        </div>
        
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            Add Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default PetEvent;