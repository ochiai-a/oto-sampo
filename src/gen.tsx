import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Modal } from "react-native";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import MusicGenerater from "./MusicGenerator";  // Import the MusicGenerater component
import MusicDownloader from "./MusicDownloader"; // Import the MusicDownloader component
import MusicReviewer from "./MusicReviewer"; // Import the MusicReviewer component

const Gen: React.FC = () => {
  const [selectedTempo, setSelectedTempo] = useState<string>("普通");
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([]);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingUri, setRecordingUri] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [secondModalVisible, setSecondModalVisible] = useState<boolean>(false);
  const [thirdModalVisible, setThirdModalVisible] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string | null>(null); // Add state for file name
  const [uploadUrl, setUploadUrl] = useState<string | null>(null); // Add state for upload URL
  const userId = "OTOtest"; // ここでユーザーIDを定義

  // Delete old recording file
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

  // Start recording
  const startRecording = async () => {
    try {
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

  // Stop recording and show modal
  const stopRecording = async () => {
    setModalVisible(true);
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        setIsRecording(false);
        const uri = recording.getURI();
        if (uri) {
          const newUri = FileSystem.documentDirectory + "recording.m4a";
          await FileSystem.moveAsync({
            from: uri,
            to: newUri,
          });
          console.log("録音ファイルの新しい URI:", newUri);
          setRecordingUri(newUri);
          await getPresignedURL(); // Call getPresignedURL here
        }
        setRecording(null);
      }
    } catch (error) {
      console.error("録音停止中にエラーが発生しました:", error);
    }
  };

  // 1. Presigned URLを取得する関数
  const getPresignedURL = async () => {
    try {
      const response = await fetch('https://ihce7qjrhd.execute-api.ap-northeast-1.amazonaws.com/dev/api/getSoundUploadPresignedURL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId, // 固定されたuserIdを使用
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setFileName(data.file_name);
        setUploadUrl(data.upload_url);
      } else {
        Alert.alert('Error', data.message || 'Something went wrong');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Error', 'An unknown error occurred.');
      }
    }
  };

  useEffect(() => {
    return () => {
      if (recording) {
        recording.stopAndUnloadAsync(); // Stop recording on component unmount
      }
    };
  }, [recording]);

  const handleTempoSelect = (tempo: string) => {
    setSelectedTempo(tempo);
  };

  const handleInstrumentSelect = (instrument: string) => {
    setSelectedInstruments((prev) =>
      prev.includes(instrument) ? prev.filter(i => i !== instrument) : [...prev, instrument]
    );
  };

  const openMusicDownloader = () => {
    setModalVisible(false);
    setSecondModalVisible(true);
  };

  const closeMusicDownloader = () => {
    setSecondModalVisible(false);
  };

  const openMusicReviewer = () => {
    setModalVisible(false);
    setThirdModalVisible(true);
  };

  const closeMusicReviewer = () => {
    setThirdModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>どんな音を作りますか？</Text>
      <View style={styles.optionWrapper}>
        <Text style={styles.optionLabel}>テンポ</Text>
        <View style={styles.optionRow}>
          {["遅い", "普通", "早い"].map((tempo) => (
            <TouchableOpacity
              key={tempo}
              style={[styles.optionItem, selectedTempo === tempo ? styles.optionSelected : null]}
              onPress={() => handleTempoSelect(tempo)}
            >
              <Text style={styles.optionText}>{tempo}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.optionWrapper}>
        <Text style={styles.optionLabel}>楽器</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {["ピアノ", "ストリング", "バイオリン", "ベース", "ギター", "ドラム"].map((instrument) => (
            <TouchableOpacity
              key={instrument}
              style={[styles.optionItem, selectedInstruments.includes(instrument) ? styles.optionSelected : null]}
              onPress={() => handleInstrumentSelect(instrument)}
            >
              <Text style={styles.optionText}>{instrument}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Recording Button */}
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

      {/* Modal to show MusicGenerater */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalView}>
          <MusicGenerater
            selectedTempo={selectedTempo}
            selectedInstruments={selectedInstruments}
            recordingUri={recordingUri}
            closeModal={openMusicDownloader} // Function to open MusicDownloader modal
          />
        </View>
      </Modal>

      {/* Modal to show MusicDownloader */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={secondModalVisible}
        onRequestClose={closeMusicDownloader}
      >
        <View style={styles.modalView}>
          <MusicDownloader closeModal={closeMusicDownloader} />
        </View>
      </Modal>

      {/* Modal to show MusicReviewer */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={thirdModalVisible} // Change to thirdModalVisible
        onRequestClose={closeMusicReviewer}
      >
        <View style={styles.modalView}>
          <MusicReviewer closeModal={closeMusicReviewer} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  optionWrapper: {
    marginBottom: 20,
  },
  optionLabel: {
    fontSize: 18,
    marginBottom: 10,
  },
  optionRow: {
    flexDirection: "row",
  },
  optionItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginRight: 10,
  },
  optionSelected: {
    backgroundColor: "#007BFF",
  },
  optionText: {
    color: "#000",
  },
  button: {
    padding: 15,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  recordingInfo: {
    marginTop: 20,
    alignItems: "center",
  },
  modalView: {
    flex: 1,
    backgroundColor: "white",
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Gen;
