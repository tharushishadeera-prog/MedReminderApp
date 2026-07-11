import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";

import { auth, db } from "./firebase/firebaseConfig";

import { doc, updateDoc } from "firebase/firestore";

export default function EditMedicine() {
    const params = useLocalSearchParams();

    const [name, setName] = useState((params.name as string) || "");
    const [dosage, setDosage] = useState((params.dosage as string) || "");
    const [time, setTime] = useState((params.time as string) || "");

    const updateMedicine = async () => {
        try {
            const user = auth.currentUser;

            if (!user) {
                Alert.alert("Error", "User not logged in");
                return;
            }

            await updateDoc(
                doc(
                    db,
                    "users",
                    user.uid,
                    "medicines",
                    params.id as string
                ),
                {
                    name,
                    dosage,
                    time,
                }
            );

            Alert.alert("Success", "Medicine updated successfully");

            router.back();
        } catch (error: any) {
            Alert.alert("Error", error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Edit Medicine ✏️</Text>

            <TextInput
                placeholder="Medicine Name"
                style={styles.input}
                value={name}
                onChangeText={setName}
            />

            <TextInput
                placeholder="Dosage"
                style={styles.input}
                value={dosage}
                onChangeText={setDosage}
            />

            <TextInput
                placeholder="Time"
                style={styles.input}
                value={time}
                onChangeText={setTime}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={updateMedicine}
            >
                <Text style={styles.buttonText}>
                    Update Medicine
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
        justifyContent: "center",
        padding: 25,
    },

    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 30,
        textAlign: "center",
    },

    input: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },

    button: {
        backgroundColor: "#4F46E5",
        padding: 15,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10,
    },

    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});