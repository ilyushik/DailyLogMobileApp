import {View, StyleSheet, Image, Text, Pressable} from "react-native";
import {useNavigation} from "@react-navigation/native";

export default function TeamPersonComponent(props) {
    const navigation = useNavigation();

    const navigationLink = () => {
        navigation.navigate("MainScreen", {userId: props.user.id});
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

            <Pressable style={styles.teamPersonLink} onPress={() => navigationLink()}>
                <Text style={styles.teamPersonLinkText}>More</Text>
            </Pressable>
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
    }
})