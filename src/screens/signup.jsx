import { StyleSheet, View, SafeAreaView, Platform, StatusBar, Image, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';
import Text from '../components/text/text';
import Button from '../components/Button/Button';
import Input from '../components/Input/input';
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const genderOption = ['Male', 'Female']
// const auth = getAuth();


export default function Signup() {
  const [gender, setGender] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');


  const signUp = () => {
    // createUserWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     // Signed in 
    //     const user = userCredential.user;
    //     console.log(user)
    //     // ...
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log(errorCode, errorMessage)
    //   });
    alert('firebase will be added later')
  }


  return (
    <SafeAreaView style={styles.AndroidSafeArea}>

      <View style={{ paddingHorizontal: 16, paddingVertical: 25 }}>
        <Input
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
        <Pressable>
          <Text>Already have an account? <Text style={{ color: 'green', fontWeight: 'bold' }}>Sign In</Text></Text>
        </Pressable>
      </View>

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