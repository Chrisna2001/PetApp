import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {fetchData} from '../utils/ApiService';
import {useEffect, useState} from 'react';

const Adoption = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [pets, setPets] = useState([]);

  const [loading, setLoading] = useState(true);

  // Fetching data from API
  useEffect(() => {
    fetchPets();
  }, []);

  const filterPets = () => {
    if (selectedCategory === 'all') return pets;
    return pets.filter(pet => pet.type === selectedCategory);
  };
  const fetchPets = async () => {
    try {
      const response = await fetchData('pet-selling/all'); // Replace with your actual API URL
      // const data = await response.json();
      console.log('the data is ---------------->', response);
      setPets(response);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching pets:', error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>takee</Text>

      <View style={styles.categoryContainer}>
        {['all', 'cat', 'dog', 'birds'].map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.activeCategory,
            ]}
            onPress={() => setSelectedCategory(category)}>
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.activeText,
              ]}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={pets}
        numColumns={2}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={styles.card}>
            <TouchableOpacity
              onPress={() => {
                if (item.name === 'Gary') {
                  navigation.navigate('Adopt_petdetails');
                }
              }}>
              <Image source={{uri: item.petImage}} style={styles.petImage} />
            </TouchableOpacity>
            <Text style={styles.petName}>{item.name}</Text>
            <Text style={styles.petAge}>{item.age}</Text>
            <Text style={styles.petBreed}>{item.breed}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Adoption;

// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   Image,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
// } from 'react-native';
// // import {useNavigation} from '@react-navigation/native';
// import {fetchData} from './utils/ApiService';

// const petData = [
//   {
//     id: '1',
//     name: 'Gary',
//     age: '3 years',
//     type: 'dog',
//     breed: 'Yorkshire Terrier',
//     image: require('../assets/images/img/bird2.jpg'),
//   },
//   {
//     id: '1',
//     name: 'Gary',
//     age: '3 years',
//     type: 'dog',
//     breed: 'Yorkshire Terrier',
//     image: require('../assets/images/img/bird2.jpg'),
//   },
//   {
//     id: '1',
//     name: 'Gary',
//     age: '3 years',
//     type: 'dog',
//     breed: 'Yorkshire Terrier',
//     image: require('../assets/images/img/bird2.jpg'),
//   },
//   {
//     id: '1',
//     name: 'Gary',
//     age: '3 years',
//     type: 'dog',
//     breed: 'Yorkshire Terrier',
//     image: require('../assets/images/img/bird2.jpg'),
//   },
//   {
//     id: '1',
//     name: 'Gary',
//     age: '3 years',
//     type: 'dog',
//     breed: 'Yorkshire Terrier',
//     image: require('../assets/images/img/bird2.jpg'),
//   },
//   {
//     id: '1',
//     name: 'Gary',
//     age: '3 years',
//     type: 'dog',
//     breed: 'Yorkshire Terrier',
//     image: require('../assets/images/img/bird2.jpg'),
//   },
//   {
//     id: '1',
//     name: 'Gary',
//     age: '3 years',
//     type: 'dog',
//     breed: 'Yorkshire Terrier',
//     image: require('../assets/images/img/bird2.jpg'),
//   },
//   {
//     id: '1',
//     name: 'Gary',
//     age: '3 years',
//     type: 'dog',
//     breed: 'Yorkshire Terrier',
//     image: require('../assets/images/img/bird2.jpg'),
//   },
//   {
//     id: '1',
//     name: 'Gary',
//     age: '3 years',
//     type: 'dog',
//     breed: 'Yorkshire Terrier',
//     image: require('../assets/images/img/bird2.jpg'),
//   },
// ];

// const Adoption = async () => {
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   // const navigation = useNavigation();
//   const [loading, setLoading] = useState(true); // Loading state
//   const [pets, setPets] = useState([]); // Stores fetched pet data

//   // const filterPets = () => {
//   //   if (selectedCategory === 'all') return pets;
//   //   return petData.filter(pet => pet.type.toLowerCase() === selectedCategory);
//   // };

//   // Fetching data from API
//   // useEffect(() => {
//   //   const fetchPets = async () => {
//   //     try {
//   //       const response = await fetchData('pet-selling/all'); // Replace with your actual API URL
//   //       const data = await response.json();
//   //       console.log('the data is ---------------->', data);
//   //       setPets(data);
//   //       setLoading(false);
//   //     } catch (error) {
//   //       console.error('Error fetching pets:', error);
//   //       setLoading(false);
//   //     }
//   //   };
//   //   fetchPets();
//   // }, []);

//   console.log('the page is adoption');

//   return (
//     <View style={styles.container}>
//       <Text style={styles.logo}>takee</Text>

//       {/* <View style={styles.categoryContainer}>
//         {['all', 'cat', 'dog', 'birds'].map(category => (
//           <TouchableOpacity
//             key={category}
//             style={[
//               styles.categoryButton,
//               selectedCategory === category && styles.activeCategory,
//             ]}
//             onPress={() => setSelectedCategory(category)}>
//             <Text
//               style={[
//                 styles.categoryText,
//                 selectedCategory === category && styles.activeText,
//               ]}>
//               {category.charAt(0).toUpperCase() + category.slice(1)}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View> */}

//       {/* <FlatList
//         data={filterPets()}
//         numColumns={2}
//         keyExtractor={item => item.id}
//         showsVerticalScrollIndicator={false}
//         renderItem={({item}) => (
//           <View style={styles.card}>
//             <TouchableOpacity
//               onPress={() => {
//                 if (item.name === 'Gary') {
//                   navigation.navigate('Adopt_petdetails');
//                 }
//               }}>
//               <Image source={item.image} style={styles.petImage} />
//             </TouchableOpacity>
//             <Text style={styles.petName}>{item.name}</Text>
//             <Text style={styles.petAge}>{item.age}</Text>
//             <Text style={styles.petBreed}>{item.breed}</Text>
//           </View>
//         )}
//       /> */}
//     </View>
//   );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 20,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: '#EAEAEA',
  },
  activeCategory: {
    backgroundColor: '#FF7F50',
  },
  categoryText: {
    fontSize: 16,
    color: '#555',
  },
  activeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 12,
    margin: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
  },
  petImage: {
    width: 120,
    height: 120,
    borderRadius: 15,
    marginBottom: 8,
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  petAge: {
    fontSize: 14,
    color: '#666',
  },
  petBreed: {
    fontSize: 12,
    color: '#888',
  },
});

// export default Adoption;
