import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Audio } from 'expo-av';
// import FavoriteButton from '../components/FavoriteButton';

export default function MusicPlayer({ closeModal }: { closeModal: () => void }) {
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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.favoriteButton} onPress={closeModal}>
          <FontAwesome name="chevron-left" size={20} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>REVIEW</Text>
        <TouchableOpacity style={styles.favoriteButton}>
          <Text>♡</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View style={styles.circleContainer}>
          <View style={styles.outerCircle} />
          <View style={styles.middleCircle} />
          <View style={styles.innerCircle} />
          <Text style={styles.circleText}>ここをクリックして保存</Text>
        </View>

        <View style={styles.titleWrapper}>
          <Text style={styles.musicTitle}>✐感想を入力してください</Text>
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
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: '100%',
    backgroundColor: '#222',
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
    width: 240,
    height: 240,
    backgroundColor: 'rgba(255, 222, 245, 0.08)',
    borderRadius: 120,
    borderWidth: 0.91,
    borderColor: 'white',
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
  circleText: {
    color: 'white',
  },
  titleWrapper: {
    alignItems: 'center',
    marginTop: 100, // Adjust to match your design needs
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
    marginTop: 40,
    justifyContent: 'center',
  },
  musicButton: {
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
});
