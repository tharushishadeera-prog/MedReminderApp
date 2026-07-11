import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from "react";
// import { registerNotification } from "../services/notificationService";
// useEffect(() => {

//     registerNotification();

// }, []);
export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: '#4F46E5',
            tabBarInactiveTintColor: '#9CA3AF',
            headerShown: false
        }}>
            {/* Home Tab */}
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />
                }}
            />

            {/* Reminders Tab */}
            <Tabs.Screen
                name="medicines"
                options={{
                    title: 'Medicines',
                    tabBarIcon: ({ color }) =>
                        <Ionicons
                            name="medkit"
                            size={24}
                            color={color}
                        />
                }}
            />

            {/* History Tab */}
            <Tabs.Screen
                name="history"
                options={{
                    title: 'History',
                    tabBarIcon: ({ color }) => <Ionicons name="list" size={24} color={color} />
                }}
            />

            {/* Profile Tab */}
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />
                }}
            />
        </Tabs>
    );
}