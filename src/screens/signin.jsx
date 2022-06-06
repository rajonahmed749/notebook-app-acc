import { StyleSheet, View, SafeAreaView, Platform, StatusBar, Image, TextInput, Pressable } from 'react-native';
import React from 'react';
import Text from '../components/text/text';
import Button from '../components/Button/Button';
import Input from '../components/Input/input';

export default function Signin({ navigation }) {
    return (
        <SafeAreaView style={styles.AndroidSafeArea}>
            <Image style={{ alignSelf: 'center', width: 350, height: 350 }}
                source={require('../../assets/signin.png')} />
            <Text preset='h1' style={{ textAlign: 'center' }}>Never forget your notes</Text>

            <View style={{ paddingHorizontal: 16, paddingVertical: 25 }}>
                <Input placeholder="Email Address" />
                <Input placeholder="Password " secureTextEntry />

            </View>

            <View style={styles.signupbutton}>
                <Button title={"Login"} customStyles={{ alignSelf: 'center', marginBottom: 50 }} />
                <Pressable onPress={() => { navigation.navigate('Signup') }}>
                    <Text>Don't have an account? <Text style={{ color: 'green', fontWeight: 'bold' }}>Sign Up</Text></Text>
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

    }
})