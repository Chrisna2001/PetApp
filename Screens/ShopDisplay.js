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

const ShopDetails = ({ route, navigation }) => {
  const { shopId } = route.params; // Getting shopId from route params
  const [shopDetails, setShopDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { fetchData: callApi } = useMutation();

  useEffect(() => {
    console.log('Fetching shop details with ID:', shopId);
    fetchShopDetails(shopId);
  }, [shopId]);

  // Fetch shop details from the API based on shopId
  const fetchShopDetails = async (shopId) => {
    try {
      const response = await callApi({
        endpoint: `shops/${shopId}`,
        method: 'GET',
      });

      if (!response || response.error || response.message?.includes('not found')) {
        throw new Error('Shop not found');
      }

      setShopDetails(response);  // Update shop details state
    } catch (error) {
      console.error('Error fetching shop details:', error.message);
      Alert.alert('Error', 'Shop not found. Please go back and select a valid shop.', [
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
          source={{ uri: shopDetails?.profileImage ?? '' }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{shopDetails?.storeName ?? 'Unknown Groomer'}</Text>

        <View style={styles.detailsContainer}>
          <Text style={styles.info}>Owner: <Text style={styles.infoValue}>{shopDetails?.ownerName ?? 'N/A'}</Text></Text>
          <Text style={styles.info}>Phone: <Text style={styles.infoValue}>{shopDetails?.phoneNumber ?? 'N/A'}</Text></Text>
          <Text style={styles.info}>GSTIN: <Text style={styles.infoValue}>{shopDetails?.gstinNumber ?? 'N/A'}</Text></Text>
          <Text style={styles.info}>Zone: <Text style={styles.infoValue}>{shopDetails?.zone ?? 'N/A'}</Text></Text>
          <Text style={styles.info}>Services: <Text style={styles.infoValue}>{shopDetails?.servicesOffered?.join(', ') ?? 'N/A'}</Text></Text>
          <Text style={styles.info}>Subcategories: <Text style={styles.infoValue}>{shopDetails?.servicesSubcategories?.join(', ') ?? 'N/A'}</Text></Text>
        </View>

        <Text style={styles.description}>{shopDetails?.description ?? 'No description available.'}</Text>

        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => navigation.navigate('AppointmentPage', { shopId })} // Correct navigation method
        >
          <Text style={styles.bookText}>BOOK</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 20,
    backgroundColor: '#f8f8f8', // Soft background color
  },
  container: {
    padding: 25,
    backgroundColor: '#ffffff', // Clean white background for the container
    borderRadius: 20,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
    marginTop: 30,
  },
  profileImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#FF8C00',
    marginBottom: 20,
  },
  name: {
    fontSize: 32,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  detailsContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 15,
  },
  info: {
    fontSize: 16,
    marginTop: 8,
    color: '#666',
    fontFamily: 'Arial',
  },
  infoValue: {
    fontWeight: '600',
    color: '#FF8C00',
    fontFamily: 'Arial',
  },
  description: {
    fontSize: 18,
    marginTop: 20,
    color: '#444',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  bookButton: {
    marginTop: 25,
    alignSelf: 'center',
    backgroundColor: '#FF8C00',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    width: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF8C00',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  bookText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default ShopDetails;
