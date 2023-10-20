import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView } from 'react-native';
import logo from '../assets/logo.png';
import { Feather } from '@expo/vector-icons';
import ConfirmationInscription from '../components/ConfirmationInscription';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; // Assurez-vous que vous avez importé Axios dans votre fichier



const PageCreationCompte = ({ isconnected, setIsConnected }) => {
    const navigation = useNavigation();

    const [showConfirmationInscr, setshowConfirmationInscr] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [username, setusername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    const handleLogin = () => {
        setIsConnected(true);
        navigation.navigate('Carte');
    };

    const toggleShowPassword1 = () => {
        setShowPassword1(!showPassword1);
    };

    const toggleShowPassword2 = () => {
        setShowPassword2(!showPassword2);
    };

    const handleSignup = async () => {
        if (password1 === password2) {
            const userData = {
                username,
                phoneNumber,
                address,
                email,
                password: password1,
            };

            try {
                // Effectuez une requête POST pour envoyer les données d'inscription au backend
                const response = await axios.post('http://192.168.166.215:8080/utilisateurs/register', userData);

                // Une fois l'inscription réussie, marquez l'utilisateur comme connecté
                setIsConnected(true);
                // Affichez la confirmation de l'inscription
                setshowConfirmationInscr(true);
            } catch (error) {
                // Gérez les erreurs d'inscription, par exemple, affichez un message d'erreur ou effectuez une autre action
                console.error("Erreur d'inscription :", error);
            }
        } else {
            // Les mots de passe ne correspondent pas, affichez un message d'erreur ou gérez-le selon vos besoins.
            console.error("Les mots de passe ne correspondent pas.");
        }
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
                <TextInput
                    placeholder="Nom d'utilisateur"
                    style={styles.input}
                    value={username}
                    onChangeText={(text) => setusername(text)}
                />
            </View>

            <View style={styles.ConnexionContainer}>
                <Feather name="smartphone" size={24} color="black" style={styles.icon} />
                <TextInput
                    placeholder="Numéro de téléphone"
                    style={styles.input}
                    value={phoneNumber}
                    onChangeText={(text) => setPhoneNumber(text)}
                />
            </View>

            <View style={styles.ConnexionContainer}>
                <Feather name="home" size={24} color="black" style={styles.icon} />
                <TextInput
                    placeholder="Adresse postale"
                    style={styles.input}
                    value={address}
                    onChangeText={(text) => setAddress(text)}
                />
            </View>

            <View style={styles.ConnexionContainer}>
                <Feather name="mail" size={24} color="black" style={styles.icon} />
                <TextInput
                    placeholder="Adresse mail"
                    style={styles.input}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
            </View>

            <View style={styles.ConnexionContainer}>
                <Feather name="lock" size={24} color="black" style={styles.icon} />
                <TextInput
                    placeholder="Mot de passe"
                    secureTextEntry={!showPassword1}
                    style={styles.passwordInput}
                    value={password1}
                    onChangeText={(text) => setPassword1(text)}
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
                    value={password2}
                    onChangeText={(text) => setPassword2(text)}
                />
                <TouchableOpacity onPress={toggleShowPassword2} style={styles.showPasswordButton}>
                    <Feather name={showPassword2 ? 'eye-off' : 'eye'} size={24} color="black" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSignup}>
                <Text style={styles.buttonText}>S'inscrire</Text>
            </TouchableOpacity>
            <ConfirmationInscription visible={showConfirmationInscr} onContinue={handleLogin} />
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    center: {
        alignItems: 'center',
    },
    titreDelivecrous: {
        fontWeight: '900',
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
        fontWeight: 'bold',
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
