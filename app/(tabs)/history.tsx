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


import {
    LinearGradient
} from "expo-linear-gradient";


import {
    auth
} from "../firebase/firebaseConfig";


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


            const data =
                await getMedicineHistory(
                    user.uid
                );


            setHistory(data);



            const chart =
                await getWeeklyAdherence(
                    user.uid
                );


            setWeeklyData(chart);



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
                completed / history.length * 100
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



            showsVerticalScrollIndicator={false}



        >







            <LinearGradient


                colors={[
                    "#a1e7df",
                    "#62c5c7"
                ]}


                style={styles.header}



            >


                <Text style={styles.title}>

                    Medicine Analytics 📈

                </Text>



                <Text style={styles.subtitle}>

                    Track your medicine progress

                </Text>





                <View style={styles.adherence}>


                    <Text style={styles.adherenceText}>

                        Weekly Adherence

                    </Text>



                    <Text style={styles.percent}>

                        {percentage}%

                    </Text>



                </View>



            </LinearGradient>









            <View style={styles.cards}>


                <Card

                    icon="💊"

                    number={history.length}

                    title="Total"

                    colors={colors}

                />



                <Card

                    icon="✅"

                    number={completed}

                    title="Completed"

                    colors={colors}

                />



                <Card

                    icon="❌"

                    number={missed}

                    title="Missed"

                    colors={colors}

                />



            </View>









            <Text

                style={[
                    styles.section,
                    {
                        color: colors.text
                    }
                ]}

            >

                Weekly Progress

            </Text>









            <View

                style={[
                    styles.chartCard,
                    {
                        backgroundColor:
                            colors.card
                    }
                ]}

            >


                {
                    weeklyData ?


                        <BarChart


                            data={weeklyData}


                            width={320}


                            height={220}


                            fromZero={true}


                            yAxisSuffix="%"



                            chartConfig={{

                                backgroundGradientFrom:
                                    colors.card,


                                backgroundGradientTo:
                                    colors.card,


                                decimalPlaces: 0,


                                color:
                                    (opacity = 1) =>
                                        `rgba(79,70,229,${opacity})`,


                                labelColor: () => colors.text


                            }}


                            style={{
                                borderRadius: 20
                            }}



                        />



                        :

                        <Text

                            style={{
                                color: colors.text,
                                textAlign: "center"
                            }}

                        >

                            Loading chart...

                        </Text>



                }



            </View>









            <Text

                style={[
                    styles.section,
                    {
                        color: colors.text
                    }
                ]}

            >

                Recent Activity

            </Text>








            {

                history.length === 0 ?


                    <View

                        style={[
                            styles.empty,
                            {
                                backgroundColor:
                                    colors.card
                            }
                        ]}

                    >


                        <Text style={{ fontSize: 50 }}>
                            💊
                        </Text>


                        <Text

                            style={{
                                color: colors.text
                            }}

                        >

                            No history available

                        </Text>


                    </View>



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


                            <View>


                                <Text

                                    style={[
                                        styles.name,
                                        {
                                            color: colors.text
                                        }
                                    ]}

                                >

                                    💊 {item.medicineName}

                                </Text>



                                <Text

                                    style={{
                                        color: colors.subText
                                    }}

                                >

                                    Medicine Taken Record

                                </Text>


                            </View>





                            <Text

                                style={{
                                    color:
                                        item.status === "Missed"
                                            ?
                                            "#EF4444"
                                            :
                                            "#10B981",

                                    fontWeight: "bold"

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
    icon,
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


            <Text style={styles.icon}>

                {icon}

            </Text>


            <Text style={styles.number}>

                {number}

            </Text>


            <Text

                style={{
                    color: colors.text
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
        paddingBottom: 30
    },



    header: {


        padding: 25,

        paddingTop: 45,

        borderBottomLeftRadius: 35,

        borderBottomRightRadius: 35


    },





    title: {


        color: "#0c0c0c",

        fontSize: 28,

        fontWeight: "bold"


    },



    subtitle: {


        color: "#101111",

        marginTop: 5


    },




    adherence: {


        marginTop: 25,

        backgroundColor: "rgba(255,255,255,0.2)",

        padding: 20,

        borderRadius: 25


    },




    adherenceText: {


        color: "#0a0a0a",

        fontSize: 16


    },




    percent: {


        color: "#0c0c0c",

        fontSize: 42,

        fontWeight: "bold"


    },






    cards: {


        flexDirection: "row",

        justifyContent: "space-around",

        marginVertical: 20


    },





    card: {


        width: "30%",

        padding: 15,

        borderRadius: 20,

        alignItems: "center",

        elevation: 4


    },




    icon: {

        fontSize: 25

    },




    number: {


        fontSize: 25,

        fontWeight: "bold",

        color: "#4F46E5"


    },




    section: {


        fontSize: 20,

        fontWeight: "bold",

        marginHorizontal: 20,

        marginVertical: 15


    },





    chartCard: {


        marginHorizontal: 20,

        padding: 10,

        borderRadius: 25,

        alignItems: "center",

        elevation: 3


    },





    item: {


        marginHorizontal: 20,

        padding: 18,

        borderRadius: 20,

        marginBottom: 12,

        flexDirection: "row",

        justifyContent: "space-between",

        alignItems: "center"


    },





    name: {


        fontSize: 17,

        fontWeight: "bold"


    },




    empty: {


        margin: 20,

        padding: 30,

        borderRadius: 20,

        alignItems: "center"


    }



});