import React from "react"
import { StyleSheet, Text, View, Image, Button, VirtualizedList } from "react-native"
export default function Header({title,image}){

  
    return(
        <View style={styles.head}>
            <Text style={styles.text}>{title}</Text>
        </View>
        )
}

const styles = StyleSheet.create({
    head:{
        flexDirection:'row',
        backgroundColor:'#3C94E2',
        height:80,
        padding:10,
       alignItems:'center',
       justifyContent:'center' 
    },
    image: {
        marginTop: 15,
        width: 50,
        height: 50,
        borderColor: "rgba(0,0,0,0.2)",
        borderWidth: 3,
        borderRadius: 80
      }, 
    text: {
        color:'#fff',
        marginTop:20,
        fontSize:20,
        fontWeight:'bold'
      }
})