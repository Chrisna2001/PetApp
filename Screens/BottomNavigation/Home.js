import React, {useEffect, useState} from 'react';
import Drawer from '../Drawer/CustomDrawerContent'; 
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {API_URL} from 'react-native-dotenv';
import axios from 'axios';
import AppNavigator from '../Drawer/AppNavigator';
// import {fetchData} from './utils/ApiService';     
import {fetchData} from '../utils/ApiService';

const carouselData = [  
  {
    id: '1',
    name: 'Adopte Pet',
    image: require('../../assets/images/img/petadopt.jpg'),
  },
  {
    id: '2',
    name: 'pet selling',
    image: require('../../assets/images/img/adoption.jpg'),
  },
  {
    id: '3',
    name: 'Grooming',
    image: require('../../assets/images/img/pet_grooming.jpg'),
  },
  {
    id: '4',
    name: 'Kennels',
    image: require('../../assets/images/img/kennel.jpg'),
  },
  {
    id: '5',
    name: 'Breeding',
    image: require('../../assets/images/img/breeding.webp'),
  },
  {
    id: '6',
    name: 'Pet Products',
    image: require('../../assets/images/img/pet_store.webp'),
  },
  {
    id: '7',
    name: 'Pet Activities',
    image: require('../../assets/images/img/activity.png'),
  },
  {
    id: '8',
    name: 'Pet Missing',
    image: require('../../assets/images/img/Petmissing.jpg'),
  },
];

const Home = ({navigation}) => {
  const [petProfiles, setPetProfiles] = useState([]);
  const [error, setError] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);

  useEffect(() => {
    const getPetProfiles = async () => {
      try {
        //  const response = await fetchData('pet-profile/all');

        const response = await fetch(
          'https://71e0-2401-4900-1cdf-fe55-7d1d-679f-5133-318f.ngrok-free.app/pet-profile/all',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        
        const data = await response.json();
        console.log(data);
        setPetProfiles(data);
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch pet profiles:', err);
      }
    };

    getPetProfiles();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
  style={styles.drawerIcon}
  onPress={() => navigation.openDrawer()}>
  <MaterialIcons name="menu" size={30} color="black" />
</TouchableOpacity>
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginRight: 60}}>
        <View style={{alignItems: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../../assets/images/img/cat5.jpg')}
              style={[
                styles.bannerImage,
                {width: 60, height: 60, borderRadius: 30, marginRight: 10},
              ]}
            />
            <View style={{justifyContent: 'center', marginTop: 50}}>
              <Text
                style={{
                  fontSize: 50,
                  fontWeight: 'bold',
                  lineHeight: 40,
                  color: 'orange',
                }}>
                Welcome
              </Text>
              <Text
                style={{
                  fontSize: 30,
                  color: 'gray',
                  lineHeight: 30,
                  marginTop: 10,
                }}>
                CHRISNA
              </Text>
            </View>
          </View>
        </View>
      </View>
      <Text style={styles.title}>Add your pet</Text>

      <View style={styles.iconWithImagesContainer}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate('Petpro')}>
          <MaterialIcons name="add" size={24} color="white" />
        </TouchableOpacity>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.imageScrollView}>
          {petProfiles.map((pet, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectedPet(pet);
                navigation.navigate('PetDisplay', {petId: pet.id});
              }}
              style={[
                styles.imageContainer,
                selectedPet === pet && styles.selectedBorder,
              ]}>
              <Image
                source={{uri: pet.profilePicture}}
                style={styles.smallImage}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <Text style={styles.featuresText}>Features</Text>

      <View style={styles.listContainer}>
        {carouselData.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => {
              if (item.id === '1') {
                navigation.navigate('Adoption');
              } else if (item.id === '2') {
                navigation.navigate('PetSell');
              } else if (item.id === '3') {
                navigation.navigate('Grooming');
              } else if (item.id === '8') {
                navigation.navigate('PetMissing');
              } else if (item.id === '7') {
                navigation.navigate('PetEvent');
              } else {
                console.log('Invalid ID');
              }
            }}>
            <Image source={item.image} style={styles.gridImage} />
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 30,
    backgroundColor: '#f8f9fa',
  },
  drawerIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10,
  },
  bannerImage: {
    height: 180,
    width: '100%',
    borderRadius: 15,
    resizeMode: 'cover',
    marginTop: 40,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    color: 'orange',
    marginTop: 15,
    fontWeight: 'bold',
    fontSize: 24,
    alignSelf: 'flex-start',
  },
  iconWithImagesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    alignSelf: 'flex-start',
  },
  iconContainer: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    elevation: 5,
  },
  imageScrollView: {
    marginLeft: 10,
  },
  imageContainer: {
    marginHorizontal: 5,
    borderRadius: 30,
    overflow: 'hidden',
  },
  smallImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  selectedBorder: {
    borderWidth: 2,
    borderColor: 'blue',
  },
  featuresText: {
    color: 'orange',
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 28,
    alignSelf: 'flex-start',
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 12,
    marginVertical: 8,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  gridImage: {
    width: '100%',
    height: 130,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 6,
  },
});

export default Home;
