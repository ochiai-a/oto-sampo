import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Audio } from 'expo-av';
import FavoriteButton from '../components/FavoriteButton';

export default function MusicGenerater({ closeModal, openDownloader }: { closeModal: () => void; openDownloader: () => void }) {
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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        {/* Close modal on chevron-left click */}
        <TouchableOpacity style={styles.favoriteButton} onPress={closeModal}>
          <FontAwesome name="chevron-left" size={20} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>NOW GENERATING</Text>
        {/* <FavoriteButton /> */}
      </View>

      <View style={styles.container}>
        <View style={styles.circleContainer}>
          {/* The circles will now be layered on top of each other */}
          <View style={styles.outerCircle} />
          <View style={styles.middleCircle} />
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
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
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
    paddingTop: 20,
  },
  circleContainer: {
    width: 240,
    height: 240,
    justifyContent: 'center',  // Centers the circles within the container
    alignItems: 'center',       // Centers the circles horizontally
    position: 'relative',       // This makes sure the child circles are positioned relative to this container
  },
  outerCircle: {
    width: 240,
    height: 240,
    backgroundColor: 'rgba(255, 222, 245, 0.08)',
    borderRadius: 120,
    borderWidth: 0.91,
    borderColor: 'white',
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
    marginTop: 160,
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
