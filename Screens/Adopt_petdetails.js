import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useMutation } from './utils/ApiService';  // Assuming you have this utility to call API

const PetAdoptDetails = ({ route, navigation }) => {
  const { petId } = route.params; // Getting petId from route params
  const [petDetails, setPetDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { fetchData: callApi } = useMutation();

  useEffect(() => {
    console.log('Fetching pet adoption details with ID:', petId);
    fetchPetDetails(petId);
  }, [petId]);

  // Fetch pet adoption details from the API based on petId
  const fetchPetDetails = async (petId) => {
    try {
      const response = await callApi({
        endpoint: `pet-listings/${petId}`,
        method: 'GET',
      });

      if (!response || response.error || response.message?.includes('not found')) {
        throw new Error('Pet not found');
      }

      setPetDetails(response);  // Update pet details state
    } catch (error) {
      console.error('Error fetching pet adoption details:', error.message);
      Alert.alert('Error', 'Pet not found. Please go back and select a valid pet.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#FF8C00" style={styles.loader} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image
          source={{ uri: petDetails?.petImageUrl ?? '' }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{petDetails?.petName ?? 'Unknown'}</Text>

        <View style={styles.detailsContainer}>
          <Text style={styles.info}>Breed: <Text style={styles.infoValue}>{petDetails?.breed ?? 'N/A'}</Text></Text>
          <Text style={styles.info}>Age: <Text style={styles.infoValue}>{petDetails?.age ?? 'N/A'}</Text></Text>
          <Text style={styles.info}>Sex: <Text style={styles.infoValue}>{petDetails?.sex ?? 'N/A'}</Text></Text>
          <Text style={styles.info}>Type: <Text style={styles.infoValue}>{petDetails?.type ?? 'N/A'}</Text></Text>
          <Text style={styles.info}>DOB: <Text style={styles.infoValue}>{petDetails?.dob ?? 'N/A'}</Text></Text>
          <Text style={styles.info}>Owner Name: <Text style={styles.infoValue}>{petDetails?.ownerName ?? 'N/A'}</Text></Text>
          <Text style={styles.info}>License No: <Text style={styles.infoValue}>{petDetails?.licenseNo ?? 'N/A'}</Text></Text>
        </View>

        <Text style={styles.description}>{petDetails?.description ?? 'No description available.'}</Text>

        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => navigation.goBack()} // Navigate back after viewing pet adoption details
        >
          <Text style={styles.plusText}>BUY</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 20,
  },
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginTop: 20,
  },
  profileImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    borderRadius: 15,
  },
  name: {
    fontSize: 28,
    marginTop: 15,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  detailsContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  info: {
    fontSize: 16,
    marginTop: 5,
    color: '#333',
  },
  infoValue: {
    fontWeight: 'bold',
    color: '#FF8C00',
  },
  description: {
    fontSize: 16,
    marginTop: 15,
    color: '#555',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  plusButton: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#FF8C00',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '70%',
  },
  plusText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PetAdoptDetails;
