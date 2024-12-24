import {View, StyleSheet, Text} from "react-native";

export default function RequestComponent() {
    const requestStatus = (status) => {
        if (status === 'Approved') {
            return (<Text style={styles.requestComponentDurationStatusValuesApproved}>Approved</Text>)
        }
        if (status === 'Declined') {
            return (<Text style={styles.requestComponentDurationStatusValuesDeclined}>Declined</Text>)
        }
        if (status === 'Pending') {
            return (<Text style={styles.requestComponentDurationStatusValuesPending}>Pending</Text>)
        }
    }

    return (
        <View style={styles.requestComponentContainer}>
            <Text style={styles.reason}>Annual Leave</Text>
            <View style={styles.requestComponentDurationStatusContainer}>
                <View style={styles.requestComponentDurationStatusTitles}>
                    <Text style={styles.requestComponentDurationStatusTitlesText}>Start:</Text>
                    <Text style={styles.requestComponentDurationStatusTitlesText}>End:</Text>
                    <Text style={styles.requestComponentDurationStatusTitlesText}>Duration:</Text>
                    <Text style={styles.requestComponentDurationStatusTitlesText}>Status:</Text>
                </View>
                <View style={styles.requestComponentDurationStatusValues}>
                    <Text style={styles.requestComponentDurationStatusValuesText}>December 23, 2024</Text>
                    <Text style={styles.requestComponentDurationStatusValuesText}>December 27, 2024</Text>
                    <Text style={styles.requestComponentDurationStatusValuesText}>5 days</Text>
                    <Text style={styles.requestComponentDurationStatusValuesText}>{requestStatus('Pending')}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    requestComponentContainer: {
        backgroundColor: "#fff",
        paddingHorizontal: 15,
        paddingVertical: 20,
    },
    reason: {
        marginBottom: 10,
        fontSize: 14,
        fontWeight: 500
    },
    requestComponentDurationStatusContainer: {
        flexDirection: "row"
    },
    requestComponentDurationStatusTitles: {
        marginRight: 10,
        rowGap: 5
    },
    requestComponentDurationStatusTitlesText: {
        fontSize: 14,
        fontWeight: 400,
        color: '#696969'
    },
    requestComponentDurationStatusValues: {
        rowGap: 5
    },
    requestComponentDurationStatusValuesText: {
        fontSize: 14,
        fontWeight: 400,
        color: '#000'
    },
    requestComponentDurationStatusValuesApproved: {
        fontSize: 14,
        fontWeight: 400,
        color: '#2ed001'
    },
    requestComponentDurationStatusValuesDeclined: {
        fontSize: 14,
        fontWeight: 400,
        color: '#e50000'
    },
    requestComponentDurationStatusValuesPending: {
        fontSize: 14,
        fontWeight: 400,
        color: '#f8a307'
    }
})