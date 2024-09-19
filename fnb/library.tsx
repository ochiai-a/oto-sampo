import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function GoLib() {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <View style={styles.outerCircle}>
          <View style={styles.innerCircle} />
        </View>
      </View>
      <Text style={styles.label}>ライブラリ</Text>
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
    // gap プロパティは React Native には存在しないため、代わりに margin などで調整
  },
  iconContainer: {
    width: 32,
    height: 32,
    position: 'relative',
  },
  outerCircle: {
    width: 32,
    height: 32,
    backgroundColor: '#2C2C2C',
    borderRadius: 16, // 半径の値は width/2 で指定
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  innerCircle: {
    width: 20,
    height: 20,
    backgroundColor: 'white',
    borderRadius: 10, // 半径の値は width/2 で指定
    position: 'absolute',
    left: 6,
    top: 6,
  },
  label: {
    color: 'black',
    fontSize: 12,
    fontFamily: 'Roboto', // このフォントが利用可能であることを確認する必要があります
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default GoLib;
