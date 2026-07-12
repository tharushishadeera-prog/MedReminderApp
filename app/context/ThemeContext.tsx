import React, {
    createContext,
    useState,
    useEffect
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";


export const ThemeContext = createContext<any>(null);



export default function ThemeProvider({
    children
}: any) {


    const [darkMode, setDarkMode] = useState(false);



    useEffect(() => {

        loadTheme();

    }, []);



    const loadTheme = async () => {

        const saved =
            await AsyncStorage.getItem(
                "darkMode"
            );


        if (saved) {

            setDarkMode(
                saved === "true"
            );

        }

    };




    const toggleTheme = async () => {


        const value = !darkMode;


        setDarkMode(value);


        await AsyncStorage.setItem(
            "darkMode",
            String(value)
        );


    };




    const colors = darkMode
        ?
        {

            background: "#111827",
            card: "#1F2937",
            text: "#F9FAFB",
            subText: "#9CA3AF",
            border: "#374151",
            primary: "#818CF8"

        }
        :
        {

            background: "#F9FAFB",
            card: "#FFFFFF",
            text: "#111827",
            subText: "#6B7280",
            border: "#E5E7EB",
            primary: "#4F46E5"

        };




    return (

        <ThemeContext.Provider

            value={{

                darkMode,

                toggleTheme,

                colors

            }}

        >

            {children}

        </ThemeContext.Provider>

    );

}