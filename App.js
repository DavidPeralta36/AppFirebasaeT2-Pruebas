import React from 'react';
import { useState , useEffect} from "react";
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View,TextInput,TouchableOpacity,Alert  } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, getFirestore, getDocs  } from "firebase/firestore"; 

export const firebaseConfig = {
  apiKey: "AIzaSyAtxc-z_jLUl1KONv7sXCUqw6dSF_lRfTw",
  authDomain: "prueba1-1c8a4.firebaseapp.com",
  projectId: "prueba1-1c8a4",
  storageBucket: "prueba1-1c8a4.appspot.com",
  messagingSenderId: "962605574918",
  appId: "1:962605574918:web:4147fba1f83a98a8b88c87"
};

//

export default function App() {
  const [email, setEmail] = useState("");
  //const [logear, setLogear] = React.useState(null);
  const [password, setPassword] = useState("");

  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app)

  const auth = getAuth(app)

  /*
  useEffect(() => {
    try {
      const docRef = addDoc(collection(db, "Usuarios"), {
        Nombre: "Alan",
        Edad: 22,
      });
    
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }, [])
  */

  async function consultar()  {
    const querySnapshot =  await getDocs(collection(db, "Usuarios"));
    querySnapshot.forEach((doc) => {
    console.log(doc.data().Nombre);
    console.log(doc.data().Edad);
    });
  }

  useEffect(() => {
    consultar();
  }, [])
  


  const crearCuenta = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((credencialesUsr)=> {
      console.log("cuenta creada")
      const user = credencialesUsr.user;
      console.log(user)
    })
    .catch(error => {
      console.log(error)
    })
  }

  const iniciarSesion = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((credencialesUsr)=>{
      console.log("Logeado")
      const user = credencialesUsr.user
      console.log(credencialesUsr)
    })
    .catch(error=>{
      console.log(error)
    })
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("./assets/navegador.png")} />
 
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Correo o Nombre de usuario"
          placeholderTextColor="white"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="white"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
 
      <TouchableOpacity>
        <Text style={styles.forgot_button}
        onPress={() => {
          alert("Nimodos para que la olvidas jj || Admin - 1234")
        }}>Olvidaste tu contraseña? :(</Text>
      </TouchableOpacity>
 
      <TouchableOpacity style={styles.loginBtn} onPress={() => {
          iniciarSesion();
        }}>
      <Text style={styles.loginText}>Iniciar sesion :)</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={() => {
          crearCuenta()
        }}>
      <Text style={styles.loginText}>Crear una cuenta :)</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#581845",
        alignItems: "center",
        justifyContent: "center",
      },
    image: {
      marginBottom: 40,
      width:200,
      height:200
    },
   
    inputView: {
      backgroundColor: "#C70039",
      borderRadius: 10,
      width: "70%",
      height: 45,
      marginBottom: 20,
      alignItems: "center",
      justifyContent: "center",
    },
   
    TextInput: {
      height: 50,
      width:210,
      flex: 1,
      color:'white',
      padding: 10,
      marginLeft: 20,
      alignItems: "center",
    },
   
    forgot_button: {
      height: 30,
      marginBottom: 30,
      color:'white'
    },
   
    loginBtn: {
      width: 210,
      borderRadius: 10,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 40,
      backgroundColor: "#FFC300",
    },
    
  });
  