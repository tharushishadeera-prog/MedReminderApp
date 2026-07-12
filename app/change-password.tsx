import React, { useState } from "react";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    SafeAreaView,
} from "react-native";

import {
    EmailAuthProvider,
    reauthenticateWithCredential,
    updatePassword,
} from "firebase/auth";

import { auth } from "./firebase/firebaseConfig";

import { router } from "expo-router";


export default function ChangePassword() {


    const [currentPassword, setCurrentPassword] = useState("");

    const [newPassword, setNewPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");



    const changePassword = async () => {


        const user = auth.currentUser;


        if (!user || !user.email) {

            Alert.alert(
                "Error",
                "User not found"
            );

            return;

        }



        if (
            !currentPassword ||
            !newPassword ||
            !confirmPassword
        ) {

            Alert.alert(
                "Error",
                "Please fill all fields"
            );

            return;

        }



        if (newPassword !== confirmPassword) {

            Alert.alert(
                "Error",
                "Passwords do not match"
            );

            return;

        }



        if (newPassword.length < 6) {

            Alert.alert(
                "Error",
                "Password must contain at least 6 characters"
            );

            return;

        }



        try {


            const credential =
                EmailAuthProvider.credential(

                    user.email,

                    currentPassword

                );



            await reauthenticateWithCredential(

                user,

                credential

            );



            await updatePassword(

                user,

                newPassword

            );



            Alert.alert(
                "Success",
                "Password changed successfully"
            );



            router.back();



        } catch (error: any) {


            Alert.alert(

                "Error",

                error.message

            );


        }


    };



    return (


        <SafeAreaView style={styles.container}>


            <Text style={styles.title}>
                Change Password 🔒
            </Text>



            <TextInput

                placeholder="Current Password"

                style={styles.input}

                secureTextEntry

                value={currentPassword}

                onChangeText={setCurrentPassword}

            />



            <TextInput

                placeholder="New Password"

                style={styles.input}

                secureTextEntry

                value={newPassword}

                onChangeText={setNewPassword}

            />



            <TextInput

                placeholder="Confirm New Password"

                style={styles.input}

                secureTextEntry

                value={confirmPassword}

                onChangeText={setConfirmPassword}

            />



            <TouchableOpacity

                style={styles.button}

                onPress={changePassword}

            >

                <Text style={styles.buttonText}>
                    Update Password
                </Text>


            </TouchableOpacity>



        </SafeAreaView>


    );

}



const styles = StyleSheet.create({


    container: {

        flex: 1,

        backgroundColor: "#F9FAFB",

        padding: 25,

        justifyContent: "center"

    },


    title: {

        fontSize: 28,

        fontWeight: "bold",

        textAlign: "center",

        marginBottom: 30

    },


    input: {

        backgroundColor: "#FFFFFF",

        borderRadius: 14,

        padding: 15,

        borderWidth: 1,

        borderColor: "#E5E7EB",

        marginBottom: 15

    },


    button: {

        backgroundColor: "#4F46E5",

        padding: 16,

        borderRadius: 14,

        alignItems: "center",

        marginTop: 10

    },


    buttonText: {

        color: "#FFFFFF",

        fontWeight: "bold",

        fontSize: 16

    }


});