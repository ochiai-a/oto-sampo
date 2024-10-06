import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#984EF5', // アクティブなタブの色を白に設定
        tabBarInactiveTintColor: '#767676', // 非アクティブなタブの色
        tabBarStyle: {
          backgroundColor: '#F3EDF7', // タブバーの背景色
          borderTopWidth: 1, // ボーダーの幅
          borderTopColor: '#DDDDDD', // ボーダーの色
          height: 81,
          paddingBottom: 21,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="library"
        options={{
          title: 'ライブラリ', // タブのタイトル
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'library' : 'library-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="recording"
        options={{
          title: '生成', // タブのタイトル
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'mic' : 'mic-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="feed"
        options={{
          title: '共有', // タブのタイトル
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'newspaper' : 'newspaper-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
