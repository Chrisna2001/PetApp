import {API_URL} from 'react-native-dotenv';

export const fetchImageData = async (
  endpoint,
  method = 'GET',
  body = null,
  isFormData = false,
) => {
  try {
    console.log(`Requesting: ${API_URL}${endpoint}`);

    const headers = isFormData
      ? {} // fetch automatically sets Content-Type for FormData
      : {'Content-Type': 'application/json'};

    const response = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers,
      body: isFormData ? body : body ? JSON.stringify(body) : null,
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

// ✅ Function to upload an image with a dynamic endpoint
export const uploadImage = async (imageUri, uploadEndpoint) => {
  const formData = new FormData();
  formData.append('image', {
    uri: imageUri,
    name: 'profile.jpg',
    type: 'image/jpeg',
  });

  console.log('the formData is --------------------->', formData);

  // Now we can pass different endpoints dynamically
  const result = await fetchImageData(uploadEndpoint, 'POST', formData, true);
  console.log('the result is -------------------->', result);
  return result.imageUrl; // Return the hosted image URL
};

// const imageUrl = await uploadImage(selectedImageUri, '/upload-image');
