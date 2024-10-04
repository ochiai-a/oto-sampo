import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import Gen from '../../src/gen'
import Title from '../../src/fixed/Title';

export default function recording() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingUri, setRecordingUri] = useState<string | null>(null);

  // 古い録音ファイルを削除する関数
  const deleteOldRecording = async () => {
    if (recordingUri) {
      try {
        await FileSystem.deleteAsync(recordingUri);
        console.log("古い録音ファイルを削除しました:", recordingUri);
      } catch (error) {
        console.error("録音ファイル削除中にエラーが発生しました:", error);
      }
    }
  };

  // 録音開始処理
  const startRecording = async () => {
    try {
      // 古い録音ファイルを削除
      await deleteOldRecording();

      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        console.error("録音の権限がありません");
        return;
      }

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
    } catch (error) {
      console.error("録音中にエラーが発生しました:", error);
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
          const newUri = FileSystem.documentDirectory + "recording.m4a";
          await FileSystem.moveAsync({
            from: uri,
            to: newUri,
          });
          console.log("録音ファイルの新しい URI:", newUri);
          setRecordingUri(newUri);
        }
        setRecording(null);
      }
    } catch (error) {
      console.error("録音停止中にエラーが発生しました:", error);
    }
  };

  useEffect(() => {
    return () => {
      if (recording) {
        recording.stopAndUnloadAsync(); // コンポーネントのアンマウント時に録音を停止
      }
    };
  }, [recording]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Title />
      </View>
      <Gen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  recordingInfo: {
    marginTop: 20,
  },
  titleContainer: {
    paddingTop: 45, 
  },
});
