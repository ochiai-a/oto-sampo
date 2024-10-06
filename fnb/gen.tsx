import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function DoGen() {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <View style={styles.icon} />
      </View>
      <Text style={styles.label}>音作り</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 64,
    height: 64,
    paddingBottom: 4,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4, // gap プロパティは React Native には存在しないため、代わりに margin などで調整
  },
  iconContainer: {
    width: 24,
    height: 24,
    position: 'relative',
  },
  icon: {
    width: 20,
    height: 20,
    backgroundColor: 'black',
  },
  label: {
    color: 'black',
    fontSize: 12,
    fontFamily: 'Roboto', // このフォントが利用可能であることを確認する必要があります
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default DoGen;
