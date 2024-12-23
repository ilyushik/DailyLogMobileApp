import Header from "./Header";
import {View, StyleSheet, SafeAreaView, StatusBar} from "react-native";

export default function Layout({children}) {

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#fff" />
            <Header/>
            <View style={styles.child}>{children}</View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
    },
    child: {
        flex: 1,
    }
})