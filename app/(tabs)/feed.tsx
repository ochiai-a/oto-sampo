import React, { useState, useEffect } from 'react';
import { View, Modal, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import MusicPlayer from '../../src/MusicPlayer';
import Explorer from '../../src/explorer';
import Player from '../../src/player';
import Title from '../../src/fixed/Title';
import { Audio } from 'expo-av';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync(); // Unload sound when component unmounts
        }
      : undefined;
  }, [sound]);

  // Function to play audio
  async function playSound() {
    if (sound) {
      await sound.stopAsync(); // Stop previous sound if playing
    }
    const { sound: newSound } = await Audio.Sound.createAsync(
      require('../../assets/music/mondo_01.mp3') // Replace with the path to your music file
    );
    setSound(newSound);
    setIsPlaying(true);
    await newSound.playAsync();
  }

  // Function to stop audio
  async function stopSound() {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync(); // Unload the sound to free resources
      setSound(null);
      setIsPlaying(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Title />
        </View>
        <Explorer />
        {/* Player component used as a modal button, fixed at the bottom */}
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.playerContainer}>
          <Player />
        </TouchableOpacity>

        {/* Popup Music Player */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            {/* Pass control functions and state to MusicPlayer */}
            <MusicPlayer
              closeModal={() => setModalVisible(false)}
              playSound={playSound}
              stopSound={stopSound}
              isPlaying={isPlaying}
            />
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  modalView: {
    flex: 1,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    paddingTop: 45,
  },
});
