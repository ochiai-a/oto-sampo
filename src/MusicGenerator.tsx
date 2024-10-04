import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ImageBackground, Image } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Audio } from 'expo-av';

export default function MusicGenerater({ closeModal }: { closeModal: () => void }) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <ImageBackground 
    source={require('../assets/images/gen-rec.png')} // Background image path
    style={styles.background}
  >
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.favoriteButton} onPress={closeModal}>
          <FontAwesome name="chevron-left" size={20} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>NOW GENERATING</Text>
        <TouchableOpacity style={styles.favoriteButton}>
          <Text style={styles.headerText}>♡</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View style={styles.circleContainer}>
          <View style={styles.outerCircle} />
          <Image style={{ width: 240, height: 240 }} source={require('../assets/images/BigCircle.png')} />
          <View style={styles.innerCircle} />
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.musicTitle}>あなたの音を作っています</Text>
          <Text style={styles.rating}>しばらくお待ちください</Text>
        </View>
      </View>
    </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover", // Cover the entire screen
    width: '100%',
    paddingTop: 45
  },
  safeArea: {
    flex: 1,
    // backgroundColor: '#222',
    width: '100%',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
  },
  headerText: {
    color: 'white',
    fontWeight: '300',
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
  },
  favoriteButton: {
    color: 'white',
  },
  container: {
    paddingTop: 100,
    flex: 1,  // Added to make the container take full height
    // justifyContent: 'center', // Centers the content vertically
    alignItems: 'center', // Centers the content horizontally
  },
  circleContainer: {
    width: 240,
    height: 240,
    justifyContent: 'center',  // Centers the circles within the container
    alignItems: 'center',       // Centers the circles horizontally
  },
  outerCircle: {
    width: 245,
    height: 245,
    backgroundColor: 'rgba(255, 222, 245, 0.08)',
    borderRadius: 120,
    borderWidth: 5,
    borderColor: '#FFB5FC',
    position: 'absolute',  // Layer this circle on top
  },
  middleCircle: {
    width: 230,
    height: 230,
    backgroundColor: '#FF32C7',
    borderRadius: 115,
    borderWidth: 0.91,
    borderColor: 'white',
    position: 'absolute',  // Layer this circle on top
  },
  innerCircle: {
    width: 210,
    height: 210,
    borderRadius: 105,
    borderWidth: 1,
    borderColor: 'white',
    position: 'absolute',  // Layer this circle on top
  },
  titleWrapper: {
    alignItems: 'center',
    marginTop: 20, // Adjust margin if necessary
    paddingVertical: 10,
  },
  musicTitle: {
    color: 'white',
    fontWeight: '600',
    fontSize: 20,
    paddingVertical: 10,
  },
  rating: {
    color: 'white',
    fontWeight: '300',
    fontSize: 16,
  },
  buttonWrapper: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'center',
  },
  musicButton: {
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
});
