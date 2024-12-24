import {View, Text, StyleSheet, TextInput, Pressable, Platform, TouchableOpacity} from "react-native";
import {Dropdown} from "react-native-element-dropdown";
import {useState} from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

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
    // const [reasons, setReasons] = useState([]);
    const [reasonValue, setReasonValue] = useState("");
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
        let date = new Date(rawDate);

        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        return `${day}-${month}-${year}`;
    }

    const onChangeStart = ({type}, selectedDate) => {
        if (type === "set") {
            const currentDate = selectedDate;
            setDate(currentDate);

            if (Platform.OS === 'android') {
                toggleDatePicker()
                setStartDate(formatDate(currentDate));
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
                setEndDate(formatDate(currentDate));
            }
        } else {
            toggleEndDatePicker()
        }
    }

    const confirmIOSStartDate = () => {
        setStartDate(formatDate(date))
        toggleDatePicker()
    }
    const confirmIOSEndDate = () => {
        setEndDate(formatDate(date))
        toggleEndDatePicker()
    }

    const submitRequest = () => {
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
            startDate: startDate,
            endDate: endDate,
            comment: comment
        }

        console.log(request);
        props.closeModal()
    }

    return(
        <View style={styles.addRequestContainer}>
            <View style={styles.addRequestTitleContainer}>
                <Text style={styles.addRequestTitle}>Create request</Text>
            </View>

            <Dropdown style={styles.dropdown} placeholder="Select reason" data={reasons} labelField="label"
                      valueField="value" onChange={reason => {
                setReasonValue(reason.value)
                setFocused(false)
            }}/>
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

            <View style={styles.commentInputContainer}>
                <Text style={styles.commentInputContainerTitle}>Comment</Text>
                <TextInput style={styles.commentInput} placeholder="Text..." value={comment} onChangeText={setComment}
                           multiline={true}/>
            </View>

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
})