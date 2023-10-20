import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Platform } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CommandesPage = () => {
    const [commandes, setCommandes] = useState([]);

    useEffect(() => {
        const getUserInfo = async () => {
            const userToken = await AsyncStorage.getItem('jwtToken');
            const userId = await AsyncStorage.getItem('userId');

            axios.get(`http://192.168.1.187:8080/api/commandes/getcommande?user_id=${userId}`, {
                headers: {
                    Cookie: `delivcrous=${userToken}`,
                },
            })
                .then((response) => {
                    setCommandes(response.data);
                })
                .catch((error) => {
                    console.error("Erreur lors de la récupération des commandes :", error);
                });
        };

        getUserInfo();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.commandeContainer}>
            <Text style={styles.commandeTitle}>Numéro de commande : {item.commande_id}</Text>
            <Text style={styles.commandeText}>Adresse de livraison : {item.adresse_livraison}</Text>
            <Text style={styles.commandeText}>Statut : {item.status}</Text>
            <Text style={styles.commandeText}>Date de commande : {item.date_commande}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mes Commandes</Text>
            <FlatList
                data={commandes}
                renderItem={renderItem}
                keyExtractor={(item) => item.commande_id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    commandeContainer: {
        backgroundColor: '#f2f2f2',
        padding: 20,
        marginVertical: 10,
        borderRadius: 10,
    },
    commandeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    commandeText: {
        fontSize: 16,
    },
});

export default CommandesPage;
