import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {View, Image, Text, Button, TouchableOpacity} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import PageAccueil from './pages/PageAccueil';
import PageCreationCompte from './pages/PageCreationCompte';
import Home from './pages/Home';
import logo from './assets/logo.png';
import DataDetails from './pages/DataDetails';
import {Feather} from "@expo/vector-icons";
import Panier from './pages/Panier';





const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Carte"
                    component={Home}
                    options={({ navigation }) => ({
                        headerTitle: () => (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image
                                    source={logo}
                                    style={{ width: 30, height: 30, marginRight: 10 }}
                                />
                                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Delivecrous</Text>
                            </View>
                        ),
                        headerRight: () => (
                            <TouchableOpacity
                                style={{ marginRight: 15 }}
                                onPress={() => navigation.navigate('PageAccueil')}
                            >
                                <Feather name="user" size={24} color="black" />
                            </TouchableOpacity>
                        )
                    })}
                />
                <Stack.Screen name="Panier" options={{headerTitle:'Mon Panier'}} component={Panier} />
                <Stack.Screen name="DataDetails" options={{headerTitle:''}} component={DataDetails} />
                <Stack.Screen name="PageAccueil" options={{ headerShown: false, headerTitle: "Se connecter" }} component={PageAccueil} />
                <Stack.Screen name="PageCreationCompte" options={{ headerTitle: "S'inscrire" }} component={PageCreationCompte} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};


export default App;
