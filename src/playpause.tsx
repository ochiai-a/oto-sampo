import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

function Playpause() {
  return (
    <View style={styles.container}>
      <View style={styles.leftButtons}>
        <View style={styles.button}>
          <View style={styles.leftButtonInner} />
        </View>
        <View style={[styles.button, styles.rightButton]}>
          <View style={styles.leftButtonInner} />
        </View>
      </View>
      <Image
        style={styles.image}
        source={{ uri: 'https://via.placeholder.com/80x80' }}
      />
      <View style={styles.rightButtons}>
        <View style={[styles.button, styles.invertedButton]}>
          <View style={styles.leftButtonInner} />
        </View>
        <View style={[styles.button, styles.invertedButton, styles.rightInvertedButton]}>
          <View style={styles.leftButtonInner} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },
  leftButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: 45,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  leftButtonInner: {
    width: 18.75,
    height: 25,
    backgroundColor: 'black',
    position: 'absolute',
    top: 2.5,
    left: 5,
  },
  rightButton: {
    marginLeft: 15,
  },
  invertedButton: {
    transform: [{ rotate: '-180deg' }],
  },
  rightInvertedButton: {
    marginLeft: 15,
  },
  image: {
    width: 80,
    height: 80,
  },
});

export default Playpause;
