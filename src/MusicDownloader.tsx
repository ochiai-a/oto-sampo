import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, SafeAreaView, ImageBackground, Image } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Audio } from 'expo-av';

export default function MusicDownloader({ closeModal, openReviewer }: { closeModal: () => void; openReviewer: () => void }) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  async function playSound() {
    if (sound) {
      await sound.stopAsync();
    }
    const { sound: newSound } = await Audio.Sound.createAsync(
      require('../assets/music/mondo_01.mp3')
    );
    setSound(newSound);
    setIsPlaying(true);
    await newSound.playAsync();
  }

  async function stopSound() {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setIsPlaying(false);
      setSound(null);
    }
  }

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
        <Text style={styles.headerText}>GENERATED</Text>
        <TouchableOpacity style={styles.favoriteButton}>
          <Text style={styles.headerText}>♡</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <TouchableOpacity style={styles.favoriteButton} onPress={closeModal}>
          {/* You can place any other interactive elements inside this TouchableOpacity */}
          <View style={styles.circleContainer}>
          <View style={styles.outerCircle} />
          <Image style={{ width: 240, height: 240 }} source={require('../assets/images/BigCircle.png')} />
          <View style={styles.innerCircle} />
            <TouchableOpacity onPress={closeModal} style={styles.textContainer}>
              <Text style={styles.circleText}>あと1歩です！</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.textcontainer}>
        <View style={styles.titleWrapper}>
          <View style={styles.musicTitle}>
            <TextInput
              style={styles.musicTitle}
              placeholder="✐ ドキドキの発表会"
              placeholderTextColor="#DDDDDD"
            />
          </View>
          <Text style={styles.rating}></Text>
        </View>

        <View style={styles.buttonWrapper}>
          {isPlaying ? (
            <TouchableOpacity style={styles.musicButton} onPress={stopSound}>
              <Image style={{ width: 76, height: 76 }} source={require('../assets/images/playButton1.png')} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.musicButton} onPress={playSound}>
              <Image style={{ width: 76, height: 76 }} source={require('../assets/images/playButton0.png')} />
            </TouchableOpacity>
          )}
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
  },
  safeArea: {
    flex: 1,
    width: '100%',
    // backgroundColor: '#222',
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
  favoriteButton: {},
  container: {
    flex: 1,
    // justifyContent: 'center', // Centers content vertically
    alignItems: 'center', // Centers content horizontally
    paddingTop: 100, // Match this to MusicGenerater
  },
  circleContainer: {
    width: 240,
    height: 240,
    justifyContent: 'center', // Centers the circles within the container
    alignItems: 'center', // Centers the circles horizontally
  },
  outerCircle: {
    width: 245,
    height: 245,
    backgroundColor: 'rgba(255, 222, 245, 0.08)',
    borderRadius: 120,
    borderWidth: 5,
    borderColor: '#FFB5FC',
    position: 'absolute', // Layer this circle on top
  },
  middleCircle: {
    width: 230,
    height: 230,
    backgroundColor: '#FF32C7',
    borderRadius: 115,
    borderWidth: 0.91,
    borderColor: 'white',
    position: 'absolute', // Layer this circle on top
  },
  innerCircle: {
    width: 210,
    height: 210,
    borderRadius: 105,
    borderWidth: 1,
    borderColor: 'white',
    position: 'absolute', // Layer this circle on top
  },
  textcontainer: {
    flex: 1,
    // justifyContent: 'center', // Centers content vertically
    alignItems: 'center', // Centers content horizontally
  },
  textContainer: {
    position: 'absolute', // This allows the text to overlay on the circles
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    color: 'white',
  },
  titleWrapper: {
    alignItems: 'center',
    // marginTop: 100, // Adjust to match your design needs
    paddingVertical: 10,
  },
  musicTitle: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 24,
    alignItems: 'center',
    paddingVertical: 10,
    textAlign: 'center', // Center text inside the TextInput
  },
  rating: {
    color: 'white',
    fontWeight: '300',
    fontSize: 16,
  },
  buttonWrapper: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 20,
    justifyContent: 'center',
  },
  musicButton: {
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
});
