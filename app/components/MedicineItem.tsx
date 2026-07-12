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





export default function MedicineItem({

    medicine,

    onTake,

    onDelete

}: any) {



    const {
        colors
    } = useContext(ThemeContext);





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






            <View style={styles.row}>


                <View style={styles.iconBox}>


                    <Text style={styles.icon}>
                        💊
                    </Text>


                </View>






                <View style={styles.details}>


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




                    <Text

                        style={[
                            styles.dosage,
                            {
                                color:
                                    colors.subText
                            }
                        ]}

                    >

                        {medicine.dosage}

                    </Text>



                </View>






                <TouchableOpacity

                    onPress={() => onDelete(
                        medicine.id
                    )}

                >


                    <Ionicons

                        name="trash-outline"

                        size={22}

                        color="#EF4444"

                    />


                </TouchableOpacity>




            </View>








            <View style={styles.bottom}>


                <View style={styles.timeBox}>


                    <Ionicons

                        name="time-outline"

                        size={18}

                        color="#4F46E5"

                    />


                    <Text

                        style={styles.time}

                    >

                        {medicine.time}

                    </Text>


                </View>








                {
                    medicine.taken ?


                        <View style={styles.completed}>


                            <Text style={styles.completedText}>

                                ✅ Taken

                            </Text>


                        </View>



                        :



                        <TouchableOpacity

                            style={styles.takeButton}

                            onPress={() => onTake(
                                medicine.id
                            )}

                        >

                            <Text style={styles.takeText}>

                                Take Now

                            </Text>


                        </TouchableOpacity>



                }



            </View>





        </View>


    );


}









const styles = StyleSheet.create({



    card: {


        marginHorizontal: 20,

        marginBottom: 15,

        padding: 18,

        borderRadius: 22,

        elevation: 4


    },





    row: {


        flexDirection: "row",

        alignItems: "center"


    },





    iconBox: {


        width: 50,

        height: 50,

        borderRadius: 16,

        backgroundColor: "#EEF2FF",

        justifyContent: "center",

        alignItems: "center"

    },




    icon: {


        fontSize: 26

    },





    details: {


        flex: 1,

        marginLeft: 15


    },




    name: {


        fontSize: 17,

        fontWeight: "bold"


    },





    dosage: {


        marginTop: 5,

        fontSize: 14


    },





    bottom: {


        flexDirection: "row",

        justifyContent: "space-between",

        alignItems: "center",

        marginTop: 18


    },




    timeBox: {


        flexDirection: "row",

        alignItems: "center",

        backgroundColor: "#EEF2FF",

        paddingHorizontal: 12,

        paddingVertical: 8,

        borderRadius: 15


    },




    time: {


        marginLeft: 5,

        color: "#363546",

        fontWeight: "600"


    },





    takeButton: {


        backgroundColor: "#4F46E5",

        paddingHorizontal: 18,

        paddingVertical: 10,

        borderRadius: 15


    },





    takeText: {


        color: "#fff",

        fontWeight: "bold"


    },




    completed: {


        backgroundColor: "#DCFCE7",

        paddingHorizontal: 15,

        paddingVertical: 10,

        borderRadius: 15


    },




    completedText: {


        color: "#16A34A",

        fontWeight: "bold"


    }



});