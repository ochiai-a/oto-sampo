import React, { useState, useRef } from 'react';
import { View, Modal, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import MusicPlayer from '../../src/MusicPlayer';
import Explorer from '../../src/explorer';
import Player from '../../src/player';
import Title from '../../src/fixed/Title';
import { Audio } from 'expo-av';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const soundRef = useRef<Audio.Sound | null>(null); // Ref to store the sound object
  const [isPlaying, setIsPlaying] = useState(false); // State to track if audio is playing

  async function playSound() {
    if (soundRef.current) {
      await soundRef.current.stopAsync();
    }
    
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/music/mondo_01.mp3'), // Adjust path as necessary
      {
        shouldPlay: true,
        staysActiveInBackground: true, // Ensures sound plays even in background
        playsInSilentModeIOS: true,    // Ensures sound plays in silent mode on iOS
      }
    );
    
    soundRef.current = sound;
    setIsPlaying(true);
    await sound.playAsync();
  }

  async function stopSound() {
    if (soundRef.current) {
      await soundRef.current.stopAsync();
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
            {/* Pass control functions to MusicPlayer */}
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
    backgroundColor: '#fff', // Customize this as per your need
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
