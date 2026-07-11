import React from "react";

import {
    TouchableOpacity,
    StyleSheet
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { router } from "expo-router";


export default function FloatingButton() {


    return (

        <TouchableOpacity

            style={styles.button}

            onPress={() => router.push("/add-medicine")}

        >

            <Ionicons
                name="add"
                size={32}
                color="white"
            />


        </TouchableOpacity>

    );

}



const styles = StyleSheet.create({

    button: {

        position: "absolute",

        right: 25,

        bottom: 30,

        width: 60,

        height: 60,

        borderRadius: 30,

        backgroundColor: "#4F46E5",

        justifyContent: "center",

        alignItems: "center",

        elevation: 5

    }

});