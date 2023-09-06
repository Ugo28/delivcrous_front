import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

export default function Panier({ route }) {
  const { cartItems, setCartItems } = route.params;
  const [cart, setCart] = useState(cartItems);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Votre Panier</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyCartText}>Votre panier est vide.</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item,index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.cartItem}>
              <Text style={styles.itemName}>{item.title}</Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => {
                  setCartItems(cartItems.filter((data, i) => i !== index)); //maj dans la page Home
                  setCart(cart.filter((data, i) => i !== index));//maj dans le panier
                }
                }
              >
                <Text style={styles.removeButtonText}>Retirer</Text>
              </TouchableOpacity>
            </View>
          )}
        />
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
