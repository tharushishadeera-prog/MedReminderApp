import React, {
    useEffect,
    useState
} from "react";


import {
    View,
    Text,
    StyleSheet,
    FlatList
} from "react-native";


import { auth } from "../firebase/firebaseConfig";


import {
    getMedicineHistory
} from "../services/historyService";



export default function History() {


    const [history, setHistory] =
        useState<any[]>([]);



    useEffect(() => {


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


        loadHistory();


    }, []);





    return (


        <View style={styles.container}>


            <Text style={styles.title}>
                Medicine History 📈
            </Text>



            <View style={styles.cards}>


                <View style={styles.card}>

                    <Text style={styles.number}>
                        {history.length}
                    </Text>

                    <Text>
                        Total Taken
                    </Text>

                </View>




                <View style={styles.card}>

                    <Text style={styles.number}>
                        {history.length}
                    </Text>

                    <Text>
                        Completed
                    </Text>

                </View>


            </View>




            <Text style={styles.section}>
                Recent Activity
            </Text>




            <FlatList

                data={history}

                keyExtractor={
                    item => item.id
                }


                renderItem={({ item }) => (


                    <View style={styles.item}>


                        <Text style={styles.name}>
                            💊 {item.medicineName}
                        </Text>


                        <Text style={styles.status}>
                            ✅ {item.status}
                        </Text>


                    </View>


                )}

            />



        </View>


    );


}





const styles = StyleSheet.create({


    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
        padding: 20
    },


    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginTop: 30,
        marginBottom: 20
    },


    cards: {
        flexDirection: "row",
        justifyContent: "space-between"
    },


    card: {
        backgroundColor: "white",
        width: "45%",
        padding: 20,
        borderRadius: 15,
        alignItems: "center"
    },


    number: {
        fontSize: 28,
        fontWeight: "bold"
    },


    section: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 20
    },


    item: {
        backgroundColor: "white",
        padding: 18,
        borderRadius: 15,
        marginBottom: 10
    },


    name: {
        fontSize: 16,
        fontWeight: "bold"
    },


    status: {
        marginTop: 5,
        color: "#10B981"
    }


});