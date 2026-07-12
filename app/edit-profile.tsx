import React, { useEffect, useState } from "react";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    SafeAreaView,
    ScrollView,
} from "react-native";

import { auth, db } from "./firebase/firebaseConfig";

import {
    doc,
    getDoc,
    updateDoc,
} from "firebase/firestore";

import { router } from "expo-router";

export default function EditProfile() {

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {

        loadUser();

    }, []);

    const loadUser = async () => {

        const user = auth.currentUser;

        if (!user) return;

        setEmail(user.email || "");

        const docRef = doc(
            db,
            "users",
            user.uid
        );

        const snapshot = await getDoc(docRef);

        if (snapshot.exists()) {

            const data: any = snapshot.data();

            setName(data.name || "");

            setPhone(data.phone || "");

        }

    };

    const saveProfile = async () => {

        const user = auth.currentUser;

        if (!user) return;

        try {

            await updateDoc(

                doc(
                    db,
                    "users",
                    user.uid
                ),

                {
                    name,
                    phone,
                }

            );

            Alert.alert(
                "Success",
                "Profile updated successfully."
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

            <ScrollView>

                <Text style={styles.title}>
                    Edit Profile
                </Text>

                <Text style={styles.label}>
                    Full Name
                </Text>

                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                />

                <Text style={styles.label}>
                    Email
                </Text>

                <TextInput
                    style={styles.input}
                    value={email}
                    editable={false}
                />

                <Text style={styles.label}>
                    Phone Number
                </Text>

                <TextInput
                    style={styles.input}
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    placeholder="+94xxxxxxxxx"
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={saveProfile}
                >

                    <Text style={styles.buttonText}>
                        Save Changes
                    </Text>

                </TouchableOpacity>

            </ScrollView>

        </SafeAreaView>

    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
        padding: 20,
    },

    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 30,
        textAlign: "center",
    },

    label: {
        fontSize: 15,
        fontWeight: "600",
        color: "#374151",
        marginBottom: 8,
        marginTop: 10,
    },

    input: {
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        padding: 15,
        marginBottom: 15,
    },

    button: {
        backgroundColor: "#4F46E5",
        padding: 16,
        borderRadius: 15,
        alignItems: "center",
        marginTop: 20,
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },

});