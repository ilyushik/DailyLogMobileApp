import {View, StyleSheet, Image, Pressable, Text, Animated, Platform, Modal} from "react-native";
import {useState, useRef, useCallback, useEffect} from "react";
import {useNavigation} from "@react-navigation/native";
import {useDispatch} from "react-redux";
import {logout} from "../store/authSilce";
import AddRequestModal from "./AddRequestModal";
import * as SecureStore from 'expo-secure-store'
import axios from "axios";

export default function Header() {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [user, setUser] = useState({});

    const [isIconsVisible, setIconsVisible] = useState(true);
    const [showModalAddRequest, setShowModalAddRequest] = useState(false);
    const animationValue = useRef(new Animated.Value(0)).current;

    const toggleIconsVisibility = () => {
        if (isIconsVisible) {
            Animated.timing(animationValue, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }).start();
        } else {
            Animated.timing(animationValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver: false,
            }).start();
        }
        setIconsVisible(!isIconsVisible);
    };

    const animatedHeight = animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 140],
    });

    const animatedHeightUser = animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 50],
    });

    const animatedOpacity = animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });


    const isAuthenticated = async () => {
        const token = await SecureStore.getItemAsync('jwt_token')
        return !!token
    }

    const fetchUserHandler = useCallback(async () => {
        try {
            const token = await SecureStore.getItemAsync('jwt_token')
            const response = await axios.get(`http://localhost:8080/getMyInfo`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            console.log(response.data)
            setUser(response.data)
        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        if (isAuthenticated()) {
            fetchUserHandler()
        }
    }, [fetchUserHandler])

    const inbox = () => {
        if (isAuthenticated()) {
            if (user.role !== 'ROLE_USER') {
                return (
                    <Pressable style={styles.inboxContainer} onPress={() => {
                        console.log("Inbox")
                        toggleIconsVisibility()
                        navigation.navigate("Inbox");
                    }}>
                        <Image style={styles.icon} source={require('../images/inbox_icon.png')} resizeMode="contain"/>
                        <Text style={styles.iconText}>Inbox</Text>
                    </Pressable>
                )
            }
        }
    }

    const team = () => {
        if (isAuthenticated()) {
            if (user.role !== 'ROLE_USER') {
                return (
                    <Pressable style={styles.teamContainer} onPress={() => {
                        console.log("Team")
                        toggleIconsVisibility()
                        navigation.navigate("Team");
                    }}>
                        <Image style={styles.icon} source={require('../images/team_icon.png')} resizeMode="contain"/>
                        <Text style={styles.iconText}>Team</Text>
                    </Pressable>
                )
            }
        }
    }

    return (
        <View style={styles.headerContainer}>
            <View style={styles.header}>
                <Pressable onPress={() => {
                    console.log("Main page")
                    navigation.navigate('MainScreen', {userId: 0})
                }}>
                    <Image style={styles.logo} source={require('../images/logo 2.png')} resizeMode="contain"/>
                </Pressable>

                <View style={styles.headerButtons}>
                    <Pressable style={styles.addRequestButton} onPress={() => {
                        console.log("Add a request")
                        setShowModalAddRequest(true);
                    }}>
                        <Text style={styles.addRequestText}>+ Add a request</Text>
                    </Pressable>

                    <Pressable style={styles.burgerIconContainer} onPress={toggleIconsVisibility}>
                        <Image style={styles.burgerIcon} source={require('../images/burger.png')} resizeMode="contain"/>
                    </Pressable>
                </View>
            </View>

            <Animated.View
                style={[
                    styles.headerIcons,
                    {height: user.role !== 'ROLE_USER' ? animatedHeight : animatedHeightUser, opacity: animatedOpacity},
                ]}
            >
                {inbox()}

                {team()}

                <Pressable style={styles.logoutContainer} onPress={async () => {
                    console.log("Logout")
                    toggleIconsVisibility()
                    dispatch(logout())

                }}>
                    <Image style={styles.icon} source={require('../images/logout_icon.png')} resizeMode="contain"/>
                    <Text style={styles.iconText}>Logout</Text>
                </Pressable>
            </Animated.View>

            <Modal style={styles.modalScreen} visible={showModalAddRequest}
                   onRequestClose={() => setShowModalAddRequest(false)}
            animationType="slide" presentationStyle="formSheet">
                <Pressable style={styles.closeModalButton} onPress={() => setShowModalAddRequest(false)}>
                    <Image style={styles.closeModalIcon} source={require('../images/close_modal.png')}
                           resizeMode="contain"/>
                </Pressable>
                <View style={styles.modalScreenAddRequestForm}>
                    <AddRequestModal closeModal={() => setShowModalAddRequest(false)} />
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {},
    header: {
        top: 0,
        height: 70,
        width: '100%',
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    logo: {
        width: 60,
    },
    headerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    addRequestButton: {},
    addRequestText: {
        paddingHorizontal: 25,
        paddingVertical: 10,
        fontSize: 15,
        fontWeight: '500',
        color: '#fff',
        backgroundColor: '#617da6',
        borderRadius: 10,
    },
    burgerIconContainer: {},
    burgerIcon: {
        height: 55,
        width: 25,
        marginLeft: 15,
    },
    headerIcons: {
        overflow: 'hidden',
        backgroundColor: '#e3e3e3',
        paddingHorizontal: 25,
    },
    inboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#696969',
    },
    teamContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#696969',
    },
    logoutContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    icon: {
        height: 25,
        width: 25,
    },
    iconText: {
        marginLeft: 10,
        fontSize: 15,
        fontWeight: '500',
    },
    closeModalButton: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    closeModalIcon: {
        width: 30,
        height: 30,
    },
    modalScreenAddRequestForm: {
        height: '80%',
        justifyContent: "center"
    }
});
