import {View, StyleSheet, Image, Text, FlatList, Dimensions} from "react-native";
import Layout from "../components/Layout";
import CalendarComponent from "./MainScreenComponents/CalendarComponent";
import RequestComponent from "./MainScreenComponents/RequestComponent";
import {useEffect, useState, useCallback} from "react";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";

const screenHeight = Dimensions.get("screen").height;

export default function MainScreen ({route}) {
    const {userId} = route.params

    const [user, setUser] = useState({});
    const [error, setError] = useState({});
    const [requests, setRequests] = useState([]);

    const fetchData = async (url, setData) => {
        try {
            const response = await axios.get(url, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${await SecureStore.getItemAsync('jwt_token')}`,
                }
            });
            setData([])
            setData(response.data);
            console.log(response.data);
        } catch (error) {
            setError(error.response.data);
            console.log(error.response.data);
        }
    }

    const fetchRequestHandler = useCallback( () => {
        const url = userId !== 0 ? `http://localhost:8080/requests/userRequests/${userId}` :
            `http://localhost:8080/requests`;
        fetchData(url, setRequests)
    }, [userId])

    const fetchUserHandler = useCallback(() => {
        const url = userId !== 0 ? `http://localhost:8080/users/${userId}`
            : `http://localhost:8080/getMyInfo`;
        fetchData(url, setUser)
    }, [userId])

    useEffect(() => {
        fetchUserHandler()
    }, [userId])

    useEffect(() => {
        fetchRequestHandler()
    }, [userId]);

    return (
        <Layout>
            <View style={styles.mainScreenContainer}>
                <View style={styles.infoContainer}>
                    <View style={styles.imageNameAndPositionContainer}>
                        <Image style={styles.image} source={{uri: user.image}} />
                        <View style={styles.namePositionContainer}>
                            <Text style={styles.nameText}>{user.firstName} {user.secondName}</Text>
                            <View style={styles.positionImageTitle}>
                                <Image style={styles.positionImage} source={require('../images/position-light.png')}
                                       resizeMode="contain" />
                                <Text style={styles.positionText}>{user.position}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.calendarBlock}>
                        <View style={styles.calendarTitleBlock}>
                            <Text style={styles.calendarText}>Timeline</Text>
                        </View>
                        <CalendarComponent userId={userId}/>
                    </View>

                    <View style={styles.requestContainer}>
                        <View style={styles.requestTitleBlock}>
                            <Text style={styles.requestText}>Active request</Text>
                        </View>
                        {error.message && (<Text style={styles.mainPageErrorRequestsText}>{error.message}</Text>)}
                        <FlatList style={styles.mainPageRequestScroll} data={requests}
                                  renderItem={({item}) => <RequestComponent request={item}/>}
                                  ItemSeparatorComponent={<View style={styles.separator}/>}
                        refreshing={true}/>
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
    mainPageErrorRequestsText: {
        fontSize: 15,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    mainPageRequestScroll: {
        height: "auto",
        maxHeight: screenHeight / 3,
    },
    separator: {
        paddingHorizontal: 15,
        height: 1,
        backgroundColor: '#7c7c7c',
        width: '100%'
    }
})