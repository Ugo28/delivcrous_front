import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView } from 'react-native';
import logo from '../assets/logo.png';
import { Feather } from '@expo/vector-icons';
import ConfirmationInscription from '../components/ConfirmationInscription';
import { useNavigation } from '@react-navigation/native';


const PageCreationCompte = ({ isconnected, setIsConnected }) => {
    const navigation = useNavigation();

    const [showConfirmationInscr, setshowConfirmationInscr] = useState(false);

    const logout = () => {
        setshowConfirmationInscr(true);
    };

    const handleLogin = () => {
        setIsConnected(true);
        navigation.navigate('Carte');
    };


    const [showPassword1, setShowPassword1] = useState(false);

    const toggleShowPassword1 = () => {
        setShowPassword1(!showPassword1);
    };

    const [showPassword2, setShowPassword2] = useState(false);

    const toggleShowPassword2 = () => {
        setShowPassword2(!showPassword2);
    };

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

            <View style={styles.ConnexionContainer}>
                <Feather name="user" size={24} color="black" style={styles.icon} />
                <TextInput placeholder="Nom d'utilisateur" style={styles.input} />
            </View>

            <View style={styles.ConnexionContainer}>
                <Feather name="smartphone" size={24} color="black" style={styles.icon} />
                <TextInput
                    placeholder="Numéro de téléphone"
                    style={styles.input}
                />
            </View>

            <View style={styles.ConnexionContainer}>
                <Feather name="home" size={24} color="black" style={styles.icon} />
                <TextInput
                    placeholder="Adresse postale"
                    style={styles.input}
                />
            </View>

            <View style={styles.ConnexionContainer}>
                <Feather name="mail" size={24} color="black" style={styles.icon} />
                <TextInput
                    placeholder="Adresse mail"
                    style={styles.input}
                />
            </View>

            <View style={styles.ConnexionContainer}>
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
            <View style={styles.ConnexionContainer}>
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
            <TouchableOpacity style={styles.button} onPress={logout}>
                <Text style={styles.buttonText}>S'inscrire</Text>
            </TouchableOpacity>
            <ConfirmationInscription
                visible={showConfirmationInscr}
                onContinue={handleLogin}
            />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    center: {
        alignItems: 'center',
    },
    titreDelivecrous: {
        fontWeight:'900',
        fontSize: 15,
    },
    container: {
        flex: 1,
        paddingTop: 60,
        alignItems: 'center',
    },
    logo: {
        width: 50,
        height: 50,
    },
    appName: {
        fontWeight:'bold',
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
    passwordInput: {
        paddingLeft: 10,
        flex: 1,
    },
    showPasswordButton: {
        padding: 10,
    },
    ConnexionContainer: {
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
