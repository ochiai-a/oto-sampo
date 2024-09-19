import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Title() {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>OTOSANPO♪</Text>
      </View>
      <View style={styles.iconContainer}>
        <View style={styles.iconWrapper}>
          <View style={styles.iconInner}>
            <View style={styles.iconBackground} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 360,
    height: 48,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#A0A0A0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    color: '#393939',
    fontSize: 24,
    fontFamily: 'Roboto',
    fontWeight: '200',
    letterSpacing: 2.88,
    flexWrap: 'wrap',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconInner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBackground: {
    width: 20.1,
    height: 20,
    backgroundColor: '#49454F',
  },
});

export default Title;
