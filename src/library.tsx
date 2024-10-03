import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import TextInputBox from './TextInputBox';
import Files from './files';
import Bigbutton from './bigbutton';
import Footer from '../fnb/footer';
import Player from './player';

function Library() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.header}>あなたの音</Text>
        <TextInputBox />
        <Bigbutton />
        <Files />
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
    paddingLeft: 22,
    paddingRight: 22,
    paddingBottom: 64, // フッターの高さ分のパディング
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 22
  },
});

export default Library;
