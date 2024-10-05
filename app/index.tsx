import React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';

export default function App() {
  const router = useRouter();

  const goToLibrary = () => {
    router.push('./(tabs)/library'); // library.tsx へ遷移
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.imageContainer}>
        {/* 画像をTouchableOpacityでラップし、タップで画面遷移 */}
        <TouchableOpacity onPress={goToLibrary}>
          <Image source={require('../assets/images/splashscreen.png')} style={styles.image} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 1500,  // 画像の幅を指定
    height: 1500, // 画像の高さを指定
    resizeMode: 'contain',  // 画像を適切にリサイズ
  },
});
