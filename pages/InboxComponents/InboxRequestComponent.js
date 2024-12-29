import {View, StyleSheet, Text, Pressable, Image} from "react-native";
import * as SecureStore from "expo-secure-store";

export default function InboxRequestComponent(props) {

    const calculateDifference = (startDate, endDate) => {
        const firstDate = new Date(startDate[0], startDate[1] - 1, startDate[2]); // Год, месяц (от 0), день
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
        <View style={styles.inboxRequestComponentContainer} key={props.request.id}>
            <Text style={styles.inboxRequestComponentContainerText}>You have received a request for {props.request.reason} from
                <Text style={styles.inboxRequestComponentContainerEmail}> {props.request.fullUserName}</Text></Text>

            <View style={styles.inboxRequestComponentContainerDuration}>
                <View style={styles.inboxRequestComponentContainerDurationTitles}>
                    <Text style={styles.inboxRequestComponentContainerDurationTitlesText}>Start:</Text>
                    <Text style={styles.inboxRequestComponentContainerDurationTitlesText}>End:</Text>
                    <Text style={styles.inboxRequestComponentContainerDurationTitlesText}>Duration:</Text>
                </View>

                <View style={styles.inboxRequestComponentContainerDurationValues}>
                    <Text style={styles.inboxRequestComponentContainerDurationValuesText}>{props.request.startDate[2]}-{props.request.startDate[1]}-{props.request.startDate[0]}</Text>
                    <Text style={styles.inboxRequestComponentContainerDurationValuesText}>{props.request.finishDate[2]}-{props.request.finishDate[1]}-{props.request.finishDate[0]}</Text>
                    <Text style={styles.inboxRequestComponentContainerDurationValuesText}>{calculateDifference(props.request.startDate, props.request.finishDate)}</Text>
                </View>
            </View>

            <View style={styles.inboxRequestComponentContainerActionButtons}>
                <Pressable onPress={() => {
                    props.approve(props.request.id);
                }}>
                    <Image style={styles.actionButton} source={require('../../images/approve.png')} />
                </Pressable>

                <Pressable onPress={() => {
                    props.decline(props.request.id);
                }}>
                    <Image style={styles.actionButton} source={require('../../images/decline.png')} />
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inboxRequestComponentContainer: {
        backgroundColor: "#fff",
        paddingHorizontal: 15,
        paddingVertical: 20,
    },
    inboxRequestComponentContainerText: {
        fontSize: 17,
        fontWeight: 600,
        marginBottom: 10
    },
    inboxRequestComponentContainerEmail: {
        color: '#617DA4'
    },
    inboxRequestComponentContainerDuration: {
        flexDirection: 'row',
        marginBottom: 15
    },
    inboxRequestComponentContainerDurationTitles: {
        marginRight: 10,
        rowGap: 10
    },
    inboxRequestComponentContainerDurationTitlesText: {
        fontSize: 14,
        fontWeight: 400,
        color: '#696969'
    },
    inboxRequestComponentContainerDurationValues: {
        rowGap: 10
    },
    inboxRequestComponentContainerDurationValuesText: {
        fontSize: 14,
        fontWeight: 400,
        color: '#000'
    },
    inboxRequestComponentContainerActionButtons: {
        flexDirection: 'row',
        justifyContent: "center",
        columnGap: 20,
    },
    actionButton: {
        width: 30,
        height: 30,
    }
})