import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Title from './fixed/Title';
import TextInputBox from './TextInputBox';
import Files from './files';
import Bigbutton from './bigbutton';
import Footer from '../fnb/footer';
import Player from './player';

function Library() {
  return (
    <View style={styles.container}>
      <Title />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.header}>あなたの音</Text>
        <TextInputBox />
        <Bigbutton />
        <Files />
      </ScrollView>
      <Player />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: 360,
    paddingLeft: 22,
    paddingRight: 22,
    // boxSizing: 'border-box',
    // boxSizing: 'border-box' は React Native には存在しないため削除しました
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingBottom: 64, // フッターの高さ分のパディング
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default Library;
