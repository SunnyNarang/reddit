
import * as React from 'react';
import { View, Text,Button,TextInput, Alert, StyleSheet,I18nManager } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Home.js'
import Profile from './components/Profile.js'
import Createpost from './components/createpost'
import * as Google from 'expo-google-app-auth'
import * as SecureStore from 'expo-secure-store';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { SocialIcon } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


I18nManager.forceRTL(false);
I18nManager.allowRTL(false);
const Tab = createMaterialBottomTabNavigator();



function Login({ navigation }) {

  checklogin(navigation);

    return (
      <View style={styles.container}>
      <Text style={styles.header}>Welcome to Community Hub</Text>
      <SocialIcon
      style={{padding:15}}
      title='Sign In With Google'
      button
      type='google'
      onPress={() => signIn()}
    />
    </View>
    )


    async function signIn(){
      try {
        const result = await Google.logInAsync({
          androidClientId:
            "775386699361-0jf4bnccqv0990ob2r0qi2sm5jfn6ksu.apps.googleusercontent.com",
          scopes: ["profile", "email"]
        })
    
        if (result.type === "success") {

          var data = JSON.stringify({
            'user_name': result.user.name,
            'photoUrl': result.user.photoUrl,
            'email':result.user.email
          });

          SecureStore.setItemAsync('user_data',data);
          
          
          navigation.navigate('MyTabs')

        } else {
          console.log("cancelled")
        }
      } catch (e) {
        console.log("error", e)
      }
    }

}

function checklogin(navigation){
  SecureStore.getItemAsync('user_data')
  .then((item) => {
    if (item) {
      navigation.navigate('MyTabs')
    }
});
}


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Login"
    screenOptions={{
      headerShown: false,
      
      headerStyle: {
        backgroundColor: '#3ba3c4',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
    >
      <Stack.Screen name="Login" 
      options={{ title: 'Login' }}
      component={Login}
       />
      <Stack.Screen name="MyTabs" component={MyTabs} options={{ title: 'Feeds' }} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}


function MyTabs() {
  return (
    <Tab.Navigator
    
    labeled={false}
    barStyle={{ backgroundColor: '#ccc' }}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size=24 }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused
            ? 'ios-home'
            : 'ios-home';
        } else if (route.name === 'Post') {
          iconName = focused ? 'ios-list-box' : 'ios-list';
        }
        else if (route.name === 'Profile') {
          iconName = focused ? 'ios-contact' : 'ios-contact';
        }


        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Post" component={Createpost} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    margin:10,
    fontSize: 18
  },
  image: {
    alignSelf:'center',
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150
  }
})