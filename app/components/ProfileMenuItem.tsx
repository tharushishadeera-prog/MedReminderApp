import React, {
    useContext
} from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import {
    ThemeContext
} from "../context/ThemeContext";



export default function ProfileMenuItem({
    icon,
    title,
    onPress
}: any) {


    const {
        colors
    } = useContext(ThemeContext);



    return (

        <TouchableOpacity

            style={[
                styles.item,
                {
                    backgroundColor: colors.card
                }
            ]}

            onPress={onPress}

        >


            <Ionicons

                name={icon}

                size={24}

                color={colors.primary}

            />


            <Text

                style={[
                    styles.title,
                    {
                        color: colors.text
                    }
                ]}

            >

                {title}

            </Text>


            <Ionicons

                name="chevron-forward"

                size={20}

                color={colors.subText}

            />


        </TouchableOpacity>


    );

}



const styles = StyleSheet.create({

    item: {

        flexDirection: "row",
        alignItems: "center",
        padding: 18,
        marginHorizontal: 20,
        marginBottom: 12,
        borderRadius: 15

    },


    title: {

        flex: 1,
        marginLeft: 15,
        fontSize: 16,
        fontWeight: "600"

    }

});