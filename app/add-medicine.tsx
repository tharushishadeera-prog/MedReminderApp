import React, { useState } from "react";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert
} from "react-native";

import { router } from "expo-router";

import { auth, db } from "./firebase/firebaseConfig";

import {
    collection,
    addDoc
} from "firebase/firestore";


// import {
//     scheduleMedicineReminder
// } from "./services/notificationService";



export default function AddMedicine() {


    const [name, setName] = useState("");
    const [dosage, setDosage] = useState("");
    const [time, setTime] = useState("");



    const saveMedicine = async () => {


        try {


            const user = auth.currentUser;



            if (!user) {


                Alert.alert(
                    "Error",
                    "User not logged in"
                );


                return;

            }





            if (!name || !dosage || !time) {


                Alert.alert(
                    "Error",
                    "Please fill all fields"
                );


                return;

            }





            const medicine = {


                name: name,

                dosage: dosage,

                time: time,

                taken: false,


            };







            // Save to Firestore

            await addDoc(


                collection(

                    db,

                    "users",

                    user.uid,

                    "medicines"

                ),


                medicine


            );







            // Schedule Notification

            // await scheduleMedicineReminder(
            //     medicine
            // );








            Alert.alert(

                "Success",

                "Medicine Added"

            );





            router.back();





        } catch (error: any) {



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








            <TextInput


                placeholder="Time (eg: 10:30 AM)"


                style={styles.input}


                value={time}


                onChangeText={setTime}



            />








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


        marginBottom: 30,


        textAlign: "center"



    },







    input: {


        backgroundColor: "#fff",


        borderRadius: 12,


        padding: 15,


        marginBottom: 15,


        borderWidth: 1,


        borderColor: "#E5E7EB"



    },







    button: {


        backgroundColor: "#4F46E5",


        padding: 15,


        borderRadius: 12,


        alignItems: "center",


        marginTop: 10



    },







    buttonText: {


        color: "#fff",


        fontWeight: "bold",


        fontSize: 16



    }




});