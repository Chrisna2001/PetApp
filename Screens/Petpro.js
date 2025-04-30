import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
  Platform,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMutation} from './utils/ApiService';


const PetProfile = ({navigation}) => {
  const [petName, setPetName] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [petAge, setPetAge] = useState('');
  const [petSex, setPetSex] = useState('');
  const [petType, setPetType] = useState('');
  const [petDOB, setDob] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const {fetchData, loading} = useMutation();

  const pickImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        Alert.alert('Cancelled', 'You did not select an image.');
      } else if (response.assets && response.assets.length > 0) {
        setImage(response.assets[0].uri);
      }
    });
  };

  const validateInputs = () => {
    if (!petName || !petBreed || !petAge || !petSex || !petType || !petDOB) {
      Alert.alert('Error', 'Please fill in all pet details.');
      return false;
    }

    const ageNum = parseInt(petAge);
    if (isNaN(ageNum) || ageNum < 0 || ageNum > 100) {
      Alert.alert('Error', 'Age must be a number between 0 and 100.');
      return false;
    }

    const validSex = ['male', 'female'];
    const validType = ['dog', 'cat', 'rabbit', 'bird'];

    if (!validSex.includes(petSex.toLowerCase())) {
      Alert.alert('Error', 'Sex must be "male" or "female".');
      return false;
    }

    if (!validType.includes(petType.toLowerCase())) {
      Alert.alert(
        'Error',
        'Type must be one of: dog, cat, rabbit, bird (case-insensitive).',
      );
      return false;
    }

    const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dobRegex.test(petDOB)) {
      Alert.alert('Error', 'DOB must be in format YYYY-MM-DD.');
      return false;
    }

    return true;
  };

  const createPetProfile = async () => {
    if (!validateInputs()) return;

    try {
      const petData = {
        name: petName,
        breed: petBreed,
        age: parseInt(petAge),
        sex: petSex.toLowerCase(),
        type: petType.toLowerCase(),
        dob: petDOB,
      };

      const result = await fetchData({
        endpoint: 'pets',
        method: 'POST',
        data: petData,
      });

      console.log('Pet Profile created:', result);
      const petId = result.id;
      console.log("id------------->",petId)

      if (image) {
        
        await uploadPetImage(petId);
      }

      await AsyncStorage.setItem('petProfile', JSON.stringify(result));
      navigation.navigate('Home', {petProfile: result});
    } catch (error) {
      console.error('Error creating pet profile:', error);
      Alert.alert('Error', 'Failed to create pet profile.');
    }
  };

  const uploadPetImage = async petId => {
    if (!image) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('petImage', {
        uri: Platform.OS === 'android' ? image : image.replace('file://', ''),
        name: 'pet_image.jpg',
        type: 'image/jpeg',
      });

      console.log("datasssss----------image----->",formData)

      // const response = await fetch(`${API_URL}/pets/${petId}/upload-image`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //     Accept: 'application/json',
      //   },
      //   body: formData,
      // });
      const response = await fetchData({
        endpoint:`pets/${petId}/upload-image`,
        method:'POST',
        data:formData
      })
      console.log('akbarpart--------->',response)

      // if (!response.ok) {
      //   const errorText = await response.text();
      //   throw new Error(errorText);
      // }

      // const result = await response.json();
      // console.log('Image upload successful:', result);
    } catch (error) {
      console.error('Error uploading image:', error.message);
      Alert.alert('Upload Error', 'Failed to upload pet image.');
    } finally {
      setUploading(false);
    }
    console.log("uploading")
  };

  const inputStyle = {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 20,
      }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 20,
          color: 'black',
        }}>
        Create Pet Profile
      </Text>

      <TouchableOpacity
        onPress={pickImage}
        style={{
          width: 120,
          height: 120,
          borderRadius: 60,
          backgroundColor: '#eee',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 20,
        }}>
        {image ? (
          <Image
            source={{uri: image}}
            style={{width: '100%', height: '100%', borderRadius: 60}}
          />
        ) : (
          <Text style={{color: 'gray', fontSize: 14}}>Upload Pet Picture</Text>
        )}
      </TouchableOpacity>

      <TextInput
        style={inputStyle}
        placeholder="Pet Name"
        placeholderTextColor="#aaa"
        value={petName}
        onChangeText={setPetName}
      />
      <TextInput
        style={inputStyle}
        placeholder="Breed"
        placeholderTextColor="#aaa"
        value={petBreed}
        onChangeText={setPetBreed}
      />
      <TextInput
        style={inputStyle}
        placeholder="Age"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
        value={petAge}
        onChangeText={setPetAge}
      />
      <TextInput
        style={inputStyle}
        placeholder="Sex (male/female)"
        placeholderTextColor="#aaa"
        value={petSex}
        onChangeText={setPetSex}
      />
      <TextInput
        style={inputStyle}
        placeholder="Type (dog/cat/rabbit/bird)"
        placeholderTextColor="#aaa"
        value={petType}
        onChangeText={setPetType}
      />
      <TextInput
        style={inputStyle}
        placeholder="DOB (YYYY-MM-DD)"
        placeholderTextColor="#aaa"
        value={petDOB}
        onChangeText={setDob}
      />

      <TouchableOpacity
        onPress={createPetProfile}
        style={{
          width: '100%',
          height: 50,
          backgroundColor: 'orange',
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        {loading || uploading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>
            Save Profile
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default PetProfile;
