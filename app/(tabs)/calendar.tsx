import React, {
    useEffect,
    useState,
    useContext
} from "react";


import {
    View,
    Text,
    StyleSheet,
    ScrollView
} from "react-native";


import {
    Calendar
} from "react-native-calendars";


import {
    auth
} from "../firebase/firebaseConfig";


import {
    getMedicineHistory
} from "../services/historyService";


import {
    ThemeContext
} from "../context/ThemeContext";





export default function CalendarScreen() {



    const {
        colors
    } = useContext(ThemeContext);




    const [history, setHistory] =
        useState<any[]>([]);



    const [selectedDate, setSelectedDate] =
        useState(
            new Date()
                .toISOString()
                .split("T")[0]
        );






    useEffect(() => {


        loadHistory();


    }, []);








    const loadHistory = async () => {


        const user =
            auth.currentUser;



        if (user) {


            const data =
                await getMedicineHistory(
                    user.uid
                );


            setHistory(data);


        }


    };









    const selectedMedicines =
        history.filter(item => {


            let itemDate;



            if (item.date?.toDate) {

                itemDate =
                    item.date
                        .toDate()
                        .toISOString()
                        .split("T")[0];

            }

            else if (item.date) {

                itemDate =
                    new Date(item.date)
                        .toISOString()
                        .split("T")[0];

            }



            return itemDate === selectedDate;


        });









    const markedDates: any = {};




    history.forEach(item => {


        let date;



        if (item.date?.toDate) {

            date =
                item.date
                    .toDate()
                    .toISOString()
                    .split("T")[0];

        }
        else if (item.date) {


            date =
                new Date(item.date)
                    .toISOString()
                    .split("T")[0];

        }



        if (date) {


            markedDates[date] = {

                marked: true,

                dotColor:
                    item.status === "Missed"
                        ?
                        "red"
                        :
                        "green"

            };


        }



    });





    markedDates[selectedDate] = {

        ...markedDates[selectedDate],

        selected: true,

        selectedColor: "#4F46E5"

    };









    return (


        <ScrollView

            style={[
                styles.container,
                {
                    backgroundColor:
                        colors.background
                }
            ]}

        >




            <Text

                style={[
                    styles.title,
                    {
                        color:
                            colors.text
                    }
                ]}

            >

                Medicine Calendar 📅

            </Text>








            <Calendar


                onDayPress={(day) => {


                    setSelectedDate(
                        day.dateString
                    );


                }}



                markedDates={
                    markedDates
                }



                theme={{

                    calendarBackground:
                        colors.card,


                    dayTextColor:
                        colors.text,


                    monthTextColor:
                        colors.text,


                    arrowColor:
                        "#4F46E5"


                }}



            />









            <Text

                style={[
                    styles.dateTitle,
                    {
                        color:
                            colors.text
                    }
                ]}

            >

                {selectedDate}

            </Text>









            {
                selectedMedicines.length === 0

                    ?

                    <Text

                        style={{
                            color:
                                colors.text,
                            textAlign: "center",
                            marginTop: 20
                        }}

                    >

                        No medicine activity 💊

                    </Text>



                    :



                    selectedMedicines.map(item => (


                        <View

                            key={item.id}

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
                                    styles.name,
                                    {
                                        color:
                                            colors.text
                                    }
                                ]}

                            >

                                💊 {item.medicineName}

                            </Text>




                            <Text

                                style={{

                                    color:
                                        item.status === "Missed"
                                            ?
                                            "#EF4444"
                                            :
                                            "#10B981"

                                }}

                            >

                                {
                                    item.status === "Missed"
                                        ?
                                        "❌ Missed"
                                        :
                                        "✅ Taken"
                                }

                            </Text>



                        </View>



                    ))


            }





        </ScrollView>


    );


}







const styles = StyleSheet.create({


    container: {

        flex: 1,

        padding: 20

    },


    title: {

        fontSize: 28,

        fontWeight: "bold",

        marginTop: 30,

        marginBottom: 20

    },


    dateTitle: {

        fontSize: 20,

        fontWeight: "bold",

        marginVertical: 20

    },


    card: {

        padding: 18,

        borderRadius: 15,

        marginBottom: 12

    },


    name: {

        fontSize: 17,

        fontWeight: "bold",

        marginBottom: 8

    }


});