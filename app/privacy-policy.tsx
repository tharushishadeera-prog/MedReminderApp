import React from "react";

import {
    View,
    Text,
    StyleSheet,
    ScrollView
} from "react-native";


export default function PrivacyPolicy() {

    return (

        <ScrollView style={styles.container}>

            <Text style={styles.title}>
                Privacy Policy 📄
            </Text>


            <Text style={styles.text}>

                MedReminder respects your privacy.

                {"\n\n"}

                User authentication is handled using Firebase Authentication.

                {"\n\n"}

                Medicine information is stored securely in Firebase Firestore
                and is only accessible by the authenticated user.

                {"\n\n"}

                We do not share your personal information with third parties.

                {"\n\n"}

                By using MedReminder, you agree to this privacy policy.

            </Text>


        </ScrollView>

    );

}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
        padding: 20
    },

    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginTop: 30,
        marginBottom: 20
    },

    text: {
        fontSize: 16,
        lineHeight: 25,
        color: "#374151"
    }

});