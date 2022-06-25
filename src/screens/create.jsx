import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Input from '../components/Input/input';
import Button from '../components/Button/Button';
import { db } from '../../App';
import { collection, addDoc } from "firebase/firestore";
import { showMessage } from 'react-native-flash-message';

export default function Create({navigation, user }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false)

  const addNote = async () => {
    setLoading(true)
    try {

      await addDoc(collection(db, 'notes'), {
        title: title,
        description: description,
        uid: user.uid
      })
      setLoading(false);
      showMessage({
        message: 'Note created successfully',
        type: 'success'
      })
      navigation.goBack()

    } catch (error) {
      console.log("this is error ", error)
      setLoading(false)
    }

  }


  return (
    <View>
      <Input
        placeholder="Title"
        onChangeText={(text) => setTitle(text)}
      />
      <Input
        placeholder="Description"
        multiline={true}
        onChangeText={(text) => setDescription(text)}
      />
      {
        loading ? (
          <ActivityIndicator />
        ) : (
          <Button
            title={"Done"}
            customStyles={{ alignSelf: 'center', marginBottom: 50, width: '100%' }}
            onPress={addNote}
          />
        )
      }

    </View>
  )
}

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center'
  }
})