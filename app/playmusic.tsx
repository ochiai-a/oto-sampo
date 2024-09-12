import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import { Audio } from 'expo-av';

// アプリ
const App: React.FC = () => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  // 初期化
  useEffect(() => {
    // アンロード
    return sound
      ? () => {
          sound.unloadAsync(); 
        }
      : undefined;
  }, [sound]);
  
  // オーディオの再生
  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
       require('../../assets/music/mondo_01.mp3')
    );
    setSound(sound);

    await sound.playAsync(); 
  }

  // UI
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="オーディオの再生" onPress={playSound} />
    </View>
  );
}

export default App;