import React from 'react';
import { View, StyleSheet, Platform, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './src/screens/Main/HomeScreen';
import MapScreen from './src/screens/Main/MapScreen';
import TripsScreen from './src/screens/Main/TripsScreen';
import GalleryScreen from './src/screens/Main/GalleryScreen';
import ProfileScreen from './src/screens/Profile/ProfileScreen';
import CameraScreen from './src/screens/Main/CameraScreen';
import FloatingChatBotButton from './src/components/ui/FloatingChatBotButton';
import { INCHEON_BLUE } from './src/styles/fonts';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Map 스택 네비게이터
function MapStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MapMain" component={MapScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
    </Stack.Navigator>
  );
}

function TabBarIconWithLabel({ name, label, focused }: { name: string; label: string; focused: boolean }) {
  return (
    <View style={{
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 56,
      flexDirection: 'column',
    }}>
      <Ionicons name={name} size={32} color={focused ? INCHEON_BLUE : '#888'} />
      <Text
        style={{
          fontFamily: 'NeoDunggeunmoPro-Regular',
          fontSize: 14,
          color: focused ? INCHEON_BLUE : '#888',
          marginTop: 0,
          width: 56,
          textAlign: 'center',
        }}
        numberOfLines={1}
        ellipsizeMode='tail'
      >
        {label}
      </Text>
    </View>
  );
}

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Trips"
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: false, // 직접 label 렌더링
            tabBarStyle: {
              backgroundColor: '#fff',
              borderTopWidth: 0,
              height: 80,
              elevation: 0,
              shadowOpacity: 0,
              paddingBottom: 10,
              paddingTop: 14,
            },
            tabBarLabelStyle: {
              fontFamily: 'NeoDunggeunmoPro-Regular',
              fontSize: 10,
              color: '#000000',
            },
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = '';
              let label = '';
              switch (route.name) {
                case 'Home':
                  iconName = 'home-outline';
                  label = 'Home';
                  break;
                case 'Map':
                  iconName = 'map-outline';
                  label = 'Map';
                  break;
                case 'Trips':
                  iconName = 'compass-outline'; // 여행 느낌
                  label = 'Trips';
                  break;
                case 'Gallery':
                  iconName = 'images-outline'; // 갤러리 느낌
                  label = 'Gallery';
                  break;
                case 'Profile':
                  iconName = 'person-outline';
                  label = 'Profile';
                  break;
                default:
                  iconName = 'ellipse-outline';
                  label = '';
              }
              return <TabBarIconWithLabel name={iconName} label={label} focused={focused} />;
            },
            tabBarActiveTintColor: INCHEON_BLUE,
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
            component={MapStack} 
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
            name="Gallery" 
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
      <FloatingChatBotButton onPress={() => { /* 채팅창 열기 등 */ }} />
    </>
  );
} 
