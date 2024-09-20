import React, { useState } from 'react';
import { View, Button, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';
import * as Sharing from 'expo-sharing';

const App = () => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [fileUri, setFileUri] = useState<string | null>(null);

  const downloadFile = async () => {
    const url = 'https://audiopipe.suno.ai/?item_id=834c0960-5e58-478e-9752-d6aeca98002e';
    const downloadsDirectory = `${FileSystem.documentDirectory}Download/`;
    const downloadDest = `${downloadsDirectory}downloadedFile.mp3`;

    // ダウンロードフォルダを作成
    await FileSystem.makeDirectoryAsync(downloadsDirectory, { intermediates: true });

    try {
      const { uri } = await FileSystem.downloadAsync(url, downloadDest);
      setFileUri(uri);
      Alert.alert('ダウンロード成功', `ファイルが保存されました: ${uri}`);
    } catch (error) {
      console.error(error);
      Alert.alert('エラー', 'ファイルのダウンロード中にエラーが発生しました。');
    }
  };

  const playSound = async () => {
    if (!fileUri) {
      Alert.alert('エラー', '再生するファイルがありません。');
      return;
    }

    const { sound } = await Audio.Sound.createAsync({ uri: fileUri });
    setSound(sound);
    await sound.playAsync();
  };

  const shareFile = async () => {
    if (!fileUri) {
      Alert.alert('エラー', 'シェアするファイルがありません。');
      return;
    }

    try {
      await Sharing.shareAsync(fileUri);
    } catch (error) {
      console.error(error);
      Alert.alert('エラー', 'ファイルのシェア中にエラーが発生しました。');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="ファイルをダウンロード" onPress={downloadFile} />
      <Button title="音楽を再生" onPress={playSound} disabled={!fileUri} />
      <Button title="ファイルをシェア" onPress={shareFile} disabled={!fileUri} />
    </View>
  );
};

export default App;
