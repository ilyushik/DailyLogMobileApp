import {View, StyleSheet, Text, FlatList, Dimensions, Pressable, Modal, Image} from "react-native";
import Layout from "../components/Layout";
import TeamPersonComponent from "./TeamComponents/TeamPersonComponent";
import {useCallback, useEffect, useState} from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

const screenHeight = Dimensions.get("screen").height;

export default function Team() {
    const [users, setUsers] = useState([]);
    const [errors, setErrors] = useState({});
    const [userAuth, setUserAuth] = useState({});

    const fetchUserHandler = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/getMyInfo`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${await SecureStore.getItemAsync('jwt_token')}`,
                }
            })

            setUserAuth(response.data)
            console.log(`User: ${userAuth}`)
        } catch (e) {
            console.log(e.response.data)
        }
    }

    useEffect(() => {
        fetchUserHandler()
    }, [])

    const fetchUsersHandler = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/peopleList`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${await SecureStore.getItemAsync('jwt_token')}`,
                }
            })

            console.log(response.data);
            setUsers(response.data);
        } catch (e) {
            console.log(e.response.data);
            setErrors(e.response.data);
        }
    }

    const fetchUsers = useCallback(async () => {
        fetchUsersHandler()
    }, [fetchUsersHandler]);

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <Layout>
            <View style={styles.teamFullContainer}>
                <View style={styles.teamInfoContainer}>
                    <View style={styles.teamInfoContainerTitle}>
                        <Text style={styles.teamInfoContainerText}>Team page</Text>
                        {userAuth.position === "Project Manager" && (
                            <Pressable style={styles.teamInfoReportsButtonContainer}>
                                <Text style={styles.teamInfoReportsButton}>All reports</Text>
                            </Pressable>
                        )}
                    </View>
                    {errors.message && (<Text style={styles.teamErrorText}>{errors.message}</Text>)}
                    <FlatList style={styles.teamScroll} data={users}
                              renderItem={({item}) => <TeamPersonComponent user={item} userAuth={userAuth}/>}
                    ItemSeparatorComponent={<View style={styles.teamSeparator}/>}/>
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
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    teamInfoContainerText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    teamInfoReportsButtonContainer: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e3e3e3',
    },
    teamInfoReportsButton: {
        fontSize: 15,
        color: '#e3e3e3',
        fontWeight: 600,
    },
    teamErrorText: {
        fontSize: 15,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    teamScroll: {
        height: "auto",
        maxHeight: screenHeight / 2,
    },
    teamSeparator: {
        paddingHorizontal: 15,
        height: 1,
        backgroundColor: '#7c7c7c',
        width: '100%'
    },
})