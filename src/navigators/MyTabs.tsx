/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {StyleSheet, View} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CommonActions} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {Image, ScrollView} from 'react-native';
import {
  ActivityIndicator,
  BottomNavigation,
  Button,
  Text,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LoginScreen from '../pages/LoginScreen';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
      }}
      tabBar={({navigation, state, descriptors, insets}) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({route, preventDefault}) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({route, focused, color}) => {
            const {options} = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({focused, color, size: 24});
            }

            return null;
          }}
          getLabelText={({route}) => {
            const {options} = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : // @ts-ignore
                  route.title;

            return label;
          }}
        />
      )}>
      <Tab.Screen
        name="Home"
        component={LoginScreen}
        options={{
          tabBarLabel: 'Home',
          headerShown: false,
          tabBarIcon: ({color, size}) => {
            return <Icon name="home" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color, size}) => {
            return <Icon name="cog" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

function HomeScreen() {
  const {data, isError, isPending} = useQuery({
    queryKey: ['product'],
    queryFn: async () => {
      const res = await fetch('https://fakestoreapi.com/products');
      return await res.json();
    },
  });

  if (isPending) {
    return <ActivityIndicator size="large" />;
  }

  if (isError) {
    console.log(isError);
    return <Text>Error </Text>;
  }

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Home!</Text>
      <ScrollView>
        {data.map(item => {
          const mrp = new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          }).format(item.price);
          return (
            <View
              style={[styles.container, {gap: 10, marginBottom: 20}]}
              key={item.description}>
              <Image
                width={200}
                height={200}
                source={{uri: item.image}}
                style={{borderRadius: 11, padding: 10}}
              />
              <Text numberOfLines={1} style={{textAlign: 'center'}}>
                {item.title}
              </Text>
              <Button
                icon="cart"
                mode="contained"
                onPress={() => console.log('Pressed')}>
                {mrp}
              </Button>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Settings!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});
