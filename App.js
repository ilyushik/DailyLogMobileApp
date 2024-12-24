import {StyleSheet, View} from 'react-native';
import Login from "./pages/Login";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from '@react-navigation/native';
import MainScreen from "./pages/MainScreen";
import {useEffect} from "react";
import {Provider, useDispatch, useSelector} from "react-redux";
import {store} from "./store/store";
import { checkAuthentication } from './store/authSilce';
import Inbox from "./pages/Inbox";
import Team from "./pages/Team";

const Stack = createNativeStackNavigator()

const AppNavigator = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
        dispatch(checkAuthentication());
    }, [dispatch]);

    return (
        <View style={styles.safeContainer}>
            <NavigationContainer>
                <Stack.Navigator>
                    {isAuthenticated ? (
                        <>
                            <Stack.Screen
                                name="MainScreen"
                                component={MainScreen}
                                options={{ headerShown: false, gestureEnabled: false }}
                            />
                            <Stack.Screen
                                name="Inbox"
                                component={Inbox}
                                options={{ headerShown: false, gestureEnabled: false }}
                            />
                            <Stack.Screen
                                name="Team"
                                component={Team}
                                options={{ headerShown: false, gestureEnabled: false }} />
                        </>
                    ) : (
                        <Stack.Screen
                            name="Login"
                            component={Login}
                            options={{ headerShown: false, gestureEnabled: false }}
                        />
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    )
}

export default function App() {

  return (
    <Provider store={store}>
        <AppNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
    container: {
      flex: 1,
    }
});
