import { StyleSheet, View, SafeAreaView, Platform, StatusBar, Image, ScrollView, Pressable } from 'react-native';
import React, { useState } from 'react';
import Text from '../components/text/text';
import Button from '../components/Button/Button';
import Input from '../components/Input/input';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../../App';
import { collection, addDoc } from "firebase/firestore";
import { showMessage, hideMessage } from "react-native-flash-message";



const genderOption = ['Male', 'Female']


export default function Signup({ navigation }) {
  const [gender, setGender] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const [loading, setLoading] = useState(false)


  const signUp = async () => {
    setLoading(true)

    try {

      // 1. create user with email and password
      const result = await createUserWithEmailAndPassword(auth, email, password)
      console.log('this is user info ', result)

      // 2. add user to firestore 
      await addDoc(collection(db, 'users'), {
        name: name,
        email: email,
        gender: gender,
        age: age,
        uid: result.user.uid
      })
      setLoading(false)

    } catch (error) {
      console.log("this is error ", error)
      showMessage({
        message: "Something wrong you are trying to do...",
        type: "danger",
      });
      setLoading(false)
    }

  }




  // Old system to use this function 

  // const signUp = () => {
  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       // Signed in 
  //       const user = userCredential.user; 
  //       console.log('this is user', user)
  //       // ...
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       console.log(errorCode, errorMessage)
  //     });
  // }


  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <ScrollView>

        <View style={{ paddingHorizontal: 16, paddingVertical: 25 }}>
          <Input
            autoCapitalize={'none'}
            placeholder="Email Address"

            onChangeText={(text) => setEmail(text)}
          />
          <Input
            placeholder="Password "
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
          <Input
            placeholder="Full Name"
            autoCapitalize={'words'}
            onChangeText={(text) => setName(text)}
          />
          <Input
            placeholder="Age"
            onChangeText={(text) => setAge(text)}
          />

          <View style={{ marginVertical: 15 }}>
            <Text>Select gender</Text>
          </View>

          {
            genderOption.map((option) => {
              const selected = option === gender;
              return (
                <Pressable
                  onPress={() => setGender(option)}
                  key={option}
                  style={styles.radioContainer}
                >
                  <View
                    style={[styles.outerCircle,
                    selected && styles.selectedOuterCircle]}
                  >
                    <View
                      style={[styles.innerCircle,
                      selected && styles.selectedInnerCircle]}
                    />
                  </View>
                  <Text style={styles.radioText}>{option}</Text>
                </Pressable>
              )
            })
          }

          {/* <Pressable style={styles.radioContainer}>
          <View style={[styles.outerCircle, selected && styles.selectedOuterCircle]}>
            <View style={[styles.innerCircle, selected && styles.selectedInnerCircle]} />
          </View>
          <Text style={styles.radioText}>Male</Text>
        </Pressable>
         */}

        </View>

        <View style={styles.signupbutton}>
          <Button
            title={"Sign Up"}
            customStyles={{ alignSelf: 'center', marginBottom: 50 }}
            onPress={signUp}
          />
          <Pressable
            style={{ paddingBottom: 20 }}
            onPress={() => { navigation.navigate('Signin') }}
          >
            <Text>Already have an account? <Text style={{ color: 'green', fontWeight: 'bold' }}>Sign In</Text></Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  signupbutton: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  outerCircle: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#cfcfcf',
    alignItems: 'center',
    justifyContent: 'center'
  },
  innerCircle: {
    height: 15,
    width: 15,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#cfcfcf',
  },
  radioText: {
    marginLeft: 10
  },
  selectedOuterCircle: {
    borderColor: 'orange'
  },
  selectedInnerCircle: {
    backgroundColor: 'orange',
    borderColor: 'orange'
  }
})