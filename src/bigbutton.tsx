import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ListItemProps {
  title: string;
}

function Bigbuttonitem({ title }: ListItemProps) {
  return (
    <View style={styles.buttonContainer}>
      <Text style={styles.buttonText}>
        {title}
      </Text>
    </View>
  );
}

// Functional component for rendering multiple buttons
function Bigbutton() {
  const items = [{ title: '再生' }, { title: 'シャフル' }]; // Example array of items

  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <Bigbuttonitem key={index} title={item.title} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Align buttons on left and right
    width: '100%',
  },
  buttonContainer: {
    width: 152,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    marginVertical: 12,
  },
  buttonText: {
    color: '#FF0000',
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default Bigbutton;
