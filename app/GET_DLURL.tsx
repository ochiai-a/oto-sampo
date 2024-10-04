import React, { useState } from 'react';
import { View, Text, Button, Alert, TextInput, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';  // Audioモジュールをインポート

// MusicDownloadComponent コンポーネント
const MusicDownloadComponent: React.FC = () => {
  const [s3FileName, setS3FileName] = useState<string>('');  // 入力されたファイル名を保存
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [sound, setSound] = useState<Audio.Sound | null>(null);  // Audio.Soundの状態を管理
  const maxRetries = 5;

  // ダウンロードURL取得リクエスト
  const getPresignedURL = async () => {
    try {
      const response = await fetch('https://ihce7qjrhd.execute-api.ap-northeast-1.amazonaws.com/dev/api/getMusicDownloadPresignedURL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          file_name: s3FileName,  // ユーザー入力値を使用
        }),
      });

      if (!response.ok) {
        throw new Error('URL取得に失敗しました');
      }

      const data = await response.json();

      if (data.url) {
        setDownloadUrl(data.url);
        Alert.alert('URL取得成功', 'ダウンロードが開始されます');
        downloadMusic(data.url);
      } else {
        throw new Error('URLが存在しません');
      }
    } catch (error) {
      console.error('Presigned URL取得エラー:', error);
      if (retryCount < maxRetries) {
        setTimeout(() => {
          setRetryCount(retryCount + 1);
          getPresignedURL();
        }, 20000);  // 20秒後に再試行
      } else {
        Alert.alert('失敗', 'ダウンロードURLの取得に失敗しました');
      }
    }
  };

  // 音楽をダウンロードする関数 (urlの型をstringに指定)
  const downloadMusic = async (url: string) => {
    const fileUri = FileSystem.documentDirectory + s3FileName;
    try {
      const downloadResumable = FileSystem.createDownloadResumable(
        url,
        fileUri,
        {},
        (downloadProgress) => {
          const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
          console.log(`Download progress: ${progress * 100}%`);
        }
      );

      const result = await downloadResumable.downloadAsync();
      
      // resultがundefinedでないことを確認し、uriプロパティを使用
      if (result && result.uri) {
        Alert.alert('ダウンロード完了', `ファイルが保存されました: ${result.uri}`);
      } else {
        throw new Error('ファイルの保存に失敗しました');
      }
    } catch (error) {
      console.error('ダウンロードエラー:', error);
    }
  };

  // 音楽を再生する関数
  const playSound = async () => {
    if (!downloadUrl) {
      Alert.alert('エラー', '音楽ファイルがダウンロードされていません');
      return;
    }

    const fileUri = FileSystem.documentDirectory + s3FileName;
    const { sound } = await Audio.Sound.createAsync({ uri: fileUri });  // URIから音声を読み込む
    setSound(sound);
    await sound.playAsync();  // 音声を再生
  };

  return (
    <View style={styles.container}>
      <Text>ダウンロードするファイル名を入力してください:</Text>
      <TextInput
        style={styles.input}
        value={s3FileName}
        onChangeText={setS3FileName}
        placeholder="ファイル名を入力"
      />
      <Button
        title="ダウンロード開始"
        onPress={getPresignedURL}
        disabled={!s3FileName || downloadUrl !== null}
      />
      <Button
        title="音楽を再生"
        onPress={playSound}
        disabled={!downloadUrl}  // ダウンロードURLがある場合のみ有効
      />
    </View>
  );
};

// スタイル
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default MusicDownloadComponent;
