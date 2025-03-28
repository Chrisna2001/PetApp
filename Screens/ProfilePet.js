import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, Picker, StyleSheet } from 'react-native';

const ProfilePet = () => {
    const [petName, setPetName] = useState('');
    const [petAge, setPetAge] = useState('');
    const [petGender, setPetGender] = useState('');
    const [petType, setPetType] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.image} />
                ) : (
                    <Text>Pick an image</Text>
                )}
            </TouchableOpacity>

            <TextInput 
                style={styles.input} 
                placeholder="Pet Name" 
                value={petName} 
                onChangeText={setPetName} 
            />

            <TextInput 
                style={styles.input} 
                placeholder="Age" 
                keyboardType="numeric" 
                value={petAge} 
                onChangeText={setPetAge} 
            />

            <Picker selectedValue={petGender} onValueChange={(itemValue) => setPetGender(itemValue)}>
                <Picker.Item label="Select Gender" value="" />
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
            </Picker>

            <Picker selectedValue={petType} onValueChange={(itemValue) => setPetType(itemValue)}>
                <Picker.Item label="Select Pet Type" value="" />
                <Picker.Item label="Cat" value="cat" />
                <Picker.Item label="Dog" value="dog" />
                <Picker.Item label="Bird" value="bird" />
            </Picker>

            <Picker selectedValue={category} onValueChange={(itemValue) => setCategory(itemValue)}>
                <Picker.Item label="Select Category" value="" />
                <Picker.Item label="Domestic" value="domestic" />
                <Picker.Item label="Wild" value="wild" />
            </Picker>

            <Button title="Save Profile" onPress={() => console.log({ petName, petAge, petGender, petType, category, image })} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    imagePicker: {
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
});

export default ProfilePet;
