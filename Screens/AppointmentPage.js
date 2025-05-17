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
  ActivityIndicator,
  Image
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Checkbox } from 'react-native-paper';
import { useMutation } from './utils/ApiService';

const PetGroomingAppointmentScreen = ({ navigation }) => {
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [appointmentTime, setAppointmentTime] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { fetchData, loading } = useMutation();

  const serviceTypes = [
    { id: 'grooming', label: 'Grooming', icon: '🐾' },
    { id: 'boarding', label: 'Boarding', icon: '🏠' },
    { id: 'daycare', label: 'Daycare', icon: '🎾' },
    { id: 'veterinary', label: 'Veterinary', icon: '🩺' },
  ];

  const [selectedService, setSelectedService] = useState('grooming');

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

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || appointmentDate;
    setShowDatePicker(Platform.OS === 'ios');
    setAppointmentDate(currentDate);
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || appointmentTime;
    setShowTimePicker(Platform.OS === 'ios');
    setAppointmentTime(currentTime);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (time) => {
    return time.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatTimeForAPI = (time) => {
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const toggleSubService = (id) => {
    setSelectedSubServices(prevSelected => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter(item => item !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const handleServiceChange = (serviceId) => {
    setSelectedService(serviceId);
    setSelectedSubServices([]);
  };

  const handleSubmit = async () => {
    if (selectedSubServices.length === 0) {
      Alert.alert("Error", "Please select at least one sub-service");
      return;
    }

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
      const result = await fetchData({
        endpoint: 'appointments',
        method: 'POST',
        data: appointmentData
      });

      if (!result) {
        throw new Error('No response received from the server');
      }

      console.log('Appointment created:', result);

      Alert.alert(
        "Appointment Scheduled",
        `Your pet's appointment has been scheduled for ${formatDate(appointmentDate)} at ${formatTime(appointmentTime)}`,
        [{
          text: "OK",
          onPress: () => navigation.navigate('Viewappoinments', { userId: result.userId })
        }]
      );

    } catch (err) {
      console.error('Error scheduling appointment:', err);
      setError(err.message || 'Something went wrong. Please try again.');
      Alert.alert("Scheduling Failed", err.message || "There was a problem scheduling your appointment.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Pet Appointment</Text>
          <Text style={styles.subHeader}>Book your pet's next visit</Text>
        </View>

        <View style={styles.card}>
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
                <Text style={styles.serviceIcon}>{service.icon}</Text>
                <Text style={[
                  styles.serviceButtonText,
                  selectedService === service.id && styles.selectedServiceText
                ]}>
                  {service.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Select Sub-Services</Text>
          <View style={styles.subServiceContainer}>
            {subServiceOptions[selectedService].map((subService) => (
              <View key={subService.id} style={styles.checkboxContainer}>
                <Checkbox
                  status={selectedSubServices.includes(subService.id) ? 'checked' : 'unchecked'}
                  onPress={() => toggleSubService(subService.id)}
                  color="#FF8C00"
                />
                <Text style={styles.checkboxLabel}>{subService.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Select Date & Time</Text>
          <TouchableOpacity style={styles.dateTimeButton} onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dateTimeLabel}>Date:</Text>
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

          <TouchableOpacity style={styles.dateTimeButton} onPress={() => setShowTimePicker(true)}>
            <Text style={styles.dateTimeLabel}>Time:</Text>
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
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Additional Notes</Text>
          <TextInput
            style={styles.notesInput}
            multiline
            numberOfLines={4}
            placeholder="Please add any special instructions or concerns..."
            value={notes}
            onChangeText={setNotes}
          />
        </View>

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

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
    backgroundColor: '#f8f8f8',
  },
  container: {
    padding: 16,
  },
  headerContainer: {
    marginBottom: 20,
    alignItems: 'center',
    paddingVertical: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF8C00',
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  serviceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceButton: {
    width: '48%',
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  selectedServiceButton: {
    backgroundColor: '#FF8C00',
    borderColor: '#FF8C00',
  },
  serviceIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  serviceButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#444',
  },
  selectedServiceText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  subServiceContainer: {
    marginVertical: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 3,
  },
  checkboxLabel: {
    fontSize: 16,
    marginLeft: 8,
    color: '#333',
  },
  dateTimeButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
  },
  dateTimeLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  dateTimeText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  notesInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    textAlignVertical: 'top',
    fontSize: 16,
    minHeight: 100,
    color: '#333',
  },
  errorContainer: {
    backgroundColor: '#FFF0F0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FF5252',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: '#FF8C00',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#FF8C00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PetGroomingAppointmentScreen;