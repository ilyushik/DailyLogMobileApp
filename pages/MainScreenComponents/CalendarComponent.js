import {View, StyleSheet} from "react-native";
import {Calendar} from "react-native-calendars";

export default function CalendarComponent() {

    return (
        <View style={styles.calendarContainer}>
            <Calendar style={styles.calendar} />
        </View>
    )
}

const styles = StyleSheet.create({
    calendarContainer: {},
    calendar: {}
})