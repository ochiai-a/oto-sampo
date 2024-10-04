import React from 'react';
import { View, StyleSheet } from 'react-native';
import GoLib from './library';
import DoGen from './gen';
import DoSearch from './search';

function Footer() {
  return (
    <View style={styles.footer}>
      <GoLib />
      <DoGen />
      <DoSearch />
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: '#F3EDF7',
    borderTopWidth: 1,
    borderTopColor: '#D8D8D8',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    zIndex: 1000, // Ensure the footer stays above other content
  },
});

export default Footer;
