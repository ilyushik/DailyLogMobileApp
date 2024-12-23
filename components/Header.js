import {View, StyleSheet, Image, Pressable, Text, Animated, Platform} from "react-native";
import {useState, useRef} from "react";
import {useNavigation} from "@react-navigation/native";
import {useDispatch} from "react-redux";
import {logout} from "../store/authSilce";

export default function Header() {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [isIconsVisible, setIconsVisible] = useState(true);
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
        outputRange: [0, 150],
    });

    const animatedOpacity = animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });

    return (
        <View style={styles.headerContainer}>
            <View style={styles.header}>
                <Pressable onPress={() => {
                    console.log("Main page")
                    navigation.navigate('MainScreen')
                }}>
                    <Image style={styles.logo} source={require('../images/logo 2.png')} resizeMode="contain"/>
                </Pressable>

                <View style={styles.headerButtons}>
                    <Pressable style={styles.addRequestButton} onPress={() => console.log("Add a request")}>
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
                    {height: animatedHeight, opacity: animatedOpacity},
                ]}
            >
                <Pressable style={styles.inboxContainer} onPress={() => {
                    console.log("Inbox")
                    toggleIconsVisibility()
                    navigation.navigate("Example");
                }}>
                    <Image style={styles.icon} source={require('../images/inbox_icon.png')} resizeMode="contain"/>
                    <Text style={styles.iconText}>Inbox</Text>
                </Pressable>
                <Pressable style={styles.teamContainer} onPress={() => {
                    console.log("Team")
                    toggleIconsVisibility()
                    navigation.navigate("Team");
                }}>
                    <Image style={styles.icon} source={require('../images/team_icon.png')} resizeMode="contain"/>
                    <Text style={styles.iconText}>Team</Text>
                </Pressable>
                <Pressable style={styles.logoutContainer} onPress={async () => {
                    console.log("Logout")
                    toggleIconsVisibility()
                    dispatch(logout())

                }}>
                    <Image style={styles.icon} source={require('../images/logout_icon.png')} resizeMode="contain"/>
                    <Text style={styles.iconText}>Logout</Text>
                </Pressable>
            </Animated.View>
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
        // paddingTop: 10,
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
});
