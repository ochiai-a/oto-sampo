import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import Title from './fixed/Title';

function Explorer() {
  return (
    <View style={styles.container}>
      <Title />
      <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>この音、インスタで使ってみませんか</Text>
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
          <Text style={styles.sectionTitle}>この音、インスタで使ってみませんか</Text>
          <View style={styles.imageContainer}>
            <Image 
              style={styles.image} 
              source={require('../assets/images/genz.jpg')} // ここに画像ファイルを指定
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
    paddingLeft: 22,
    paddingRight: 22,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingBottom: 64,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
    color: 'black',
  },
  imageContainer: {
    width: 316,
    height: 316,
    position: 'relative',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    overflow: 'hidden',
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
