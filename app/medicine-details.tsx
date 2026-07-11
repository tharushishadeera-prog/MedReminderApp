import React from "react";

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert
} from "react-native";

import { useLocalSearchParams, router } from "expo-router";

import { auth } from "./firebase/firebaseConfig";

import {
    deleteMedicine
} from "./services/medicineService";



export default function MedicineDetails() {


    const params = useLocalSearchParams();


    const {
        id,
        name,
        dosage,
        time,
        taken
    } = params;





    const handleDelete = async () => {


        Alert.alert(

            "Delete Medicine",

            "Are you sure you want to delete?",

            [

                {
                    text: "Cancel",
                    style: "cancel"
                },


                {

                    text: "Delete",

                    onPress: async () => {


                        const user =
                            auth.currentUser;



                        if (user) {


                            await deleteMedicine(

                                user.uid,

                                id as string

                            );


                            router.back();


                        }


                    }


                }


            ]

        );


    };






    return (


        <View style={styles.container}>


            <Text style={styles.icon}>
                💊
            </Text>




            <Text style={styles.title}>
                {name}
            </Text>





            <View style={styles.card}>


                <Text style={styles.label}>
                    Dosage
                </Text>


                <Text style={styles.value}>
                    {dosage}
                </Text>




                <Text style={styles.label}>
                    Reminder Time
                </Text>


                <Text style={styles.value}>
                    {time}
                </Text>





                <Text style={styles.label}>
                    Status
                </Text>



                <Text

                    style={[
                        styles.status,
                        {
                            color:
                                taken === "true"
                                    ?
                                    "#10B981"
                                    :
                                    "#F59E0B"
                        }
                    ]}

                >

                    {
                        taken === "true"
                            ?
                            "Taken"
                            :
                            "Pending"
                    }

                </Text>


            </View>







            <TouchableOpacity

                style={styles.editButton}

                onPress={() =>


                    router.push({

                        pathname: "/edit-medicine",

                        params: {

                            id,
                            name,
                            dosage,
                            time

                        }

                    })

                }

            >

                <Text style={styles.buttonText}>
                    ✏️ Edit Medicine
                </Text>


            </TouchableOpacity>







            <TouchableOpacity

                style={styles.deleteButton}

                onPress={handleDelete}

            >

                <Text style={styles.buttonText}>
                    🗑 Delete Medicine
                </Text>


            </TouchableOpacity>




        </View>


    );

}





const styles = StyleSheet.create({


    container: {

        flex: 1,

        backgroundColor: "#F9FAFB",

        padding: 25,

        alignItems: "center"

    },



    icon: {

        fontSize: 70,

        marginTop: 50

    },



    title: {

        fontSize: 30,

        fontWeight: "bold",

        marginVertical: 20

    },



    card: {

        backgroundColor: "white",

        width: "100%",

        padding: 25,

        borderRadius: 20,

        elevation: 3

    },



    label: {

        color: "#6B7280",

        marginTop: 15

    },



    value: {

        fontSize: 18,

        fontWeight: "bold",

        marginTop: 5

    },



    status: {

        fontSize: 18,

        fontWeight: "bold",

        marginTop: 5

    },



    editButton: {

        width: "100%",

        backgroundColor: "#4F46E5",

        padding: 16,

        borderRadius: 15,

        marginTop: 30,

        alignItems: "center"

    },



    deleteButton: {

        width: "100%",

        backgroundColor: "#EF4444",

        padding: 16,

        borderRadius: 15,

        marginTop: 15,

        alignItems: "center"

    },



    buttonText: {

        color: "white",

        fontWeight: "bold",

        fontSize: 16

    }


});