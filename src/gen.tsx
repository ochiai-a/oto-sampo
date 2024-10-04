import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal } from "react-native";
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
  const [modalVisible, setModalVisible] = useState<boolean>(false);  // MusicGenerator modal
  const [secondModalVisible, setSecondModalVisible] = useState<boolean>(false); // MusicDownloader modal
  const [thirdModalVisible, setThirdModalVisible] = useState<boolean>(false); // MusicReviewer modal

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
    setModalVisible(true); // Open MusicGenerator modal
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
    setModalVisible(false); // Close MusicGenerator modal
    setSecondModalVisible(true); // Open MusicDownloader modal
  };

  const closeMusicDownloader = () => {
    setSecondModalVisible(false); // Close MusicDownloader modal
    setThirdModalVisible(true); // Open MusicReviewer modal
  };

  const closeMusicReviewer = () => {
    setThirdModalVisible(false); // Close MusicReviewer modal
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
        // animationType="slide"
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
        // animationType="slide"
        transparent={true}
        visible={thirdModalVisible} // Use thirdModalVisible for MusicReviewer
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
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "white",
    paddingLeft: 48,
    paddingRight: 22, 
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 22
  },
  optionWrapper: {
    marginTop: 22,
  },
  optionLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#BBBBBB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  optionText: {
    fontSize: 14,
    color: "#999898",
  },
  optionSelected: {
    backgroundColor: "#FEB9FC",
    color: "black",
  },
  button: {
    backgroundColor: "#FF32C7",
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    background: 'linear-gradient(242deg, #FF32C7 0%, #5642DD 100%)',
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: 'center',
  },
  recordingInfo: {
    marginTop: 20,
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default Gen;
