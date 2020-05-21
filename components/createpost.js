import React from "react"
import { StyleSheet, Text, View, Image,I18nManager } from "react-native"
import { Header } from 'react-native-elements'
I18nManager.forceRTL(false);
I18nManager.allowRTL(false);

export default function CreatePost(){
return(
    <View style={{flex:1, alignSelf: 'stretch'}}>    
     <Header
        containerStyle={{
            paddingTop: 0,
            height:60,
            backgroundColor: '#3C94E2',
        }}
        placement="left"
        centerComponent={{ text: 'NEW POST', style: { color: '#fff' } }}
        rightComponent={{ icon: 'home', color: '#fff' }}
    /> 
    <View style={styles.container}>
        <Text style={styles.text}>Create New Post</Text>
        <Text style={styles.text}>Let's Share something new</Text>
       
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
   
      text:{
          fontSize:16
      }
})

