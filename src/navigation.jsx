import React, { useState } from "react";
import Animated from "react-native-reanimated";
import { createDrawerNavigator, DrawerContent } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Dashboard from "./screens/Dashboard";
import Notifications from "./screens/Notifications";
import Settings from "./screens/Settings";
import { View } from "react-native";

const DrawerContainer = createDrawerNavigator();

function DrawerMenu() {
  const [progress, setProgress] = useState(new Animated.Value(0));

  const scale = Animated.interpolate(progress, {
    inputRange: [0, 0.7, 1],
    outputRange: [1, 0.5, 0.7]
  });

  const translateX = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 200]
  });

  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 0.5, 1],
    outputRange: [0, 100, 50]
  });

  return (
    <View style={{ flex: 1, backgroundColor: "#204051" }}>
      <DrawerContainer.Navigator
        hideStatusBar
        statusBarAnimation="slide"
        drawerType="slide"
        overlayColor="transparent"
        drawerStyle={{ width: "50%" }}
        sceneContainerStyle={{
          transform: [{ scale, translateX }],
          borderRadius,
          overflow: "hidden"
        }}
        drawerContent={props => {
          setProgress(props.progress);
          return (
            <DrawerContent
            inactiveTintColor="#ccc"
              activeTintColor="#fff"
              style={{ backgroundColor: "#204051" }}
              {...props}
            />
          );
        }}
      >
        <DrawerContainer.Screen name="Dashboard" component={Dashboard} />
        <DrawerContainer.Screen
          name="Notifications"
          component={Notifications}
        />
        <DrawerContainer.Screen name="Settings" component={Settings} />
      </DrawerContainer.Navigator>
    </View>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <DrawerMenu />
    </NavigationContainer>
  );
}
