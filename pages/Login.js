import {
    Image,
    Dimensions,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native';
import {useState} from "react";
import * as SecureStore from 'expo-secure-store'
import {useDispatch} from "react-redux";
import {login} from "../store/authSilce";

export default function Login({ navigation }) {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});

    const formIsValid = email.trim() !== '' && password.trim() !== '';

    const submitForm = async () => {
        if (email.trim().length < 1) {
            setError({email: 'Email should not be empty'});
            return;
        }
        if (password.trim().length < 1) {
            setError({password: 'Password should not be empty'});
            return;
        }


        console.log({email: email, password: password});
        const token = `${email}_${password}`
        setEmail('');
        setPassword('');
        setError({})
        await SecureStore.setItemAsync('jwt_token', token)
        console.log(`Token: ${await SecureStore.getItemAsync('jwt_token')}`)
        dispatch(login(token))
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.mainScreen}>
            <View style={styles.mainBlock}>
                <Image style={styles.image} source={require('../images/logo.png')} />
                <View style={styles.formBlock}>
                    <TextInput style={styles.textInput} value={email} placeholder="Email" onChangeText={setEmail} />
                    {error.email && <Text style={styles.error}>{error.email}</Text>}
                    <TextInput style={styles.textInput} secureTextEntry={true} value={password} placeholder="Password"
                               onChangeText={setPassword} />
                    {error.password && <Text style={styles.error}>{error.password}</Text>}
                    <TouchableOpacity style={[styles.buttonBlock, !formIsValid && styles.buttonBlockInvalid]}
                                      onPress={submitForm} disabled={!formIsValid}>
                        <Text style={[styles.buttonText, !formIsValid && styles.buttonTextInvalid]}>Login to account</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    mainScreen: {
        backgroundColor: '#e3e3e3',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainBlock: {
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 80,
        height: 80,
    },
    formBlock: {
        rowGap: 20,
        marginTop: 30,
        alignItems: 'center',
    },
    textInput: {
        width: '80%',
        aspectRatio: '5/1',
        borderWidth: 1,
        borderColor: "rgb(157,157,157)",
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    buttonBlock: {
        width: '80%',
        aspectRatio: '5/1',
        borderWidth: 1,
        borderColor: "#617DA6",
        borderRadius: 10,
        paddingVertical: 11,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: "#617DA6",
        fontSize: 15,
        fontWeight: 600,
    },
    buttonBlockInvalid: {
        borderColor: '#a2b9e8',
    },
    buttonTextInvalid: {
        color: '#a2b9e8'
    },
    error: {
        color: 'red',
    }
});
