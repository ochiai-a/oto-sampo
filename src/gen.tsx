import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, ImageBackground, Image } from "react-native";
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
  const [recordingTimeout, setRecordingTimeout] = useState<NodeJS.Timeout | null>(null); // Timeout reference

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

      // Set a timeout to stop recording after 30 seconds
      const timeout = setTimeout(() => {
        stopRecording();
      }, 30000);
      setRecordingTimeout(timeout); // Save the timeout reference
    } catch (error) {
      console.error("録音中にエラーが発生しました:", error);
    }
  };

  // Stop recording and show modal
  const stopRecording = async () => {
    setModalVisible(true); // Open MusicGenerator modal
    if (recordingTimeout) {
      clearTimeout(recordingTimeout); // Clear the timeout if recording is stopped manually
    }
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
      if (recordingTimeout) {
        clearTimeout(recordingTimeout); // Clear the timeout on unmount
      }
    };
  }, [recording, recordingTimeout]);

  const handleTempoSelect = (tempo: string) => {
    setSelectedTempo(tempo);
  };

  const handleInstrumentSelect = (instrument: string) => {
    setSelectedInstruments((prev) =>
      prev.includes(instrument) ? prev.filter(i => i !== instrument) : [...prev, instrument]
    );
  };

  const openMusicDownloader = () => {
    setIsRecording(false); // 録音状態をfalseに設定
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
    <ImageBackground 
      source={require('../assets/images/gen-main.png')} // Background image path
      style={styles.background}
    >
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
              <Text style={[styles.optionText, selectedTempo === tempo && { color: "#222222" }]}>
                {tempo}
              </Text>
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
                <Text style={[styles.optionText, selectedInstruments.includes(instrument) && { color: "#222222" }]}>
                  {instrument}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>


        {/* Recording Button */}
        <View style={styles.imageWrapper}>
          {isRecording ? (
            <TouchableOpacity style={styles.image} onPress={stopRecording}>
              <Image source={require('../assets/images/startGen2.png')} style={styles.imageContent} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.image} onPress={startRecording}>
              <Image source={require('../assets/images/startGen.png')} style={styles.imageContent} />
            </TouchableOpacity>
          )}
        </View>

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
          transparent={true}
          visible={thirdModalVisible} // Use thirdModalVisible for MusicReviewer
          onRequestClose={closeMusicReviewer}
        >
          <View style={styles.modalView}>
            <MusicReviewer closeModal={closeMusicReviewer} />
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover", // Cover the entire screen
    width: '100%',
  },
  imageWrapper: {
    flex: 1, // Use flex to center the button vertically
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    marginTop: 100, // Adjust margin as needed
  },
  image: {
    width: 220,
    height: 60,
  },
  imageContent: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', // Ensure the image is scaled appropriately
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingLeft: 22,
    paddingRight: 22,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 22,
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
    borderColor: "#FEB9FC", // Set border color to #222222 when selected
  },
  recordingInfo: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#E1F7D5",
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dim background
  },
});

export default Gen;
