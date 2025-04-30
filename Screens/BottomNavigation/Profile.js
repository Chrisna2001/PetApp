import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';
import { useMutation } from '../utils/ApiService';

const Profile = ({ navigation }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    username: '',
    email: '',
    phoneNumber: '',
    age: '',
    sex: '',
    Location: ''
  });

  const { fetchData, loading, data } = useMutation();

  useEffect(() => {
    fetchuserinfo();
  }, []);

  const fetchuserinfo = async () => {
    const response = await fetchData({
      endpoint: 'users/me',
      method: 'GET'
    });
    if (response) {
      setProfileData({
        name: response.name || '',
        username: response.username || '',
        email: response.email || '',
        phoneNumber: response.phoneNumber || '',
        age: response.age || '',
        sex: response.sex || '',
        Location: response.Location || ''
      });
    }
  };

  const saveProfileData = async () => {
    try {
      await AsyncStorage.setItem('userProfile', JSON.stringify(profileData));
      await AsyncStorage.setItem('username', profileData.username);
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      console.error('Error saving profile data:', error);
      Alert.alert('Error', 'Failed to update profile data');
    }
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>👤 Profile Info</Text>
        </View>

        <View style={styles.profileIcon}>
          <MaterialIcons name="account-circle" size={100} color="orange" />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.disabledInput]}
            value={profileData.name}
            onChangeText={(text) => setProfileData({ ...profileData, name: text })}
            editable={isEditing}
            placeholder="Your Name"
          />

          <Text style={styles.label}>Username:</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.disabledInput]}
            value={profileData.username}
            onChangeText={(text) => setProfileData({ ...profileData, username: text })}
            editable={isEditing}
            placeholder="Your Username"
          />

          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.disabledInput]}
            value={profileData.email}
            onChangeText={(text) => setProfileData({ ...profileData, email: text })}
            editable={isEditing}
            placeholder="Your Email"
            keyboardType="email-address"
          />

          <Text style={styles.label}>Phone:</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.disabledInput]}
            value={profileData.phoneNumber}
            onChangeText={(text) => setProfileData({ ...profileData, phoneNumber: text })}
            editable={isEditing}
            placeholder="Your Phone Number"
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Age:</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.disabledInput]}
            value={profileData.age}
            onChangeText={(text) => setProfileData({ ...profileData, age: text })}
            editable={isEditing}
            placeholder="Your Age"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Sex:</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.disabledInput]}
            value={profileData.sex}
            onChangeText={(text) => setProfileData({ ...profileData, sex: text })}
            editable={isEditing}
            placeholder="Male / Female / Other"
          />

          <Text style={styles.label}>Location:</Text>
          <View style={[styles.pickerContainer, !isEditing && styles.disabledInput]}>
            <Picker
              selectedValue={profileData.Location}
              onValueChange={(itemValue) =>
                setProfileData({ ...profileData, Location: itemValue })
              }
              enabled={isEditing}
            >
              <Picker.Item label="Select your location" value="" />
              <Picker.Item label="kakkanad" value="kakkanad"  />
              <Picker.Item label="Aluva" value="Aluva" />
              <Picker.Item label="Edappally" value="Edappally" />
              <Picker.Item label="Kalamassery" value="Kalamassery" />
            </Picker>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, isEditing && styles.cancelButton]}
            onPress={() => setIsEditing(!isEditing)}
          >
            <Text style={styles.buttonText}>
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Text>
          </TouchableOpacity>

          {isEditing && (
            <TouchableOpacity style={styles.saveButton} onPress={saveProfileData}>
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    marginTop: 40,
    marginBottom: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'orange',
    textAlign: 'center',
  },
  profileIcon: {
    alignItems: 'center',
    marginBottom: 20,
  },
  formContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
    fontWeight: '500',
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
    color: 'black',
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
    color: '#666',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  buttonContainer: {
    marginTop: 10,
  },
  button: {
    backgroundColor: 'orange',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ff9800',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Profile;
