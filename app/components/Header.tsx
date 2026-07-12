import React from "react";

import {
    View,
    Text,
    StyleSheet
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { auth } from "../firebase/firebaseConfig";


export default function Header() {


    const user = auth.currentUser;


    return (

        <View style={styles.container}>


            <View>


                <Text style={styles.greeting}>
                    Good Morning,
                </Text>



                <Text style={styles.name}>

                    {
                        user?.displayName
                        || user?.email?.split("@")[0]
                        || "User"
                    }

                    👋

                </Text>


            </View>



            <Ionicons
                name="notifications"
                size={25}
                color="brown"
            />


        </View>

    );

}



const styles = StyleSheet.create({

    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },


    greeting: {
        color: "#0c0e0f",
        fontSize: 15,
    },


    name: {
        color: "black",
        fontSize: 24,
        fontWeight: "bold",
    }


});