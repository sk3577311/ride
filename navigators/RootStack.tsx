import React from "react";
import { FunctionComponent } from "react";
// React navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Welcome } from "../screens/Welcome";
import { Login } from "../screens/Login";
import Home from "../screens/Home";
import { color } from "../components/colors";
import Greetings from "../components/Header/Greeting";
import Profile from "../components/Header/Profile";
import avatar from "../assets/avatar.png";
import {Signup} from "../screens/Signup";
import {Default} from "../screens/Default";

export type RootStackParamList = {
  welcome: undefined;
};
const Stack = createStackNavigator<RootStackParamList>();

const RootStack: FunctionComponent = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: color.graylight,
            borderBottomWidth: 0,
            shadowColor: "transparent",
            shadowOpacity: 0,
            elevation: 0,
            height: 120,
          },
          headerTintColor: color.secondary,
          headerRightContainerStyle: {
            paddingRight: 15,
          },
          headerLeftContainerStyle: {
            paddingLeft: 0,
          },

          headerRight: () => (
            <Profile
              img={avatar}
              imgContainerStyle={{
                backgroundColor: color.tertiary,
                borderRadius: 25,
              }}
            />
          ),
        }}
        initialRouteName="welcome"
      >
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login" 
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Default" 
          component={Default}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: (props) => (
              <Greetings
                mainText="Hey Sameer!"
                subText="Welcome Back"
                {...props}
              />
            ),
            headerLeft: () => <></>,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
