import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker';
import { removeAuthToken, useMutation } from '../utils/ApiService';

const Profile = ({ navigation }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profileData, setProfileData] = useState({
    name: '',
    username: '',
    email: '',
    phoneNumber: '',
    age: '',
    sex: '',
    Location: ''
  });
  const [profileId, setProfileId] = useState(null);

  const { fetchData, loading, data } = useMutation();

  useEffect(() => {
    fetchUserInfo();
    loadProfileImage();
  }, []);

  const loadProfileImage = async () => {
    const imageUri = await AsyncStorage.getItem('profileImage');
    if (imageUri) {
      setProfileImage(imageUri);
    }
  };

  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });

    if (result?.assets && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      setProfileImage(imageUri);
      await AsyncStorage.setItem('profileImage', imageUri);
    }
  };

  const fetchUserInfo = async () => {
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
        Location: response.currentLocation || ''
      });

      if (response.id) {
        setProfileId(response.id);
      }
    }
  };

  const validateAge = (age) => {
    const ageNum = parseInt(age, 10);
    if (isNaN(ageNum)) return { isValid: false, message: 'Age must be a number' };
    if (ageNum < 0) return { isValid: false, message: 'Age cannot be negative' };
    if (ageNum > 120) return { isValid: false, message: 'Age cannot exceed 120' };
    return { isValid: true };
  };

  const saveProfileData = async () => {
    try {
      const ageValidation = validateAge(profileData.age);
      if (!ageValidation.isValid) {
        Alert.alert('Validation Error', ageValidation.message);
        return;
      }

      await AsyncStorage.setItem('userProfile', JSON.stringify(profileData));
      await AsyncStorage.setItem('username', profileData.username);

      const updateData = {
        age: parseInt(profileData.age, 10),
        sex: profileData.sex,
        currentLocation: profileData.Location
      };

      const response = await fetchData({
        endpoint: 'profile',
        method: 'PUT',
        data: updateData
      });

      if (response) {
        setIsEditing(false);
        Alert.alert('Success', 'Profile updated successfully!');
      } else {
        Alert.alert('Error', 'Failed to update profile on the server');
      }
    } catch (error) {
      console.error('Error saving profile data:', error);
      Alert.alert('Error', error.message || 'Failed to update profile data');
    }
  };

  const handleLogout = () => {
    removeAuthToken();
    navigation.navigate('SplashScreen');
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>👤 Profile Info</Text>
        </View>

        <TouchableOpacity style={styles.profileImageContainer} onPress={isEditing ? pickImage : null}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <MaterialIcons name="account-circle" size={100} color="orange" />
          )}
          {isEditing && (
            <MaterialIcons name="photo-camera" size={24} color="black" style={styles.cameraIcon} />
          )}
        </TouchableOpacity>

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
            value={String(profileData.age)}
            onChangeText={(text) => {
              if (text === '' || /^\d+$/.test(text)) {
                setProfileData({ ...profileData, age: text });
              }
            }}
            editable={isEditing}
            placeholder="Your Age"
            keyboardType="numeric"
            maxLength={3}
          />

          <Text style={styles.label}>Sex:</Text>
          <View style={[styles.pickerContainer, !isEditing && styles.disabledInput]}>
            <Picker
              selectedValue={profileData.sex}
              onValueChange={(itemValue) =>
                setProfileData({ ...profileData, sex: itemValue })
              }
              enabled={isEditing}
              style={{ color: 'black' }}
            >
              <Picker.Item label="Select your gender" value="" />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          </View>

          <Text style={styles.label}>Location:</Text>
          <View style={[styles.pickerContainer, !isEditing && styles.disabledInput]}>
            <Picker
              selectedValue={profileData.Location}
              onValueChange={(itemValue) =>
                setProfileData({ ...profileData, Location: itemValue })
              }
              enabled={isEditing}
              style={{ color: 'black' }}
            >
              <Picker.Item label="Select your location" value="" />
              <Picker.Item label="Kakkanad" value="Kakkanad" />
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
            <TouchableOpacity
              style={styles.saveButton}
              onPress={saveProfileData}
              disabled={loading}
            >
              <Text style={styles.buttonText}>{loading ? 'Saving...' : 'Save Changes'}</Text>
            </TouchableOpacity>
          )}
        </View>

        {!isEditing && (
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        )}
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
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraIcon: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 2,
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
    color: 'black',
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
  logoutButton: {
    backgroundColor: 'orange',
    padding: 17,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Profile;
