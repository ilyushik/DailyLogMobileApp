import {View, Text, StyleSheet, TextInput, Pressable, Platform, TouchableOpacity} from "react-native";
import {Dropdown} from "react-native-element-dropdown";
import {useCallback, useEffect, useState} from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const reasons = [
    {
        label: 'Annual Leave',
        value: 'Annual Leave',
    },
    {
        label: 'Sick Leave',
        value: 'Sick Leave',
    },
    {
        label: 'Work from home',
        value: 'Work from home',
    },
]

export default function AddRequestModal(props) {
    const [reasonsDB, setReasonsDB] = useState([]);
    const [startDateDB, setStartDateDB] = useState(new Date());
    const [endDateDB, setEndDateDB] = useState(new Date());

    const [reasonValue, setReasonValue] = useState(null);
    const [isFocused, setFocused] = useState(false);
    const [date, setDate] = useState(new Date());
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);
    const [comment, setComment] = useState("");
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

    const fetchUserHandler = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/reasons`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${await SecureStore.getItemAsync('jwt_token')}`
                }
            })

            console.log(response.data);
            setReasonsDB(response.data);
        } catch (e) {
            console.log(e.response.data)
            setError(e.response.data);
        }
    }

    const fetchUsers = useCallback(() => {
        fetchUserHandler();
    }, [])

    useEffect(() => {
        fetchUsers()
    }, []);

    const submitRequest = async () => {
        if (startDate.trim().length < 1) {
            setError({startDate: 'Field should not be empty'});
            console.log(`Start date: Field should not be empty`);
            return;
        }
        if (endDate.trim().length < 1) {
            setError({endDate: 'Field should not be empty'});
            console.log(`End date: Field should not be empty`);
            return;
        }
        if (comment.trim().length < 1) {
            setError({comment: 'Field should not be empty'});
            console.log(`Comment: Field should not be empty`);
            return;
        }


        const request = {
            reason: reasonValue,
            startDate: startDateDB,
            finishDate: endDateDB,
            comment: comment
        }

        console.log(request)

        try {
            const response = await axios.post(`http://localhost:8080/addRequest`, {
                reason: reasonValue,
                startDate: startDateDB,
                finishDate: endDateDB,
                comment: comment
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${await SecureStore.getItemAsync('jwt_token')}`
                }
            })

            console.log(response.data);

            console.log(request);
            props.closeModal()
        } catch (e) {
            console.log(e.response.data)
            setError(e.response.data);
        }


    }

    return(
        <View style={styles.addRequestContainer}>
            <View style={styles.addRequestTitleContainer}>
                <Text style={styles.addRequestTitle}>Create request</Text>
            </View>

            <Dropdown style={styles.dropdown} placeholder="Select reason" data={reasonsDB} labelField="reason"
                      valueField="reason" onChange={reason => {
                setReasonValue(reason.reason)
                setFocused(false)
            }}/>

            {error.reason && (<Text style={styles.addRequestError}>{error.reason}</Text>)}

            <View style={styles.dateInputContainer}>
                <Text style={styles.dateInputContainerTitle}>Start</Text>

                {!showStartPicker && <>
                    <Pressable onPress={toggleDatePicker}>
                        <TextInput style={styles.dateInputContainerInput} value={startDate} placeholder="Start date"
                                   editable={false} onPressIn={toggleDatePicker}/>
                    </Pressable>
                </>}

                {showStartPicker && (
                    <DateTimePicker mode="date" value={date} display="spinner" onChange={onChangeStart}/>
                )}

                {showStartPicker && Platform.OS === 'ios' && (
                    <View style={styles.dateInputContainerButtons}>
                        <TouchableOpacity onPress={toggleDatePicker}>
                            <Text style={styles.dateInputContainerButtonCancel}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={confirmIOSStartDate}>
                            <Text style={styles.dateInputContainerButtonSubmit}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            {error.startDate && (<Text style={styles.addRequestError}>{error.startDate}</Text>)}

            <View style={styles.dateInputContainer}>
                <Text style={styles.dateInputContainerTitle}>End</Text>

                {!showEndPicker && (
                    <Pressable onPress={toggleEndDatePicker}>
                        <TextInput style={styles.dateInputContainerInput} value={endDate} placeholder="End date"
                                   editable={false} onPressIn={toggleEndDatePicker}/>
                    </Pressable>
                )}

                {showEndPicker && (
                    <DateTimePicker mode="date" value={date} display="spinner" onChange={onChangeEnd}/>
                )}

                {showEndPicker && Platform.OS === 'ios' && (
                    <View style={styles.dateInputContainerButtons}>
                        <TouchableOpacity onPress={toggleEndDatePicker}>
                            <Text style={styles.dateInputContainerButtonCancel}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={confirmIOSEndDate}>
                            <Text style={styles.dateInputContainerButtonSubmit}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            {error.endDate && (<Text style={styles.addRequestError}>{error.endDate}</Text>)}

            <View style={styles.commentInputContainer}>
                <Text style={styles.commentInputContainerTitle}>Comment</Text>
                <TextInput style={styles.commentInput} placeholder="Text..." value={comment} onChangeText={setComment}
                           multiline={true}/>
            </View>

            {error.errorDate && (<Text style={styles.addRequestError}>{error.errorDate}</Text>)}
            {error.message && (<Text style={styles.addRequestError}>{error.message}</Text>)}
            {error.comment && (<Text style={styles.addRequestError}>{error.comment}</Text>)}

            <View style={styles.mainActionButton}>
                <Pressable style={styles.submitRequestButton} onPress={submitRequest}>
                    <Text style={styles.submitRequestButtonText}>Submit</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    addRequestContainer: {
        paddingHorizontal: '10%',
    },
    addRequestTitleContainer: {
        alignItems: 'center',
    },
    addRequestTitle: {
        fontSize: 20,
        fontWeight: 500,
        marginBottom: 30,
    },
    dropdown: {
        width: '100%',
        height: 50,
        borderColor: '#d9d9d9',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginBottom: 30
    },
    dateInputContainer: {
        marginBottom: 30,
    },
    dateInputContainerTitle: {
        fontSize: 20,
        marginBottom: 10,
    },
    dateInputContainerInput: {
        width: '100%',
        height: 50,
        borderColor: '#d9d9d9',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    dateInputContainerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20
    },
    dateInputContainerButtonCancel: {
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
    dateInputContainerButtonSubmit: {
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
    commentInputContainerTitle: {
        fontSize: 20,
        marginBottom: 10,
    },
    commentInput: {
        width: '100%',
        height: 100,
        borderColor: '#d9d9d9',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 10,
        textAlignVertical: "top"
    },
    submitRequestButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#617DA4',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
    submitRequestButtonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 600,
        textAlign: 'center'
    },
    addRequestError: {
        alignSelf: "center",
        color: 'red',
        fontSize: 15,
        paddingVertical: 5
    }
})