import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, useRef } from 'react';
import { Animated, InteractionManager } from 'react-native';
import {Button, StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput, Image } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { interpolateColor } from 'react-native-reanimated';
import FavoriteButton from '../../components/FavoriteButton';
import { Audio } from 'expo-av';

export default function App() {
  // 初期化
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false); // 再生中の状態を管理

  useEffect(() => {
    // アンロード
    return sound
      ? () => {
        sound.unloadAsync(); 
      }
    : undefined;
  }, [sound]);

  async function playSound() {
    // 既に音が再生中の場合は、現在の音を停止してから新しい音を再生
    if (sound) {
      await sound.stopAsync(); // 現在の音を停止
    }
    const { sound: newSound } = await Audio.Sound.createAsync(
      require('../../assets/music/mondo_01.mp3')
    );
    setSound(newSound);
    setIsPlaying(true);

    await newSound.playAsync();
  }

  // 音楽の停止処理
  async function stopSound() {
    if (sound) {
      await sound.stopAsync(); // 音楽の再生を停止
      await sound.unloadAsync(); // 音楽をアンロード
      setIsPlaying(false);
      setSound(null); // sound ステートをクリア
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.nonView}>

      </View>
      <View style={styles.header}>
        <TouchableOpacity style={styles.favoriteButton}>
          <FontAwesome name="chevron-left" size={20} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>PLAYING NOW</Text>
        {/* <TouchableOpacity style={styles.favoriteButton}>
          <AntDesign name="hearto" size={24} color="red" />
        </TouchableOpacity> */}
        <FavoriteButton/>
      </View>

      <View style={styles.container}>
        {/* 円みたいなアニメーション予定地 */}
        <View>
          <Image style={styles.bigCircleImage}source={require('../../assets/images/circle1.png')}/>
          <Image style={styles.mediumCircleImage}source={require('../../assets/images/circle2.png')}/>
          <View style={styles.containerOnCircle}>
            <Text style={styles.textOnCircle}>1:19</Text>  
            <Text style={styles.textOnCircleStrings}>リアルタイム生成中</Text> 
            <Text style={styles.textOnCircle}>2:46</Text>
          </View>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.musicTitle}>曲名</Text>
          <Text style={styles.rating}>☆☆☆☆☆</Text>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.buttonWrapper}>
          {/* <TouchableOpacity style={styles.musicButton}>
            <AntDesign name="banckward" size={40} color="white" style={styles.forwardIcon}/>
          </TouchableOpacity> */}
          {isPlaying ? (
            <TouchableOpacity style={styles.musicButton} onPress={stopSound}>
              <Image style={{width: 76, height: 76}} source={require('../../assets/images/playButton1.png')}/>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.musicButton} onPress={playSound}>
              <Image style={{width: 76, height: 76}} source={require('../../assets/images/playButton1.png')}/>
            </TouchableOpacity>
          )}

        {/* <TouchableOpacity style={styles.musicButton}>
            <AntDesign name="forward" size={40} color="white" style={styles.forwardIcon}/>
          </TouchableOpacity> */}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#222',
  },
  nonView: {
    paddingHorizontal: 20,
    paddingVertical: 20,
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
  favoriteButton: {
    
  },
  container: {
    // flex: 1,
    paddingTop: 20,
  },
  bigCircleImage: {
    width: 320,
    height: 320,
    position: 'absolute',
    top: '18%',
    left: '11%',
  },
  mediumCircleImage: {
    width: 260,
    height: 260,
    position: 'absolute',
    top: '30%',
    left: '18%',
  },
  containerOnCircle: {
    flexDirection: 'row',
    paddingVertical: 30,
    paddingTop: 200,
    justifyContent: 'center',
  },
  textOnCircle: {
    color: 'white',
    fontWeight: '300',
    fontSize: 14,
    marginHorizontal: 5,
    textAlign: 'center',
  },
  textOnCircleStrings: {
    color: 'white',
    fontWeight: '300',
    fontSize: 12,
    marginHorizontal: 10,
    textAlign: 'center',
  },
  titleWrapper: {
    alignItems: 'center',
    marginTop: 160,
    paddingVertical: 10,
  },
  musicTitle: {
    color: 'white',
    fontWeight: '600',
    fontSize: 20,
    paddingVertical: 10,
  },
  rating: {
    color: 'white',
    fontWeight: '300',
    fontSize: 16,
  },
  buttonWrapper: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'center',
  },
  musicButton: {
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  forwardIcon: {
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  button: {
    backgroundColor: 'rgb(29, 161, 242)',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: '900',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    borderColor: 'rgb(29, 161, 242)',
    borderWidth: 2,
    marginRight: 10,
    borderRadius: 10,
    color: 'white',
    paddingHorizontal: 10,
    fontSize: 16,
  }
});