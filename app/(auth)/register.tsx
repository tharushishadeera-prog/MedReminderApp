import React, { useState } from "react";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";

import { auth, db } from "../firebase/firebaseConfig";

import {
    createUserWithEmailAndPassword,
    updateProfile
} from "firebase/auth";

import {
    doc,
    serverTimestamp,
    setDoc
} from "firebase/firestore";

import { router } from "expo-router";


export default function RegisterScreen() {


    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");



    const registerUser = async () => {


        try {


            if (!name || !email || !password) {


                Alert.alert(
                    "Error",
                    "Please fill all fields"
                );

                return;

            }



            const userCredential =
                await createUserWithEmailAndPassword(

                    auth,

                    email,

                    password

                );



            const user = userCredential.user;



            // Save name in Firebase Auth

            await updateProfile(
                user,
                {
                    displayName: name
                }
            );



            // Save user data in Firestore

            await setDoc(

                doc(
                    db,
                    "users",
                    user.uid
                ),

                {

                    name: name,

                    email: email,

                    phone: "",

                    createdAt:
                        serverTimestamp(),

                }

            );



            Alert.alert(
                "Success",
                "Account created successfully!"
            );



            router.replace("/(auth)/login");



        } catch (error: any) {


            Alert.alert(
                "Registration Failed",
                error.message
            );


        }


    };



    return (

        <View style={styles.container}>


            <Text style={styles.logo}>
                💊
            </Text>


            <Text style={styles.title}>
                MedReminder
            </Text>


            <Text style={styles.subtitle}>
                Create your account
            </Text>



            <TextInput

                placeholder="Full Name"

                style={styles.input}

                value={name}

                onChangeText={setName}

            />



            <TextInput

                placeholder="Email"

                style={styles.input}

                value={email}

                onChangeText={setEmail}

                keyboardType="email-address"

            />



            <TextInput

                placeholder="Password"

                style={styles.input}

                secureTextEntry

                value={password}

                onChangeText={setPassword}

            />



            <TouchableOpacity

                style={styles.button}

                onPress={registerUser}

            >

                <Text style={styles.buttonText}>
                    Register
                </Text>


            </TouchableOpacity>



            <TouchableOpacity

                onPress={() =>
                    router.push("/(auth)/login")
                }

            >

                <Text style={styles.loginText}>
                    Already have an account? Login
                </Text>


            </TouchableOpacity>



        </View>

    );

}



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#666668",
        justifyContent: "center",
        padding: 25
    },

    logo: {
        fontSize: 60,
        textAlign: "center"
    },

    title: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        color: "#0a0a0a",
        marginTop: 10
    },

    subtitle: {
        textAlign: "center",
        color: "#e5e6e9",
        marginBottom: 30
    },

    input: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
        marginBottom: 15
    },

    button: {
        backgroundColor: "#ebac5b",
        padding: 15,
        borderRadius: 10
    },

    buttonText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16
    },

    loginText: {
        color: "#fff",
        textAlign: "center",
        marginTop: 20
    }

});