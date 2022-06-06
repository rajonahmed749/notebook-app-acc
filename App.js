import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/home';
import Signin from './src/screens/signin';
import Signup from './src/screens/signup';
import Edit from './src/screens/edit';
import Create from './src/screens/create';
// import { initializeApp } from "firebase/app";
// import firebase from "firebase/app";
// import firebase from 'firebase';
// import firebase from 'firebase/compat/app';


const Stack = createNativeStackNavigator();

// change the whole bg color into white 
const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff'
  }
}


// const firebaseConfig = {
//   apiKey: "AIzaSyB00hxG3Bnj6o12ZTU1rTlZQ7Z24cxMct0",
//   authDomain: "note-book-app-v2.firebaseapp.com",
//   projectId: "note-book-app-v2",
//   storageBucket: "note-book-app-v2.appspot.com",
//   messagingSenderId: "274470027467",
//   appId: "1:274470027467:web:fcde5d6cffa75ce2f29b4e"
// };

// if (firebase.apps.length === 0) {
//   firebase.initializeApp(firebaseConfig);
// }
// const app = initializeApp(firebaseConfig);
// firebase.initializeApp(firebaseConfig);

// if (firebase.apps.length === 0) {
//   firebase.initializeApp(firebaseConfig);
// }



export default function App() {
  const user = false // user authenticated kina 

  return (
    <NavigationContainer theme={AppTheme}>
      <Stack.Navigator>
        {
          user ? (
            <>
              <Stack.Screen name="Home" component={Home} />
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
