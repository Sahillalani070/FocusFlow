// import { Ionicons } from '@expo/vector-icons';
// import { Tabs } from 'expo-router';

// export default function Layout() {
//   return (
//     <Tabs
//       screenOptions= {({ route }) => ({
//     headerShown: false,
//     tabBarActiveTintColor: '#1DB954',
//     tabBarStyle: {
//       backgroundColor: '#121212',
//       borderTopColor: 'transparent',
//     },
//     tabBarIcon: ({ color, size }) => {
//       let iconName = 'ellipse';
//       if (route.name === 'focus') iconName = 'timer-outline';
//       else if (route.name === 'stats') iconName = 'stats-chart-outline';
//       return <Ionicons name={ iconName } size = { size } color = { color } />;
//     },
//   })
// }
//     />
//   );
// }
import { Ionicons } from '@expo/vector-icons';
import { Tabs, Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase.js'; // adjust path if needed

export default function Layout() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return null; // or splash screen
  }

  if (!user) {
    return <Redirect href="/login" />; // send to login page
  }

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
