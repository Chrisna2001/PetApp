import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Sample Data (Hardcoded)
const posts = [
  { id: '1', user: 'CHRISNA', image: require('../../assets/images/img/bird3.jpg'), description: 'My cute puppy!', likes: 5 },
  { id: '2', user: 'ACHU', image: require('../../assets/images/img/cat.png'), description: 'Lazy cat day ', likes: 8 },
  { id: '3', user: 'AMMU', image: require('../../assets/images/img/dog.webp'), description: 'Bird watching ', likes: 3 },
  { id: '4', user: 'APPU', image: require('../../assets/images/img/cat4.jpg'), description: 'Another cat lover ', likes: 10 },
];

const Community = () => {
  const [postList, setPostList] = useState(posts);

  
  const handleLike = (id) => {
    setPostList((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  // Render Each Post
  const renderPost = ({ item }) => (
    <View style={styles.card}>
      {/* User Name */}
      <Text style={styles.username}>{item.user}</Text>

      {/* Post Image */}
      <Image source={item.image} style={styles.image} />

      {/* Description */}
      <Text style={styles.description}>{item.description}</Text>

      {/* Like & Comment Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleLike(item.id)} style={styles.iconButton}>
          <Icon name="favorite" size={24} color="red" />
          <Text style={styles.count}>{item.likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton}>
          <Icon name="chat-bubble-outline" size={24} color="gray" />
          <Text style={styles.count}>Comment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={postList}
      keyExtractor={(item) => item.id}
      renderItem={renderPost}
      showsVerticalScrollIndicator={false}
    />
  );
};


const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    padding: 10,
    elevation: 3,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  description: {
    marginTop: 5,
    fontSize: 14,
    color: '#444',
  },
  actions: {
    flexDirection: 'row',
    marginTop: 10,
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  count: {
    marginLeft: 5,
    fontSize: 14,
  },
});

export default Community;
