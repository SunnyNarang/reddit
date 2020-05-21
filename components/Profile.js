import React, { useState, useEffect } from "react"
import * as SecureStore from 'expo-secure-store';
import { StyleSheet, Text, View, Image,I18nManager } from "react-native"
import { Header } from 'react-native-elements'
I18nManager.forceRTL(false);
I18nManager.allowRTL(false);


export default function Home({navigation}){
   const [user, setuser] = useState({
       user_name:'',
       photoUrl : 's',
       email : ''
   });

   var num = 0;
   
   if(user.user_name==''){
    SecureStore.getItemAsync('user_data')
    .then((item) => {
    if (item) {
      console.log(item);
      const obj = JSON.parse(item);
     setuser({
        user_name : obj.user_name,
        photoUrl : obj.photoUrl,
        email : obj.email
     });
    }});}

    

    return(
        
    <View style={{flex:1, alignSelf: 'stretch'}}>   
    <Header
        containerStyle={{
            paddingTop: 0,
            height:60,
            backgroundColor: '#3C94E2',
        }}
        placement="left"
        centerComponent={{ text: 'YOUR PROFILE', style: { color: '#fff' } }}
        rightComponent={{ icon: 'home', color: '#fff' }}
    /> 
        <View style={styles.container}>
            <Text style={styles.text}>{user.user_name}, Welcome to Community Hub !</Text>
            <Text style={styles.text}>Email: {user.email}</Text>
            <Image style={styles.image} source={{uri: user.photoUrl}} />
        </View>
    </View>
    )
}




const styles = StyleSheet.create({
    container:{
        backgroundColor:'#eee',
        padding:20,
       alignItems:'center' 
    }, 
    image: {
        marginTop: 15,
        width: 80,
        height: 80,
        borderColor: "rgba(0,0,0,0.2)",
        borderWidth: 3,
        borderRadius: 80
      },
      text:{
          fontSize:16
      }
})

