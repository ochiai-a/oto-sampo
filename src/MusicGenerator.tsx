import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Image,
  Alert,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system"; // FileSystemのインポート
import { Asset } from "expo-asset"; // Assetをインポート

export default function MusicGenerater({
  closeModal,
  openDownloader,
  recordingUri,
  fileName,
  uploadUrl,
  userId,
}: {
  closeModal: () => void;
  openDownloader: (stepFunctionResponse: any) => void; // 引数にstepFunctionResponseを追加
  recordingUri: string;
  fileName: string;
  uploadUrl: string;
  userId: string;
}) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [stepFunctionResponse, setStepFunctionResponse] = useState<any>(null); // ステータスを保存
  const asset = Asset.fromModule(require("../assets/music/test.mp3"));
  const fileUri = asset.localUri || ""; // ローカルURIを取得

  // 3. 音楽ファイルをPresigned URLに送信する関数
  const uploadFile = async () => {
    if (!fileUri || !uploadUrl) {
      Alert.alert(
        "エラー",
        `アップロードするファイルまたはURLを選択してください。\n\nfileUri: ${
          fileUri || "なし"
        }\nuploadUrl: ${uploadUrl || "なし"}`
      );
      return;
    }

    try {
      const response = await FileSystem.uploadAsync(uploadUrl, fileUri, {
        headers: {
          "Content-Type": "audio/mpeg",
        },
        httpMethod: "PUT",
        uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
      });

      if (response.status === 200) {
        callStepFunction(); // アップロード後にStepFunctionを呼び出す
      } else {
        Alert.alert("アップロード失敗", `ステータスコード: ${response.status}`);
      }
    } catch (error: any) {
      Alert.alert("アップロードエラー", error.message);
    }
  };

  // 4. StepFunctionのAPIを呼び出す関数
  const callStepFunction = async () => {
    try {
      const response = await fetch(
        "https://ihce7qjrhd.execute-api.ap-northeast-1.amazonaws.com/dev/api/generateMusic",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId, // 固定されたuserIdを使用
            file_name: fileName,
          }),
        }
      );

      const data = await response.json();
      const { S3_file_name, user_id } = data;
      // レスポンスデータを状態に設定
      setStepFunctionResponse({ S3_file_name, user_id });

      if (response.ok) {
        setStepFunctionResponse(data); // レスポンスデータを保存
      } else {
        Alert.alert(
          "Error",
          data.message || "Step Functionの実行中にエラーが発生しました"
        );
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Error", "An unknown error occurred.");
      }
    }
  };

  useEffect(() => {
    // コンポーネントがマウントされたときにアップロード機能を呼び出す
    setTimeout(() => {
      uploadFile();
    }, 3000); // 3000ミリ秒 = 3
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <ImageBackground
      source={require("../assets/images/gen-rec.png")} // Background image path
      style={styles.background}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.favoriteButton} onPress={closeModal}>
            <FontAwesome name="chevron-left" size={20} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerText}>NOW GENERATING</Text>
          <TouchableOpacity style={styles.favoriteButton}>
            <Text style={styles.headerText}>♡</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <View style={styles.circleContainer}>
            <View style={styles.outerCircle} />
            <Image
              style={{ width: 240, height: 240 }}
              source={require("../assets/images/BigCircle.png")}
            />
            <View style={styles.innerCircle} />
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.titleWrapper}>
            <Text style={styles.musicTitle}>あなたの音を作っています</Text>
            <Text style={styles.rating}>しばらくお待ちください</Text>
          </View>
        </View>

        <View style={styles.container}>
          {/* 受け取った値を表示 */}
          {/* <Text style={styles.musicTitle}>録音ファイル情報</Text> */}
          {/* <Text style={styles.infoText}>ファイル名: {fileName}</Text>
        <Text style={styles.infoText}>ファイルURL: {fileUri}</Text>  */}
          {/* <Text style={styles.infoText}>アップロードURL: {uploadUrl}</Text> */}
          {/* <Text style={styles.infoText}>録音URI: {recordingUri}</Text> */}
        </View>

        {/* ステップファンクションのレスポンスを表示 */}
        {stepFunctionResponse && (
          <View style={{ marginTop: 20 }}>
            <Text style={styles.infoText}>
              User ID: {stepFunctionResponse.user_id}
            </Text>
            <Text style={styles.infoText}>
              File Name: {stepFunctionResponse.S3_file_name}
            </Text>
          </View>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover", // Cover the entire screen
    width: "100%",
    paddingTop: 45,
  },
  safeArea: {
    flex: 1,
    // backgroundColor: '#222',
    width: "100%",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: "row",
  },
  headerText: {
    color: "white",
    fontWeight: "300",
    fontSize: 14,
    flex: 1,
    textAlign: "center",
  },
  favoriteButton: {
    color: "white",
  },
  container: {
    paddingTop: 100,
    flex: 1, // Added to make the container take full height
    // justifyContent: 'center', // Centers the content vertically
    alignItems: "center", // Centers the content horizontally
  },
  circleContainer: {
    width: 240,
    height: 240,
    justifyContent: "center", // Centers the circles within the container
    alignItems: "center", // Centers the circles horizontally
  },
  outerCircle: {
    width: 245,
    height: 245,
    backgroundColor: "rgba(255, 222, 245, 0.08)",
    borderRadius: 120,
    borderWidth: 5,
    borderColor: "#FFB5FC",
    position: "absolute", // Layer this circle on top
  },
  middleCircle: {
    width: 230,
    height: 230,
    backgroundColor: "#FF32C7",
    borderRadius: 115,
    borderWidth: 0.91,
    borderColor: "white",
    position: "absolute", // Layer this circle on top
  },
  innerCircle: {
    width: 210,
    height: 210,
    borderRadius: 105,
    borderWidth: 1,
    borderColor: "white",
    position: "absolute", // Layer this circle on top
  },
  titleWrapper: {
    alignItems: "center",
    marginTop: 20, // Adjust margin if necessary
    paddingVertical: 10,
  },
  musicTitle: {
    color: "white",
    fontWeight: "600",
    fontSize: 20,
    paddingVertical: 10,
  },
  rating: {
    color: "white",
    fontWeight: "300",
    fontSize: 16,
  },
  buttonWrapper: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "center",
  },
  musicButton: {
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  infoText: {
    color: "white",
    fontSize: 16,
    marginVertical: 5,
    textAlign: "center",
  },
});
