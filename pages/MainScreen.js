import {View, StyleSheet, Text} from "react-native";
import Layout from "../components/Layout";

export default function MainScreen () {

    return (
        <Layout>
            <View style={styles.mainScreenContainer}>
                <Text>Main page</Text>
            </View>
        </Layout>
    )
}

const styles = StyleSheet.create({
    mainScreenContainer: {

    },
})