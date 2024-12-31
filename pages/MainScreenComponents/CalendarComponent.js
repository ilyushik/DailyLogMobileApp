import React, {useEffect, useState} from "react";
import {View, StyleSheet, Alert} from "react-native";
import {Calendar} from "react-native-calendars";
import axios from "axios";
import {useSelector} from "react-redux";
import {useRoute} from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

export default function CalendarComponent(props) {
    const route = useRoute();
    // const mode = useSelector(state => state.theme.theme);
    const mode = "light"
    const [reports, setReports] = useState({}); // Storing reports in a keyed object for easier lookup

    const fetchReports = async () => {
        const url = props.userId
            ? `http://localhost:8080/report/usersReports/${props.userId}`
            : `http://localhost:8080/report/usersReports`;
        try {
            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await SecureStore.getItemAsync('jwt_token')}`
                }
            });
            const reportsByDate = {};
            response.data.forEach(report => {
                reportsByDate[report.date.join("-")] = report; // Format: YYYY-MM-DD
            });
            setReports(reportsByDate);
        } catch (error) {
            console.error("Error fetching reports:", error);
        }
    };

    useEffect(() => {
        fetchReports();
    }, [props.userId]);

    const handleDayPress = (day) => {
        const report = reports[day.dateString];
        if (report) {
            // open popup with all data
            Alert.alert(
                "Report Details",
                `Status: ${report.status}\nDate: ${day.dateString}`,
                [{text: "OK"}]
            );
        } else {
            // open popup form
            Alert.alert("No Report", `No report found for ${day.dateString}`, [{text: "OK"}]);
        }
    };

    return (
        <View style={[styles.calendarContainer, mode === "dark" ? styles.darkTheme : styles.lightTheme]}>
            <Calendar
                style={styles.calendar}
                onDayPress={handleDayPress}
                markedDates={Object.keys(reports).reduce((acc, date) => {
                    const report = reports[date];
                    acc[date] = {
                        marked: true,
                        dotColor: report.status === "work" ? "#617DA6" : "#d56464",
                        selectedColor: "#444",
                        selectedTextColor: "#fff"
                    };
                    return acc;
                }, {})}
                theme={{
                    calendarBackground: mode === "dark" ? "#2c2c2c" : "#fff",
                    textSectionTitleColor: mode === "dark" ? "#fff" : "#000",
                    selectedDayBackgroundColor: "#617DA6",
                    selectedDayTextColor: "#fff",
                    todayTextColor: "#d56464",
                    dayTextColor: mode === "dark" ? "#fff" : "#000",
                    textDisabledColor: mode === "dark" ? "#555" : "#ccc",
                    arrowColor: mode === "dark" ? "#fff" : "#617DA6",
                    monthTextColor: mode === "dark" ? "#fff" : "#000",
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    calendarContainer: {
        // flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
    },
    calendar: {
        // borderRadius: 10,
        // overflow: "hidden",
    },
    darkTheme: {
        backgroundColor: "#2c2c2c",
    },
    lightTheme: {
        backgroundColor: "#fff",
    },
});
