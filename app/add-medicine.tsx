import React, {
    useState
} from "react";


import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Switch
} from "react-native";


import DateTimePicker from "@react-native-community/datetimepicker";


import {
    router
} from "expo-router";


import {
    auth,
    db
} from "./firebase/firebaseConfig";


import {
    collection,
    addDoc,
    serverTimestamp
} from "firebase/firestore";


// import {
//     scheduleMedicineReminder
// } from "./services/notificationService";


export default function AddMedicine() {



    const [name, setName] =
        useState("");

    const [dosage, setDosage] =
        useState("");


    const [time, setTime] =
        useState("");


    const [showPicker, setShowPicker] =
        useState(false);


    const [reminder, setReminder] =
        useState(true);




    const [selectedTime, setSelectedTime] =
        useState(
            new Date()
        );






    const onTimeChange = (
        event: any,
        date?: Date
    ) => {


        setShowPicker(false);



        if (date) {


            setSelectedTime(date);



            let hours =
                date.getHours();


            let minutes =
                date.getMinutes();



            const period =
                hours >= 12
                    ?
                    "PM"
                    :
                    "AM";



            hours =
                hours % 12 || 12;



            const formatted =
                `${hours}:${minutes
                    .toString()
                    .padStart(2, "0")} ${period}`;



            setTime(formatted);


        }


    };








    const saveMedicine = async () => {


        try {


            const user =
                auth.currentUser;



            if (!user) {


                Alert.alert(
                    "Error",
                    "User not logged in"
                );


                return;

            }





            if (
                !name ||
                !dosage ||
                !time
            ) {


                Alert.alert(
                    "Error",
                    "Please fill all fields"
                );


                return;

            }






            await addDoc(


                collection(

                    db,

                    "users",

                    user.uid,

                    "medicines"

                ),


                {


                    name: name,


                    dosage: dosage,


                    time: time,


                    reminder: reminder,


                    taken: false,


                    createdAt:
                        serverTimestamp()


                }


            );


            // await scheduleMedicineReminder({

            //     name,
            //     dosage,
            //     time,
            //     reminder

            // });



            Alert.alert(

                "Success",

                "Medicine Added"

            );



            router.back();



        }
        catch (error: any) {


            Alert.alert(
                "Error",
                error.message
            );


        }


    };








    return (



        <View style={styles.container}>


            <Text style={styles.title}>

                Add Medicine 💊

            </Text>





            <TextInput

                placeholder="Medicine Name"

                style={styles.input}

                value={name}

                onChangeText={setName}

            />





            <TextInput

                placeholder="Dosage (eg: 400mg)"

                style={styles.input}

                value={dosage}

                onChangeText={setDosage}

            />







            <TouchableOpacity

                style={styles.input}

                onPress={() =>
                    setShowPicker(true)
                }

            >

                <Text>

                    {
                        time
                            ?
                            time
                            :
                            "Select Time ⏰"
                    }

                </Text>


            </TouchableOpacity>





            {
                showPicker &&


                <DateTimePicker

                    value={
                        selectedTime
                    }

                    mode="time"

                    is24Hour={false}

                    onChange={
                        onTimeChange
                    }


                />

            }







            <View style={styles.reminderRow}>


                <Text style={styles.reminderText}>

                    Enable Reminder 🔔

                </Text>




                <Switch

                    value={reminder}

                    onValueChange={
                        setReminder
                    }

                />


            </View>







            <TouchableOpacity

                style={styles.button}

                onPress={saveMedicine}

            >


                <Text style={styles.buttonText}>

                    Save Medicine

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

        justifyContent: "center"


    },



    title: {


        fontSize: 28,

        fontWeight: "bold",

        textAlign: "center",

        marginBottom: 30


    },



    input: {


        backgroundColor: "#fff",

        borderRadius: 12,

        padding: 15,

        marginBottom: 15,

        borderWidth: 1,

        borderColor: "#E5E7EB"


    },



    reminderRow: {


        backgroundColor: "#fff",

        padding: 15,

        borderRadius: 12,

        flexDirection: "row",

        justifyContent: "space-between",

        alignItems: "center",

        marginBottom: 20


    },



    reminderText: {


        fontSize: 16,

        fontWeight: "600"


    },



    button: {


        backgroundColor: "#4F46E5",

        padding: 15,

        borderRadius: 12,

        alignItems: "center"


    },



    buttonText: {


        color: "#fff",

        fontWeight: "bold",

        fontSize: 16


    }


});