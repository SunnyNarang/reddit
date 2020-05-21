import React, { useState, useEffect } from "react"
import * as SecureStore from 'expo-secure-store';
import { StyleSheet, Text, View, Image,I18nManager,FlatList,Button } from "react-native"
import {Card, Header,Icon } from 'react-native-elements'

I18nManager.forceRTL(false);
I18nManager.allowRTL(false);




  
export default function Home({navigation}){
    const [refreshlist, dorefresh] = useState(true);

    const [DATA,setdata] = useState([
        {
          id: '1',
          title: 'Hello Guys,\nThis is me Sunny Narang',
          image: 'https://lh3.googleusercontent.com/a-/AOh14Ghzl6m1dqqDdAx102QICNtc6MMc-AJMG_8EzVPcqw',
          likes:0
        },
        {
          id: '2',
          title: 'Shriram Choubey',
          image: 'https://instagram.fbho1-1.fna.fbcdn.net/v/t51.2885-15/e35/93793202_868330736940338_2169305377038431643_n.jpg?_nc_ht=instagram.fbho1-1.fna.fbcdn.net&_nc_cat=102&_nc_ohc=R6PuH3M9oWkAX8WLSQ_&oh=dc98e06eafc4ce01d5c4e81dbe4c11c9&oe=5EF04DEB',
          likes:0
        },
        {
          id: '3',
          title: 'Saurav Dwivedi',
          image: 'https://instagram.fbho1-1.fna.fbcdn.net/v/t51.2885-15/e35/91409943_897636090673272_2985060922652636701_n.jpg?_nc_ht=instagram.fbho1-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=eHYl4iY86BwAX_niBSM&oh=12814a5df0085e7a2b413e2a1f784018&oe=5EEE4F23',
          likes:0
        },
      ]);

   const [user, setuser] = useState({
       user_name:'',
       photoUrl : 's',
       email : ''
   });

  
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
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: 'YOUR FEEDS', style: { color: '#fff' } }}
        //rightComponent={{ icon: 'home', color: '#fff' }}
        rightComponent={<MyCustomRightComponent nav = {navigation}/>}
         
    /> 
        <View style={styles.container}>
            <Text style={styles.text}>Welcome, {user.user_name}</Text>
            <Image style={styles.image} source={{uri: user.photoUrl}} />
        </View>

        <FlatList
        style= {{flex:1}}
        data={DATA}
        extraData={refreshlist}
        renderItem={({ item }) => 
        
        <Item title={item.title} imageurl ={item.image} likes={item.likes} itemid={item.id}/>
        
    }
        keyExtractor={item => item.id}
        />



    </View>
    )
 
    function likeit(itemid){
        setdata((prevDATA)=>{
            prevDATA.find(x => x.id == itemid).likes++;
            return prevDATA
        })
        dorefresh(!refreshlist)
    }
     function dislikeit(itemid){
        setdata((prevDATA)=>{
            prevDATA.find(x => x.id == itemid).likes--;
            return prevDATA
        })
        dorefresh( !refreshlist)
     }



function Item({ title , imageurl,likes,itemid}) {
    return (
      
                <Card
                containerStyle = {{padding:10}}
                >
                <View style = {{flexDirection:'row',padding:5}}>
                    <Image resizeMode={'cover'}
                    style={styles.image} 
                    source = {{uri:  'https://lh3.googleusercontent.com/a-/AOh14Ghzl6m1dqqDdAx102QICNtc6MMc-AJMG_8EzVPcqw' }} />
                    <Text style = {{alignSelf:'center',paddingLeft:20}}>Sunny Narang</Text>

                </View>

                <Image resizeMode={'cover'}
                    style={{ width: '100%', height: 400 }} 
                    source = {{uri: imageurl }} />
                    
                <Text style={{margin: 10}}>
                    {title}
                </Text>

                <View style={{flexDirection:'row',alignItems:'center'}}>
                    
                    <Icon
                    name='arrow-bold-up'
                    type='entypo'
                    size = {24} 
                    color='#444'
                    onPress={() => {
                        likeit(itemid)
                    }} />

                   <Text style={{marginLeft:20,marginRight:20}}>{likes}</Text>
                    
                    <Icon
                    name='arrow-bold-down'
                    type='entypo'
                    size = {24} 
                    color='#444'
                    onPress={() => {
                        dislikeit(itemid)
                    }} />

                </View>

                </Card>

    );
  }
}



function MyCustomRightComponent({nav}){
    return(
        <View>
            <Icon
                name='exit-to-app'
                type='MaterialIcons'
                size = {24} 
                color='#fff'
                onPress={() => {
                    SecureStore.setItemAsync('user_data','');
                    nav.navigate('Login')
                }} />
        </View>
    );
}




const styles = StyleSheet.create({
    container:{
        backgroundColor:'#eee',
        padding:10,
        flexDirection:'row',
       alignItems:'center' 
    }, 
    image: {
        width: 40,
        height: 40,
        borderColor: "rgba(0,0,0,0.2)",
        borderWidth: 3,
        borderRadius: 40
      },
      text:{
          flex:1,
          fontSize:16
      }
})

