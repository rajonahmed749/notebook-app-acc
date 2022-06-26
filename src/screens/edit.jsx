import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Input from '../components/Input/input';
import Button from '../components/Button/Button';
import { db } from '../../App';
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { showMessage } from 'react-native-flash-message';

export default function Edit({ navigation, route }) {
  const noteItem = route.params.item;
  console.log('from edit screen', noteItem)

  const [title, setTitle] = useState(noteItem.title);
  const [description, setDescription] = useState(noteItem.description);
  const [loading, setLoading] = useState(false)
  // console.log('from edit screen', title, description)


  const onPressUpdate = async () => {

    const noteRef = doc(db, "notes", noteItem.id);
    setLoading(true)
    try {
      await updateDoc(doc(db, "notes", noteItem.id), {
        title: title,
        description: description
      });

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
        value={title}
      />
      <Input
        placeholder="Description"
        multiline={true}
        onChangeText={(text) => setDescription(text)}
        value={description}
      />
      {
        loading ? (
          <ActivityIndicator />
        ) : (
          <Button
            title={"Done"}
            customStyles={{ alignSelf: 'center', marginBottom: 50, width: '100%' }}
            onPress={onPressUpdate}
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