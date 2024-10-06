import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert, StyleSheet, SafeAreaView, ImageBackground, Image } from 'react-native';
import * as FileSystem from 'expo-file-system';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Audio } from 'expo-av';

export default function MusicDownloader({ 
    closeModal, 
    openReviewer,
    user_id,
    S3_file_name
  }: { 
    closeModal: () => void; 
    openReviewer: () => void;
    user_id: string;
    S3_file_name: () => string;
  }) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [progress, setProgress] = useState<number | null>(null); // Progressステートを追加
  const [isDownloadComplete, setIsDownloadComplete] = useState(false); // ダウンロード完了ステート
  const maxRetries = 30;
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    console.log("MusicDownloaderに渡されたS3_file_name:", S3_file_name);
    getPresignedURL();
  }, [S3_file_name]);

  // ダウンロードURL取得リクエスト
  const getPresignedURL = async () => {
    try {
      const response = await fetch('https://ihce7qjrhd.execute-api.ap-northeast-1.amazonaws.com/dev/api/getMusicDownloadPresignedURL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          file_name: S3_file_name,  // ユーザー入力値を使用
        }),
      });

      if (!response.ok) {
        console.log("呼び出し", retryCount ,"回目")
        throw new Error('URL取得に失敗しました');
      }

      const data = await response.json();

      if (data.url) {
        setDownloadUrl(data.url);
        console.log('URL取得成功', 'ダウンロードが開始されます');
        downloadMusic(data.url);
      } else {
        throw new Error('URLが存在しません');
      }
    } catch (error) {
      console.log('Presigned URL取得エラー:', error);
      if (retryCount < maxRetries) {
        setTimeout(() => {
          setRetryCount(retryCount + 1);
          getPresignedURL();
        }, 10000);  // 20秒後に再試行
      } else {
        Alert.alert('失敗', 'ダウンロードURLの取得に失敗しました');
      }
    }
  };

  // 音楽をダウンロードする関数
  const downloadMusic = async (url: string) => {
    const fileUri = FileSystem.documentDirectory + S3_file_name;
    try {
      const downloadResumable = FileSystem.createDownloadResumable(
        url,
        fileUri,
        {},
        (downloadProgress) => {
          const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
          setProgress(progress); // ダウンロード進捗をステートに設定
          console.log(`Download progress: ${progress * 100}%`);
        }
      );

      const result = await downloadResumable.downloadAsync();
      
      // resultがundefinedでないことを確認し、uriプロパティを使用
      if (result && result.uri) {
        setIsDownloadComplete(true); // ダウンロード完了を示す
        console.log('ダウンロード完了', `ファイルが保存されました: ${result.uri}`);
      } else {
        throw new Error('ファイルの保存に失敗しました');
      }
    } catch (error) {
      console.error('ダウンロードエラー:', error);
    }
  };

  // 音楽を再生する関数
  const playSound = async () => {
    if (!downloadUrl) {
      Alert.alert('エラー', '音楽ファイルがダウンロードされていません');
      return;
    }

    const fileUri = FileSystem.documentDirectory + S3_file_name;
    const { sound } = await Audio.Sound.createAsync({ uri: fileUri });  // URIから音声を読み込む
    setSound(sound);
    setIsPlaying(true);
    await sound.playAsync();  // 音声を再生
  };

  async function stopSound() {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setIsPlaying(false);
      setSound(null);
    }
  }

  return (
    <ImageBackground 
    source={require('../assets/images/gen-rec.png')} // Background image path
    style={styles.background}
    >
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.favoriteButton} onPress={closeModal}>
          <FontAwesome name="chevron-left" size={20} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>GENERATED</Text>
        <TouchableOpacity style={styles.favoriteButton}>
          <Text style={styles.headerText}>♡</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <TouchableOpacity style={styles.favoriteButton} onPress={closeModal}>
          <View style={styles.circleContainer}>
            <View style={styles.outerCircle} />
            <Image style={{ width: 240, height: 240 }} source={require('../assets/images/BigCircle.png')} />
            <View style={styles.innerCircle} />
            <TouchableOpacity onPress={closeModal} style={styles.textContainer}>
              <Text style={styles.circleText}>
                {isDownloadComplete ? 'ダウンロード完了' : 'ダウンロード中です'} {/* ダウンロード中と完了の表示 */}
                {progress !== null && !isDownloadComplete && ` ${Math.round(progress * 100)}%`} {/* プログレスの表示 */}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
      
        <View style={styles.textcontainer}>
          <View style={styles.titleWrapper}>
            <View style={styles.musicTitle}>
              <TextInput
                style={styles.musicTitle}
                placeholder="✐ 名前をつけてください"
                placeholderTextColor="#DDDDDD"
              />
            </View>
            <Text style={styles.rating}></Text>
          </View>

        {isDownloadComplete && (
          <View style={styles.buttonWrapper}>
            {isPlaying ? (
              <TouchableOpacity style={styles.musicButton} onPress={stopSound}>
                <Image style={{ width: 76, height: 76 }} source={require('../assets/images/playButton1.png')} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.musicButton} onPress={playSound}>
                <Image style={{ width: 76, height: 76 }} source={require('../assets/images/playButton0.png')} />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover", // Cover the entire screen
    width: '100%',
    paddingTop: 45
  },
  safeArea: {
    flex: 1,
    width: '100%',
    // backgroundColor: '#222',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
  },
  headerText: {
    color: 'white',
    fontWeight: '300',
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
  },
  favoriteButton: {},
  container: {
    flex: 1,
    // justifyContent: 'center', // Centers content vertically
    alignItems: 'center', // Centers content horizontally
    paddingTop: 100, // Match this to MusicGenerater
  },
  circleContainer: {
    width: 240,
    height: 240,
    justifyContent: 'center', // Centers the circles within the container
    alignItems: 'center', // Centers the circles horizontally
  },
  outerCircle: {
    width: 245,
    height: 245,
    backgroundColor: 'rgba(255, 222, 245, 0.08)',
    borderRadius: 120,
    borderWidth: 5,
    borderColor: '#FFB5FC',
    position: 'absolute', // Layer this circle on top
  },
  middleCircle: {
    width: 230,
    height: 230,
    backgroundColor: '#FF32C7',
    borderRadius: 115,
    borderWidth: 0.91,
    borderColor: 'white',
    position: 'absolute', // Layer this circle on top
  },
  innerCircle: {
    width: 210,
    height: 210,
    borderRadius: 105,
    borderWidth: 1,
    borderColor: 'white',
    position: 'absolute', // Layer this circle on top
  },
  textcontainer: {
    flex: 1,
    // justifyContent: 'center', // Centers content vertically
    alignItems: 'center', // Centers content horizontally
  },
  textContainer: {
    position: 'absolute', // This allows the text to overlay on the circles
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    color: 'white',
  },
  titleWrapper: {
    alignItems: 'center',
    // marginTop: 100, // Adjust to match your design needs
    paddingVertical: 10,
  },
  musicTitle: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 24,
    alignItems: 'center',
    paddingVertical: 10,
    textAlign: 'center', // Center text inside the TextInput
  },
  rating: {
    color: 'white',
    fontWeight: '300',
    fontSize: 16,
  },
  buttonWrapper: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 20,
    justifyContent: 'center',
  },
  musicButton: {
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
});
