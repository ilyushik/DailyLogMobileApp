import {View, StyleSheet, Text} from "react-native";
import Layout from "../components/Layout";
import TeamPersonComponent from "./TeamComponents/TeamPersonComponent";

export default function Team() {
    return (
        <Layout>
            <View style={styles.teamFullContainer}>
                <View style={styles.teamInfoContainer}>
                    <Text style={styles.teamInfoContainerTitle}>Team page</Text>
                    <TeamPersonComponent/>
                </View>
            </View>
        </Layout>
    )
}

const styles = StyleSheet.create({
    teamFullContainer: {
        flex: 1,
        paddingHorizontal: '10%',
        backgroundColor: '#e3e3e3',
    },
    teamInfoContainer: {
        position: "relative",
        marginTop: -30,
    },
    teamInfoContainerTitle: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#617DA6',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    }
})