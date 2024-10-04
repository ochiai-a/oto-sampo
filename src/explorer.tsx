import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";

function Explorer() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.section}>
            <Text style={styles.header}>音でつながろう</Text>
            <View style={styles.imageContainer}>
              <Image 
                style={styles.image} 
                source={require('../assets/images/genz.jpg')} // ここに画像ファイルを指定
              />
              <View style={styles.imageOverlay}>
                <Text style={styles.overlayTitle}>共有数TOP10</Text>
                <Text style={styles.overlaySubtitle}>作った音をインスタ、Tiktokに共有してポストしてみましょう。</Text>
              </View>
            </View>
            <Text style={styles.header}>今ならではの音</Text>
            <View style={styles.imageContainer}>
              <Image 
                style={styles.image} 
                source={require('../assets/images/sea.jpeg')} // ここに画像ファイルを指定
              />
              <View style={styles.imageOverlay}>
                <Text style={styles.overlayTitle}>海と夏</Text>
                <Text style={styles.overlaySubtitle}>海が始まった　海はどうだ</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingBottom: 64,
    paddingLeft: 22,
    paddingRight: 22,
  },
  section: {
    // marginBottom: 32,
    // marginTop: 22,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 22
  },
  imageContainer: {
    width: 316,
    height: 316,
    position: 'relative',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    overflow: 'hidden',
    marginBottom: 24,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 半透明の黒い背景
  },
  overlayTitle: {
    color: 'white',
    fontSize: 36,
    fontWeight: '700',
  },
  overlaySubtitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 8,
  },
});

export default Explorer;
