import Layout from "../components/Layout";
import {View, StyleSheet, Text, ScrollView} from "react-native";
import InboxRequestComponent from "./InboxComponents/InboxRequestComponent";

export default function Inbox() {
    return (
        <Layout>
            <View style={styles.inboxMainContainer}>
                <View style={styles.inboxInfoContainer}>
                    <View style={styles.inboxContainer}>
                        <View style={styles.inboxTitleContainer}>
                            <Text style={styles.inboxTitleText}>Inbox</Text>
                        </View>
                        <InboxRequestComponent/>
                    </View>
                </View>
            </View>
        </Layout>
    )
}

const styles = StyleSheet.create({
    inboxMainContainer: {
        flex: 1,
        backgroundColor: "#e3e3e3",
        paddingHorizontal: '10%',
        position: "relative",
    },
    inboxInfoContainer: {
        position: "relative",
        marginTop: -30,
    },
    inboxContainer: {
    },
    inboxTitleContainer: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#617DA6',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    inboxTitleText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    }
})