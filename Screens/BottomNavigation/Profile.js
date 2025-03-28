import React, { useState } from 'react';
import { 
  View, Text, Image, TouchableOpacity, FlatList, StyleSheet, TextInput 
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

const Profile = () => {
  const [petsData, setPetsData] = useState([]);

  const pickImage = () => {
    ImagePicker.launchImageLibrary(
      { mediaType: 'photo', quality: 1 },
      (response) => {
        if (!response.didCancel && response.assets) {
          const newPet = {
            id: String(Date.now()),
            name: `Pet ${petsData.length + 1}`,
            image: { uri: response.assets[0].uri },
            description: '',
            editing: false,
          };
          setPetsData([newPet, ...petsData]);
        }
      }
    );
  };

  const updateDescription = (id, text) => {
    setPetsData((prev) => prev.map(pet => pet.id === id ? { ...pet, description: text } : pet));
  };

  const toggleEdit = (id) => {
    setPetsData((prev) => prev.map(pet => pet.id === id ? { ...pet, editing: !pet.editing } : pet));
  };

  const deleteImage = (id) => {
    setPetsData(petsData.filter(pet => pet.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>

      {item.editing ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter description..."
            value={item.description}
            onChangeText={(text) => updateDescription(item.id, text)}
          />
          <TouchableOpacity style={styles.saveButton} onPress={() => toggleEdit(item.id)}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.description}>{item.description || 'No description added'}</Text>
          <TouchableOpacity style={styles.editButton} onPress={() => toggleEdit(item.id)}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity style={styles.deleteButton} onPress={() => deleteImage(item.id)}>
        <Text style={styles.deleteIcon}>remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={petsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
        <Text style={styles.uploadText}>Upload Pet Image</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  uploadButton: {
    backgroundColor: 'orange',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  uploadText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 8,
    marginVertical: 6,
    width: '80%',
    alignItems: 'center',
    alignSelf: 'center', // Moves the card to the center
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  image: {
    width: '80%',
    height: 160,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#444',
    marginTop: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 4,
    width: '100%',
    marginTop: 4,
  },
  saveButton: {
    backgroundColor: 'orange',
    padding: 6,
    borderRadius: 4,
    marginTop: 4,
  },
  saveText: {
    color: '#fff',
    fontSize: 12,
  },
  description: {
    marginTop: 4,
    textAlign: 'center',
    fontSize: 12,
    color: '#555',
  },
  editButton: {
    backgroundColor: 'orange',
    padding: 4,
    borderRadius: 4,
    marginTop: 4,
  },
  editText: {
    color: '#fff',
    fontSize: 12,
  },
  deleteButton: {
    padding: 4,
    marginLeft:"60%",
   
  },
  deleteIcon: {
    fontSize: 16,
    color: 'orange',
  },
});

export default Profile;