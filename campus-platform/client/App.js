
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Feature Screens
import HomeScreen from './src/screens/HomeScreen';
import LostAndFoundScreen from './src/screens/LostandFound';
import CampusMemoriesScreen from './src/screens/CampusMemories';
import Clubs from './src/screens/Clubs';
import AlertsScreen from './src/screens/AlertsScreen';
import AboutScreen from './src/screens/AboutScreen';
import ProfileScreen from './src/screens/Profilescreen';
import PlacementsScreen from './src/screens/Placements';
import MarketplaceScreen from './src/screens/MarketplaceScreen';
import CanteenMenuScreen from './src/screens/CanteenMenuScreen';
import CampusMapScreen from './src/screens/CampusMapScreen';
import ExamHallScreen from './src/screens/ExamHallScreen';
import FindLocationScreen from './src/screens/FindLocationScreen';

// Authentication Screens
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ResetPassword, {
  ForgotPasswordScreen,
  ForceResetScreen,
} from './src/screens/ResetPassword';

const Stack = createNativeStackNavigator();

export default function App() {
  const [guestMode, setGuestMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkGuestMode = async () => {
      try {
        const guest = await AsyncStorage.getItem('guest_mode');
        setGuestMode(guest === 'true');
      } catch (err) {
        console.error('Error checking guest mode:', err);
        setGuestMode(false);
      } finally {
        setLoading(false);
      }
    };

    checkGuestMode();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={guestMode ? 'GuestHome' : 'Home'}
        screenOptions={{ headerShown: false }}
      >
        {/* Authentication Screens */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
        />
        <Stack.Screen name="ForceReset" component={ForceResetScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />

        {/* Core Navigation */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="GuestHome"
          component={HomeScreen}
          options={{ unmountOnBlur: true }}
        />

        {/* User and Profile Screens */}
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Alerts" component={AlertsScreen} />
        <Stack.Screen name="About" component={AboutScreen} />

        {/* Campus Features */}
        <Stack.Screen name="CampusMap" component={CampusMapScreen} />
        <Stack.Screen name="ExamHall" component={ExamHallScreen} />
        <Stack.Screen
          name="FindLocationScreen"
          component={FindLocationScreen}
        />

        {/* Campus Community */}
        <Stack.Screen name="Clubs" component={Clubs} />
        <Stack.Screen
          name="CampusMemories"
          component={CampusMemoriesScreen}
        />

        {/* Marketplace and Services */}
        <Stack.Screen
          name="LostAndFound"
          component={LostAndFoundScreen}
        />
        <Stack.Screen name="Marketplace" component={MarketplaceScreen} />
        <Stack.Screen name="CanteenMenu" component={CanteenMenuScreen} />

        {/* Career and Academics */}
        <Stack.Screen name="Placements" component={PlacementsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
