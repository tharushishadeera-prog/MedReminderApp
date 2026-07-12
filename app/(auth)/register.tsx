import React, {
    useState
} from "react";


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


import {
    LinearGradient
} from "expo-linear-gradient";


import {
    Ionicons
} from "@expo/vector-icons";


import {
    auth,
    db
} from "../firebase/firebaseConfig";


import {
    createUserWithEmailAndPassword,
    updateProfile
} from "firebase/auth";


import {
    doc,
    serverTimestamp,
    setDoc
} from "firebase/firestore";


import {
    router
} from "expo-router";





export default function RegisterScreen() {



    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");


    const [showPassword, setShowPassword] =
        useState(false);





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



            const user =
                userCredential.user;





            await updateProfile(
                user,
                {
                    displayName: name
                }
            );





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
                        serverTimestamp()

                }

            );





            Alert.alert(
                "Success",
                "Account created!"
            );



            router.replace(
                "/(auth)/login"
            );



        }
        catch (error: any) {


            Alert.alert(
                "Register Failed",
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






                    <View style={styles.logoBox}>


                        <Text style={styles.logo}>
                            💊
                        </Text>


                        <View style={styles.userIcon}>


                            <Ionicons

                                name="person-add"

                                size={30}

                                color="#4F46E5"

                            />


                        </View>


                    </View>








                    <Text style={styles.title}>

                        Create Account

                    </Text>



                    <Text style={styles.subtitle}>

                        Join MedReminder today

                    </Text>









                    <View style={styles.card}>





                        <TextInput

                            placeholder="Full Name"

                            placeholderTextColor="#9CA3AF"

                            style={styles.input}

                            value={name}

                            onChangeText={setName}

                        />







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

                                style={styles.passwordInput}

                                secureTextEntry={
                                    !showPassword
                                }

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

                            onPress={registerUser}

                        >


                            <Text style={styles.buttonText}>

                                Create Account

                            </Text>


                        </TouchableOpacity>







                        <TouchableOpacity

                            onPress={() =>
                                router.push(
                                    "/(auth)/login"
                                )
                            }

                        >

                            <Text style={styles.loginText}>

                                Already have an account?

                                {" "}

                                <Text style={styles.bold}>

                                    Login

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



    userIcon: {

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

        fontSize: 32,

        fontWeight: "bold",

        textAlign: "center",

        color: "#000"

    },



    subtitle: {

        textAlign: "center",

        color: "#111",

        marginTop: 8,

        marginBottom: 30

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

        marginBottom: 15

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

        padding: 16

    },





    button: {

        backgroundColor: "#776073",

        padding: 17,

        borderRadius: 15,

        alignItems: "center"

    },



    buttonText: {

        color: "#fff",

        fontWeight: "bold",

        fontSize: 17

    },




    loginText: {

        textAlign: "center",

        marginTop: 25,

        color: "#111"

    },



    bold: {

        fontWeight: "bold",

        color: "#0d0c0e"

    }



});