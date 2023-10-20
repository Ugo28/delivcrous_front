import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MonCompte = () => {
    const [userEmail, setUserEmail] = useState('');
    const [username, setUsername] = useState('');
    const [solde, setSolde] = useState('');
    useEffect(() => {
        // Récupérez les données utilisateur depuis AsyncStorage
        const fetchData = async () => {
            const storedUserEmail = await AsyncStorage.getItem('userEmail');
            const storedUsername = await AsyncStorage.getItem('username');
            const storeSolde = await AsyncStorage.getItem('solde')

            if (storedUserEmail && storedUsername && storeSolde) {
                setUserEmail(storedUserEmail);
                setUsername(storedUsername);
                setSolde(storeSolde);
            }
        };

        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.userInfoCard}>
                <Text style={styles.userInfoTitle}>Mes informations</Text>
                <Text style={styles.userInfoItem}>
                    <Text style={styles.userInfoLabel}>Nom d'utilisateur:</Text> {username}
                </Text>
                <Text style={styles.userInfoItem}>
                    <Text style={styles.userInfoLabel}>Adresse e-mail:</Text> {userEmail}
                </Text>
                <Text style={styles.userInfoItem}>
                    <Text style={styles.userInfoLabel}>Solde:</Text> {solde} €
                </Text>
                {/* Vous pouvez ajouter d'autres informations utilisateur au besoin */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    userInfoCard: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        width: '100%',
        maxWidth: 600,
    },
    userInfoTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    userInfoLabel: {
        fontWeight: 'bold',
    },
    userInfoItem: {
        fontSize: 18,
        marginBottom: 10,
    },
});

export default MonCompte;
