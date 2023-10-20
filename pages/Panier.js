import { Feather } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function Panier({ route, isconnected }) {
  const { cartItems } = route.params;
  const [cart, setCart] = useState([]);
  const navigation = useNavigation();

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

  const removeFromCart = (item) => {
    const updatedCart = cart.filter((group) => group.item.id !== item.item.id);
    updateCartAndRoute(updatedCart);
  };

  const incrementCount = (item) => {
    const updatedCart = [...cart];
    const itemIndex = updatedCart.findIndex((group) => group.item.id === item.item.id);
    if (itemIndex !== -1) {
      updatedCart[itemIndex].count += 1;
    }
    updateCartAndRoute(updatedCart);
  };

  const decrementCount = (item) => {
    const updatedCart = [...cart];
    const itemIndex = updatedCart.findIndex((group) => group.item.id === item.item.id);
    if (itemIndex !== -1 && updatedCart[itemIndex].count > 1) {
      updatedCart[itemIndex].count -= 1;
    } else if (itemIndex !== -1) {
      updatedCart.splice(itemIndex, 1);
    }
    updateCartAndRoute(updatedCart);
  };

  const updateCartAndRoute = (updatedCart) => {
    setCart(updatedCart);

    const updatedItems = updatedCart.reduce((acc, group) => {
      acc.push(...Array(group.count).fill(group.item));
      return acc;
    }, []);
    route.params.setCartItems(updatedItems);
  };

  const totalAmount = cart.reduce((total, itemGroup) => total + itemGroup.count * itemGroup.item.prix, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Votre Panier</Text>
      {cart.length === 0 ? (
        <Text style={styles.emptyCartText}>Votre panier est vide.</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(group) => group.item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Image source={{ uri: item.item.image }} style={styles.itemImage} />
              <Text style={styles.itemName}>{item.item.title}</Text>
              <View style={styles.counterContainer}>
                <Text style={styles.itemprice}>{item.item.prix}€</Text>
                <TouchableOpacity
                  style={styles.decrementButton}
                  onPress={() => decrementCount(item)}
                >
                  <Feather name="minus" size={18} color="black" />
                </TouchableOpacity>
                <Text style={styles.itemCountText}>{item.count}</Text>
                <TouchableOpacity
                  style={styles.counterButton}
                  onPress={() => incrementCount(item)}
                >
                  <Feather name="plus" size={18} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeFromCart(item)}
                >
                  <Feather name="trash-2" size={20} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      {cart.length > 0 && (
        <TouchableOpacity
          style={styles.validateButton}
          onPress={() =>
            isconnected
              ? navigation.navigate('PageConfirmation', { cart, totalAmount })
              : navigation.navigate('PageLogin')
          }
        >
          <Text style={styles.validateButtonText}>
            {isconnected
              ? 'Valider le panier'
              : 'Me connecter et valider le panier'}{' '}
            : {totalAmount}€
          </Text>
        </TouchableOpacity>

      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  emptyCartText: {
    fontSize: 16,
    textAlign: 'center',
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  itemName: {
    fontSize: 18,
  },
  removeButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  itemImage: {
    width: 50,
    height: 50,
  },
  itemprice: {
    fontSize: 18,
    paddingRight: 10,
  },
  itemCountText: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 5,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    paddingRight: 10,
  },
  decrementButton: {
    paddingLeft: 10,
  },
  validateButton: {
    backgroundColor: '#FFC700',
    borderRadius: 20,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  validateButtonText: {
    paddingLeft: 10,
    fontSize: 18,
  },
});
