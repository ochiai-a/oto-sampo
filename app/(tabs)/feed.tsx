import React, { useState } from 'react';
import { View, Modal, StyleSheet, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import MusicPlayer from '../../src/MusicPlayer';
import Explorer from '../../src/explorer';
import Player from '../../src/player';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
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
            {/* Pass setModalVisible to MusicPlayer */}
            <MusicPlayer closeModal={() => setModalVisible(false)} />
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
    padding: 10, // Padding for some spacing
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  modalView: {
    flex: 1,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
