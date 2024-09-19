import React, { useState } from 'react';
import SplashScreen from '../../src/splashscreen';
import Library from '../../src/library';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function App() {
  const [screen, setScreen] = useState('splash'); // 初期画面

  const handleClick = () => {
    setScreen('other'); // 他の画面に切り替え
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleClick} style={styles.button}>
        <Text style={styles.buttonText}>Switch Screen</Text>
      </TouchableOpacity>
      {/* スクリーンの切り替え */}
      {screen === 'splash' && <SplashScreen />}
      {screen === 'other' && <Library />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default App;
