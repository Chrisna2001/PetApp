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

const PetGroomingAppointmentScreen = () => {
  // State variables
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [appointmentTime, setAppointmentTime] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { fetchData, loading, data } = useMutation();

  
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
      const response = await fetchData({
        endpoint:'appointments',
        method:'POST',
        data:appointmentData
    })
      // Process response
      if (!response.ok) {
        // If response is not 2xx, throw error
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Server responded with status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Appointment created:', responseData);
      
      // Show success message
      Alert.alert(
        "Appointment Scheduled",
        `Your pet's appointment has been successfully scheduled for ${formatDate(appointmentDate)} at ${formatTime(appointmentTime)}`,
        [{ text: "OK" }]
      );
      
      // Reset form or navigate to confirmation screen if needed
      // navigation.navigate('AppointmentConfirmation', { appointmentId: responseData.id });
      
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
              style={[
                styles.serviceButton,
                selectedService === service.id && styles.selectedServiceButton
              ]}
              onPress={() => handleServiceChange(service.id)}
            >
              <Text 
                style={[
                  styles.serviceButtonText,
                  selectedService === service.id && styles.selectedServiceText
                ]}
              >
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
        <TouchableOpacity 
          style={styles.dateTimeButton}
          onPress={() => setShowDatePicker(true)}
        >
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
        <TouchableOpacity 
          style={styles.dateTimeButton}
          onPress={() => setShowTimePicker(true)}
        >
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
          style={[styles.submitButton, isLoading && styles.disabledButton]} 
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
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
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginTop: 16,
    marginBottom: 8,
  },
  serviceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  serviceButton: {
    width: '48%',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedServiceButton: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  serviceButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  selectedServiceText: {
    color: '#FFFFFF',
  },
  subServiceContainer: {
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  dateTimeButton: {
    padding: 12,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  dateTimeText: {
    fontSize: 16,
    color: '#333',
  },
  notesInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 24,
    textAlignVertical: 'top',
    minHeight: 100,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: '#A5D6A7',
    opacity: 0.7,
  },
  errorContainer: {
    backgroundColor: '#FFEBEE',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FFCDD2',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 14,
  },
});

export default PetGroomingAppointmentScreen;