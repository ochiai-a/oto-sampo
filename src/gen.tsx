import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";

const Gen: React.FC = () => {
  const [selectedTempo, setSelectedTempo] = useState<string>("普通");
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([]);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingUri, setRecordingUri] = useState<string | null>(null);

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

  // Stop recording
  const stopRecording = async () => {
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

          // Show selected parameters in JSON format
          const selectedData = {
            tempo: selectedTempo,
            instruments: selectedInstruments,
          };
          const jsonData = JSON.stringify(selectedData);
          Alert.alert("Selected Data", jsonData); // Show the selected data
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

  return (
    <View style={styles.container}>
      <View style={styles.generatingBar}>
        <View style={styles.emptyBox}></View>
        <Text style={styles.generatingText}>GENERATING</Text>
        <View style={styles.emptyBox}></View>
      </View>

      <View style={styles.optionsContainer}>
        <Text style={styles.questionText}>どんな音を作りますか？</Text>

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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    padding: 22,
  },
  generatingBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 64,
  },
  generatingText: {
    color: "#8D8D8D",
    fontSize: 14,
  },
  emptyBox: {
    width: 24,
    height: 24,
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  optionsContainer: {
    marginTop: 128,
    width: "100%",
  },
  optionWrapper: {
    marginTop: 22,
  },
  optionLabel: {
    fontSize: 14,
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
});

export default Gen;