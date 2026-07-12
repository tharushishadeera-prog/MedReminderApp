import React, { useState } from "react";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from "react-native";


import { LinearGradient } from "expo-linear-gradient";

import {
    signInWithEmailAndPassword
} from "firebase/auth";

import {
    auth
} from "../firebase/firebaseConfig";

import {
    router
} from "expo-router";

import {
    Ionicons
} from "@expo/vector-icons";



export default function LoginScreen() {


    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] =
        useState(false);



    const loginUser = async () => {


        try {


            if (!email || !password) {

                Alert.alert(
                    "Error",
                    "Please fill all fields"
                );

                return;

            }



            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );



            router.replace("/(tabs)/home");



        }
        catch (error: any) {


            Alert.alert(
                "Login Failed",
                error.message
            );


        }


    };




    return (


        <LinearGradient

            colors={[
                "#a1e7df",
                "#62c5c7"
            ]}

            style={styles.container}

        >


            <KeyboardAvoidingView

                behavior={
                    Platform.OS === "ios"
                        ?
                        "padding"
                        :
                        "height"
                }

                style={{ flex: 1 }}

            >


                <ScrollView

                    contentContainerStyle={
                        styles.scroll
                    }

                    keyboardShouldPersistTaps="handled"

                >



                    {/* Logo */}

                    <View style={styles.logoBox}>


                        <Text style={styles.logo}>
                            💊
                        </Text>


                        <View style={styles.clock}>

                            <Ionicons
                                name="alarm-outline"
                                size={35}
                                color="#4F46E5"
                            />

                        </View>


                    </View>





                    <Text style={styles.title}>
                        Welcome Back
                    </Text>



                    <Text style={styles.subtitle}>
                        Manage your medicines easily
                    </Text>







                    <View style={styles.card}>


                        <TextInput

                            placeholder="Email"

                            placeholderTextColor="#9CA3AF"

                            style={styles.input}

                            value={email}

                            onChangeText={setEmail}

                            keyboardType="email-address"

                            autoCapitalize="none"

                        />






                        <View style={styles.passwordBox}>


                            <TextInput

                                placeholder="Password"

                                placeholderTextColor="#9CA3AF"

                                secureTextEntry={
                                    !showPassword
                                }

                                style={styles.passwordInput}

                                value={password}

                                onChangeText={setPassword}

                            />



                            <TouchableOpacity

                                onPress={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }

                            >

                                <Ionicons

                                    name={
                                        showPassword
                                            ?
                                            "eye-off"
                                            :
                                            "eye"
                                    }

                                    size={22}

                                    color="#6B7280"

                                />

                            </TouchableOpacity>


                        </View>







                        <TouchableOpacity

                            style={styles.button}

                            onPress={loginUser}

                        >

                            <Text style={styles.buttonText}>
                                Login
                            </Text>


                        </TouchableOpacity>







                        <TouchableOpacity

                            onPress={() =>
                                router.push(
                                    "/(auth)/register"
                                )
                            }

                        >

                            <Text style={styles.register}>

                                Don't have an account?
                                {" "}
                                <Text style={styles.bold}>
                                    Register
                                </Text>

                            </Text>


                        </TouchableOpacity>



                    </View>





                </ScrollView>


            </KeyboardAvoidingView>



        </LinearGradient>


    );

}







const styles = StyleSheet.create({


    container: {

        flex: 1

    },


    scroll: {

        flexGrow: 1,

        justifyContent: "center",

        padding: 25

    },



    logoBox: {

        alignItems: "center",

        marginBottom: 20

    },



    logo: {

        fontSize: 75

    },



    clock: {

        backgroundColor: "#fff",

        width: 60,

        height: 60,

        borderRadius: 30,

        justifyContent: "center",

        alignItems: "center",

        position: "absolute",

        right: 90,

        bottom: -10,

        elevation: 5

    },



    title: {

        color: "#000000",

        fontSize: 32,

        fontWeight: "bold",

        textAlign: "center"

    },


    subtitle: {

        color: "#080808",

        textAlign: "center",

        marginTop: 8,

        marginBottom: 30,

        fontSize: 15

    },



    card: {

        backgroundColor: "#72898a",

        borderRadius: 25,

        padding: 25

    },



    input: {

        backgroundColor: "#F3F4F6",

        borderRadius: 15,

        padding: 16,

        marginBottom: 15,

        fontSize: 15

    },



    passwordBox: {

        flexDirection: "row",

        alignItems: "center",

        backgroundColor: "#F3F4F6",

        borderRadius: 15,

        paddingHorizontal: 15,

        marginBottom: 20

    },


    passwordInput: {

        flex: 1,

        padding: 16,

        fontSize: 15

    },



    button: {

        backgroundColor: "#776073",

        padding: 17,

        borderRadius: 15,

        alignItems: "center"

    },



    buttonText: {

        color: "#080808",

        fontWeight: "bold",

        fontSize: 17

    },



    register: {

        textAlign: "center",

        marginTop: 25,

        color: "#040505"

    },


    bold: {

        color: "#0d0c0e",

        fontWeight: "bold"

    }


});