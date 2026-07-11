import React from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from "react-native";


export default function ReminderCard({
    medicine,
    onTake
}: any) {


    if (!medicine) {

        return (

            <View style={styles.card}>

                <Text style={styles.label}>
                    Next Reminder
                </Text>

                <Text>
                    No reminders yet 💊
                </Text>

            </View>

        );

    }



    return (

        <View style={styles.card}>


            <Text style={styles.label}>
                Next Reminder
            </Text>



            <Text style={styles.time}>
                {medicine.time}
            </Text>



            <Text style={styles.med}>
                {medicine.name} • {medicine.dosage}
            </Text>



            <TouchableOpacity

                style={styles.button}

                onPress={() =>
                    onTake(medicine.id)
                }

                disabled={medicine.taken}

            >

                <Text style={styles.btnText}>

                    {
                        medicine.taken
                            ?
                            "Completed ✓"
                            :
                            "Take Now"
                    }

                </Text>


            </TouchableOpacity>



        </View>

    );

}



const styles = StyleSheet.create({

    card: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 20,
    },


    label: {
        color: "#6B7280",
    },


    time: {
        fontSize: 28,
        fontWeight: "bold",
        marginVertical: 5
    },


    med: {
        color: "#374151",
    },


    button: {
        backgroundColor: "#4F46E5",
        padding: 12,
        borderRadius: 12,
        marginTop: 15,
        alignItems: "center"
    },


    btnText: {
        color: "white",
        fontWeight: "bold"
    }


});