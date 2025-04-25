import React, {useState} from 'react';
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
import { API_URL } from 'react-native-dotenv';


const PetProfile = ({navigation}) => {
  const [petName, setPetName] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [petAge, setPetAge] = useState('');
  const [petSex, setPetSex] = useState('');
  const [petType, setPetType] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        Alert.alert('Cancelled', 'You did not select an image.');
      } else if (response.assets) {
        setImage(response.assets[0].uri);
      }
    });
  };

  const uploadImage = async () => {
    if (!image) return;

    setUploading(true);
    console.log("imageeeeeeee------------->",image);
    try {
      const formData = new FormData(); //Creates a new FormData objec This is how we send files (like images) in a multipart/form-data format via HTTP POST.
      formData.append('image', {
        uri: image,
        name: 'image.jpg',
        type: 'image/jpeg',
      });

      // if (response.assets) {
      //   const asset = response.assets[0];
      //   setImage({
      //     uri: asset.uri,
      //     name: asset.fileName,
      //     type: asset.type,
      //   });
      // }
      
      console.log('formdata ------>>',formData);
       const response = await fetch(`${API_URL}upload/image/`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const result = await response.json();
      console.log('Upload successful:', result);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Text style={styles.header}>Pet Profile</Text>
      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        {image ? (
          <Image source={{uri: image}} style={styles.profileImage} />
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
        onPress={uploadImage}
        disabled={uploading}>
        {uploading ? (
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
    paddingHorizontal: 22,
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