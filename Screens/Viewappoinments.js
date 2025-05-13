import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Alert, 
  ActivityIndicator 
} from 'react-native';

const NewWorkRequestScreen = ({ navigation }) => {
  // Form state
  const [service, setService] = useState('');
  const [subServices, setSubServices] = useState('');
  const [notes, setNotes] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');

  // Submission state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Validation function
  const validateForm = () => {
    const errors = [];

    if (!service.trim()) {
      errors.push('Service is required');
    }

    if (!appointmentDate.trim()) {
      errors.push('Appointment date is required');
    }

    if (!appointmentTime.trim()) {
      errors.push('Appointment time is required');
    }

    return errors;
  };

  // Submit work request
  const submitWorkRequest = async () => {
    // Reset previous errors
    setError(null);

    // Validate form
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors.join('\n'));
      return;
    }

    // Start loading
    setLoading(true);

    try {
      // Prepare request data
      const requestData = {
        service: service.trim(),
        subServices: subServices.trim() ? subServices.split(',').map(s => s.trim()) : [],
        notes: notes.trim(),
        appointmentDate,
        appointmentTime,
        userId: '1', // Replace with actual user ID
      };

      // API endpoint - replace with your actual endpoint
      const apiUrl = 'https://your-api-domain.com/work-requests';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add authentication headers if needed
          // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestData)
      });

      // Check response
      if (!response.ok) {
        // Try to parse error response
        const errorResponse = await response.text();
        throw new Error(
          `API Error: ${response.status} - ${errorResponse || 'Unknown error occurred'}`
        );
      }

      // Parse successful response
      const result = await response.json();

      // Success alert
      Alert.alert(
        'Success', 
        'Work request submitted successfully!', 
        [{ 
          text: 'OK', 
          onPress: () => navigation.goBack() 
        }]
      );

    } catch (err) {
      // Detailed error handling
      console.error('Work Request Submission Error:', err);
      
      // Set user-friendly error message
      setError(
        err.message.includes('Failed to fetch') 
          ? 'Network error. Please check your connection.' 
          : err.message
      );
    } finally {
      // Stop loading
      setLoading(false);
    }
  };

  // Debug function
  const debugFormData = () => {
    Alert.alert(
      'Form Debug Information',
      `Service: ${service}\n` +
      `Sub-Services: ${subServices}\n` +
      `Notes: ${notes}\n` +
      `Appointment Date: ${appointmentDate}\n` +
      `Appointment Time: ${appointmentTime}`
    );
  };

  return (
    <ScrollView 
      style={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>New Work Request</Text>

      {/* Error Display */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>⚠️ {error}</Text>
        </View>
      )}

      {/* Service Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Service *</Text>
        <TextInput
          style={styles.input}
          value={service}
          onChangeText={setService}
          placeholder="Enter service type"
        />
      </View>

      {/* Sub-Services Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Sub-Services (Optional, comma-separated)</Text>
        <TextInput
          style={styles.input}
          value={subServices}
          onChangeText={setSubServices}
          placeholder="e.g., dog grooming, nail trimming"
        />
      </View>

      {/* Notes Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Notes (Optional)</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          value={notes}
          onChangeText={setNotes}
          placeholder="Additional information"
          multiline
          numberOfLines={4}
        />
      </View>

      {/* Appointment Date */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Appointment Date *</Text>
        <TextInput
          style={styles.input}
          value={appointmentDate}
          onChangeText={setAppointmentDate}
          placeholder="YYYY-MM-DD"
          keyboardType="numeric"
        />
      </View>

      {/* Appointment Time */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Appointment Time *</Text>
        <TextInput
          style={styles.input}
          value={appointmentTime}
          onChangeText={setAppointmentTime}
          placeholder="HH:MM (24-hour format)"
          keyboardType="numeric"
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity 
        style={styles.submitButton}
        onPress={submitWorkRequest}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.submitButtonText}>Submit Work Request</Text>
        )}
      </TouchableOpacity>

      {/* Debug Button */}
      <TouchableOpacity 
        style={styles.debugButton}
        onPress={debugFormData}
      >
        <Text style={styles.debugButtonText}>Debug Form Data</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 6,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  debugButton: {
    backgroundColor: '#6c757d',
    padding: 15,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  debugButtonText: {
    color: 'white',
  },
  errorContainer: {
    backgroundColor: '#ffdddd',
    padding: 10,
    borderRadius: 6,
    marginBottom: 15,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default NewWorkRequestScreen;