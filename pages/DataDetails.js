import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function DataDetails({ route }) {
    const { item } = route.params;

    return (
        <View>
            <View style={styles.center}>
                <Text style={styles.detailsTitre}>{item.title}</Text>
                <Image source={item.image} style={styles.detailsImage} />
                <Text style={styles.detailsDescr}>{item.description}</Text>
            </View>
            <View style={styles.price}>
                <Text style={styles.priceDetails}>{item.prix}€</Text>
            </View>
            <TouchableOpacity style={styles.button}>
                <Feather name="shopping-cart" size={24} color="black" />
                <Text style={styles.buttonText}>Ajouter au panier</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    center: {
        alignItems: 'center'
    },
    detailsTitre: {
        fontSize: 40,
        fontWeight: 'bold'
    },
    detailsImage: {
        width: 429,
        height: 425,
    },
    detailsDescr: {
        fontSize: 25,
        fontWeight: 'semibold',
    },
    price: {
        paddingLeft: 10,
    },
    priceDetails: {
        paddingTop: 50,
        fontSize: 58,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#FFC700',
        borderRadius: 20,
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    buttonText: {
        paddingLeft: 10,
        fontSize: 25,
    },
})