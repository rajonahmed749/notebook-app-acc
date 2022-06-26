import { StyleSheet, Text, View, SafeAreaView, StatusBar, Pressable, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { db } from '../../App';
import { ActivityIndicator } from 'react-native-web';

export default function Home({ navigation, user }) {
  const [loading, setLoading] = useState(true)
  const [notes, SetNotes] = useState([]);

  const onPressCreate = () => {
    navigation.navigate('Create')
  }


  useEffect(() => {
    const q = query(collection(db, "notes"), where("uid", "==", user.uid));
    const notesListenerSubscription = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id })
      })
      SetNotes(list)
      setLoading(false)

    });
    return notesListenerSubscription;

  }, [])

  console.log("all user note ---> ", notes)

  const renderItem = ({ item }) => {
    const { title, description } = item
    return (
      <Pressable
        style={{
          marginBottom: 25,
          borderRadius: 16,
          backgroundColor: 'grey',
        }}
        onPress={
          () => { navigation.navigate('Edit', { item }) }
        }
      >
        <Pressable
          style={{
            position: 'absolute',
            alignSelf: 'flex-end',
            padding: 15,
            zIndex: 4
          }}
          onPress={() => {
            deleteDoc(doc(db, "notes", item.id));
          }}

        >
          <AntDesign name="delete" size={24} color="black" />
        </Pressable>
        <Text style={{ color: 'white', fontSize: 24 }}> {title}</Text>
        <Text style={{ color: 'white', fontSize: 16, padding: 10 }}> {description}</Text>
      </Pressable>
    )
  }


  // content load howar age ei pre loader ta dekhabe
  // if (loading) {
  //   return (
  //     <SafeAreaView style={styles.AndroidSafeArea}>
  //       <ActivityIndicator />
  //     </SafeAreaView>
  //   )
  // }


  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <View style={styles.home}>
        <Text>My Notes </Text>
        <Pressable onPress={onPressCreate}>
          <AntDesign name="pluscircleo" size={24} color="black" />
        </Pressable>
      </View>
      <FlatList data={notes} renderItem={renderItem} keyExtractor={(item) => item.title} contentContainerStyle={{ padding: 16 }} />
    </SafeAreaView>
  )

}

const styles = StyleSheet.create({
  // AndroidSafeArea: {
  //   flex: 1,
  //   paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  // },
  home: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20
  },
})