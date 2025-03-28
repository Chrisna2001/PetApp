import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {fetchData} from './utils/ApiService';
import {uploadImage} from './utils/ApiServiceImage';

const PetProfile = ({navigation}) => {
  const [petName, setPetName] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [petAge, setPetAge] = useState('');
  const [petSex, setPetSex] = useState('');
  const [petType, setPetType] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const selectProfilePicture = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        Alert.alert('Cancelled', 'You did not select an image.');
      } else if (response.assets) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  // const handleSaveProfile = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await axios.post(
  //       `${API_URL}pet-profile/create`,
  //       {
  //         petName: petName,
  //         profilePicture: profileImage == null ? 'jhg' : profileImage,
  //         petAge: petAge,
  //         type: petType,
  //         sex: petSex,
  //         breed: petBreed,
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       },
  //     );
  //     console.log(response.data);
  //     navigation.navigate('Home');
  //   } catch (error) {
  //     console.error('failed ', error);
  //   }
  // };

  const handleSaveProfile = async () => {
    console.log('the profile image is ------------------->', profileImage);

    // setIsLoading(true);

    const imageUrl = await uploadImage(profileImage, 'images/create');
    console.log('image url', imageUrl);
    try {
      const response = await fetchData('pet-profile/create', 'POST', {
        petName: petName,
        profilePicture: profileImage == null ? 'jpg' : imageUrl,
        petAge: petAge,
        type: petType,
        sex: petSex,
        breed: petBreed,
      });
      console.log(response.data);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error fetching pet details:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <Text style={styles.header}>Pet Profile</Text>

      <TouchableOpacity
        onPress={selectProfilePicture}
        style={styles.imagePicker}>
        {profileImage ? (
          <Image source={{uri: profileImage}} style={styles.profileImage} />
        ) : (
          <Text style={styles.uploadText}>Upload Pet Picture</Text>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Pet Name"
        placeholderTextColor="#aaa"
        value={petName}
        onChangeText={setPetName}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
        value={petAge}
        onChangeText={setPetAge}
      />
      <TextInput
        style={styles.input}
        placeholder="Breed"
        placeholderTextColor="#aaa"
        value={petBreed}
        onChangeText={setPetBreed}
      />
      <TextInput
        style={styles.input}
        placeholder="Sex (male/female)"
        placeholderTextColor="#aaa"
        value={petSex}
        onChangeText={setPetSex}
      />
      <TextInput
        style={styles.input}
        placeholder="Type (dog/cat/etc.)"
        placeholderTextColor="#aaa"
        value={petType}
        onChangeText={setPetType}
      />

      <TouchableOpacity
        style={styles.registerButton}
        onPress={handleSaveProfile}
        disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Save Profile</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 21,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  imagePicker: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  uploadText: {
    color: 'gray',
    fontSize: 14,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  registerButton: {
    width: '100%',
    height: 50,
    backgroundColor: 'orange',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
};

export default PetProfile;
