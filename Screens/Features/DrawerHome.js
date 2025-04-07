import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';

const petGroomingStores = [
  {
    id: '1',
    name: 'Betterpaws',
    rating: '4.9',
    reviews: 117,
    type: 'Pet groomer',
    location: 'Kakkanad, Kerala',
    closingTime: '9 pm',
    image: require('../../assets/images/img/cat1.jpg'),
  },
  {
    id: '2',
    name: 'Roms N Raks Pet Hypermarket and Grooming',
    rating: '4.6',
    reviews: 294,
    type: 'Pet store',
    location: 'Chittethukara, Seaport - Airport Rd',
    closingTime: '10 pm',
    image: require('../../assets/images/img/cat4.jpg'),
  },
  {
    id: '3',
    name: 'Rainforest Pets & Plants',
    rating: '4.8',
    reviews: 773,
    type: 'Pet groomer',
    location: 'Kakkanad, Kochi, Kerala',
    closingTime: '10 pm',
    image: require('../../assets/images/img/cat.png'),
  },
  {
    id: '4',
    name: 'Roms N Raks Pet Hypermarket and Grooming',
    rating: '4.6',
    reviews: 294,
    type: 'Pet store',
    location: 'Chittethukara, Seaport - Airport Rd',
    closingTime: '10 pm',
    image: require('../../assets/images/img/cat4.jpg'),
  },
  {
    id: '5',
    name: 'Roms N Raks Pet Hypermarket and Grooming',
    rating: '4.6',
    reviews: 294,
    type: 'Pet store',
    location: 'Chittethukara, Seaport - Airport Rd',
    closingTime: '10 pm',
    image: require('../../assets/images/img/cat4.jpg'),
  },
  {
    id: '6',
    name: 'Roms N Raks Pet Hypermarket and Grooming',
    rating: '4.6',
    reviews: 294,
    type: 'Pet store',
    location: 'Chittethukara, Seaport - Airport Rd',
    closingTime: '10 pm',
    image: require('../../assets/images/img/cat4.jpg'),
  },
  {
    id: '7',
    name: 'Roms N Raks Pet Hypermarket and Grooming',
    rating: '4.6',
    reviews: 294,
    type: 'Pet store',
    location: 'Chittethukara, Seaport - Airport Rd',
    closingTime: '10 pm',
    image: require('../../assets/images/img/cat4.jpg'),
  },
  {
    id: '8',
    name: 'Roms N Raks Pet Hypermarket and Grooming',
    rating: '4.6',
    reviews: 294,
    type: 'Pet store',
    location: 'Chittethukara, Seaport - Airport Rd',
    closingTime: '10 pm',
    image: require('../../assets/images/img/cat4.jpg'),
  },
];

const DrawerHome = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pet Grooming Stores</Text>
      <FlatList
        data={petGroomingStores}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.details}>{item.rating}  ({item.reviews}) - {item.type}</Text>
              <Text style={styles.details}>{item.location}</Text>
              <Text style={styles.details}>Open • Closes {item.closingTime}</Text>
            </View>
          </View>
        )}
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
    color:"orange",
    marginTop:50,
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

export default DrawerHome;