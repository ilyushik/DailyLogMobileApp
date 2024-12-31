import {View, StyleSheet, Image, Text, Pressable, Modal} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import UserReportsModal from "../../components/UserReportsModal";

export default function TeamPersonComponent(props) {
    const navigation = useNavigation();
    const [showUsersReportsModal, setShowUsersReportsModal] = useState(false);

    const navigationLink = () => {
        navigation.navigate("MainScreen", {userId: props.user.id});
    }

    const linkButton = () => {
        if (props.userAuth !== null) {
            if (props.userAuth.position === "Project Manager") {
                return (
                    <Pressable style={styles.teamPersonLink} onPress={() => setShowUsersReportsModal(true)}>
                        <Text style={styles.teamPersonLinkText}>Reports</Text>
                    </Pressable>
                )
            } else {
                return (
                    <Pressable style={styles.teamPersonLink} onPress={() => navigationLink()}>
                        <Text style={styles.teamPersonLinkText}>More</Text>
                    </Pressable>
                )
            }
        }
    }

    return (
        <View style={styles.teamPersonFullContainer} key={props.user.id}>
            <View style={styles.imageNamePositionContainer}>
                <Image style={styles.teamPersonImage} source={{uri: props.user.image}} resizeMode={'cover'} />

                <View style={styles.teamPersonNamePositionContainer}>
                    <Text style={styles.nameTeamContainer}>{props.user.firstName} {props.user.secondName}</Text>

                    <View style={styles.imagePositionContainer}>
                        <Image style={styles.positionImageTeamContainer} source={require('../../images/position-light.png')}
                               resizeMode={'cover'} />
                        <Text style={styles.positionTitleTeamContainer}>{props.user.position}</Text>
                    </View>
                </View>
            </View>

            {linkButton()}

            <Modal visible={showUsersReportsModal} onRequestClose={() => setShowUsersReportsModal(false)}
                   animationType="slide" presentationStyle="formSheet">
                <Pressable style={styles.closeModalUserReportsButton} onPress={() => setShowUsersReportsModal(false)}>
                    <Image style={styles.closeModalUserReportsIcon} source={require('../../images/close_modal.png')}
                           resizeMode="contain"/>
                </Pressable>
                <View style={styles.modalScreenUserReportsForm}>
                    <UserReportsModal closeModal={() => setShowUsersReportsModal(false)} userId={props.user.id}/>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    teamPersonFullContainer: {
        backgroundColor: '#fff',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 15,
    },
    imageNamePositionContainer: {
        flexDirection: 'row',
        columnGap: 10
    },
    teamPersonImage: {
        height: 55,
        width: 55,
        borderRadius: 50
    },
    teamPersonNamePositionContainer: {
        justifyContent: "space-evenly"
    },
    nameTeamContainer: {
        fontSize: 17,
        fontWeight: 500,
    },
    imagePositionContainer: {
        flexDirection: "row",
        columnGap: 5
    },
    positionImageTeamContainer: {
        width: 16,
        height: 16,
    },
    positionTitleTeamContainer: {
        fontSize: 14,
        color: '#696969'
    },
    teamPersonLink: {
    },
    teamPersonLinkText: {
        fontSize: 15,
        color: '#617DA4',
        textDecorationLine: 'underline',
    },
    closeModalUserReportsButton: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    closeModalUserReportsIcon: {
        width: 30,
        height: 30,
    },
    modalScreenUserReportsForm: {
        height: '80%',
    }
})