import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

export default function RecordingScreen() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingUri, setRecordingUri] = useState<string | null>(null);
  const [playbackObject, setPlaybackObject] = useState<Audio.Sound | null>(null);
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
      // 古い録音ファイルを削除
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
          // 録音ファイルをMP4形式で保存
          const newUri = FileSystem.documentDirectory + 'recording.m4a';
          await FileSystem.moveAsync({
            from: uri,
            to: newUri,
          });
          console.log('録音ファイルの新しい URI:', newUri);
          setRecordingUri(newUri);
        }
        setRecording(null);
      }
    } catch (error) {
      console.error('録音停止中にエラーが発生しました:', error);
    }
  };

  // 録音ファイルを再生する関数
  const playRecording = async () => {
    try {
      if (recordingUri) {
        const { sound } = await Audio.Sound.createAsync({ uri: recordingUri });
        setPlaybackObject(sound);
        await sound.playAsync();
      }
    } catch (error) {
      console.error('再生中にエラーが発生しました:', error);
    }
  };

  // 再生中の録音を停止する関数
  const stopPlayback = async () => {
    try {
      if (playbackObject) {
        await playbackObject.stopAsync();
        setPlaybackObject(null);
      }
    } catch (error) {
      console.error('再生停止中にエラーが発生しました:', error);
    }
  };

  useEffect(() => {
    return () => {
      if (recording) {
        recording.stopAndUnloadAsync(); // コンポーネントのアンマウント時に録音を停止
      }
      if (playbackObject) {
        playbackObject.stopAsync(); // コンポーネントのアンマウント時に再生を停止
      }
    };
  }, [recording, playbackObject]);

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
          <TouchableOpacity style={styles.button} onPress={playRecording}>
            <Text style={styles.buttonText}>再生</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={stopPlayback}>
            <Text style={styles.buttonText}>停止</Text>
          </TouchableOpacity>
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
    margin: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  recordingInfo: {
    marginTop: 20,
  },
});
