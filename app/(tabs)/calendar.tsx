import React, { useEffect, useState, useContext } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from "react-native";

import { Calendar } from "react-native-calendars";
import { LinearGradient } from "expo-linear-gradient";

import { auth } from "../firebase/firebaseConfig";
import { getMedicineHistory } from "../services/historyService";
import { ThemeContext } from "../context/ThemeContext";

export default function CalendarScreen() {

    const { colors } = useContext(ThemeContext);

    const [history, setHistory] = useState<any[]>([]);

    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {

        const user = auth.currentUser;

        if (!user) return;

        const data = await getMedicineHistory(user.uid);

        setHistory(data);

    };

    const selectedMedicines = history.filter(item => {

        let date = "";

        if (item.date?.toDate) {

            date = item.date.toDate().toISOString().split("T")[0];

        } else if (item.date) {

            date = new Date(item.date).toISOString().split("T")[0];

        }

        return date === selectedDate;

    });

    const taken = selectedMedicines.filter(
        item =>
            item.status === "Taken" ||
            item.status === "Completed"
    ).length;

    const missed = selectedMedicines.filter(
        item =>
            item.status === "Missed"
    ).length;

    const markedDates: any = {};

    history.forEach(item => {

        let date = "";

        if (item.date?.toDate) {

            date = item.date.toDate().toISOString().split("T")[0];

        } else if (item.date) {

            date = new Date(item.date).toISOString().split("T")[0];

        }

        if (date) {

            markedDates[date] = {

                marked: true,

                dotColor:
                    item.status === "Missed"
                        ? "#EF4444"
                        : "#10B981"

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
                    backgroundColor: colors.background
                }
            ]}
            showsVerticalScrollIndicator={false}
        >

            <LinearGradient
                colors={["#a1e7df", "#62c5c7"]}
                style={styles.header}
            >

                <Text style={styles.title}>
                    Medicine Calendar 📅
                </Text>

                <Text style={styles.subtitle}>
                    Track all medicine activities
                </Text>

            </LinearGradient>

            <View
                style={[
                    styles.calendarCard,
                    {
                        backgroundColor: colors.card
                    }
                ]}
            >

                <Calendar

                    onDayPress={(day) =>
                        setSelectedDate(day.dateString)
                    }

                    markedDates={markedDates}

                    theme={{

                        calendarBackground: colors.card,

                        dayTextColor: colors.text,

                        monthTextColor: colors.text,

                        textSectionTitleColor: "#6B7280",

                        arrowColor: "#4F46E5",

                        todayTextColor: "#4F46E5",

                        selectedDayBackgroundColor: "#4F46E5",

                        selectedDayTextColor: "#fff"

                    }}

                />

            </View>

            <View style={styles.summaryRow}>

                <View
                    style={[
                        styles.summaryCard,
                        {
                            backgroundColor: colors.card
                        }
                    ]}
                >

                    <Text style={styles.summaryIcon}>
                        ✅
                    </Text>

                    <Text style={styles.summaryNumber}>
                        {taken}
                    </Text>

                    <Text
                        style={{
                            color: colors.text
                        }}
                    >
                        Taken
                    </Text>

                </View>

                <View
                    style={[
                        styles.summaryCard,
                        {
                            backgroundColor: colors.card
                        }
                    ]}
                >

                    <Text style={styles.summaryIcon}>
                        ❌
                    </Text>

                    <Text style={styles.summaryNumber}>
                        {missed}
                    </Text>

                    <Text
                        style={{
                            color: colors.text
                        }}
                    >
                        Missed
                    </Text>

                </View>

            </View>

            <Text
                style={[
                    styles.activityTitle,
                    {
                        color: colors.text
                    }
                ]}
            >

                Activity on {selectedDate}

            </Text>

            {

                selectedMedicines.length === 0 ?

                    <View
                        style={[
                            styles.emptyCard,
                            {
                                backgroundColor: colors.card
                            }
                        ]}
                    >

                        <Text style={styles.emptyIcon}>
                            📭
                        </Text>

                        <Text
                            style={{
                                color: colors.text,
                                fontSize: 17,
                                fontWeight: "600"
                            }}
                        >

                            No medicine activity

                        </Text>

                    </View>

                    :

                    selectedMedicines.map(item => (

                        <View

                            key={item.id}

                            style={[
                                styles.activityCard,
                                {
                                    backgroundColor: colors.card,
                                    borderLeftColor:
                                        item.status === "Missed"
                                            ? "#EF4444"
                                            : "#10B981",
                                },
                            ]}

                        >

                            <View>

                                <Text
                                    style={[
                                        styles.medicineName,
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

                                    Daily Medicine

                                </Text>

                            </View>

                            <Text

                                style={{

                                    color:
                                        item.status === "Missed"
                                            ? "#EF4444"
                                            : "#10B981",

                                    fontWeight: "bold"

                                }}

                            >

                                {

                                    item.status === "Missed"

                                        ? "❌ Missed"

                                        : "✅ Taken"

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
        flex: 1
    },

    header: {
        paddingTop: 55,
        paddingBottom: 35,
        paddingHorizontal: 25,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35
    },

    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#111827"
    },

    subtitle: {
        marginTop: 8,
        fontSize: 15,
        color: "#374151"
    },

    calendarCard: {
        marginHorizontal: 20,
        marginTop: -30,
        borderRadius: 24,
        padding: 12,
        elevation: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
    },

    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginHorizontal: 20
    },

    summaryCard: {
        width: "46%",
        padding: 18,
        borderRadius: 20,
        alignItems: "center",
        elevation: 3
    },

    summaryIcon: {
        fontSize: 28
    },

    summaryNumber: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#4F46E5",
        marginVertical: 5
    },

    activityTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginHorizontal: 20,
        marginTop: 25,
        marginBottom: 15
    },
    activityCard: {
        marginHorizontal: 20,
        marginBottom: 12,
        padding: 18,
        borderRadius: 18,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderLeftWidth: 5,
    },

    medicineName: {
        fontSize: 17,
        fontWeight: "bold"
    },

    emptyCard: {
        margin: 20,
        padding: 35,
        borderRadius: 20,
        alignItems: "center"
    },

    emptyIcon: {
        fontSize: 55,
        marginBottom: 12
    }

});