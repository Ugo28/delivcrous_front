import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const PageConfirmation = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Feather name="thumbs-up" size={100} />
            <Text style={styles.ThanksText}>Merci !</Text>
            <Text style={styles.OrderText}>
                Votre commande a bien été enregistrée.
                <Feather name='smile' size={20} />
            </Text>
            <Text style={styles.OrderText}>
                Nos équipes font leur maximum pour que vous soyez livré dans les plus brefs delais.

            </Text>
            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Carte')}>
                <Text style={styles.buttonText}>Terminer </Text>
            </TouchableOpacity>
        </View>
    );

}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingTop: 200
    },
    ThanksText: {
        fontSize: 70
    },
    OrderText: {
        fontSize: 20,
        textAlign: 'center',
        paddingTop: 10
    },
    button: {
        backgroundColor: '#FFC700',
        borderRadius: 20,
        marginTop:250,
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',

    },
    buttonText: {
        paddingLeft: 10,
        fontSize: 25,
    },

})
export default PageConfirmation;