import React, { useRef } from 'react';
import { Animated, InteractionManager, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

const FavoriteButton = (props) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const interPolateColor = animatedValue.interpolate({
    inputRange: [0, 150],
    outputRange: ['#999', '#B11'],
  });

  const interpolateSize = animatedValue.interpolate({
    inputRange: [0, 50, 100, 150],
    outputRange: [24, 36, 32, 24],
  });

  const _onPress = () => {
    Animated.timing(animatedValue, {
      toValue: 150,
      duration: 200,
      useNativeDriver: false,
    }).start();

    InteractionManager.runAfterInteractions(() => {
      // アニメーション終了を待って行う処理
    });
  };

  const AnimatedAntDesign = Animated.createAnimatedComponent(AntDesign);

  const AnimatedIconStyle = {
    color: interPolateColor,
    fontSize: interpolateSize,
  };

  return (
    <TouchableOpacity onPress={_onPress} activeOpacity={1}>
      <AnimatedAntDesign name="hearto" style={AnimatedIconStyle} />
    </TouchableOpacity>
  );
};

export default FavoriteButton;
