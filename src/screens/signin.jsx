import { StyleSheet, View, SafeAreaView, Platform, StatusBar, Image, ScrollView, Pressable } from 'react-native';
import React, { useState } from 'react';
import Text from '../components/text/text';
import Button from '../components/Button/Button';
import Input from '../components/Input/input';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../App';

export default function Signin({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const logIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)
            });
    }
    return (
        <SafeAreaView style={styles.AndroidSafeArea}>
            <ScrollView>
                <Image style={{ alignSelf: 'center', width: 350, height: 350 }}
                    source={require('../../assets/signin.png')} />
                <Text preset='h1' style={{ textAlign: 'center' }}>Never forget your notes</Text>

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

                </View>

                <View style={styles.signupbutton}>
                    <Button
                        title={"Login"}
                        onPress={logIn}
                        customStyles={{ alignSelf: 'center', marginBottom: 20 }}
                    />
                    <Pressable onPress={() => { navigation.navigate('Signup') }}>
                        <Text>Don't have an account? <Text style={{ color: 'green' }}>Sign Up</Text></Text>
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
        alignItems: 'center',
        marginTop: 70

    }
})