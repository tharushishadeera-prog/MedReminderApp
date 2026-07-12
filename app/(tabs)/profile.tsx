import React, {
    useContext
} from "react";


import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    StyleSheet,
    Alert
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


import ProfileMenuItem from "../components/ProfileMenuItem";
import LogoutButton from "../components/LogoutButton";





export default function Profile() {


    const {
        darkMode,
        toggleTheme,
        colors

    } = useContext(ThemeContext);





    const user = auth.currentUser;





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





                {/* Profile Header */}



                <LinearGradient


                    colors={[
                        "#4F46E5",
                        "#06B6D4"
                    ]}


                    style={styles.header}


                >




                    <View style={styles.avatar}>


                        {
                            user?.photoURL

                                ?

                                <Text>
                                    👤
                                </Text>

                                :

                                <Ionicons

                                    name="person"

                                    size={45}

                                    color="#4F46E5"

                                />

                        }


                    </View>






                    <Text style={styles.name}>


                        {
                            user?.displayName

                                ?

                                user.displayName

                                :

                                "User"

                        }


                    </Text>






                    <Text style={styles.email}>


                        {
                            user?.email

                                ?

                                user.email

                                :

                                "No Email"

                        }


                    </Text>




                </LinearGradient>









                {/* Account Section */}



                <View style={styles.section}>


                    <Text

                        style={[
                            styles.sectionTitle,
                            {
                                color:
                                    colors.text
                            }
                        ]}

                    >

                        My Account

                    </Text>






                    <View

                        style={[
                            styles.card,
                            {
                                backgroundColor:
                                    colors.card
                            }
                        ]}

                    >




                        <ProfileMenuItem


                            icon="create-outline"


                            title="Edit Profile"


                            onPress={() =>
                                router.push(
                                    "/edit-profile"
                                )
                            }


                        />





                        <ProfileMenuItem


                            icon="notifications-outline"


                            title="Notification Settings"


                            onPress={() => { }}


                        />





                        <ProfileMenuItem


                            icon="lock-closed-outline"


                            title="Change Password"


                            onPress={() =>
                                router.push(
                                    "/change-password"
                                )
                            }


                        />






                        <ProfileMenuItem


                            icon="moon-outline"


                            title={

                                darkMode

                                    ?

                                    "Light Mode"

                                    :

                                    "Dark Mode"

                            }


                            onPress={toggleTheme}


                        />



                    </View>



                </View>









                {/* More Section */}





                <View style={styles.section}>


                    <Text

                        style={[
                            styles.sectionTitle,
                            {
                                color:
                                    colors.text
                            }
                        ]}

                    >

                        More

                    </Text>







                    <View

                        style={[
                            styles.card,
                            {
                                backgroundColor:
                                    colors.card
                            }
                        ]}

                    >




                        <ProfileMenuItem


                            icon="document-text-outline"


                            title="Privacy Policy"


                            onPress={() =>
                                router.push(
                                    "/privacy-policy"
                                )
                            }


                        />






                        <ProfileMenuItem


                            icon="star-outline"


                            title="Rate App"


                            onPress={() =>

                                Alert.alert(

                                    "Rate MedReminder ⭐",

                                    "Thank you for using our app!"

                                )

                            }


                        />







                        <ProfileMenuItem


                            icon="information-circle-outline"


                            title="About"


                            onPress={() =>
                                router.push(
                                    "/about"
                                )
                            }


                        />





                    </View>



                </View>









                {/* Logout */}




                <View style={styles.logout}>


                    <LogoutButton />


                </View>







                <Text style={styles.version}>

                    MedReminder v1.0.0

                </Text>






            </ScrollView>


        </SafeAreaView>


    );


}









const styles = StyleSheet.create({



    container: {

        flex: 1

    },





    header: {


        height: 260,


        borderBottomLeftRadius: 45,


        borderBottomRightRadius: 45,


        alignItems: "center",


        justifyContent: "center",


        paddingTop: 25


    },





    avatar: {


        width: 95,


        height: 95,


        borderRadius: 50,


        backgroundColor: "#FFFFFF",


        alignItems: "center",


        justifyContent: "center",


        marginBottom: 15


    },






    name: {


        fontSize: 25,


        fontWeight: "bold",


        color: "#FFFFFF"


    },





    email: {


        marginTop: 6,


        fontSize: 15,


        color: "#E0F2FE"


    },






    section: {


        marginTop: 25,


        paddingHorizontal: 20


    },






    sectionTitle: {


        fontSize: 20,


        fontWeight: "700",


        marginBottom: 15


    },






    card: {


        borderRadius: 25,


        paddingVertical: 8,


        elevation: 4,


        shadowOpacity: 0.1


    },







    logout: {


        marginTop: 25,


        paddingHorizontal: 20


    },






    version: {


        textAlign: "center",


        marginVertical: 30,


        color: "#9CA3AF",


        fontSize: 14


    }





});