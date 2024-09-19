import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function DoSearch() {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <View style={styles.icon} />
      </View>
      <Text style={styles.label}>検索</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 64,
    height: 64,
    paddingBottom: 4,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  iconContainer: {
    width: 24,
    height: 24,
    position: 'relative',
  },
  icon: {
    width: 20,
    height: 20,
    backgroundColor: 'black',
  },
  label: {
    color: 'black',
    fontSize: 12,
    fontFamily: 'Roboto',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default DoSearch;
