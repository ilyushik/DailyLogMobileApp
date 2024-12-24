import {View, StyleSheet, Image, Text, ScrollView} from "react-native";
import Layout from "../components/Layout";
import CalendarComponent from "./MainScreenComponents/CalendarComponent";
import RequestComponent from "./MainScreenComponents/RequestComponent";

export default function MainScreen () {

    return (
        <Layout>
            <View style={styles.mainScreenContainer}>
                <View style={styles.infoContainer}>
                    <View style={styles.imageNameAndPositionContainer}>
                        <Image style={styles.image} source={require('../images/face7.png')} />
                        <View style={styles.namePositionContainer}>
                            <Text style={styles.nameText}>Illia Kamarali</Text>
                            <View style={styles.positionImageTitle}>
                                <Image style={styles.positionImage} source={require('../images/position-light.png')}
                                       resizeMode="contain" />
                                <Text style={styles.positionText}>Java Developer</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.calendarBlock}>
                        <View style={styles.calendarTitleBlock}>
                            <Text style={styles.calendarText}>Timeline</Text>
                        </View>
                        <CalendarComponent/>
                    </View>

                    <View style={styles.requestContainer}>
                        <View style={styles.requestTitleBlock}>
                            <Text style={styles.requestText}>Active request</Text>
                        </View>
                        <RequestComponent/>
                    </View>
                </View>
            </View>
        </Layout>
    )
}

const styles = StyleSheet.create({
    mainScreenContainer: {
        backgroundColor: "#e3e3e3",
        flex: 1,
        paddingHorizontal: '10%',
        position: "relative",
        paddingBottom: 30
    },
    infoContainer: {
        position: "relative",
        marginTop: -50,
    },
    imageNameAndPositionContainer: {
        marginBottom: 30
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "#e3e3e3",
        marginBottom: 20
    },
    namePositionContainer: {},
    nameText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    positionImageTitle: {
        flexDirection: "row",
        marginTop: 5
    },
    positionImage: {
        width: 18,
        height: 18,
        marginRight: 5
    },
    positionText: {
        color: "#696969",
    },
    calendarBlock: {
        marginBottom: 25
    },
    calendarTitleBlock: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#617DA6',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    calendarText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    requestContainer: {
        backgroundColor: '#fff',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        maxHeight: '30%'
    },
    requestTitleBlock: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#617DA6',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    requestText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
})