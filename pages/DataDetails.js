import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function DataDetails({ route }) {
    const { item, cartItems } = route.params;
    const [cart, setCart] = useState([]);

    const itemQuantity = cart.find((cartItem) => cartItem.item.id === item.id)?.count || 0;

    useEffect(() => {
        const groupedCart = cartItems.reduce((acc, item) => {
            const existingItem = acc.find((group) => group.item.id === item.id);
            if (existingItem) {
                existingItem.count += 1;
            } else {
                acc.push({ item, count: 1 });
            }
            return acc;
        }, []);

        setCart(groupedCart);
    }, [cartItems]);


    const incrementCount = (item) => {
        const updatedCart = [...cart];
        const itemIndex = updatedCart.findIndex((group) => group.item.id === item.id);
        if (itemIndex !== -1) {
            updatedCart[itemIndex].count += 1;
        } else {
            // Si l'élément n'est pas trouvé, ajoutez-le au panier avec une quantité de 1.
            updatedCart.push({ item, count: 1 });
        }
        setCart(updatedCart);
    
        const updatedItems = updatedCart.reduce((acc, group) => {
            acc.push(...Array(group.count).fill(group.item));
            return acc;
        }, []);
        route.params.setCartItems(updatedItems);
    };
    

    const decrementCount = (item) => {
        const updatedCart = [...cart];
        const itemIndex = updatedCart.findIndex((group) => group.item.id === item.id);
        if (itemIndex !== -1 && updatedCart[itemIndex].count > 1) {
            updatedCart[itemIndex].count -= 1;
        } else if (itemIndex !== -1) {
            updatedCart.splice(itemIndex, 1);
        }
        setCart(updatedCart);

        const updatedItems = updatedCart.reduce((acc, group) => {
            acc.push(...Array(group.count).fill(group.item));
            return acc;
        }, []);
        route.params.setCartItems(updatedItems);
    };

    return (
        <View>
            <View style={styles.center}>
                <Text style={styles.detailsTitre}>{item.title}</Text>
                <Image source={item.image} style={styles.detailsImage} />
                <Text style={styles.detailsDescr}>{item.description}</Text>
            </View>
            <View style={styles.price}>
                <Text style={styles.titleAllergene}>Allergènes :</Text>
                <View style={styles.listeAllergene}>
                    {item.allergenes.map((allergene, index) => (
                        <Text key={index}>
                            {allergene}
                            {index === item.allergenes.length - 1 ? '.' : ', '}
                        </Text>
                    ))}
                </View>
                <Text style={styles.priceDetails}>{item.prix}€</Text>
            </View>
            {itemQuantity > 0 ? (
                <View style={styles.adddelButton}>
                    <TouchableOpacity
                        style={styles.adddelstyleButton}
                        onPress={() => decrementCount(item)}
                    >
                        <Text style={styles.ButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{itemQuantity}</Text>
                    <TouchableOpacity
                        style={styles.adddelstyleButton}
                        onPress={() => incrementCount(item)}
                    >
                        <Text style={styles.ButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity style={styles.button} onPress={() => incrementCount(item)}>
                    <Feather name="shopping-cart" size={24} color="black" />
                    <Text style={styles.buttonText}>Ajouter au panier</Text>
                </TouchableOpacity>
            )}
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
        paddingTop: 20,
        fontSize: 30,
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
    titleAllergene: {
        fontSize: 20,
        paddingTop: 5,
        fontWeight: 'bold'
    },
    listeAllergene: {
        flexDirection: 'row'
    },
    adddelButton: {
        position: 'absolute',
        bottom: 0,
        right: 2,
        width: 85,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    adddelstyleButton: {
        backgroundColor: '#FFC700',
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100

    },
    ButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    quantityText: {
        padding: 8
    },
})