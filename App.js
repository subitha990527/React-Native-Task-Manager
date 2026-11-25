
import React, { useState, useEffect } from 'react';
import styles from './src/styles/styles';
import TasksScreen from './src/screens/TasksScreen';
import StatisticsScreen from './src/screens/StatisticsScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';

import DateTimePicker from '@react-native-community/datetimepicker';

import { Ionicons } from '@expo/vector-icons';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  Platform,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();



// ---------------- MAIN APP ----------------

export default function App() {

  const [tasks, setTasks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load Tasks
  useEffect(() => {

    const loadTasks = async () => {

      try {

        const savedTasks = await AsyncStorage.getItem('tasks');

        if (savedTasks !== null) {
          setTasks(JSON.parse(savedTasks));
        }

      } catch (error) {

        console.log('Loading error:', error);

      } finally {

        setIsLoaded(true);

      }
    };

    loadTasks();

  }, []);

  // Save Tasks
  useEffect(() => {

    const saveTasks = async () => {

      try {

        await AsyncStorage.setItem(
          'tasks',
          JSON.stringify(tasks)
        );

      } catch (error) {

        console.log('Saving error:', error);

      }
    };

    if (isLoaded) {
      saveTasks();
    }

  }, [tasks, isLoaded]);

  // Loading Screen
  if (!isLoaded) {

    return (

      <View style={styles.loadingContainer}>
        <Text style={styles.heading}>Loading tasks...</Text>
      </View>

    );
  }

  // Navigation
  return (

    <NavigationContainer>

      <Tab.Navigator

        screenOptions={({ route }) => ({

          headerShown: false,

          tabBarActiveTintColor: '#238B55',
          tabBarInactiveTintColor: '#888888',

          tabBarStyle: {
            height: 70,
            paddingBottom: 10,
            paddingTop: 8,
            backgroundColor: '#FFFFFF',
            borderTopWidth: 1,
            borderTopColor: '#EDF1ED',
            elevation: 8,
          },

          tabBarLabelStyle: {
            fontSize: 13,
            fontWeight: '600',
          },

          tabBarIcon: ({ color, size }) => {

            const iconName = route.name === 'Tasks'
              ? 'list-outline'
              : 'stats-chart-outline';

            return (
              <Ionicons
                name={iconName}
                size={size}
                color={color}
              />
            );
          },

        })}

      >

        <Tab.Screen
          name="Tasks"
          options={{ tabBarLabel: 'Tasks' }}
        >
          {() => (
            <TasksScreen
              tasks={tasks}
              setTasks={setTasks}
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
            />
          )}
        </Tab.Screen>

        <Tab.Screen
          name="Statistics"
          options={{ tabBarLabel: 'Statistics' }}
        >
          {() => (
            <StatisticsScreen
              tasks={tasks}
              isDarkMode={isDarkMode}
            />
          )}
        </Tab.Screen>

      </Tab.Navigator>

    </NavigationContainer>
  );
}





