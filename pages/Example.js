import {View, StyleSheet, Text} from "react-native";
import Layout from "../components/Layout";

export default function Example() {
    return (
        <Layout>
            <View style={styles.testContainer}>
                <Text>Example page</Text>
            </View>
        </Layout>
    )
}

const styles = StyleSheet.create({
    testContainer: {
        flex: 1,
        backgroundColor: 'lightblue',
    }
})