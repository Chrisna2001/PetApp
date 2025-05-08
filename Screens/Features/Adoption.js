import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchData, useMutation } from '../utils/ApiService';

const Adoption = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { fetchData: callApi } = useMutation();
  const navigation = useNavigation();

  // Fetch data when component mounts
  useEffect(() => {
    fetchPets();
  }, []);

  // Fetch pets from API
  const fetchPets = async () => {
    try {
      const response = await callApi({
        endpoint: 'pet-listings',
        method: 'GET',
      });
      console.log('Fetched Pets:', response);
      setPets(response);
    } catch (error) {
      console.error('Error fetching pets:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter pets based on category
  const filterPets = () => {
    if (selectedCategory === 'all') return pets;
    return pets.filter(pet => pet.type.toLowerCase() === selectedCategory.toLowerCase());
  };

  // Header component with logo and category buttons
  const ListHeaderComponent = () => (
    <View>
      <Text style={styles.logo}>takee</Text>
      <View style={styles.categoryContainer}>
        {['all', 'cat', 'dog', 'birds'].map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.activeCategory,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.activeText,
              ]}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {pets.length === 0 ? (
        <View style={styles.emptyContainer}>
          <ListHeaderComponent />
          <Text style={styles.emptyText}>No pets available at the moment</Text>
        </View>
      ) : (
        <FlatList
          data={filterPets()}
          numColumns={2}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          ListHeaderComponent={<ListHeaderComponent />}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('Adopt_petdetails', { petId: item.id })}
            >
              <Image 
                source={{ uri: item.petImageUrl ?? '' }} 
                style={styles.petImage} 
              />
              <View style={styles.cardContent}>
                <Text style={styles.petName}>{item.petName ?? ''}</Text>
                <Text style={styles.petAge}>Age: {item.age ?? ''} yrs</Text>
                <Text style={styles.petBreed}>{item.breed ?? ''}</Text>
                <Text style={styles.petSex}>Sex: {item.sex ?? ''}</Text>
                <Text style={styles.petPrice}>
                  ${typeof item.price === 'number' ? item.price.toFixed(2) : '0.00'}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'orange',
    marginVertical: 15,
    textAlign: 'center',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  activeCategory: {
    backgroundColor: 'orange',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
  },
  activeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 20,
    paddingHorizontal: 12,
  },
  card: {
    flex: 1,
    margin: 8,
    borderRadius: 15,
    backgroundColor: '#fff',
    overflow: 'hidden',
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  petImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 12,
  },
  petName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  petAge: {
    fontSize: 12,
    color: '#555',
    marginBottom: 2,
  },
  petBreed: {
    fontSize: 12,
    color: '#555',
    marginBottom: 2,
  },
  petSex: {
    fontSize: 12,
    color: '#555',
    marginBottom: 2,
  },
  petPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'orange',
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 40,
  },
});

export default Adoption;