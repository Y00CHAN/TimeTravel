import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PixelText as Text } from './src/components/PixelText';
import HomeScreen from './src/screens/Main/HomeScreen';
import MapScreen from './src/screens/Main/MapScreen';
import TripsScreen from './src/screens/Main/TripsScreen';
import GalleryScreen from './src/screens/Main/GalleryScreen';
import ProfileScreen from './src/screens/Profile/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Trips"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false, // 직접 label 렌더링
          tabBarStyle: {
            height: 80,
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#fff',
            borderTopWidth: 0,
            elevation: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.08,
            shadowRadius: 8,
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = '';
            let iconColor = focused ? '#000' : '#bbb';
            if (route.name === 'Home') iconName = 'home-outline';
            else if (route.name === 'Map') iconName = 'location-outline';
            else if (route.name === 'Trips') iconName = 'bookmark-outline';
            else if (route.name === 'Gallary') iconName = 'image-outline';
            else if (route.name === 'Profile') iconName = 'person-outline';
            return <Ionicons name={iconName} size={28} color={iconColor} />;
          },
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: '#bbb',
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            tabBarLabel: ({ color, focused }) => (
              <Text style={{ color, fontSize: 14, marginBottom: 4 }}>
                Home
              </Text>
            ),
          }}
        />
        <Tab.Screen 
          name="Map" 
          component={MapScreen} 
          options={{
            tabBarLabel: ({ color, focused }) => (
              <Text style={{ color, fontSize: 14, marginBottom: 4 }}>
                Map
              </Text>
            ),
          }}
        />
        <Tab.Screen 
          name="Trips" 
          component={TripsScreen} 
          options={{
            tabBarLabel: ({ color, focused }) => (
              <Text style={{ color, fontSize: 14, marginBottom: 4 }}>
                Trips
              </Text>
            ),
          }}
        />
        <Tab.Screen 
          name="Gallary" 
          component={GalleryScreen} 
          options={{
            tabBarLabel: ({ color, focused }) => (
              <Text style={{ color, fontSize: 14, marginBottom: 4 }}>
                Gallery
              </Text>
            ),
          }}
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{
            tabBarLabel: ({ color, focused }) => (
              <Text style={{ color, fontSize: 14, marginBottom: 4 }}>
                Profile
              </Text>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
} 
