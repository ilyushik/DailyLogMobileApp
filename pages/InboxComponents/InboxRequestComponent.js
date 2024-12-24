import {View, StyleSheet, Text, Pressable, Image} from "react-native";

export default function InboxRequestComponent() {
    return (
        <View style={styles.inboxRequestComponentContainer}>
            <Text style={styles.inboxRequestComponentContainerText}>You have received a request for sick leave from
                <Text style={styles.inboxRequestComponentContainerEmail}> kamaraliilya@gmail.com</Text></Text>

            <View style={styles.inboxRequestComponentContainerDuration}>
                <View style={styles.inboxRequestComponentContainerDurationTitles}>
                    <Text style={styles.inboxRequestComponentContainerDurationTitlesText}>Start:</Text>
                    <Text style={styles.inboxRequestComponentContainerDurationTitlesText}>End:</Text>
                    <Text style={styles.inboxRequestComponentContainerDurationTitlesText}>Duration:</Text>
                </View>

                <View style={styles.inboxRequestComponentContainerDurationValues}>
                    <Text style={styles.inboxRequestComponentContainerDurationValuesText}>December 23, 2024</Text>
                    <Text style={styles.inboxRequestComponentContainerDurationValuesText}>December 27, 2024</Text>
                    <Text style={styles.inboxRequestComponentContainerDurationValuesText}>5 days</Text>
                </View>
            </View>

            <View style={styles.inboxRequestComponentContainerActionButtons}>
                <Pressable>
                    <Image style={styles.actionButton} source={require('../../images/approve.png')} />
                </Pressable>

                <Pressable>
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