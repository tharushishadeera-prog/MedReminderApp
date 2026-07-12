import React, {
    useCallback,
    useState,
    useContext
} from "react";


import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView
} from "react-native";


import {
    ThemeContext
} from "../context/ThemeContext";


import { LinearGradient } from "expo-linear-gradient";

import { auth } from "../firebase/firebaseConfig";


import {
    useFocusEffect
} from "expo-router";


// Components

import Header from "../components/Header";
import ReminderCard from "../components/ReminderCard";
import MedicineItem from "../components/MedicineItem";
import FloatingButton from "../components/FloatingButton";


// Services

import {
    getMedicines,
    updateMedicineTaken,
    deleteMedicine
} from "../services/medicineService";





export default function Home() {


    const {
        colors
    } = useContext(ThemeContext);



    const [medicines, setMedicines] =
        useState<any[]>([]);






    useFocusEffect(

        useCallback(() => {


            const loadMedicines = async () => {


                const user =
                    auth.currentUser;



                if (user) {


                    const data =
                        await getMedicines(
                            user.uid
                        );


                    setMedicines(data);


                }


            };


            loadMedicines();


        }, [])

    );






    const convertTime = (time: string) => {


        const [
            hourMinute,
            period
        ] = time.split(" ");



        let [
            hour,
            minute
        ] =
            hourMinute
                .split(":")
                .map(Number);



        if (period === "PM" && hour !== 12) {

            hour += 12;

        }



        if (period === "AM" && hour === 12) {

            hour = 0;

        }



        return (
            hour * 60 + minute
        );

    };







    const getNextReminder = () => {


        const pending =
            medicines.filter(
                item => !item.taken
            );



        if (
            pending.length === 0
        ) {

            return null;

        }



        const sorted =
            pending.sort(
                (a, b) =>

                    convertTime(a.time)
                    -
                    convertTime(b.time)

            );



        return sorted[0];


    };







    const handleTaken = async (
        id: string
    ) => {


        const user =
            auth.currentUser;



        if (user) {


            await updateMedicineTaken(
                user.uid,
                id
            );



            const data =
                await getMedicines(
                    user.uid
                );


            setMedicines(data);


        }


    };








    const handleDelete = async (
        id: string
    ) => {


        const user =
            auth.currentUser;



        if (!user) return;



        await deleteMedicine(
            user.uid,
            id
        );



        const data =
            await getMedicines(
                user.uid
            );


        setMedicines(data);


    };








    return (


        <SafeAreaView


            style={[
                styles.container,
                {
                    backgroundColor:
                        colors.background
                }
            ]}


        >



            <ScrollView

                showsVerticalScrollIndicator={false}

            >




                <LinearGradient


                    colors={[
                        "#1E1B4B",
                        "#312E81"
                    ]}


                    style={styles.header}


                >



                    <Header />




                    <ReminderCard


                        medicine={
                            getNextReminder()
                        }


                        onTake={
                            handleTaken
                        }


                    />



                </LinearGradient>







                <View

                    style={styles.stats}

                >





                    <View


                        style={[
                            styles.statBox,
                            {
                                backgroundColor:
                                    colors.card
                            }
                        ]}


                    >


                        <Text

                            style={{
                                color:
                                    colors.text
                            }}

                        >

                            {medicines.length}

                            {"\n"}

                            Medicines


                        </Text>


                    </View>







                    <View


                        style={[
                            styles.statBox,
                            {
                                backgroundColor:
                                    colors.card
                            }
                        ]}


                    >


                        <Text

                            style={{
                                color:
                                    colors.text
                            }}

                        >

                            {
                                medicines.filter(
                                    m => m.taken
                                ).length
                            }

                            {"\n"}

                            Taken


                        </Text>


                    </View>







                    <View


                        style={[
                            styles.statBox,
                            {
                                backgroundColor:
                                    colors.card
                            }
                        ]}


                    >


                        <Text

                            style={{
                                color:
                                    colors.text
                            }}

                        >

                            {
                                medicines.filter(
                                    m => !m.taken
                                ).length
                            }

                            {"\n"}

                            Pending


                        </Text>


                    </View>



                </View>









                <Text


                    style={[
                        styles.sectionTitle,
                        {
                            color:
                                colors.text
                        }
                    ]}


                >

                    Today's Schedule


                </Text>








                {

                    medicines.length > 0

                        ?

                        medicines.map(

                            medicine => (


                                <MedicineItem


                                    key={
                                        medicine.id
                                    }


                                    medicine={
                                        medicine
                                    }


                                    onTake={
                                        handleTaken
                                    }


                                    onDelete={
                                        handleDelete
                                    }


                                />


                            )


                        )


                        :


                        <Text


                            style={[
                                styles.emptyText,
                                {
                                    color:
                                        colors.subText
                                }
                            ]}


                        >

                            No medicines added yet 💊


                        </Text>


                }




            </ScrollView>






            <FloatingButton />



        </SafeAreaView>


    );

}








const styles = StyleSheet.create({


    container: {

        flex: 1

    },



    header: {

        padding: 25,

        borderBottomLeftRadius: 30,

        borderBottomRightRadius: 30,

        paddingBottom: 40

    },



    stats: {

        flexDirection: "row",

        justifyContent: "space-around",

        marginVertical: 20

    },



    statBox: {

        width: "28%",

        padding: 15,

        borderRadius: 16,

        alignItems: "center"

    },



    sectionTitle: {

        fontSize: 18,

        fontWeight: "bold",

        margin: 20

    },



    emptyText: {

        textAlign: "center",

        marginTop: 20,

        fontSize: 16

    }


});