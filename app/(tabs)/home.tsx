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






    const convertTime = (
        time: string
    ) => {


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




        if (period === "PM" && hour !== 12)
            hour += 12;



        if (period === "AM" && hour === 12)
            hour = 0;



        return hour * 60 + minute;


    };






    const getNextReminder = () => {


        const pending =
            medicines.filter(
                item => !item.taken
            );



        if (pending.length === 0)
            return null;



        return pending.sort(
            (a, b) =>
                convertTime(a.time)
                -
                convertTime(b.time)
        )[0];


    };







    const refreshData = async () => {


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


            refreshData();


        }


    };







    const handleDelete = async (
        id: string
    ) => {


        const user =
            auth.currentUser;



        if (!user)
            return;



        await deleteMedicine(
            user.uid,
            id
        );


        refreshData();


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
                        "#a1e7df",
                        "#62c5c7"
                    ]}

                    style={styles.header}


                >


                    <Header />



                    <View style={styles.welcome}>


                        <Text style={styles.smallText}>
                            Stay healthy today 💙
                        </Text>


                        <Text style={styles.bigText}>
                            Manage your medicines
                        </Text>


                    </View>





                    <ReminderCard

                        medicine={
                            getNextReminder()
                        }

                        onTake={
                            handleTaken
                        }

                    />



                </LinearGradient>









                <View style={styles.stats}>


                    <StatCard

                        icon="💊"

                        value={
                            medicines.length
                        }

                        label="Medicines"

                        colors={colors}

                    />



                    <StatCard

                        icon="✅"

                        value={
                            medicines.filter(
                                m => m.taken
                            ).length
                        }

                        label="Taken"

                        colors={colors}

                    />



                    <StatCard

                        icon="⏰"

                        value={
                            medicines.filter(
                                m => !m.taken
                            ).length
                        }

                        label="Pending"

                        colors={colors}

                    />


                </View>







                <Text

                    style={[
                        styles.section,
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


                        <View

                            style={[
                                styles.empty,
                                {
                                    backgroundColor:
                                        colors.card
                                }
                            ]}

                        >

                            <Text>
                                💊
                            </Text>

                            <Text
                                style={{
                                    color:
                                        colors.text
                                }}
                            >
                                No medicines added yet
                            </Text>


                        </View>


                }







            </ScrollView>





            <FloatingButton />


        </SafeAreaView>


    );

}







function StatCard({
    icon,
    value,
    label,
    colors
}: any) {


    return (

        <View

            style={[
                styles.statCard,
                {
                    backgroundColor:
                        colors.card
                }
            ]}

        >


            <Text style={styles.icon}>
                {icon}
            </Text>


            <Text

                style={[
                    styles.value,
                    {
                        color:
                            colors.text
                    }
                ]}

            >

                {value}

            </Text>


            <Text

                style={{
                    color:
                        colors.subText
                }}

            >

                {label}

            </Text>



        </View>

    );


}








const styles = StyleSheet.create({



    container: {
        flex: 1
    },



    header: {

        padding: 25,

        borderBottomLeftRadius: 35,

        borderBottomRightRadius: 35,

        paddingBottom: 40

    },




    welcome: {

        marginTop: 25,

        marginBottom: 20

    },



    smallText: {

        color: "#101113",

        fontSize: 14

    },



    bigText: {

        color: "#070707",

        fontSize: 22,

        fontWeight: "bold",

        marginTop: 5

    },




    stats: {

        flexDirection: "row",

        justifyContent: "space-around",

        marginVertical: 20

    },




    statCard: {

        width: "30%",

        padding: 15,

        borderRadius: 20,

        alignItems: "center",

        elevation: 4

    },




    icon: {

        fontSize: 25

    },



    value: {

        fontSize: 25,

        fontWeight: "bold",

        marginTop: 5

    },



    section: {

        fontSize: 20,

        fontWeight: "bold",

        marginHorizontal: 20,

        marginBottom: 15

    },



    empty: {

        margin: 20,

        padding: 30,

        borderRadius: 20,

        alignItems: "center"

    }



});