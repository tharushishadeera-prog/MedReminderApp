import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { router } from "expo-router";
export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginUser = async () => {
        try {
            if (!email || !password) {
                Alert.alert("Error", "Please fill all fields");
                return;
            }

            await signInWithEmailAndPassword(auth, email, password);

            Alert.alert("Success", "Login Successful!");

            router.replace("/(tabs)/home");

        } catch (error: any) {
            Alert.alert("Login Failed", error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>💊</Text>

            <Text style={styles.title}>Welcome Back</Text>

            <TextInput
                placeholder="Email"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                placeholder="Password"
                secureTextEntry
                style={styles.input}
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={loginUser}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => router.push("/(auth)/register")}
            >
                <Text
                    style={{
                        color: "#fff",
                        textAlign: "center",
                        marginTop: 20,
                    }}
                >
                    Don't have an account? Register
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#666668",
        justifyContent: "center",
        padding: 25,
    },
    logo: {
        fontSize: 60,
        textAlign: "center",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        color: "#fff",
        marginBottom: 30,
    },
    input: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
    },
    button: {
        backgroundColor: "#ebac5b",
        padding: 15,
        borderRadius: 10,
    },
    buttonText: {
        textAlign: "center",
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});