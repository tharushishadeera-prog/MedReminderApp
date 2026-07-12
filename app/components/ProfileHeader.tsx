import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { auth, db } from "../firebase/firebaseConfig";

import {
    doc,
    getDoc
} from "firebase/firestore";

export default function ProfileHeader() {

    const [name, setName] = useState("User");
    const [email, setEmail] = useState("");

    useEffect(() => {

        const loadUser = async () => {

            const user = auth.currentUser;

            if (!user) return;

            setEmail(user.email || "");

            try {

                const docRef = doc(
                    db,
                    "users",
                    user.uid
                );

                const snapshot = await getDoc(docRef);

                if (snapshot.exists()) {

                    const data: any = snapshot.data();

                    setName(data.name);

                }

            } catch (error) {

                console.log(error);

            }

        };

        loadUser();

    }, []);

    return (

        <View style={styles.container}>

            <View style={styles.avatar}>

                <Ionicons
                    name="person"
                    size={55}
                    color="#4F46E5"
                />

            </View>

            <Text style={styles.name}>
                {name}
            </Text>

            <Text style={styles.email}>
                {email}
            </Text>

        </View>

    );

}

const styles = StyleSheet.create({

    container: {

        alignItems: "center",

        marginTop: 40,

        marginBottom: 30

    },

    avatar: {

        width: 110,

        height: 110,

        borderRadius: 55,

        backgroundColor: "#EEF2FF",

        justifyContent: "center",

        alignItems: "center",

        marginBottom: 15,

        elevation: 5

    },

    name: {

        fontSize: 24,

        fontWeight: "bold",

        color: "#111827"

    },

    email: {

        fontSize: 15,

        color: "#6B7280",

        marginTop: 5

    }

});