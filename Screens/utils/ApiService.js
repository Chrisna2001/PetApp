import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL='https://9638-117-254-34-110.ngrok-free.app/';

// Token management functions
export const storeAuthToken = async token => {
  if (!token || typeof token !== 'string' || token.trim() === '') {
    console.warn('Invalid token. Not storing to AsyncStorage.');
    return false;
  }

  try {
    await AsyncStorage.setItem('auth_token', token);
    return true;
  } catch (error) {
    console.error('Error storing auth token:', error);
    return false;
  }
};

export const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem('auth_token');
    return token || '';
  } catch (error) {
    console.error('Error retrieving auth token:', error);
    return '';
  }
};

export const removeAuthToken = async () => {
  try {
    await AsyncStorage.removeItem('auth_token');
    return true;
  } catch (error) {
    console.error('Error removing auth token:', error);
    return false;
  }
};

// Custom fetch hook for API calls
export const useMutation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState (null);
  const [data, setData] = useState (null);

  const fetchData = async ({endpoint, method = 'GET', data = null}) => {
    setLoading(true);
    setError(null);

    try {
      // Get the auth token from AsyncStorage
      const token = await getAuthToken();
      console.log('Token:', token);
      const options = {
        method,
        headers: {
          // Include the token in headers with Bearer prefix
          Authorization: `Bearer ${token}`,
        },
      };

      if (data) {
        if (data instanceof FormData) {
          // For FormData, don't set Content-Type as the browser will set it with the boundary
          options.body = data;
        } else {
          options.headers = {
            ...options.headers,
            'Content-Type': 'application/json',
          };
          options.body = JSON.stringify(data);
        }
      }

      console.log("pasiing url--------->",`${API_URL}${endpoint}`)

      const response = await fetch(`${API_URL}${endpoint}`, options);
      const authHeader = response?.headers?.map?.authorization;
      if (authHeader) {
        const auth_token = authHeader.split(' ');
        if (auth_token.length > 1) {
          console.log('Auth Token:', auth_token[1]);
          await storeAuthToken(auth_token[1]);
        }
      }
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'An error occurred');
      }

      setData(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {fetchData, loading, error, data};
};






// usage of the above mutation is like this ------------------------------------------------------>

// const handleSubmit = async () => {
//   // Check if at least one field has data
//   if (!username && !email && !image) {
//     Alert.alert('Error', 'Please provide at least one field');
//     return;
//   }

//   try {
//     const formData = new FormData();

//     // Add username and email if provided
//     if (username) formData.append('username', username);
//     if (email) formData.append('email', email);

//     // Add image if selected
//     if (image) {
//       formData.append('profilePicture', {
//         uri: image,
//         name: 'image.jpg',
//         type: 'image/jpeg',
//       });
//     }

//     const response = await fetchData({
//       endpoint: 'users/updateProfile',
//       method: 'POST',
//       data: formData,
//     });

//     setImageUrl(response.profilePictureUrl);
//     Alert.alert('Success', 'Form submitted successfully!');
//   } catch (error) {
//     console.error('Upload error:', error);
//     Alert.alert('Error', 'Failed to submit form');
//   }
// };


// const loginData = {
//   email : email,
//   password
//     };




// const { fetchData, loading: uploading, data } = useMutation();