import React from "react"
import { StyleSheet, Text, View, Image, Button } from "react-native"
import * as Google from 'expo-google-app-auth'
import Home from './components/Home.js'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      signedIn: false,
      name: "",
      photoUrl: "",
      email: ""
    }
  }
  signIn = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "775386699361-0jf4bnccqv0990ob2r0qi2sm5jfn6ksu.apps.googleusercontent.com",
        //iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
        scopes: ["profile", "email"]
      })

      if (result.type === "success") {

        let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
          headers: { Authorization: `Bearer ${result.accessToken}` },
          });

        this.setState({
          signedIn: true,
          name: result.user.name,
          photoUrl: result.user.photoUrl,
          email:result.user.email
        })
      } else {
        console.log("cancelled")
      }
    } catch (e) {
      console.log("error", e)
    }
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.signedIn ? (
          <Home name={this.state.name} image={this.state.photoUrl} email = {this.state.email} />
        ) : (
          <LoginPage signIn={this.signIn} />
        )}
      </View>
    )
  }
}

const LoginPage = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to Community Hub</Text>
      <Text style={styles.header}>Sign-in to Continue</Text>
      <Button title="Sign in with Google" onPress={() => props.signIn()} />
    </View>
  )
}



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