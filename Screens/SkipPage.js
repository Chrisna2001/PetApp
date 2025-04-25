import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const {width, height} = Dimensions.get('window');

const images = [
  require('../assets/images/img/cat1.jpg'),
  require('../assets/images/img/dog3.jpg'),
  require('../assets/images/img/cat4.jpg'),
  require('../assets/images/img/petadopt.jpg'),
];

const SkipPage = ({navigation}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = (currentImageIndex + 1) % images.length;
      setCurrentImageIndex(nextIndex);
      flatListRef.current?.scrollToIndex({index: nextIndex, animated: true});
    }, 3000);

    return () => clearInterval(interval);
  }, [currentImageIndex]);

  const onViewableItemsChanged = useRef(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setCurrentImageIndex(viewableItems[0].index);
    }
  }).current;

  return (
    <ScrollView contentContainerStyle={styles.container}>
  
      <TouchableOpacity
        style={styles.drawerIcon}
        onPress={() => navigation.CustomDrawerContent()}>
        <MaterialIcons name="menu" size={30} color="black" />
      </TouchableOpacity>

     
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <Image source={item} style={styles.bannerImage} />
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{viewAreaCoveragePercentThreshold: 50}}
      />

    
      <View style={styles.dotsContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentImageIndex === index && styles.activeDot,
            ]}
          />
        ))}
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>Add your pet</Text>
        <Text style={styles.description}>
          Join our pet-loving community today!
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
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
    height: height * 0.4,
    width: width - 40,
    borderRadius: 15,
    resizeMode: 'cover',
    marginTop: 40,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#bbb',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: 'orange',
    width: 10,
    height: 10,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 15,
  },
  title: {
    color: 'orange',
    fontWeight: 'bold',
    fontSize: 24,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  button: {
    backgroundColor: 'orange',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SkipPage;
