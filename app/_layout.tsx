import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function Layout() {
  return (
    <Tabs
      screenOptions= {({ route }) => ({
    headerShown: false,
    tabBarActiveTintColor: '#1DB954',
    tabBarStyle: {
      backgroundColor: '#121212',
      borderTopColor: 'transparent',
    },
    tabBarIcon: ({ color, size }) => {
      let iconName = 'ellipse';
      if (route.name === 'focus') iconName = 'timer-outline';
      else if (route.name === 'stats') iconName = 'stats-chart-outline';
      return <Ionicons name={ iconName } size = { size } color = { color } />;
    },
  })
}
    />
  );
}
