import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

function Player() {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>mondo</Text>
        <Text style={styles.rating}>☆ ☆ ☆ ☆ ☆</Text>
      </View>
      <View style={styles.iconsContainer}>
        <View style={styles.icon}>
          <Image style={{ width: 24, height: 24 }} source={require('../assets/images/get-played.png')} />
        </View>
        <View style={styles.icon}>
          <Image style={{ width: 24, height: 24 }} source={require('../assets/images/get-skipped.png')} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 64,
    paddingRight: 20,
    backgroundColor: '#F3EDF7',
    flexDirection: 'row',
    alignItems: 'center',  // 水平方向の中央揃え
    justifyContent: 'center', // 垂直方向の中央揃え
    gap: 16,
    position: 'absolute',
    bottom: 0,
    zIndex: 1000,
    overflow: 'hidden',
  },
  infoContainer: {
    width: 264,
    paddingLeft: 22,
    paddingRight: 11,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    position: 'relative',
  },
  title: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  rating: {
    color: '#595959',
    fontSize: 12,
    fontFamily: 'Roboto',
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 0.4,
    marginTop: 4, // Adjust spacing between title and rating
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    position: 'relative',
  },
  icon: {
    width: 24,
    height: 24,
    position: 'relative',
  },
  playIcon: {
    width: 14,
    height: 14,
    transform: [{ rotate: '90deg' }],
    backgroundColor: 'black',
  },
  pauseIcon: {
    width: 13,
    height: 12,
    backgroundColor: '#1D1B20',
  },
});

export default Player;
