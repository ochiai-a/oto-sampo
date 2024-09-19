import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Amplify from 'aws-amplify';
import RecordingScreen from './(tabs)/recording';
import UploadScreen from './upload';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="recording">
        <Stack.Screen name="recording" component={RecordingScreen} />
        <Stack.Screen name="Playback" component={UploadScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
