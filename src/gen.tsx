import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, ImageBackground, Image, Alert } from "react-native";
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
  const [fileName, setFileName] = useState<string | null>(null); // Add state for file name
  const [uploadUrl, setUploadUrl] = useState<string | null>(null); // Add state for upload URL
  const [S3_file_name, setS3FileName] = useState<string | null>(null); // Add state for upload URL
  const userId = "OTOtest"; // ここでユーザーIDを定義

  // Delete old recording file
  const deleteOldRecording = async () => {
    if (recordingUri) {
      try {
        await FileSystem.deleteAsync(recordingUri);
        console.log("古い録音ファイルを削除しました:", recordingUri);
      } catch (error) {
        console.log("録音ファイル削除中にエラーが発生しました:", error);
      }
    }
  };

  // Start recording
  const startRecording = async () => {
    try {
      await getPresignedURL(); // Call getPresignedURL here

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
      }, 10000);
      setRecordingTimeout(timeout); // Save the timeout reference
    } catch (error) {
      console.log("録音中にエラーが発生しました:", error);
    }
  };

  // Stop recording and show modal
  const stopRecording = async () => {
    console.log("URL",fileName, uploadUrl)
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
      console.log("録音停止中にエラーが発生しました:", error);
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

  const openMusicDownloader = (S3_file_name: string) => {
    console.log("受け取ったS3ファイル名:", S3_file_name);
    setS3FileName(S3_file_name)
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

        {/* Display file name and upload URL */}
        {/* {fileName && uploadUrl && (
          <View style={styles.recordingInfo}>
            <Text>ファイル名: {fileName}</Text>
            <Text>アップロードURL: {uploadUrl}</Text>
          </View>
        )} */}

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
              // selectedTempo={selectedTempo}
              selectedInstruments={selectedInstruments}
              recordingUri={recordingUri}
              closeModal={openMusicDownloader} // Function to open MusicDownloader modal
              fileName={fileName} // Pass file name to MusicGenerater
              uploadUrl={uploadUrl} // Pass upload URL to MusicGenerater
              userId = {userId}
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
            <MusicDownloader 
              user_id={userId}
              S3_file_name={S3_file_name}
              closeModal={closeMusicDownloader} />
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
    marginTop: 300, // Adjust margin as needed
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
    marginTop: 50,
  },
  header: {
    fontSize: 28,
    color: "brack",
    fontWeight: 'bold',
    marginTop: 100,
  },
  optionWrapper: {
    height: 100,
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
    height:50,
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