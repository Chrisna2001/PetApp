import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, ActivityIndicator} from 'react-native';
import {fetchData} from './utils/ApiService';

const PetDisplay = ({route}) => {
  const {petId} = route.params;
  const [petDetails, setPetDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log('the samasns-------------------->', petId);

  useEffect(() => {
    fetchPetDetails(petId);
  }, []);

  const fetchPetDetails = async petId => {
    try {
      const data = await fetchData(`pet-profile/${petId}`);
      console.log(data);
      setPetDetails(data);
    } catch (error) {
      console.error('Error fetching pet details:', error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ActivityIndicator size="large" color="orange" style={styles.loader} />
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{uri: petDetails.profilePicture ?? ''}}
        style={styles.profileImage}
      />
      <Text style={styles.name}>{petDetails?.petName ?? ''}</Text>
      <Text style={styles.info}>Breed: {petDetails?.breed ?? ''}</Text>
      <Text style={styles.info}>Age: {petDetails?.petAge ?? ''}</Text>
      <Text style={styles.info}>Sex: {petDetails?.sex ?? ''}</Text>
      <Text style={styles.info}>Type: {petDetails?.type ?? ''}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  info: {
    fontSize: 18,
    marginVertical: 5,
    color: '#666',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PetDisplay;
