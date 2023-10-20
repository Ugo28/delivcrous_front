import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MonCompte = () => {
    const [userEmail, setUserEmail] = useState('');
    const [username, setUsername] = useState('');


    useEffect(() => {
        // Récupérez les données utilisateur depuis AsyncStorage
        const fetchData = async () => {
          const storedUserEmail = await AsyncStorage.getItem('userEmail');
          const storedUsername = await AsyncStorage.getItem('username');
    
          if (storedUserEmail && storedUsername) {
            setUserEmail(storedUserEmail);
            setUsername(storedUsername);
          }
        };
    
        fetchData();
      }, []);

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
