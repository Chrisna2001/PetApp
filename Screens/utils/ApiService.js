import {API_URL} from 'react-native-dotenv';

export const fetchData = async (endpoint, method = 'GET', body = null) => {
    try {
      console.log(API_URL);
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : null,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}:`, error.message);
      throw error;
    }
  };
  



//   fetchData('pet-profile/1', 'GET');  // Fetch pet details
// fetchData('pet-profile/create', 'POST', { petName: 'Buddy' });  // Create new pet