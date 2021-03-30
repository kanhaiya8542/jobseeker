// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import Expo, { Notifications } from "expo";
import React from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
// import { TabNavigator, StackNavigator } from 'react-navigation';

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Provider } from "react-redux";

import registerForNotifications from "./src/services/push_notifications";
import store from "./src/store";
import AuthScreen from "./src/screens/AuthScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import MapScreen from "./src/screens/MapScreen";
import DeckScreen from "./src/screens/DeckScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import ReviewScreen from "./src/screens/ReviewScreen";

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="Details" component={DetailsScreen} />
    </SettingsStack.Navigator>
  );
}

class App extends React.Component {
  componentDidMount() {
    registerForNotifications();
    Notifications.addListener((notification) => {
      const {
        data: { text },
        origin,
      } = notification;

      if (origin === "received" && text) {
        Alert.alert("New Push Notification", text, [{ text: "Ok." }]);
      }
    });
  }

  render() {
    <NavigationContainer>
      <SettingsStack.Navigator>
        <SettingsStack.Screen name="welcome" component={WelcomeScreen} />
        <SettingsStack.Screen name="auth" component={AuthScreen} />
      </SettingsStack.Navigator>
      {/* <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Settings" component={SettingsStackScreen} />
      </Tab.Navigator> */}
    </NavigationContainer>;

    // const MainNavigator = TabNavigator({
    //   welcome: { screen: WelcomeScreen },
    //   auth: { screen: AuthScreen },
    //   main: {
    //     screen: TabNavigator({
    //       map: { screen: MapScreen },
    //       deck: { screen: DeckScreen },
    //       review: {
    //         screen: StackNavigator({
    //           review: { screen: ReviewScreen },
    //           settings: { screen: SettingsScreen }
    //         })
    //       }
    //     }, {
    //       tabBarPosition: 'bottom',
    //       tabBarOptions: {
    //         labelStyle: { fontSize: 12 }
    //       }
    //     })
    //   }
    // }, {
    //   navigationOptions: {
    //     tabBar: { visible: false }
    //   },
    //   lazyLoad: true
    // });

    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
