import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

function TextInputBox() {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="検索"
        placeholderTextColor="#AAAAAA"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 320,
    height: 32,
    marginBottom: 132,
  },
  textInput: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    paddingLeft: 10,
    color: '#000', // Default text color
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: '400',
  },
});

export default TextInputBox;
