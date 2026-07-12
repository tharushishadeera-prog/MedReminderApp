import React, {
    useEffect,
    useState,
    useContext
} from "react";


import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    TouchableOpacity
} from "react-native";


import {
    LinearGradient
} from "expo-linear-gradient";


import {
    Ionicons
} from "@expo/vector-icons";


import {
    router
} from "expo-router";


import {
    ThemeContext
} from "../context/ThemeContext";


import {
    auth
} from "../firebase/firebaseConfig";


import {
    getMedicines,
    deleteMedicine
} from "../services/medicineService";


import MedicineItem from "../components/MedicineItem";






export default function Medicines() {


    const {
        colors
    } = useContext(ThemeContext);



    const [medicines, setMedicines] =
        useState<any[]>([]);


    const [search, setSearch] =
        useState("");







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







    useEffect(() => {


        loadMedicines();


    }, []);









    const handleDelete = async (
        id: string
    ) => {


        const user =
            auth.currentUser;


        if (user) {


            await deleteMedicine(
                user.uid,
                id
            );


            loadMedicines();


        }


    };








    const filteredMedicines =
        medicines.filter(item =>

            item.name
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )

        );








    return (


        <View

            style={[
                styles.container,
                {
                    backgroundColor:
                        colors.background
                }
            ]}

        >







            <LinearGradient

                colors={[
                    "#a1e7df",
                    "#62c5c7"
                ]}

                style={styles.header}

            >



                <Text style={styles.title}>

                    My Medicines 💊

                </Text>



                <Text style={styles.subtitle}>

                    Manage your daily reminders

                </Text>





                <View style={styles.countBox}>


                    <Ionicons

                        name="medical"

                        size={25}

                        color="white"

                    />



                    <Text style={styles.countText}>

                        {medicines.length}
                        {" "}
                        Medicines

                    </Text>


                </View>



            </LinearGradient>









            <View

                style={[
                    styles.searchBox,
                    {
                        backgroundColor:
                            colors.card
                    }
                ]}

            >


                <Ionicons

                    name="search"

                    size={22}

                    color="#9CA3AF"

                />



                <TextInput

                    placeholder="Search medicine..."

                    placeholderTextColor="#9CA3AF"

                    value={search}

                    onChangeText={setSearch}

                    style={styles.search}


                />



            </View>









            {
                filteredMedicines.length === 0 ?


                    <View style={styles.empty}>


                        <Text style={styles.emptyIcon}>
                            💊
                        </Text>


                        <Text

                            style={[
                                styles.emptyTitle,
                                {
                                    color:
                                        colors.text
                                }
                            ]}

                        >

                            No Medicines Found

                        </Text>



                        <Text

                            style={{
                                color:
                                    colors.subText
                            }}

                        >

                            Add your first medicine reminder

                        </Text>



                    </View>



                    :



                    <FlatList


                        data={filteredMedicines}


                        keyExtractor={
                            item => item.id
                        }



                        showsVerticalScrollIndicator={false}



                        renderItem={({ item }) => (


                            <MedicineItem


                                medicine={item}


                                onTake={() => { }}


                                onDelete={
                                    handleDelete
                                }


                            />


                        )}


                    />

            }









            <TouchableOpacity

                style={styles.floatingButton}

                onPress={() =>
                    router.push(
                        "/add-medicine"
                    )
                }

            >


                <Ionicons

                    name="add"

                    size={35}

                    color="white"

                />


            </TouchableOpacity>






        </View>


    );


}









const styles = StyleSheet.create({



    container: {

        flex: 1

    },





    header: {


        padding: 25,

        paddingTop: 45,

        borderBottomLeftRadius: 35,

        borderBottomRightRadius: 35

    },





    title: {


        color: "#080808",

        fontSize: 28,

        fontWeight: "bold"


    },




    subtitle: {


        color: "#0a0a0a",

        marginTop: 5

    },




    countBox: {


        marginTop: 20,

        backgroundColor: "rgba(255,255,255,0.2)",

        padding: 15,

        borderRadius: 18,

        flexDirection: "row",

        alignItems: "center"


    },





    countText: {


        color: "#06282c",

        marginLeft: 10,

        fontSize: 16,

        fontWeight: "bold"


    },





    searchBox: {


        margin: 20,

        borderRadius: 18,

        paddingHorizontal: 15,

        flexDirection: "row",

        alignItems: "center",

        elevation: 3


    },





    search: {


        flex: 1,

        padding: 15,

        fontSize: 15


    },





    empty: {


        flex: 1,

        justifyContent: "center",

        alignItems: "center"


    },




    emptyIcon: {


        fontSize: 70


    },




    emptyTitle: {


        fontSize: 20,

        fontWeight: "bold",

        marginTop: 15


    },





    floatingButton: {


        position: "absolute",

        right: 25,

        bottom: 30,

        width: 65,

        height: 65,

        borderRadius: 35,

        backgroundColor: "#1e8fa3",

        justifyContent: "center",

        alignItems: "center",

        elevation: 8


    }



});