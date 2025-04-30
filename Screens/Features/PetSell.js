import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from '../utils/ApiService';

const PetSell = ({ navigation }) => {
  const [petImage, setPetImage] = useState(null);
  const [licenceFile, setLicenceFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const { fetchData, loading } = useMutation();

  const [form, setForm] = useState({
    petName: '',
    age: '',
    sex: '',
    type: '',
    breed: '',
    price: '',
    dob: '',
    ownerName: '',
    description: '',
    licenseNo: '',
  });

  const pickImage = setImage => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.didCancel) {
        Alert.alert('Cancelled', 'You did not select an image.');
      } else if (response.assets && response.assets.length > 0) {
        setImage(response.assets[0]);
      }
    });
  };

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    const requiredFields = ['petName', 'age', 'sex', 'type', 'breed', 'price', 'dob', 'ownerName'];
    for (let field of requiredFields) {
      if (!form[field]) {
        Alert.alert('Validation Error', `Please fill in the ${field}`);
        return false;
      }
    }
    
    if (!petImage) {
      Alert.alert('Validation Error', 'Please select a pet image');
      return false;
    }
    
    return true;
  };

  // Helper function to upload an image
  const uploadImage = async (petId, imageFile, imageType) => {
    setUploading(true);
    try {
      const formData = new FormData();
      
      if (imageType === 'pet') {
        formData.append('petImage', {
          uri: Platform.OS === 'android' ? imageFile.uri : imageFile.uri.replace('file://', ''),
          name: 'pet_image.jpg',
          type: 'image/jpeg',
        });
        
        await fetchData({
          endpoint: `pet-listings/${petId}/upload-pet-image`,
          method: 'POST',
          data: formData
        });
      } else if (imageType === 'license') {
        formData.append('licenseImage', {
          uri: Platform.OS === 'android' ? imageFile.uri : imageFile.uri.replace('file://', ''),
          name: 'license_image.jpg',
          type: 'image/jpeg',
        });
        
        await fetchData({
          endpoint: `pet-listings/${petId}/upload-license-image`,
          method: 'POST',
          data: formData
        });
      }
      
      console.log(`${imageType} image uploaded successfully`);
    } catch (error) {
      console.error(`Error uploading ${imageType} image:`, error);
      Alert.alert('Upload Error', `Failed to upload ${imageType} image.`);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    try {
      // Step 1: Submit text fields first
      const petData = {
        petName: form.petName,
        age: parseInt(form.age),
        sex: form.sex.toLowerCase(),
        type: form.type.toLowerCase(),
        breed: form.breed,
        price: parseFloat(form.price),
        dob: form.dob,
        ownerName: form.ownerName,
        description: form.description,
        licenseNo: form.licenseNo
      };
      
      const result = await fetchData({
        endpoint: 'pet-listings',
        method: 'POST',
        data: petData
      });
      
      console.log('Pet Listing created:', result);
      const petId = result.id;
      console.log("Pet ID:", petId);

      
      if (petImage) {
        await uploadImage(petId, petImage, 'pet');
      }

     
      if (licenceFile) {
        await uploadImage(petId, licenceFile, 'license');
      }

    
      await AsyncStorage.setItem('petListing', JSON.stringify(result));
      
     
      Alert.alert('Success', 'Pet listed successfully!');
      
   
      setForm({
        petName: '',
        age: '',
        sex: '',
        type: '',
        breed: '',
        price: '',
        dob: '',
        ownerName: '',
        description: '',
        licenseNo: '',
      });
      setPetImage(null);
      setLicenceFile(null);
      
      // Navigate back
      navigation.navigate('Home');
      
    } catch (error) {
      console.error('Error:', error.message);
      Alert.alert('Error', error.message || 'Failed to submit pet listing');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Pet Selling</Text>

        <Text style={styles.label}>Upload Pet Image:</Text>
        <TouchableOpacity
          style={styles.imagePicker}
          onPress={() => pickImage(setPetImage)}
        >
          {petImage ? (
            <Image source={{ uri: petImage.uri }} style={styles.image} />
          ) : (
            <Text style={styles.imageText}>Select Image</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.label}>Upload Pet License:</Text>
        <TouchableOpacity
          style={styles.imagePicker}
          onPress={() => pickImage(setLicenceFile)}
        >
          {licenceFile ? (
            <Image source={{ uri: licenceFile.uri }} style={styles.image} />
          ) : (
            <Text style={styles.imageText}>Select License</Text>
          )}
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="License Number"
          onChangeText={text => handleChange('licenseNo', text)}
          value={form.licenseNo}
          placeholderTextColor="#aaa"
        />

        <TextInput
          style={styles.input}
          placeholder="Pet Name"
          onChangeText={text => handleChange('petName', text)}
          value={form.petName}
          placeholderTextColor="#aaa"
        />

        <TextInput
          style={styles.input}
          placeholder="Age"
          onChangeText={text => handleChange('age', text)}
          value={form.age}
          keyboardType="numeric"
          placeholderTextColor="#aaa"
        />

        <TextInput
          style={styles.input}
          placeholder="Sex"
          onChangeText={text => handleChange('sex', text)}
          value={form.sex}
          placeholderTextColor="#aaa"
        />

        <TextInput
          style={styles.input}
          placeholder="Pet Type"
          onChangeText={text => handleChange('type', text)}
          value={form.type}
          placeholderTextColor="#aaa"
        />

        <TextInput
          style={styles.input}
          placeholder="Breed"
          onChangeText={text => handleChange('breed', text)}
          value={form.breed}
          placeholderTextColor="#aaa"
        />

        <TextInput
          style={styles.input}
          placeholder="Price"
          onChangeText={text => handleChange('price', text)}
          value={form.price}
          keyboardType="numeric"
          placeholderTextColor="#aaa"
        />

        <TextInput
          style={styles.input}
          placeholder="DOB (YYYY-MM-DD)"
          onChangeText={text => handleChange('dob', text)}
          value={form.dob}
          placeholderTextColor="#aaa"
        />

        <TextInput
          style={styles.input}
          placeholder="Owner Name"
          onChangeText={text => handleChange('ownerName', text)}
          value={form.ownerName}
          placeholderTextColor="#aaa"
        />

        <TextInput
          style={styles.input}
          placeholder="Description"
          onChangeText={text => handleChange('description', text)}
          value={form.description}
          multiline
          placeholderTextColor="#aaa"
        />

        <TouchableOpacity
          style={[styles.button, (loading || uploading) && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={loading || uploading}
        >
          {loading || uploading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Submit</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'orange',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'orange',
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  imagePicker: {
    width: 120,
    height: 120,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  imageText: {
    color: '#666',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: 'orange',
    borderRadius: 8,
    marginTop: 10,
  },
  button: {
    backgroundColor: 'orange',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ddd',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PetSell;