import React from "react";
import {
    useContext
} from "react";

import {
    ThemeContext
} from "../context/ThemeContext";

import {
    SafeAreaView,
    Alert,
    ScrollView,
    View,
    Text,
    StyleSheet,
} from "react-native";

import { router } from "expo-router";

import ProfileHeader from "../components/ProfileHeader";
import ProfileMenuItem from "../components/ProfileMenuItem";
import LogoutButton from "../components/LogoutButton";

export default function Profile() {
    const {
        darkMode,
        toggleTheme

    } = useContext(ThemeContext);


    return (

        <SafeAreaView style={styles.container}>

            <ScrollView
                showsVerticalScrollIndicator={false}
            >

                <ProfileHeader />

                <View style={styles.section}>

                    <Text style={styles.sectionTitle}>
                        My Account
                    </Text>

                    <ProfileMenuItem
                        icon="create-outline"
                        title="Edit Profile"
                        onPress={() =>
                            router.push("/edit-profile")
                        }
                    />

                    <ProfileMenuItem
                        icon="notifications-outline"
                        title="Notification Settings"
                        onPress={() => { }}
                    />

                    <ProfileMenuItem
                        icon="lock-closed-outline"
                        title="Change Password"
                        onPress={() =>
                            router.push("/change-password")
                        }
                    />

                    <ProfileMenuItem

                        icon="moon-outline"

                        title={
                            darkMode
                                ?
                                "Light Mode"
                                :
                                "Dark Mode"
                        }

                        onPress={toggleTheme}

                    />

                    <ProfileMenuItem
                        icon="document-text-outline"
                        title="Privacy Policy"
                        onPress={() =>
                            router.push("/privacy-policy")
                        }
                    />

                    <ProfileMenuItem
                        icon="star-outline"
                        title="Rate App"
                        onPress={() =>
                            Alert.alert(
                                "Rate MedReminder ⭐",
                                "Thank you for using our app!"
                            )
                        }
                    />

                    <ProfileMenuItem
                        icon="information-circle-outline"
                        title="About"
                        onPress={() =>
                            router.push("/about")
                        }
                    />

                </View>

                <LogoutButton />

                <Text style={styles.version}>
                    MedReminder v1.0.0
                </Text>

            </ScrollView>

        </SafeAreaView>

    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
    },

    section: {
        marginTop: 10,
        marginBottom: 20,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#111827",
        marginHorizontal: 20,
        marginBottom: 15,
    },

    version: {
        textAlign: "center",
        color: "#9CA3AF",
        marginVertical: 30,
        fontSize: 14,
    },

});