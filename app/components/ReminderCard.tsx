import React, {
    useContext
} from "react";


import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from "react-native";


import {
    Ionicons
} from "@expo/vector-icons";


import {
    ThemeContext
} from "../context/ThemeContext";




export default function ReminderCard({

    medicine,

    onTake

}: any) {



    const {
        colors
    } = useContext(ThemeContext);




    if (!medicine) {


        return (

            <View

                style={[
                    styles.card,
                    {
                        backgroundColor:
                            colors.card
                    }
                ]}

            >


                <Text

                    style={[
                        styles.empty,
                        {
                            color:
                                colors.text
                        }
                    ]}

                >

                    🎉 No upcoming reminders


                </Text>


            </View>

        );


    }






    return (


        <View

            style={[
                styles.card,
                {
                    backgroundColor:
                        colors.card
                }
            ]}

        >





            <View style={styles.top}>


                <View style={styles.iconBox}>


                    <Text style={styles.icon}>
                        💊
                    </Text>


                </View>




                <View style={{ flex: 1 }}>


                    <Text

                        style={[
                            styles.label,
                            {
                                color:
                                    colors.subText
                            }
                        ]}

                    >

                        Next Reminder

                    </Text>




                    <Text

                        style={[
                            styles.name,
                            {
                                color:
                                    colors.text
                            }
                        ]}

                    >

                        {medicine.name}

                    </Text>


                </View>



                <Ionicons

                    name="alarm"

                    size={28}

                    color="#4F46E5"

                />



            </View>









            <View style={styles.info}>


                <View>


                    <Text style={styles.infoLabel}>
                        Dosage
                    </Text>


                    <Text

                        style={[
                            styles.infoText,
                            {
                                color:
                                    colors.text
                            }
                        ]}

                    >

                        {medicine.dosage}

                    </Text>


                </View>






                <View>


                    <Text style={styles.infoLabel}>
                        Time
                    </Text>


                    <Text

                        style={[
                            styles.infoText,
                            {
                                color:
                                    colors.text
                            }
                        ]}

                    >

                        ⏰ {medicine.time}

                    </Text>


                </View>


            </View>









            <TouchableOpacity

                style={styles.button}

                onPress={() => onTake(
                    medicine.id
                )}

            >


                <Text style={styles.buttonText}>

                    ✓  Mark as Taken

                </Text>


            </TouchableOpacity>





        </View>


    );


}









const styles = StyleSheet.create({



    card: {


        borderRadius: 25,

        padding: 20,

        marginTop: 10,

        elevation: 5

    },





    top: {


        flexDirection: "row",

        alignItems: "center"

    },





    iconBox: {


        width: 55,

        height: 55,

        borderRadius: 18,

        backgroundColor: "#EEF2FF",

        justifyContent: "center",

        alignItems: "center",

        marginRight: 15


    },



    icon: {


        fontSize: 30

    },





    label: {


        fontSize: 13


    },





    name: {


        fontSize: 20,

        fontWeight: "bold",

        marginTop: 3


    },





    info: {


        flexDirection: "row",

        justifyContent: "space-between",

        marginTop: 25,

        marginBottom: 20


    },




    infoLabel: {


        color: "#9CA3AF",

        fontSize: 13


    },




    infoText: {


        fontSize: 16,

        fontWeight: "600",

        marginTop: 5


    },





    button: {


        backgroundColor: "#4F46E5",

        padding: 15,

        borderRadius: 16,

        alignItems: "center"


    },




    buttonText: {


        color: "#fff",

        fontSize: 16,

        fontWeight: "bold"


    },




    empty: {


        textAlign: "center",

        fontSize: 15

    }



});