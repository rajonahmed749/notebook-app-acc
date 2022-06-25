import { StyleSheet, Text, View, SafeAreaView, StatusBar, Pressable, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from '../../App';

export default function Home({ navigation, user }) {
  // console.log("user from home", user);
  const [notes, SetNotes] = useState([]);

  const onPressCreate = () => {
    navigation.navigate('Create')
  }


  useEffect(() => {
    const q = query(collection(db, "notes"), where("uid", "==", user.uid));
    const notesListenerSubscription = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push(doc.data())
      })
      SetNotes(list)

    });
    return notesListenerSubscription;

  }, [])

  console.log("all user note ---> ", notes)

  const renderItem = ({item}) => {
    return (
      <Pressable 
         style={{
          marginBottom:25,
          borderRadius:16,
          backgroundColor: 'grey',
          
         }}
      >
        <Text style={{color: 'white', fontSize: 24}}> {item.title}</Text>
      </Pressable>
    )
  }

  return (
    <>
      <View style={styles.home}>
        <Text>My Notes </Text>
        <Pressable onPress={onPressCreate}>
          <AntDesign name="pluscircleo" size={24} color="black" />
        </Pressable>
      </View>
      <FlatList data={notes} renderItem={renderItem} keyExtractor={(item) => item.title}  contentContainerStyle={{padding: 16}}/>
    </>

  )

}

const styles = StyleSheet.create({

  home: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20
  },
})