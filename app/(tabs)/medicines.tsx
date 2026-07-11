import React, { useEffect, useState } from "react";

import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    TouchableOpacity
} from "react-native";

import { router } from "expo-router";

import { auth } from "../firebase/firebaseConfig";

import {
    getMedicines,
    deleteMedicine
} from "../services/medicineService";

import MedicineItem from "../components/MedicineItem";


export default function Medicines() {


    const [medicines, setMedicines] = useState<any[]>([]);

    const [search, setSearch] = useState("");



    useEffect(() => {


        const loadMedicines = async () => {


            const user = auth.currentUser;


            if (user) {


                const data = await getMedicines(
                    user.uid
                );


                setMedicines(data);


            }


        };


        loadMedicines();


    }, []);


    const handleDelete = async (id: string) => {


        const user = auth.currentUser;


        if (user) {


            await deleteMedicine(

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


    const filteredMedicines = medicines.filter(
        (item) =>

            item.name
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )

    );





    return (


        <View style={styles.container}>


            <Text style={styles.title}>
                My Medicines 💊
            </Text>





            <TextInput

                placeholder="Search medicine..."

                value={search}

                onChangeText={setSearch}

                style={styles.search}

            />






            {
                filteredMedicines.length === 0 ? (


                    <View style={styles.empty}>


                        <Text style={styles.emptyIcon}>
                            💊
                        </Text>



                        <Text style={styles.emptyTitle}>
                            No Medicines Found
                        </Text>



                        <Text style={styles.emptyText}>
                            Add your first medicine reminder
                        </Text>


                    </View>



                ) : (



                    <FlatList


                        data={filteredMedicines}


                        keyExtractor={(item) =>
                            item.id
                        }



                        showsVerticalScrollIndicator={false}



                        renderItem={({ item }) => (


                            <MedicineItem


                                medicine={item}


                                onTake={() => { }}


                                onDelete={handleDelete}


                            />


                        )}


                    />


                )

            }






            {/* Add Medicine Button */}


            <TouchableOpacity

                style={styles.floatingButton}

                onPress={() =>
                    router.push("/add-medicine")
                }

            >

                <Text style={styles.plus}>
                    +
                </Text>


            </TouchableOpacity>



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



    search: {

        backgroundColor: "#fff",

        padding: 15,

        borderRadius: 15,

        marginBottom: 20,

        borderWidth: 1,

        borderColor: "#E5E7EB"

    },





    empty: {

        flex: 1,

        justifyContent: "center",

        alignItems: "center"

    },



    emptyIcon: {

        fontSize: 60

    },



    emptyTitle: {

        fontSize: 20,

        fontWeight: "bold",

        marginTop: 15

    },



    emptyText: {

        color: "#6B7280",

        marginTop: 5

    },





    floatingButton: {

        position: "absolute",

        right: 25,

        bottom: 30,

        width: 60,

        height: 60,

        borderRadius: 30,

        backgroundColor: "#4F46E5",

        justifyContent: "center",

        alignItems: "center",

        elevation: 5

    },



    plus: {

        color: "white",

        fontSize: 35,

        fontWeight: "bold",

        marginTop: -5

    }


});