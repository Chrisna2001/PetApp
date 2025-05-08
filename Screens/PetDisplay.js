import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { fetchData, useMutation } from './utils/ApiService';

const PetDisplay = ({ route }) => {
  const { petId } = route.params;
  const [petDetails, setPetDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { fetchData: callApi } = useMutation();

  const [showDetails, setShowDetails] = useState(false);
  const [groomDate, setGroomDate] = useState(new Date());
  const [walkTime, setWalkTime] = useState(new Date());
  const [vaccineDate, setVaccineDate] = useState(new Date());
  const [showGroomPicker, setShowGroomPicker] = useState(false);
  const [showWalkPicker, setShowWalkPicker] = useState(false);
  const [showVaccinePicker, setShowVaccinePicker] = useState(false);

  useEffect(() => {
    fetchPetDetails(petId);
  }, []);

  const fetchPetDetails = async (petId) => {
    try {
      const response = await callApi({
        endpoint: `pets/${petId}`, // Corrected endpoint URL
        method: 'GET',
      });
      setPetDetails(response);
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
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image
          source={{ uri: petDetails.imageUrl ?? '' }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{petDetails?.name ?? ''}</Text>
        <Text style={styles.info}>Breed: {petDetails?.breed ?? ''}</Text>
        <Text style={styles.info}>Age: {petDetails?.age ?? ''}</Text>
        <Text style={styles.info}>Sex: {petDetails?.sex ?? ''}</Text>
        <Text style={styles.info}>Type: {petDetails?.type ?? ''}</Text>
        <Text style={styles.info}>DOB: {petDetails?.dob ?? ''}</Text>

        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => setShowDetails(!showDetails)}
        >
          <Text style={styles.plusText}>
            {showDetails ? 'Hide Details' : 'Show Details'}
          </Text>
        </TouchableOpacity>

        {showDetails && (
          <View style={styles.detailsContainer}>
            {/* Grooming Date */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Pet Grooming Date</Text>
              <TouchableOpacity
                style={styles.orangeButton}
                onPress={() => setShowGroomPicker(true)}
              >
                <Text style={styles.buttonText}>Select Date</Text>
              </TouchableOpacity>
              {showGroomPicker && (
                <DateTimePicker
                  value={groomDate}
                  mode="date"
                  display="default"
                  onChange={(event, date) => {
                    setShowGroomPicker(Platform.OS === 'ios');
                    if (date) setGroomDate(date);
                  }}
                />
              )}
              <Text style={styles.selectedText}>
                Selected: {groomDate.toDateString()}
              </Text>
            </View>

            {/* Walking Time */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Pet Walking Time</Text>
              <TouchableOpacity
                style={styles.orangeButton}
                onPress={() => setShowWalkPicker(true)}
              >
                <Text style={styles.buttonText}>Pick Time</Text>
              </TouchableOpacity>
              {showWalkPicker && (
                <DateTimePicker
                  value={walkTime}
                  mode="time"
                  display="default"
                  onChange={(event, date) => {
                    setShowWalkPicker(Platform.OS === 'ios');
                    if (date) setWalkTime(date);
                  }}
                />
              )}
              <Text style={styles.selectedText}>
                Selected: {walkTime.toLocaleTimeString()}
              </Text>
            </View>

            {/* Vaccination Date */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Pet Vaccination Date</Text>
              <TouchableOpacity
                style={styles.orangeButton}
                onPress={() => setShowVaccinePicker(true)}
              >
                <Text style={styles.buttonText}>Select Date</Text>
              </TouchableOpacity>
              {showVaccinePicker && (
                <DateTimePicker
                  value={vaccineDate}
                  mode="date"
                  display="default"
                  onChange={(event, date) => {
                    setShowVaccinePicker(Platform.OS === 'android');
                    if (date) setVaccineDate(date);
                  }}
                />
              )}
              <Text style={styles.selectedText}>
                Selected: {vaccineDate.toDateString()}
              </Text>
            </View>
          </View>
        )}
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
  },
  profileImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    borderRadius: 15,
  },
  name: {
    fontSize: 26,
    marginTop: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  info: {
    fontSize: 18,
    marginTop: 5,
    color: '#555',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusButton: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: 'orange',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  plusText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  detailsContainer: {
    marginTop: 25,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  orangeButton: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  selectedText: {
    marginTop: 10,
    color: '#444',
  },
});

export default PetDisplay;
