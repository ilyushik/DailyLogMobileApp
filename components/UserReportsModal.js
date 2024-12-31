import {Platform, Pressable, Text, TextInput, TouchableOpacity, View, StyleSheet} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {useState} from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

export default function UserReportsModal(props) {
    const [startDateDB, setStartDateDB] = useState(new Date());
    const [endDateDB, setEndDateDB] = useState(new Date());

    const [date, setDate] = useState(new Date());
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);
    
    const [userReport, setUserReport] = useState(null);
    const [error, setError] = useState({});

    const toggleDatePicker = () => {
        setShowStartPicker(!showStartPicker);
    }

    const toggleEndDatePicker = () => {
        setShowEndPicker(!showEndPicker);
    }

    const formatDate = (rawDate) => {
        const date = new Date(rawDate);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure two digits for month
        const day = String(date.getDate()).padStart(2, '0');       // Ensure two digits for day

        return `${year}-${month}-${day}`;
    };


    const onChangeStart = ({type}, selectedDate) => {
        if (type === "set") {
            const currentDate = selectedDate
            setDate(currentDate);

            if (Platform.OS === 'android') {
                toggleDatePicker()
                setStartDate(formatDate(date));
                setStartDateDB(date)
            }
        } else {
            toggleDatePicker()
        }
    }

    const onChangeEnd = ({type}, selectedDate) => {
        if (type === "set") {
            const currentDate = selectedDate;
            setDate(currentDate);

            if (Platform.OS === 'android') {
                toggleEndDatePicker()
                setEndDate(formatDate(date));
                setEndDateDB(date)
            }
        } else {
            toggleEndDatePicker()
        }
    }

    const confirmIOSStartDate = () => {
        setStartDateDB(date)
        setStartDate(formatDate(date))
        toggleDatePicker()
    }

    const confirmIOSEndDate = () => {
        setEndDateDB(date);
        setEndDate(formatDate(date))
        toggleEndDatePicker()
    }
    
    const loadUserReport = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/report/usersReport-perPeriod/${props.userId}`, {
                startDate: startDate,
                endDate: endDate
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${await SecureStore.getItemAsync('jwt_token')}`,
                }
            })

            setUserReport({})
            setError({})
            setUserReport(response.data)
            console.log(response.data)
        } catch (e) {
            console.log(e.response.data)
            setError(e.response.data)
        }
    }

    return (
        <View style={styles.usersReportsContainer}>
            <View style={styles.dateInputUserReportsContainer}>
                <Text style={styles.dateInputUserReportsContainerTitle}>Start</Text>

                {!showStartPicker && <>
                    <Pressable onPress={toggleDatePicker}>
                        <TextInput style={styles.dateInputUserReportsContainerInput} value={startDate} placeholder="Start date"
                                   editable={false} onPressIn={toggleDatePicker}/>
                    </Pressable>
                </>}

                {showStartPicker && (
                    <DateTimePicker mode="date" value={date} display="spinner" onChange={onChangeStart}/>
                )}

                {showStartPicker && Platform.OS === 'ios' && (
                    <View style={styles.dateInputUserReportsContainerButtons}>
                        <TouchableOpacity onPress={toggleDatePicker}>
                            <Text style={styles.dateInputUserReportsContainerButtonCancel}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={confirmIOSStartDate}>
                            <Text style={styles.dateInputUserReportsContainerButtonSubmit}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            <View style={styles.dateInputUserReportsContainer}>
                <Text style={styles.dateInputUserReportsContainerTitle}>End</Text>

                {!showEndPicker && (
                    <Pressable onPress={toggleEndDatePicker}>
                        <TextInput style={styles.dateInputUserReportsContainerInput} value={endDate} placeholder="End date"
                                   editable={false} onPressIn={toggleEndDatePicker}/>
                    </Pressable>
                )}

                {showEndPicker && (
                    <DateTimePicker mode="date" value={date} display="spinner" onChange={onChangeEnd}/>
                )}

                {showEndPicker && Platform.OS === 'ios' && (
                    <View style={styles.dateInputUserReportsContainerButtons}>
                        <TouchableOpacity onPress={toggleEndDatePicker}>
                            <Text style={styles.dateInputUserReportsContainerButtonCancel}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={confirmIOSEndDate}>
                            <Text style={styles.dateInputUserReportsContainerButtonSubmit}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            {error.dateEr && (<Text style={styles.userReportError}>{error.dateEr}</Text>)}

            <Pressable style={styles.userReportsSearchButton} onPress={() => loadUserReport()}>
                <Text style={styles.userReportsSearchButtonText}>Check Info</Text>
            </Pressable>

            {userReport && (
                <View style={styles.userReportsBlock}>
                    <View style={styles.userReportsTitlesBlock}>
                        <Text style={styles.userReportsValues}>First name:</Text>
                        <Text style={styles.userReportsValues}>Second name:</Text>
                        <Text style={styles.userReportsValues}>Price per hour:</Text>
                        <Text style={styles.userReportsValues}>Count of hours:</Text>
                        <Text style={styles.userReportsValues}>Total:</Text>
                    </View>
                    <View style={styles.userReportsValuesBlock}>
                        <Text style={styles.userReportsValues}>{userReport.firstName}</Text>
                        <Text style={styles.userReportsValues}>{userReport.secondName}</Text>
                        <Text style={styles.userReportsValues}>{userReport.pricePerHour}</Text>
                        <Text style={styles.userReportsValues}>{userReport.countOfHoursPerPeriod}</Text>
                        <Text style={styles.userReportsValues}>{userReport.sumHoursPricePerPeriod}</Text>
                    </View>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    usersReportsContainer: {
        paddingHorizontal: '10%',
        paddingTop: 20
    },
    dateInputUserReportsContainer: {
        marginBottom: 30,
    },
    dateInputUserReportsContainerTitle: {
        fontSize: 20,
        marginBottom: 10,
    },
    dateInputUserReportsContainerInput: {
        width: '100%',
        height: 50,
        borderColor: '#d9d9d9',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    dateInputUserReportsContainerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20
    },
    dateInputUserReportsContainerButtonCancel: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderColor: '#617DA4',
        borderWidth: 1,
        borderRadius: 10,
        color: '#617DA4',
        fontSize: 17,
        fontWeight: 500
    },
    dateInputUserReportsContainerButtonSubmit: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#617DA4',
        borderColor: '#617DA4',
        borderWidth: 1,
        borderRadius: 10,
        color: '#fff',
        fontSize: 17,
        fontWeight: 500
    },
    userReportsSearchButton: {
        paddingHorizontal: 15,
        paddingVertical: 12,
        backgroundColor: '#617da4',
        borderRadius: 10,
        width: 120,
        alignSelf: 'center'
    },
    userReportsSearchButtonText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#e3e3e3',
    },
    userReportsBlock: {
        paddingTop: 40,
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    userReportsTitlesBlock: {
        rowGap: 5,
        alignItems: 'flex-start'
    },
    userReportsValuesBlock: {
        rowGap: 5,
        alignItems: 'flex-end'
    },
    userReportsValues: {
        fontSize: 17,
        fontWeight: 500,
    },
    userReportError: {
        alignSelf: "center",
        color: 'red',
        fontSize: 15,
        paddingBottom: 15
    }
})