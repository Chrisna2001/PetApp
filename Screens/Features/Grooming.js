import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useMutation } from '../utils/ApiService'; // Adjust the path if different
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

const Groom = () => {
  const [shops, setShops] = useState([]);
  const { fetchData } = useMutation();
  const navigation = useNavigation(); // Use the navigation hook

  useEffect(() => {
    fetchShopData();
  }, []);

  const fetchShopData = async () => {
    const response = await fetchData({
      endpoint: 'shops',
      method: 'GET',
    });

    if (response && Array.isArray(response)) {
      setShops(response);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ShopDetails', { shopId: item.id })} // Navigate to ShopDetails page
    >
      <Image
        source={{ uri: item.profileImage }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.storeName}</Text>
        <Text style={styles.details}>Owner: {item.ownerName}</Text>
        <Text style={styles.details}>{item.phoneNumber}</Text>
        <Text style={styles.details}>{item.zone.toUpperCase()} Zone</Text>
        <Text style={styles.details}>
          Services: {item.servicesSubcategories?.join(', ')}
        </Text>
        <Text style={styles.details}>Open • Verified: {item.isVerified ? 'Yes' : 'No'}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pet Grooming Stores</Text>
      <FlatList
        data={shops}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No shops found</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'orange',
    marginTop: 50,
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    color: '#555',
  },
});

export default Groom;
