import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/home';
import Signin from './src/screens/signin';
import Signup from './src/screens/signup';
import Edit from './src/screens/edit';
import Create from './src/screens/create';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import FlashMessage from "react-native-flash-message";
import { } from 'react-native-web';



const firebaseConfig = {
  apiKey: "AIzaSyB00hxG3Bnj6o12ZTU1rTlZQ7Z24cxMct0",
  authDomain: "note-book-app-v2.firebaseapp.com",
  projectId: "note-book-app-v2",
  storageBucket: "note-book-app-v2.appspot.com",
  messagingSenderId: "274470027467",
  appId: "1:274470027467:web:fcde5d6cffa75ce2f29b4e"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


// change the whole bg color into white 
const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff'
  }
}

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // user aucthinticated kina check kori
  useEffect(() => {
    const authSubscription = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        setLoading(false)
      }
      else {
        setUser(null)
        setLoading(false)
      }
    })

    return authSubscription;
  }, [])



  // useEffect(() => {
  //   signOut(auth)
  // })


  // jodi loading hoy tahole 
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color='blue' size='large' />
      </View>
    )
  }


  return (
    <NavigationContainer theme={AppTheme}>
      <Stack.Navigator>
        {
          user ? (
            <>
              <Stack.Screen name="Home" options={{ headerShown: false }}>
                {(props) => <Home {...props} user={user} />}
              </Stack.Screen>
              <Stack.Screen name="Edit" component={Edit} />
              <Stack.Screen name="Create" component={Create} />
            </>
          ) : (
            <>
              <Stack.Screen name="Signin" component={Signin} options={{ headerShown: false }} />
              <Stack.Screen name="Signup" component={Signup} />
            </>
          )
        }
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
