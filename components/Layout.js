import Header from "./Header";
import {View, StyleSheet, SafeAreaView, StatusBar, Image, ScrollView} from "react-native";

export default function Layout({children}) {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#fff" />
            <Header />
            <ScrollView style={styles.contentScroll} contentContainerStyle={styles.scrollContentContainer}
                        showsVerticalScrollIndicator={false}>
                <Image style={styles.banner} source={require('../images/banner.png')} />
                <View style={styles.child}>{children}</View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
    },
    contentScroll: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollContentContainer: {
        flexGrow: 1, // Учитывает содержимое
    },
    banner: {
        width: "100%",
        height: 110,
        resizeMode: "cover", // Масштабирование изображения
    },
    child: {
        flexGrow: 1,
    },
});
