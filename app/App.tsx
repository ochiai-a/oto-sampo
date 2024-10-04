import React, { createContext, useContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Amplify from 'aws-amplify';
import RecordingScreen from './(tabs)/recording';
import UploadScreen from './upload';
import { Audio } from 'expo-av';

// Create a context for audio playback
const AudioContext = createContext(null);

const Stack = createStackNavigator();

export default function App() {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Function to play audio
  const playSound = async (source) => {
    if (sound) {
      await sound.stopAsync(); // Stop previous sound if playing
    }
    const { sound: newSound } = await Audio.Sound.createAsync(source);
    setSound(newSound);
    setIsPlaying(true);
    await newSound.playAsync();
  };

  // Function to stop audio
  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync(); // Unload the sound to free resources
      setSound(null);
      setIsPlaying(false);
    }
  };

  return (
    <AudioContext.Provider value={{ playSound, stopSound, isPlaying }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="recording">
          <Stack.Screen name="recording" component={RecordingScreen} />
          <Stack.Screen name="Playback" component={UploadScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AudioContext.Provider>
  );
}

// Custom hook to use the audio context
export const useAudio = () => {
  return useContext(AudioContext);
};
