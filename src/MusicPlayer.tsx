import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function MusicPlayer({ closeModal, playSound, stopSound, isPlaying, openMusicDownloader }) {

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.favoriteButton} onPress={closeModal}>
          <FontAwesome name="chevron-left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>OTOSAMPO</Text>
        <TouchableOpacity style={styles.favoriteButton}>
          <Text >♡</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <TouchableOpacity onPress={openMusicDownloader}>
          <View style={styles.circleContainer}>
            <View style={styles.outerCircle} />
            <Image style={{ width: 230, height: 230 }} source={require('../assets/images/BigCircle.png')} />
            <View style={styles.innerCircle} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.musicTitle}>mondo</Text>
        </View>

        <View>
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
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
  },
  headerText: {
    color: 'black',
    fontWeight: '300',
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
  },
  favoriteButton: {},
  container: {
    flex: 1, // これを追加して全体を柔軟に
    alignItems: 'center', // 水平方向の中央揃え
    paddingTop: 100,
  },
  circleContainer: {
    width: '100%', // これを追加して幅を100%に設定
    height: 240, // 高さを固定
    justifyContent: 'center', // 円を中央に配置
    alignItems: 'center', // 水平に円を中央に配置
  },
  outerCircle: {
    width: 240,
    height: 240,
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    borderRadius: 120,
    borderWidth: 0.91,
    borderColor: '#767676',
    position: 'absolute',
  },
  middleCircle: {
    width: 230,
    height: 230,
    backgroundColor: '#FF32C7',
    borderRadius: 115,
    borderWidth: 0.91,
    borderColor: '#5C62D6',
    position: 'absolute',
  },
  innerCircle: {
    width: 210,
    height: 210,
    borderRadius: 105,
    borderWidth: 1,
    borderColor: '#999999',
    position: 'absolute',
  },
  titleWrapper: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  musicTitle: {
    color: 'black',
    fontWeight: '600',
    fontSize: 20,
  },
  buttonWrapper: {
    flexDirection: 'row',
    marginTop: 40,
    marginBottom: 20,
    justifyContent: 'center',
  },
  musicButton: {
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
});

