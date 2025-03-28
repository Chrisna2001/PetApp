import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {fetchData} from '../utils/ApiService';

const PetSell = ({navigation}) => {
  const [petImage, setPetImage] = useState(null);
  // const [licenseImage, setLicenseImage] = useState(null);
  const [licenceFile, setLicenceFile] = useState(null);
  const [form, setForm] = useState({
    petName: '',
    petAge: '',
    sex: '',
    petType: '',
    breed: '',
    price: '',
    ownerName: '',
    description: '',
    licenseNumber: '',
  });

  const pickImage = setImage => {
    ImagePicker.launchImageLibrary({}, response => {
      if (response.assets && response.assets.length > 0) {
        setImage(response.assets[0].uri);
      }
    });
  };

  const handleChange = (name, value) => {
    setForm({...form, [name]: value});
  };

  const handleSubmit = async () => {
    console.log(
      form.licenseNumber,
      form.petName,
      form.petAge,
      form.sex,
      form.petType,
      form.breed,
      form.price,
      form.ownerName,
      form.description,
    );

    try {
      const response = await fetchData('pet-selling/create', 'POST', {
        petImage: petImage == null ? 'ni' : petImage, // profilePicture: profileImage == null ? 'jhg' : profileImage,
        licenceFile: licenceFile == null ? 'ni' : licenceFile,
        licenceNumber: form.licenseNumber,
        petName: form.petName,
        petAge: form.petAge,
        sex: form.sex,
        type: form.petType,
        breed: form.breed,
        price: form.price,
        ownersName: form.ownerName,
        description: form.description,
      });
      console.log(response.data);
      console.log(licenceFile);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error fetching pet details:', error.message);
    }
  };

  const handleXlose = () => {
    console.log('sub,it');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Pet Selling</Text>

      <Text style={styles.label}>Upload Pet Image:</Text>
      <TouchableOpacity
        style={styles.imagePicker}
        onPress={() => pickImage(setPetImage)}>
        {petImage ? (
          <Image source={{uri: petImage}} style={styles.image} />
        ) : (
          <Text style={styles.imageText}>Select Image</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.label}>Upload Pet License:</Text>
      <TouchableOpacity
        style={styles.imagePicker}
        onPress={() => pickImage(setLicenceFile)}>
        {licenceFile ? (
          <Image source={{uri: licenceFile}} style={styles.image} />
        ) : (
          <Text style={styles.imageText}>Select License</Text>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="License number"
        onChangeText={text => handleChange('licenseNumber', text)}
        value={form.licenseNumber}
        keyboardType="numeric"
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
        placeholder="Pet Age"
        onChangeText={text => handleChange('petAge', text)}
        value={form.petAge}
        keyboardType="numeric"
        placeholderTextColor="#aaa"
      />

      <TextInput
        style={styles.input}
        placeholder="Sex"
        onChangeText={text => handleChange('sex', text)}
        value={form.sex}
        placeholderTextColor="#aaa"
        color="black"
      />

      <TextInput
        style={styles.input}
        placeholder="Pet Type"
        onChangeText={text => handleChange('petType', text)}
        value={form.petType}
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
        style={styles.button}
        onPress={() => {
          handleSubmit();
        }}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Move PetProfile outside PetSell
const PetProfile = ({navigation}) => {
  const [petName, setPetName] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [petAge, setPetAge] = useState('');
  const [petSex, setPetSex] = useState('');
  const [petType, setPetType] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const selectProfilePicture = () => {
    ImagePicker.launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      const response = await fetchData('/pet-selling/create', 'POST', {
        petImage: profileImage == null ? 'jpg' : profileImage,
        petName: petName,
        petAge: petAge,
        petSex: petSex,
        petType: petType,
        petBreed: petBreed,
      });
      console.log(response.data);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error fetching pet details:', error.message);
    }
  };
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
    backgroundColor: '#aaa',
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
    color: '#aaa',
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
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PetSell;
