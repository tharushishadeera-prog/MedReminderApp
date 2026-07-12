import React from "react";

import {
    View,
    Text,
    StyleSheet
} from "react-native";


export default function About() {

    return (

        <View style={styles.container}>


            <Text style={styles.logo}>
                💊
            </Text>


            <Text style={styles.title}>
                MedReminder
            </Text>


            <Text style={styles.version}>
                Version 1.0.0
            </Text>



            <Text style={styles.description}>

                Smart medicine reminder application
                designed to help users manage medicines,
                track daily schedules and monitor health progress.

                {"\n\n"}

                Features:

                {"\n"}
                ✓ Medicine Management

                {"\n"}
                ✓ Reminder Tracking

                {"\n"}
                ✓ History Analytics

                {"\n"}
                ✓ Progress Monitoring


            </Text>



            <Text style={styles.dev}>
                Developed by Shadee
            </Text>


        </View>

    );

}



const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 25,
        backgroundColor: "#F9FAFB"
    },

    logo: {
        fontSize: 70
    },

    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 10
    },

    version: {
        color: "#6B7280",
        marginTop: 5
    },

    description: {
        marginTop: 30,
        fontSize: 16,
        lineHeight: 25,
        textAlign: "center"
    },

    dev: {
        marginTop: 40,
        fontWeight: "bold"
    }

});