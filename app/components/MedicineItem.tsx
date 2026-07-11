import React from "react";
import { router } from "expo-router";

import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    StyleSheet
} from "react-native";

import { Ionicons } from "@expo/vector-icons";


export default function MedicineItem({
    medicine,
    onTake,
    onDelete
}: any) {

    return (

        <View style={styles.item}>


            <View style={styles.icon} />


            <View style={{ flex: 1 }}>


                <TouchableOpacity

                    onPress={() =>

                        router.push({

                            pathname: "/medicine-details",

                            params: {

                                id: medicine.id,

                                name: medicine.name,

                                dosage: medicine.dosage,

                                time: medicine.time,

                                taken: String(medicine.taken)

                            }

                        })

                    }

                >


                    <Text style={styles.name}>
                        {medicine.name}
                    </Text>


                </TouchableOpacity>


                <Text style={styles.details}>
                    {medicine.dosage} • {medicine.time}
                </Text>


            </View>
            <TouchableOpacity

                style={{ marginRight: 15 }}

                onPress={() => {

                    Alert.alert(

                        "Delete Medicine",

                        `Delete ${medicine.name}?`,

                        [

                            {
                                text: "Cancel",
                                style: "cancel"
                            },

                            {
                                text: "Delete",

                                style: "destructive",

                                onPress: () => onDelete(medicine.id)
                            }

                        ]

                    );

                }}

            >

                <Ionicons
                    name="trash-outline"
                    size={24}
                    color="#EF4444"
                />

            </TouchableOpacity>
            <TouchableOpacity
                style={{ marginRight: 15 }}
                onPress={() =>
                    router.push({
                        pathname: "/edit-medicine",
                        params: {
                            id: medicine.id,
                            name: medicine.name,
                            dosage: medicine.dosage,
                            time: medicine.time,
                        },
                    })
                }
            >
                <Ionicons
                    name="create-outline"
                    size={24}
                    color="#4F46E5"
                />
            </TouchableOpacity>


            <TouchableOpacity

                disabled={medicine.taken}

                onPress={() => onTake(medicine.id)}

            >


                <Ionicons

                    name={
                        medicine.taken
                            ?
                            "checkmark-circle"
                            :
                            "time-outline"
                    }

                    size={28}

                    color={
                        medicine.taken
                            ?
                            "#10B981"
                            :
                            "#F59E0B"
                    }

                />


            </TouchableOpacity>


        </View>


    );


}




const styles = StyleSheet.create({

    item: {
        flexDirection: "row",
        backgroundColor: "white",
        padding: 18,
        marginHorizontal: 20,
        borderRadius: 15,
        marginBottom: 10,
        alignItems: "center"
    },


    icon: {
        width: 40,
        height: 40,
        backgroundColor: "#E5E7EB",
        borderRadius: 10,
        marginRight: 15
    },


    name: {
        fontWeight: "bold",
        fontSize: 16
    },


    details: {
        color: "#6B7280",
        marginTop: 5
    }


});