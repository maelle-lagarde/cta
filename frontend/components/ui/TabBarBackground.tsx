import { View, Platform } from 'react-native';

export default function TabBarBackground() {
  console.log('✅ TabBarBackground rendu'); 
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 80,
        backgroundColor: '#1B191F',
        borderTopWidth: 1,
        borderTopColor: '#FFD5EB',
        zIndex: 10,
      }}
    />
  );
}

export function useBottomTabOverflow() {
  return 0;
}