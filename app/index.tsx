import React, {
    useEffect,
    useState,
    useRef
} from "react";


import {
    View,
    Text,
    StyleSheet,
    Animated
} from "react-native";


import {
    Redirect
} from "expo-router";


import {
    onAuthStateChanged
} from "firebase/auth";


import {
    auth
} from "./firebase/firebaseConfig";



export default function Index() {


    const [user, setUser] =
        useState<any>(null);


    const [loading, setLoading] =
        useState(true);



    const fade =
        useRef(
            new Animated.Value(0)
        ).current;




    useEffect(() => {


        Animated.timing(
            fade,
            {
                toValue: 1,
                duration: 1200,
                useNativeDriver: true
            }

        ).start();



        const unsubscribe =
            onAuthStateChanged(
                auth,
                (currentUser) => {


                    setUser(currentUser);

                    setTimeout(() => {

                        setLoading(false);

                    }, 1500);


                }
            );



        return unsubscribe;


    }, []);






    if (loading) {


        return (

            <View style={styles.container}>


                <Animated.View
                    style={{
                        opacity: fade
                    }}
                >


                    <View style={styles.logoBox}>


                        <Text style={styles.logo}>
                            💊
                        </Text>


                        <Text style={styles.clock}>
                            ⏰
                        </Text>


                    </View>





                    <Text style={styles.title}>
                        MedReminder
                    </Text>



                    <Text style={styles.subtitle}>
                        Your health, on time
                    </Text>



                </Animated.View>


            </View>

        );


    }






    if (user) {


        return (
            <Redirect
                href="/(tabs)/home"
            />
        );


    }



    return (

        <Redirect
            href="/(auth)/login"
        />

    );


}







const styles = StyleSheet.create({


    container: {


        flex: 1,

        justifyContent: "center",

        alignItems: "center",

        backgroundColor: "#a1e7df"


    },



    logoBox: {


        alignItems: "center",

        justifyContent: "center"


    },



    logo: {


        fontSize: 90


    },


    clock: {


        fontSize: 35,

        position: "absolute",

        right: -25,

        bottom: 10


    },



    title: {


        fontSize: 34,

        fontWeight: "bold",

        textAlign: "center",

        marginTop: 20,

        color: "#111827"


    },



    subtitle: {


        fontSize: 16,

        textAlign: "center",

        marginTop: 8,

        color: "#374151"


    }



});