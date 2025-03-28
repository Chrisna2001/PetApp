import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const Adopt_petdetails = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Image source={require('../assets/images/img/cat.png')} style={styles.image} />
        
        <View style={styles.details}>
          <Text style={styles.name}>Momo</Text>
          
          <View style={styles.infoRow}>
            <InfoBox label="Age" value="2y" />
            <InfoBox label="Sex" value="Male" />
            <InfoBox label="Color" value="Gray" />
            <InfoBox label="Weight" value="4 kg" />
          </View>
          
          <View style={styles.ownerContainer}>
           
            <View>
              <Text style={styles.ownerName}>Melissa</Text>
              <Text style={styles.ownerRole}>Owner</Text>
            </View>
          </View>
          
          <Text style={styles.description}>
            Since cause of my job relocation. I am forced to move out of town where I cannot afford to have a pet in that apartment, hence looking for a safe shelter to give my pet away.
          </Text>
          
          <TouchableOpacity style={styles.adoptButton}>
            <Text style={styles.adoptButtonText}>Adopt</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const InfoBox = ({ label, value }) => (
  <View style={styles.infoBox}>
    <Text style={styles.infoValue}>{value}</Text>
    <Text style={styles.infoLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    margin: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: '90%',
    height: 200,
    borderRadius: 10,
    marginTop: 15,
  },
  details: {
    width: '90%',
    marginTop: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FF8C00',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  infoBox: {
    alignItems: 'center',
  },
  infoValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoLabel: {
    fontSize: 14,
    color: 'gray',
  },
  ownerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ownerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  ownerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ownerRole: {
    fontSize: 12,
    color: 'gray',
  },
  description: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 15,
  },
  adoptButton: {
    backgroundColor: '#FF8C00',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  adoptButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Adopt_petdetails;
