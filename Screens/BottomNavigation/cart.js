import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Button, Alert } from 'react-native';

const AppointmentScreen = ({ route, navigation }) => {
  // Get userId from route params with proper fallback handling
  // Using optional chaining and nullish coalescing for safety
  const userId = route?.params?.userId || null;
  
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Debug function to show the current state
  const debugState = () => {
    Alert.alert(
      "Debug Info",
      `Route params: ${JSON.stringify(route?.params)}\nUser ID: ${userId}`,
      [{ text: "OK" }]
    );
  };

  // Fetch appointments from the API
  const fetchAppointments = async (id) => {
    // Verify we have a valid ID
    if (!id) {
      setError('User ID is required');
      setLoading(false);
      return;
    }
    
    setLoading(true);
    try {
      console.log('Fetching appointments for userId:', id);
      
      // Replace with your actual API URL
      const apiUrl = `https://your-api-url.com/appointments?userId=${id}`;
      console.log('API URL:', apiUrl);
      
      const response = await fetch(apiUrl);
      
      // Get raw response text for debugging
      const responseText = await response.text();
      console.log('Raw API response:', responseText.substring(0, 200));
      
      if (!response.ok) {
        throw new Error(`API returned status: ${response.status}`);
      }
      
      // Try to parse the text as JSON
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (jsonError) {
        console.error('JSON Parse Error:', jsonError);
        throw new Error(`Invalid JSON response from server. Response starts with: ${responseText.substring(0, 50)}...`);
      }
      
      if (Array.isArray(data)) {
        setAppointments(data);
        console.log(`Loaded ${data.length} appointments`);
      } else {
        console.warn('API did not return an array:', data);
        setAppointments([]);
      }
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError(`Failed to fetch appointments: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Effect to run when component mounts or userId changes
  useEffect(() => {
    console.log('AppointmentScreen mounted with route params:', JSON.stringify(route?.params));
    console.log('User ID from params:', userId);
    
    // Only attempt to fetch if we have a userId
    if (userId) {
      fetchAppointments(userId);
    } else {
      setLoading(false);
      setError('No user ID found. Please ensure you navigated to this screen correctly.');
    }
  }, [userId]);

  // Function to load demo data for testing
  const loadDemoData = () => {
    const demoUserId = 'demo123'; // Replace with your demo user ID
    console.log('Loading demo data with ID:', demoUserId);
    fetchAppointments(demoUserId);
  };

  // Show loading indicator while fetching data
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading appointments...</Text>
      </View>
    );
  }

  // Show error state
  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <View style={styles.buttonContainer}>
          <Button 
            title="Debug Info" 
            onPress={debugState} 
          />
          <Button 
            title="Load Demo Data" 
            onPress={loadDemoData} 
          />
          <Button 
            title="Go Back" 
            onPress={() => navigation.goBack()} 
          />
        </View>
      </View>
    );
  }

  // Show appointment list or empty state
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Appointments</Text>
        <Text style={styles.subHeaderText}>User ID: {userId}</Text>
      </View>
      
      {appointments.length === 0 ? (
        <View style={styles.centered}>
          <Text>No appointments available</Text>
          <Button 
            title="Refresh" 
            onPress={() => fetchAppointments(userId)}
            style={styles.refreshButton} 
          />
        </View>
      ) : (
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.date}>{item.date}</Text>
              <Text style={styles.time}>{item.time}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          )}
          refreshing={loading}
          onRefresh={() => fetchAppointments(userId)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subHeaderText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 16,
    color: '#888',
    marginTop: 4,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginTop: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 30,
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  refreshButton: {
    marginTop: 15,
  },
});

export default AppointmentScreen;