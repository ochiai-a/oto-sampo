import React, { useState, useEffect } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { Audio } from "expo-av";
import Gen from '../../src/gen'
import Title from '../../src/fixed/Title';

export default function recording() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingUri, setRecordingUri] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (recording) {
        recording.stopAndUnloadAsync(); // コンポーネントのアンマウント時に録音を停止
      }
    };
  }, [recording]);

  return (
    <ImageBackground 
    source={require('../../assets/images/gen-main.png')} // Replace with your image path
    style={styles.background}
  >
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Title />
      </View>
      <Gen />
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#f5f5f5",
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
