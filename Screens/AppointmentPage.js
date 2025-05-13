import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
  Platform,
  ActivityIndicator
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Checkbox } from 'react-native-paper';
import { useMutation } from './utils/ApiService';

const PetGroomingAppointmentScreen = ({ navigation }) => {
  // State variables
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [appointmentTime, setAppointmentTime] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { fetchData, loading } = useMutation();

  // Service options
  const serviceTypes = [
    { id: 'grooming', label: 'Grooming' },
    { id: 'boarding', label: 'Boarding' },
    { id: 'daycare', label: 'Daycare' },
    { id: 'veterinary', label: 'Veterinary Check-up' },
  ];

  const [selectedService, setSelectedService] = useState('grooming');

  // Subservices options depending on main service
  const subServiceOptions = {
    grooming: [
      { id: 'dog_grooming', label: 'Dog Grooming' },
      { id: 'cat_grooming', label: 'Cat Grooming' },
      { id: 'nail_trimming', label: 'Nail Trimming' },
      { id: 'bath_brush', label: 'Bath & Brush' },
      { id: 'teeth_cleaning', label: 'Teeth Cleaning' },
    ],
    boarding: [
      { id: 'overnight', label: 'Overnight Stay' },
      { id: 'extended_stay', label: 'Extended Stay' },
      { id: 'premium_suite', label: 'Premium Suite' },
    ],
    daycare: [
      { id: 'full_day', label: 'Full Day Care' },
      { id: 'half_day', label: 'Half Day Care' },
      { id: 'play_group', label: 'Play Group' },
    ],
    veterinary: [
      { id: 'checkup', label: 'General Check-up' },
      { id: 'vaccination', label: 'Vaccination' },
      { id: 'deworming', label: 'Deworming' },
    ],
  };

  const [selectedSubServices, setSelectedSubServices] = useState(['dog_grooming', 'nail_trimming']);

  // Date picker handler
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || appointmentDate;
    setShowDatePicker(Platform.OS === 'ios');
    setAppointmentDate(currentDate);
  };

  // Time picker handler
  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || appointmentTime;
    setShowTimePicker(Platform.OS === 'ios');
    setAppointmentTime(currentTime);
  };

  // Format date to display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Format time to display
  const formatTime = (time) => {
    return time.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Format time for API (24-hour format HH:MM)
  const formatTimeForAPI = (time) => {
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // Toggle sub-service selection
  const toggleSubService = (id) => {
    setSelectedSubServices(prevSelected => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter(item => item !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  // Handle service change
  const handleServiceChange = (serviceId) => {
    setSelectedService(serviceId);
    // Reset sub-services when changing main service
    setSelectedSubServices([]);
  };

  // Submit appointment to API
  const handleSubmit = async () => {
    if (selectedSubServices.length === 0) {
      Alert.alert("Error", "Please select at least one sub-service");
      return;
    }

    // Create appointment object
    const appointmentData = {
      shopId: 1,
      appointmentDate: appointmentDate.toISOString().split('T')[0],
      appointmentTime: formatTimeForAPI(appointmentTime),
      service: selectedService,
      subServices: selectedSubServices,
      notes: notes
    };

    setIsLoading(true);
    setError(null);

    try {
      // Make API call to the /appointments endpoint
      const result = await fetchData({
        endpoint: 'appointments',
        method: 'POST',
        data: appointmentData
      });
      
      // Check if result exists and has required properties
      if (!result) {
        throw new Error('No response received from the server');
      }
      
      console.log('Appointment created:', result);
      
      // Show success message
      Alert.alert(
        "Appointment Scheduled",
        `Your pet's appointment has been successfully scheduled for ${formatDate(appointmentDate)} at ${formatTime(appointmentTime)}`,
        [{
          text: "OK", 
          onPress: () => {
            // Navigate to Cart and pass userId in the navigation params
            navigation.navigate('Viewappoinments', { userId: result.userId });
          }
        }]
      );
      
    } catch (err) {
      console.error('Error scheduling appointment:', err);
      setError(err.message || 'Something went wrong. Please try again.');
      
      Alert.alert(
        "Scheduling Failed",
        err.message || "There was a problem scheduling your appointment. Please try again.",
        [{ text: "OK" }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Schedule Pet Appointment</Text>
        
        {/* Service Selection */}
        <Text style={styles.sectionTitle}>Select Service</Text>
        <View style={styles.serviceContainer}>
          {serviceTypes.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={[styles.serviceButton, selectedService === service.id && styles.selectedServiceButton]}
              onPress={() => handleServiceChange(service.id)}
            >
              <Text style={[styles.serviceButtonText, selectedService === service.id && styles.selectedServiceText]}>
                {service.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Sub-Services Selection */}
        <Text style={styles.sectionTitle}>Select Sub-Services</Text>
        <View style={styles.subServiceContainer}>
          {subServiceOptions[selectedService].map((subService) => (
            <View key={subService.id} style={styles.checkboxContainer}>
              <Checkbox
                status={selectedSubServices.includes(subService.id) ? 'checked' : 'unchecked'}
                onPress={() => toggleSubService(subService.id)}
                color="#4CAF50"
              />
              <Text style={styles.checkboxLabel}>{subService.label}</Text>
            </View>
          ))}
        </View>

        {/* Date Picker */}
        <Text style={styles.sectionTitle}>Select Date</Text>
        <TouchableOpacity style={styles.dateTimeButton} onPress={() => setShowDatePicker(true)}>
          <Text style={styles.dateTimeText}>{formatDate(appointmentDate)}</Text>
        </TouchableOpacity>
        
        {showDatePicker && (
          <DateTimePicker
            value={appointmentDate}
            mode="date"
            display="default"
            onChange={onDateChange}
            minimumDate={new Date()}
          />
        )}

        {/* Time Picker */}
        <Text style={styles.sectionTitle}>Select Time</Text>
        <TouchableOpacity style={styles.dateTimeButton} onPress={() => setShowTimePicker(true)}>
          <Text style={styles.dateTimeText}>{formatTime(appointmentTime)}</Text>
        </TouchableOpacity>
        
        {showTimePicker && (
          <DateTimePicker
            value={appointmentTime}
            mode="time"
            display="default"
            onChange={onTimeChange}
            minuteInterval={15}
          />
        )}

        {/* Notes Input */}
        <Text style={styles.sectionTitle}>Additional Notes</Text>
        <TextInput
          style={styles.notesInput}
          multiline
          numberOfLines={4}
          placeholder="Please add any special instructions or concerns..."
          value={notes}
          onChangeText={setNotes}
        />

        {/* Error Message */}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Schedule Appointment</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  serviceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  serviceButton: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  selectedServiceButton: {
    backgroundColor: '#4CAF50',
  },
  serviceButtonText: {
    fontSize: 16,
  },
  selectedServiceText: {
    color: '#fff',
  },
  subServiceContainer: {
    marginVertical: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  checkboxLabel: {
    fontSize: 16,
  },
  dateTimeButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 10,
  },
  dateTimeText: {
    fontSize: 16,
  },
  notesInput: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    height: 100,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  errorContainer: {
    backgroundColor: '#f8d7da',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  errorText: {
    color: '#721c24',
    fontSize: 16,
  },
});

export default PetGroomingAppointmentScreen;
