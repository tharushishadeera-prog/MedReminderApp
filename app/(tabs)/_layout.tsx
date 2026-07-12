import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';


export default function TabLayout() {

    return (

        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#4F46E5",
                tabBarInactiveTintColor: "#9CA3AF",
                headerShown: false
            }}
        >


            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) =>
                        <Ionicons
                            name="home"
                            size={24}
                            color={color}
                        />
                }}
            />



            <Tabs.Screen
                name="medicines"
                options={{
                    title: "Medicines",
                    tabBarIcon: ({ color }) =>
                        <Ionicons
                            name="medkit"
                            size={24}
                            color={color}
                        />
                }}
            />



            <Tabs.Screen
                name="history"
                options={{
                    title: "History",
                    tabBarIcon: ({ color }) =>
                        <Ionicons
                            name="bar-chart"
                            size={24}
                            color={color}
                        />
                }}
            />



            <Tabs.Screen
                name="calendar"
                options={{
                    title: "Calendar",
                    tabBarIcon: ({ color }) =>
                        <Ionicons
                            name="calendar"
                            size={24}
                            color={color}
                        />
                }}
            />



            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color }) =>
                        <Ionicons
                            name="person"
                            size={24}
                            color={color}
                        />
                }}
            />



        </Tabs>

    );

}