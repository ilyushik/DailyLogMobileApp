import {View, StyleSheet, Text, FlatList, Dimensions} from "react-native";
import Layout from "../components/Layout";
import TeamPersonComponent from "./TeamComponents/TeamPersonComponent";
import {useCallback, useEffect, useState} from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

const screenHeight = Dimensions.get("screen").height;

export default function Team() {
    const [users, setUsers] = useState([]);
    const [errors, setErrors] = useState({});

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
                    <Text style={styles.teamInfoContainerTitle}>Team page</Text>
                    {errors.message && (<Text style={styles.teamErrorText}>{errors.message}</Text>)}
                    <FlatList style={styles.teamScroll} data={users}
                              renderItem={({item}) => <TeamPersonComponent user={item} />}
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
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
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
    }
})