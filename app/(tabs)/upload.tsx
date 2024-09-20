import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

export default function Recording() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingUri, setRecordingUri] = useState<string | null>(null);

  // 古い録音ファイルを削除する関数
  const deleteOldRecording = async () => {
    if (recordingUri) {
      try {
        await FileSystem.deleteAsync(recordingUri);
        console.log('古い録音ファイルを削除しました:', recordingUri);
      } catch (error) {
        console.error('録音ファイル削除中にエラーが発生しました:', error);
      }
    }
  };

  // 録音開始処理
  const startRecording = async () => {
    try {
      await deleteOldRecording();

      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        console.error('録音の権限がありません');
        return;
      }

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
    } catch (error) {
      console.error('録音中にエラーが発生しました:', error);
    }
  };

  // 録音停止処理
  const stopRecording = async () => {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        setIsRecording(false);
        const uri = recording.getURI();
        if (uri) {
          const newUri = FileSystem.documentDirectory + 'recording.m4a';
          await FileSystem.moveAsync({
            from: uri,
            to: newUri,
          });
          console.log('録音ファイルの新しい URI:', newUri);
          setRecordingUri(newUri);
          await uploadToS3(newUri); // S3にアップロード
        }
        setRecording(null);
      }
    } catch (error) {
      console.error('録音停止中にエラーが発生しました:', error);
    }
  };

  // S3にアップロードする関数
  const uploadToS3 = async (fileUri: string) => {
    const fileName = `your-filename-${new Date().toISOString()}.m4a`; // 日時を付与したファイル名
    const bucket = 'input-mp3-bucket';
    const url = 'https://d2t6chwvgk9bup.cloudfront.net';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bucket: bucket,
          filename: fileName,
          filedata: await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.Base64 }),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('ファイルがS3にアップロードされました:', data);
      } else {
        console.error('S3へのアップロード中にエラーが発生しました:', response);
      }
    } catch (error) {
      console.error('S3へのアップロード中にエラーが発生しました:', error);
    }
  };

  useEffect(() => {
    return () => {
      if (recording) {
        recording.stopAndUnloadAsync();
      }
    };
  }, [recording]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>録音画面</Text>
      {isRecording ? (
        <TouchableOpacity style={styles.button} onPress={stopRecording}>
          <Text style={styles.buttonText}>録音停止</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={startRecording}>
          <Text style={styles.buttonText}>録音開始</Text>
        </TouchableOpacity>
      )}
      {recordingUri && (
        <View style={styles.recordingInfo}>
          <Text>録音完了!</Text>
          <Text>録音ファイル: {recordingUri}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  recordingInfo: {
    marginTop: 20,
  },
});
