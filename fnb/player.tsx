import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

function Player() {
  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar} />
      </View>
      <View style={styles.controlsContainer}>
        <View style={styles.control}>
          <View style={styles.playButton} />
          <View style={styles.stopButton}></View>
          <View style={styles.pauseButton}></View>
        </View>
        <Image
          style={styles.thumbnail}
          source={{ uri: 'https://via.placeholder.com/80x80' }}
        />
        <View style={styles.control}>
          <View style={styles.playButtonReversed} />
          <View style={styles.stopButtonReversed} />
        </View>
      </View>
      <View style={styles.trackInfoContainer}>
        <Text style={styles.trackTitle}>mondo</Text>
      </View>
      <View style={styles.backgroundContainer}>
        <View style={styles.gradientBackground} />
        <View style={styles.whiteBackground} />
        <View style={styles.grayBackground} />
        <View style={styles.pinkBorder} />
      </View>
      <View style={styles.albumCoverContainer}>
        <Image
          style={styles.albumCover}
          source={{ uri: 'https://via.placeholder.com/296x296' }}
        />
        <View style={styles.badgeContainer}>
          <View style={styles.badgeOuter} />
          <View style={styles.badgeInner} />
        </View>
      </View>
      <View style={styles.volumeContainer}>
        <View style={styles.volumeControl}>
          <View style={styles.volumeBar} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: 'white',
  },
  progressBarContainer: {
    width: 360,
    height: 21,
    position: 'absolute',
    top: 667,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBar: {
    width: 108,
    height: 4,
    backgroundColor: '#1D1B20',
    borderRadius: 12,
  },
  controlsContainer: {
    width: 360,
    position: 'absolute',
    top: 629,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  control: {
    width: 24,
    height: 24,
    position: 'relative',
  },
  playButton: {
    width: 18,
    height: 20,
    backgroundColor: 'black',
    position: 'absolute',
    top: 2,
    left: 3,
  },
  stopButton: {
    width: 4,
    height: 0,
    borderColor: 'black',
    borderWidth: 1.2,
    transform: [{ rotate: '45deg' }],
    position: 'absolute',
    top: 4,
    left: 14,
  },
  pauseButton: {
    width: 6,
    height: 0,
    borderColor: 'black',
    borderWidth: 1.2,
    transform: [{ rotate: '-45deg' }],
    position: 'absolute',
    top: 6.24,
    left: 17,
  },
  thumbnail: {
    width: 80,
    height: 80,
  },
  playButtonReversed: {
    width: 18.75,
    height: 25,
    backgroundColor: 'black',
    transform: [{ rotate: '-180deg' }],
    position: 'absolute',
    top: 2.5,
    left: 5,
  },
  stopButtonReversed: {
    width: 18.75,
    height: 25,
    backgroundColor: 'black',
    transform: [{ rotate: '-180deg' }],
    position: 'absolute',
    top: 2,
    left: 5,
  },
  trackInfoContainer: {
    height: 28,
    paddingHorizontal: 22,
    position: 'absolute',
    top: 417,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackTitle: {
    textAlign: 'center',
    color: 'black',
    fontSize: 24,
    fontFamily: 'Roboto',
    fontWeight: '700',
  },
  backgroundContainer: {
    width: 240,
    height: 240,
    position: 'absolute',
    top: 94,
    left: 60,
  },
  gradientBackground: {
    width: 240,
    height: 240,
    backgroundColor: 'linear-gradient(180deg, #FF82C5 0%, #3F00C6 100%)',
    borderRadius: 9999,
  },
  whiteBackground: {
    width: 230,
    height: 230,
    backgroundColor: 'white',
    opacity: 0.5,
    borderRadius: 9999,
    position: 'absolute',
    top: 5,
    left: 5,
  },
  grayBackground: {
    width: 210.09,
    height: 210.09,
    backgroundColor: '#D9D9D9',
    borderRadius: 9999,
    position: 'absolute',
    top: 14.91,
    left: 15,
  },
  pinkBorder: {
    width: 210.09,
    height: 210.09,
    borderColor: '#FF32C7',
    borderWidth: 1,
    borderRadius: 9999,
    position: 'absolute',
    top: 15,
    left: 15,
  },
  albumCoverContainer: {
    width: 296,
    height: 296,
    position: 'absolute',
    top: 66,
    left: 32,
  },
  albumCover: {
    width: 296,
    height: 296,
  },
  badgeContainer: {
    width: 24,
    height: 24,
    position: 'absolute',
    top: 21,
    left: 46,
  },
  badgeOuter: {
    width: 24,
    height: 24,
    backgroundColor: '#E16AFF',
    borderRadius: 9999,
  },
  badgeInner: {
    width: 14,
    height: 14,
    backgroundColor: '#FF9CE3',
    borderRadius: 9999,
    position: 'absolute',
    top: 5,
    left: 5,
  },
  volumeContainer: {
    width: 360,
    height: 24,
    paddingHorizontal: 22,
    position: 'absolute',
    top: 13,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  volumeControl: {
    width: 24,
    height: 24,
  },
  volumeBar: {
    width: 12,
    height: 6,
    borderColor: 'black',
    borderWidth: 3,
    position: 'absolute',
    top: 9,
    left: 6,
  },
});

export default Player;
