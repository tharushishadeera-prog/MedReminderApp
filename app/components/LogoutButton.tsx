import React from "react";

import {
    TouchableOpacity,
    Text,
    StyleSheet,
    Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { signOut } from "firebase/auth";

import { auth } from "../firebase/firebaseConfig";

import { router } from "expo-router";

export default function LogoutButton() {

    const handleLogout = () => {

        Alert.alert(

            "Logout",

            "Are you sure you want to logout?",

            [

                {
                    text: "Cancel",
                    style: "cancel",
                },

                {

                    text: "Logout",

                    style: "destructive",

                    onPress: async () => {

                        try {

                            await signOut(auth);

                            router.replace("/(auth)/login");

                        } catch (error) {

                            console.log(error);

                        }

                    },

                },

            ]

        );

    };

    return (

        <TouchableOpacity

            style={styles.button}

            onPress={handleLogout}

            activeOpacity={0.8}

        >

            <Ionicons
                name="log-out-outline"
                size={22}
                color="#FFFFFF"
            />

            <Text style={styles.text}>
                Logout
            </Text>

        </TouchableOpacity>

    );

}

const styles = StyleSheet.create({

    button: {

        backgroundColor: "#EF4444",

        marginHorizontal: 20,

        marginTop: 20,

        marginBottom: 30,

        borderRadius: 18,

        paddingVertical: 16,

        justifyContent: "center",

        alignItems: "center",

        flexDirection: "row",

        elevation: 3,

        shadowColor: "#000",

        shadowOpacity: 0.15,

        shadowOffset: {

            width: 0,

            height: 3,

        },

        shadowRadius: 5,

    },

    text: {

        color: "#FFFFFF",

        fontSize: 17,

        fontWeight: "bold",

        marginLeft: 10,

    },

});