import React from "react";

import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

type Props = {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    onPress: () => void;
    color?: string;
};

export default function ProfileMenuItem({
    icon,
    title,
    onPress,
    color = "#4F46E5",
}: Props) {

    return (

        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.8}
            onPress={onPress}
        >

            <View style={styles.leftContainer}>

                <View style={styles.iconContainer}>

                    <Ionicons
                        name={icon}
                        size={22}
                        color={color}
                    />

                </View>

                <Text style={styles.title}>
                    {title}
                </Text>

            </View>

            <Ionicons
                name="chevron-forward"
                size={22}
                color="#9CA3AF"
            />

        </TouchableOpacity>

    );

}

const styles = StyleSheet.create({

    container: {

        flexDirection: "row",

        justifyContent: "space-between",

        alignItems: "center",

        backgroundColor: "#FFFFFF",

        marginHorizontal: 20,

        marginBottom: 15,

        paddingVertical: 16,

        paddingHorizontal: 18,

        borderRadius: 18,

        elevation: 2,

        shadowColor: "#000",

        shadowOpacity: 0.08,

        shadowOffset: {
            width: 0,
            height: 2,
        },

        shadowRadius: 4,
    },

    leftContainer: {

        flexDirection: "row",

        alignItems: "center",

        flex: 1,

    },

    iconContainer: {

        width: 42,

        height: 42,

        borderRadius: 12,

        backgroundColor: "#EEF2FF",

        justifyContent: "center",

        alignItems: "center",

        marginRight: 15,

    },

    title: {

        fontSize: 16,

        fontWeight: "600",

        color: "#111827",

    },

});