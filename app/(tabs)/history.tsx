import React, {
    useEffect,
    useState,
    useContext
} from "react";


import {
    Text,
    StyleSheet,
    ScrollView,
    View
} from "react-native";


import { auth } from "../firebase/firebaseConfig";


import {
    getMedicineHistory,
    getWeeklyAdherence
} from "../services/historyService";


import {
    BarChart
} from "react-native-chart-kit";


import {
    ThemeContext
} from "../context/ThemeContext";





export default function History() {



    const {
        colors
    } = useContext(ThemeContext);




    const [history, setHistory] =
        useState<any[]>([]);



    const [weeklyData, setWeeklyData] =
        useState<any>(null);





    useEffect(() => {

        loadHistory();

    }, []);







    const loadHistory = async () => {


        const user =
            auth.currentUser;



        if (user) {



            const historyData =
                await getMedicineHistory(
                    user.uid
                );


            setHistory(historyData);




            const chartData =
                await getWeeklyAdherence(
                    user.uid
                );


            setWeeklyData(chartData);



        }


    };








    const completed =
        history.filter(
            item =>
                item.status === "Taken"
                ||
                item.status === "Completed"
        ).length;





    const missed =
        history.filter(
            item =>
                item.status === "Missed"
        ).length;






    const percentage =
        history.length > 0
            ?
            Math.round(
                (
                    completed /
                    history.length
                ) * 100
            )
            :
            0;









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

                Medicine Analytics 📈

            </Text>








            <View style={styles.cards}>


                <Card
                    number={history.length}
                    title="Total"
                    colors={colors}
                />

                <Card
                    number={completed}
                    title="Completed"
                    colors={colors}
                />


                <Card
                    number={missed}
                    title="Missed"
                    colors={colors}
                />



            </View>








            <View style={styles.progressCard}>


                <Text style={styles.progressTitle}>

                    Weekly Adherence

                </Text>



                <Text style={styles.percent}>

                    {percentage}%

                </Text>


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

                Weekly Progress

            </Text>









            {
                weeklyData &&


                <BarChart


                    data={weeklyData}



                    width={330}


                    height={220}



                    yAxisSuffix="%"



                    fromZero={true}



                    chartConfig={{

                        backgroundGradientFrom:
                            colors.card,


                        backgroundGradientTo:
                            colors.card,


                        decimalPlaces: 0,


                        color:
                            (opacity = 1) =>
                                `rgba(79,70,229,${opacity})`,


                        labelColor:
                            () =>
                                colors.text


                    }}



                    style={{

                        borderRadius: 16

                    }}



                />

            }











            <Text

                style={[
                    styles.section,
                    {
                        color:
                            colors.text
                    }
                ]}

            >

                Recent Activity

            </Text>









            {
                history.length === 0

                    ?

                    <Text
                        style={{
                            color:
                                colors.text
                        }}
                    >

                        No history available 💊

                    </Text>


                    :


                    history.map(item => (


                        <View

                            key={item.id}


                            style={[
                                styles.item,
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









function Card({
    number,
    title,
    colors
}: any) {


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

            <Text style={styles.number}>

                {number}

            </Text>


            <Text
                style={{
                    color:
                        colors.text
                }}
            >

                {title}

            </Text>


        </View>


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

        marginBottom: 25

    },



    cards: {

        flexDirection: "row",

        justifyContent: "space-between"

    },



    card: {

        width: "31%",

        padding: 15,

        borderRadius: 16,

        alignItems: "center"

    },



    number: {

        fontSize: 25,

        fontWeight: "bold",

        color: "#4F46E5"

    },



    progressCard: {

        backgroundColor: "#176ca5",

        padding: 20,

        borderRadius: 20,

        marginTop: 20

    },



    progressTitle: {

        color: "#fff",

        fontSize: 16

    },



    percent: {

        color: "#fff",

        fontSize: 40,

        fontWeight: "bold"

    },



    section: {

        fontSize: 20,

        fontWeight: "bold",

        marginVertical: 20

    },



    item: {

        padding: 18,

        borderRadius: 15,

        marginBottom: 12

    },



    name: {

        fontSize: 17,

        fontWeight: "bold"

    }


});