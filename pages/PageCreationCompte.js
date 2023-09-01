import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView } from 'react-native';
import logo from '../assets/logo.png';
import { Feather } from '@expo/vector-icons';
import { useFonts, Montserrat_700Bold, Montserrat_600SemiBold, Montserrat_400Regular } from '@expo-google-fonts/montserrat';
import AppLoading from 'expo-app-loading';

const PageCreationCompte = () => {

    let [fontsLoaded] = useFonts({
        Montserrat_700Bold,
        Montserrat_600SemiBold,
        Montserrat_400Regular,
    });
    
    const [showPassword1, setShowPassword1] = useState(false);

    const toggleShowPassword1 = () => {
        setShowPassword1(!showPassword1);
    };

    const [showPassword2, setShowPassword2] = useState(false);

    const toggleShowPassword2 = () => {
        setShowPassword2(!showPassword2);
    };

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <View style={styles.center}>
                    <Image source={logo} style={styles.logo} />
                    <Text style={styles.titreDelivecrous}>Delivecrous</Text>
                    <Text style={styles.appName}>Créer un compte</Text>
                </View>

                <View style={styles.userContainer}>
                    <Feather name="user" size={24} color="black" style={styles.icon} />
                    <TextInput placeholder="Nom d'utilisateur" style={styles.input} />
                </View>
                <View style={styles.mailContainer}>
                    <Feather name="mail" size={24} color="black" style={styles.icon} />
                    <TextInput
                        placeholder="Adresse mail"
                        style={styles.input}
                    />
                </View>

                <View style={styles.passwordContainer}>
                    <Feather name="lock" size={24} color="black" style={styles.icon} />
                    <TextInput
                        placeholder="Mot de passe"
                        secureTextEntry={!showPassword1}
                        style={styles.passwordInput}
                    />
                    <TouchableOpacity onPress={toggleShowPassword1} style={styles.showPasswordButton}>
                        <Feather name={showPassword1 ? 'eye-off' : 'eye'} size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.passwordContainer}>
                    <Feather name="lock" size={24} color="black" style={styles.icon} />
                    <TextInput
                        placeholder="Confirmation mot de passe"
                        secureTextEntry={!showPassword2}
                        style={styles.passwordInput}
                    />
                    <TouchableOpacity onPress={toggleShowPassword2} style={styles.showPasswordButton}>
                        <Feather name={showPassword2 ? 'eye-off' : 'eye'} size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>S'inscrire</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }
};

const styles = StyleSheet.create({
    center: {
        alignItems: 'center',
    },
    titreDelivecrous: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: 15,
    },
    container: {
        paddingTop: 60,
        flex: 1,
        alignItems: 'center',
    },
    logo: {
        width: 50,
        height: 50,
    },
    appName: {
        fontFamily:'Montserrat_600SemiBold',
        fontSize: 24,
        marginTop: 20,
    },
    input: {
        width: '80%',
        height: 40,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#007bff',
        borderRadius: 20,
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    loginText: {
        marginTop: 20,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        width: '80%',
        paddingHorizontal: 10,
    },
    passwordInput: {
        paddingLeft: 10,
        flex: 1,
    },
    showPasswordButton: {
        padding: 10,
    },
    mailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        width: '80%',
        paddingHorizontal: 10,
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        width: '80%',
        paddingHorizontal: 10,
    },
});

export default PageCreationCompte;
