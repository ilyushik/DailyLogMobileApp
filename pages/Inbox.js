import Layout from "../components/Layout";
import {View, StyleSheet, Text, ScrollView, FlatList, Dimensions} from "react-native";
import InboxRequestComponent from "./InboxComponents/InboxRequestComponent";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const screenHeight = Dimensions.get("screen").height;

export default function Inbox() {

    const [requests, setRequests] = useState([]);
    const [errors, setErrors] = useState({});

    const fetchRequestsHandler = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/requests/approver`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${await SecureStore.getItemAsync('jwt_token')}`,
                }
            })

            console.log(response.data);
            setRequests(response.data);
        } catch (e) {
            console.log(e.response.data);
            setErrors(e.response.data)
        }
    }

    const fetchRequests = useCallback(() => {
        fetchRequestsHandler()
    }, [fetchRequestsHandler])

    useEffect(() => {
        fetchRequests()
    }, [fetchRequests])

    const approveRequest = async (id) => {
        try {
            const response = await axios.post(`http://localhost:8080/requests/approve/${id}`, {id: id}, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${await SecureStore.getItemAsync('jwt_token')}`,
                }
            })

            console.log(response.data);

            //send message
            // if (response.data.requestStatus === "Approved") {
            //     handleSendEmail(response.data.userEmail, "Your request has been approved!",
            //         `${process.env.REACT_APP_FRONTEND_LINK}/my-info`, "Back to requests")
            // }

            setRequests([])
            fetchRequests()
        } catch (e) {
            console.log(e.response.data);
        }
    }

    const declineRequest = async (id) => {
        try {
            const response = await axios.post(`http://localhost:8080/requests/decline/${id}`, {id: id}, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${await SecureStore.getItemAsync('jwt_token')}`,
                }
            })

            console.log(response.data);

            //send message
            // if (response.data.requestStatus === "Declined") {
            //     handleSendEmail(response.data.userEmail, "Your request has been declined!",
            //         `${process.env.REACT_APP_FRONTEND_LINK}/my-info`, "Back to requests")
            // }

            setRequests([])
            fetchRequests()
        } catch (e) {
            console.log(e.response.data);
        }
    }

    return (
        <Layout>
            <View style={styles.inboxMainContainer}>
                <View style={styles.inboxInfoContainer}>
                    <View style={styles.inboxContainer}>
                        <View style={styles.inboxTitleContainer}>
                            <Text style={styles.inboxTitleText}>Inbox</Text>
                        </View>
                        {errors.message && (<Text style={styles.inboxErrorRequestsText}>{errors.message}</Text>)}
                        <FlatList data={requests} style={styles.inboxRequestScroll}
                                  renderItem={({item}) =>
                                      <InboxRequestComponent request={item} approve={() => approveRequest(item.id)}
                                                                                 decline={() => declineRequest(item.id)}/>}
                                  ItemSeparatorComponent={<View style={styles.inboxSeparator} />}
                                  refreshing={true}
                        onRefresh={fetchRequests}/>
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
        backgroundColor: "#fff",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
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
    },
    inboxRequestScroll: {
        height: "auto",
        maxHeight: screenHeight / 2,

    },
    inboxSeparator: {
        paddingHorizontal: 15,
        height: 1,
        backgroundColor: '#7c7c7c',
        width: '100%'
    },
    inboxErrorRequestsText: {
        fontSize: 15,
        paddingHorizontal: 15,
        paddingVertical: 10,
    }
})