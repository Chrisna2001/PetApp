import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  ScrollView, 
  StyleSheet 
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const PetMissing = () => {
  const [petImage, setPetImage] = useState(null);
  const [petName, setPetName] = useState('');
  const [petColor, setPetColor] = useState('');
  const [petType, setPetType] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [petAge, setPetAge] = useState('');
  const [showContent, setShowContent] = useState(false); 

  const handleImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setPetImage(imageUri);
      }
    });
  };

  const handleSubmit = () => {
    const petData = {
      name: petName,
      color: petColor,
      type: petType,
      breed: petBreed,
      age: petAge,
      image: petImage
    };
    console.log('Pet Listing Submitted:', petData);
  };

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>Lost your pet</Text>
    
     
      <TouchableOpacity style={styles.plusButton} onPress={() => setShowContent(!showContent)}>
        <Icon name={showContent ? "minus" : "plus"} size={24} color="white" />
      </TouchableOpacity>

      {showContent && (
        <>
          <Text style={styles.title}>Pet Missing Registration</Text>
          
         
          <TouchableOpacity onPress={handleImagePicker} style={styles.imagePicker}>
            {petImage ? (
              <Image source={{ uri: petImage }} style={styles.imagePreview} />
            ) : (
              <Text style={styles.imagePickerText}>Select Pet Image</Text>
            )}
          </TouchableOpacity>

         
          <View style={styles.formContainer}>
            <TextInput style={styles.input} placeholder="Pet Name" value={petName} onChangeText={setPetName} />
            <TextInput style={styles.input} placeholder="Pet Color" value={petColor} onChangeText={setPetColor} />

          
            <View style={styles.pickerContainer}>
              <Picker selectedValue={petType} onValueChange={(itemValue) => setPetType(itemValue)}>
                <Picker.Item label="Select Pet Type" value="" />
                <Picker.Item label="Dog" value="dog" />
                <Picker.Item label="Cat" value="cat" />
                <Picker.Item label="Bird" value="birdt" />
              </Picker>
            </View>

            <TextInput style={styles.input} placeholder="Breed" value={petBreed} onChangeText={setPetBreed} />
            <TextInput style={styles.input} placeholder="Age" value={petAge} onChangeText={setPetAge} keyboardType="numeric" />

            
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
          <View> <Text style={styles.title}>Lost your pet</Text></View>
         
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  plusButton: {
    backgroundColor: 'orange',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  imagePicker: {
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 20,
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  imagePickerText: {
    color: '#888',
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
      placeholder:"Pet Name" ,
  placeholderTextColor:"gray",
    
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: 'orange',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default PetMissing;
