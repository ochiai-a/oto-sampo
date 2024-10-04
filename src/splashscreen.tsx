import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function SplashScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        <View style={styles.outerCircle} />
        <View style={styles.middleCircle} />
        <View style={styles.innerCircle} />
      </View>
      <Text style={styles.text}>OTOSANPO♪</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
    fontFamily: 'Roboto', // フォントファミリーはReact Nativeでサポートされていないため、スタイルシートでは使用しない
  },
  circleContainer: {
    width: 240,
    height: 240,
    position: 'relative',
  },
  outerCircle: {
    width: 240,
    height: 240,
    position: 'absolute',
    backgroundColor: 'rgba(255, 222, 245, 0.08)',
    borderRadius: 120, // 円の半径を設定
    borderWidth: 0.91,
    borderColor: 'white',
  },
  middleCircle: {
    width: 230,
    height: 230,
    position: 'absolute',
    backgroundColor: 'linear-gradient(242deg, #FF32C7 0%, #5642DD 100%)', // React Nativeではlinear-gradientは別途ライブラリが必要
    borderRadius: 115,
    borderWidth: 0.91,
    borderColor: 'white',
    top: 5,
    left: 5,
  },







  
  innerCircle: {
    width: 210,
    height: 210,
    position: 'absolute',
    borderRadius: 105,
    borderWidth: 1,
    borderColor: 'white',
    top: 15,
    left: 15,
  },
  text: {
    position: 'absolute',
    color: 'white',
    fontSize: 24,
    fontWeight: '200',
    letterSpacing: 2.88,
    textAlign: 'center',
  },
});

export default SplashScreen;
