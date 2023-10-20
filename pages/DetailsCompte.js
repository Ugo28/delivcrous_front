import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MonCompte = () => {
    const [userEmail, setUserEmail] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Assurez-vous que votre code reçoit le jeton JWT à partir d'AsyncStorage
                const jwtToken = 'jwtToken'; // Remplacez YOUR_JWT_TOKEN_HERE par votre jeton JWT

                const response = await axios.get('http://192.168.1.187:8080/api/utilisateurs/login', {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                });

                const userData = response.data.body;

                // Assurez-vous que les clés dans userData correspondent aux données que vous attendez du serveur
                setUserEmail(userData.email);
                setUsername(userData.username);
            } catch (error) {
                console.error('Erreur lors de la récupération des informations utilisateur :', error);
            }
        };

        fetchData();
    }, []); // Utilisez une dépendance vide pour que useEffect soit exécuté une seule fois

    return (
        <View style={styles.container}>
            <Text style={styles.userInfoText}>Nom d'utilisateur : {username}</Text>
            <Text style={styles.userInfoText}>Adresse e-mail : {userEmail}</Text>
            {/* Vous pouvez ajouter d'autres informations utilisateur au besoin */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userInfoText: {
        fontSize: 18,
        marginBottom: 10,
    },
    // Ajoutez ici d'autres styles au besoin
});

export default MonCompte;
