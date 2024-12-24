import {View, StyleSheet, Image, Text} from "react-native";

export default function TeamPersonComponent(props) {
    return (
        <View style={styles.teamPersonFullContainer}>
            <View style={styles.imageNamePositionContainer}>
                <Image style={styles.teamPersonImage} source={require('../../images/face7.png')} resizeMode={'cover'} />

                <View style={styles.teamPersonNamePositionContainer}>
                    <Text style={styles.nameTeamContainer}>Illia Kamarali</Text>

                    <View style={styles.imagePositionContainer}>
                        <Image style={styles.positionImageTeamContainer} source={require('../../images/position-light.png')}
                               resizeMode={'cover'} />
                        <Text style={styles.positionTitleTeamContainer}>Java Developer</Text>
                    </View>
                </View>
            </View>

            <View style={styles.teamPersonLink}>
                <Text style={styles.teamPersonLinkText}>More</Text>
            </View>
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