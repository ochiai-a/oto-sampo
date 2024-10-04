import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface ListItemProps {
  title: string;
  date: string;
}

function ListItem({ title, date }: ListItemProps) {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>
          {title}
        </Text>
        <Text style={styles.dateText}>
          {date}
        </Text>
      </View>
      <View style={styles.iconContainer}>
      <Image style={{ width: 16, height: 16, paddingRight: 12 }} source={require('../assets/images/option.png')} />
      {/* <Text style={styles.heartText}>
        ♡
      </Text> */}
      </View>
    </View>
  );
}

function Files() {
  const items = [
    { title: 'mondo', date: '2024.10.11' },
  ];

  return (
    <View style={styles.filesContainer}>
      {items.map((item, index) => (
        <ListItem key={index} title={item.title} date={item.date} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    width: 320,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#DEDEDE',
    paddingRight: 10,
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
  },
  titleText: {
    color: '#1D1B20',
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  dateText: {
    color: '#999',
    fontSize: 12,
    fontFamily: 'Roboto',
    fontWeight: '300',
    lineHeight: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBackground: {
    width: 16,
    height: 16,
    marginRight: 10,
    backgroundColor: '#555555',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconLine: {
    width: 13.33,
    height: 2.67,
    backgroundColor: '#fff',
  },
  heartText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: '400',
    paddingLeft: 16,
  },
  filesContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    gap: 8,
  },
});

export default Files;
