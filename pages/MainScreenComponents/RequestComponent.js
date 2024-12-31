import {View, StyleSheet, Text} from "react-native";

export default function RequestComponent(props) {
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

    const calculateDifference = (startDate, endDate) => {
        const firstDate = new Date(startDate[0], startDate[1] - 1, startDate[2]);
        const secondDate = new Date(endDate[0], endDate[1] - 1, endDate[2]);

        const timeDifference = Math.abs(secondDate - firstDate);
        const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        if (days === 0) {
            return "1 day";
        }

        if (days === 1) {
            return "2 days";
        }

        return `${days + 1} days`;
    };

    return (
        <View style={styles.requestComponentContainer} key={props.request.id}>
            <Text style={styles.reason}>{props.request.reason}</Text>
            <View style={styles.requestComponentDurationStatusContainer}>
                <View style={styles.requestComponentDurationStatusTitles}>
                    <Text style={styles.requestComponentDurationStatusTitlesText}>Start:</Text>
                    <Text style={styles.requestComponentDurationStatusTitlesText}>End:</Text>
                    <Text style={styles.requestComponentDurationStatusTitlesText}>Duration:</Text>
                    <Text style={styles.requestComponentDurationStatusTitlesText}>Status:</Text>
                </View>
                <View style={styles.requestComponentDurationStatusValues}>
                    <Text style={styles.requestComponentDurationStatusValuesText}>{props.request.startDate[0]}-
                        {props.request.startDate[1]}-{props.request.startDate[2]}</Text>
                    <Text style={styles.requestComponentDurationStatusValuesText}>{props.request.finishDate[0]}-
                        {props.request.finishDate[1]}-{props.request.finishDate[2]}</Text>
                    <Text style={styles.requestComponentDurationStatusValuesText}>
                        {calculateDifference(props.request.startDate, props.request.finishDate)}</Text>
                    <Text style={styles.requestComponentDurationStatusValuesText}>
                        {requestStatus(props.request.status)}</Text>
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