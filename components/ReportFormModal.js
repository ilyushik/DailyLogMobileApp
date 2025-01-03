import {
    Image,
    Pressable,
    Text,
    View,
    StyleSheet,
    TextInput,
    Platform,
    TouchableOpacity,
    KeyboardAvoidingView
} from "react-native";
import React, {useState} from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

export default function ReportFormModal(props) {

    const [date, setDate] = useState(new Date());
    const [startDate, setStartDate] = useState("");
    const [startDateDB, setStartDateDB] = useState(new Date());
    const [showStartPicker, setShowStartPicker] = useState(false);

    const [hours, setHours] = useState(0);

    const [comment, setComment] = useState("");

    const [error, setError] = useState({});

    const toggleDatePicker = () => {
        setShowStartPicker(!showStartPicker);
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

    const confirmIOSStartDate = () => {
        setStartDateDB(date)
        setStartDate(formatDate(date))
        toggleDatePicker()
    }

    const submitForm = async () => {
        if (hours === 0) {
            setError({hours: 'Hours should be more than 0'});
            return
        }

        const data = {
            date: startDateDB,
            countOfHours: hours.valueOf(),
            text: comment
        }

        console.log(data)

        try {
            const response = await axios.post(`http://localhost:8080/report/add-report`, data, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${await SecureStore.getItemAsync('jwt_token')}`
                }
            })

            console.log(response.data)
            props.loadReports()
            props.closeModal()
        } catch (e) {
            console.log(e.response.data)
            setError(e.response.data)
        }


    }

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.reportFormModalContainer}>
            <View style={styles.reportFormModalBlock}>
                <Pressable style={styles.closeModalReportFormButton} onPress={props.closeModal}>
                    <Image
                        style={styles.closeModalReportFormIcon}
                        source={require("../images/close_modal.png")}
                        resizeMode="contain"
                    />
                </Pressable>

                <View style={styles.reportFormContainer}>
                    <Text style={styles.reportFormModalTitle}>Add report</Text>
                    <View style={styles.reportForm}>

                        <View style={styles.dateInputReportFormContainer}>
                            <Text style={styles.dateInputReportFormContainerTitle}>Date</Text>

                            {!showStartPicker && <>
                                <Pressable onPress={toggleDatePicker}>
                                    <TextInput style={styles.dateInputReportFormContainerInput} value={startDate} placeholder="Start date"
                                               editable={false} onPressIn={toggleDatePicker}/>
                                </Pressable>
                            </>}

                            {showStartPicker && (
                                <DateTimePicker mode="date" value={date} display="spinner" onChange={onChangeStart}/>
                            )}

                            {showStartPicker && Platform.OS === 'ios' && (
                                <View style={styles.dateInputReportFormContainerButtons}>
                                    <TouchableOpacity onPress={toggleDatePicker}>
                                        <Text style={styles.dateInputReportFormContainerButtonCancel}>Cancel</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={confirmIOSStartDate}>
                                        <Text style={styles.dateInputReportFormContainerButtonSubmit}>Submit</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>

                        <View style={styles.hoursReportForm}>
                            <Text style={styles.dateInputReportFormContainerTitle}>Amount of hours</Text>
                            <TextInput style={styles.dateInputReportFormContainerInput} placeholder="Amount of hours"
                            value={hours} onChangeText={setHours} keyboardType="numeric"/>
                        </View>

                        <View style={styles.commentReportForm}>
                            <Text style={styles.dateInputReportFormContainerTitle}>Comment</Text>
                            <TextInput style={styles.dateInputReportFormContainerInput} placeholder="comment"
                                       value={comment} onChangeText={setComment} multiline={true}/>
                        </View>

                        {error.hours && <Text style={styles.errorReportForm}>{error.hours}</Text>}
                        {error.text && <Text style={styles.errorReportForm}>{error.text}</Text>}
                        {error.date && <Text style={styles.errorReportForm}>{error.date}</Text>}
                        {error.message && <Text style={styles.errorReportForm}>{error.message}</Text>}

                    </View>

                    <View style={styles.reportFormButtons}>
                        <Pressable style={styles.closeModalReportFormButtonCancel} onPress={props.closeModal}>
                            <Text style={styles.closeModalReportFormButtonCancelText}>Cancel</Text>
                        </Pressable>

                        <Pressable style={styles.closeModalReportFormButtonSubmit} onPress={submitForm}>
                            <Text style={styles.closeModalReportFormButtonSubmitText}>Submit</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    reportFormModalContainer: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    reportFormModalBlock: {
        backgroundColor: "#fff",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        width: "100%",
    },
    closeModalReportFormButton: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    closeModalReportFormIcon: {
        width: 30,
        height: 30,
    },
    reportFormContainer: {
        paddingTop: 10,
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    reportFormModalTitle: {
        fontSize: 20,
        fontWeight: "500",
        alignSelf: "center",
        paddingBottom: 20
    },
    reportForm: {
        rowGap: 30,
        paddingBottom: 50,
    },
    dateInputReportFormContainer: {
    },
    dateInputReportFormContainerTitle: {
        fontSize: 17,
        marginBottom: 10,
    },
    dateInputReportFormContainerInput: {
        width: '100%',
        height: 50,
        borderColor: '#d9d9d9',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    dateInputReportFormContainerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20
    },
    dateInputReportFormContainerButtonCancel: {
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
    dateInputReportFormContainerButtonSubmit: {
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
    hoursReportForm: {},
    reportFormButtons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        columnGap: 10
    },
    closeModalReportFormButtonCancel: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderColor: '#617DA4',
        borderWidth: 1,
        borderRadius: 10,
    },
    closeModalReportFormButtonCancelText: {
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: '500',
        color: '#617DA4'
    },
    closeModalReportFormButtonSubmit: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderColor: '#617DA4',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#617DA4',
    },
    closeModalReportFormButtonSubmitText: {
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: '500',
        color: '#fff'
    },
    errorReportForm: {
        fontSize: 17,
        color: 'red',
        alignSelf: 'center',
        fontWeight: '500',
    }
})