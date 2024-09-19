import React from 'react';
import { View, Button } from 'react-native';

export default function App() {
  const sendRequest = () => {
    fetch('https://d2t6chwvgk9bup.cloudfront.net', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        bucket: 'input-mp3-bucket',
        filename: 'your-filename' // 環境音のファイル名を入れてください
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <View>
      <Button title="Send Request" onPress={sendRequest} />
    </View>
  );
};