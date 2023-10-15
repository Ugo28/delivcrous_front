import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import categoriesdata from '../assets/data/categoriesdata';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { TextInput } from 'react-native';
import categories from '../assets/data/categories';
import { Platform } from 'react-native';





export default function Home() {

  const [cartItems, setCartItems] = useState([]);

  const [searchText, setSearchText] = useState('');

  const [selectedCategory, setSelectedCategory] = useState(null);

  const renderCategoriesItem = ({ item }) => {
    // Trouver la quantité de l'article dans le panier
    const itemQuantity = cartItems.filter((cartItem) => cartItem.id === item.id).length;

    return (
      <View style={styles.categoryCard}>
        <Image source={item.image} style={styles.categoryImage} />
        <TouchableOpacity style={styles.categoryInfo} onPress={() => handleCategoryPress(item)}>
          <Text style={styles.categoryTitle}>{item.title}</Text>
          <Text style={styles.categoryDescr}>{item.description}</Text>
          <Text style={styles.categoriePrice}>{item.prix}€</Text>
        </TouchableOpacity>
        {itemQuantity > 0 ? (
          <View style={styles.adddelButton}>
            <TouchableOpacity
              style={styles.adddelstyleButton}
              onPress={() => {
                // Retirez un article du panier
                removeFromCart(item);
              }}
            >
              <Text style={styles.ButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{itemQuantity}</Text>
            <TouchableOpacity
              style={styles.adddelstyleButton}
              onPress={() => {
                // Ajoutez un article au panier
                addToCart(item);
              }}
            >
              <Text style={styles.ButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              // Ajoutez un article au panier
              addToCart(item);
            }}
          >
            <Text style={styles.ButtonText}>+</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };


  const navigation = useNavigation();

  const handleCategoryPress = (item) => {
    /*navigation.navigate('DataDetails', { item });*/
    navigation.push('DataDetails', { item, cartItems, setCartItems })
  };

  const handleCategoryToggle = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  const filteredCategoriesData = selectedCategory
    ? categoriesdata.filter((item) => item.category === selectedCategory)
    : categoriesdata;

  const filteredDataBySearch = filteredCategoriesData.filter((item) => {
    const itemName = item.title.toLowerCase();
    return itemName.includes(searchText.toLowerCase());
  });

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (itemToRemove) => {
    const itemIndex = cartItems.findIndex((item) => item.id === itemToRemove.id);

    if (itemIndex !== -1) {
      const updatedCart = [...cartItems];
      updatedCart.splice(itemIndex, 1); // Retirez un élément à l'index trouvé
      setCartItems(updatedCart);
    }
  };


  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.searchBar}>
          <Feather name="search" size={24} color="black" style={styles.icon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher..."
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
        </View>

        <Text style={styles.CategoryText}>Catégories</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.category
                  ? styles.selectedCategoryButton
                  : styles.unselectedCategoryButton,
              ]}
              onPress={() => handleCategoryToggle(category.category)}
            >
              <Text style={styles.categoryButtonText}>{category.category}</Text>
              <Image source={category.image} style={styles.logoCategory} />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Popular */}
        <Text style={styles.categoriestext}>La carte</Text>
        <View style={styles.popularWrapper}>
          {filteredDataBySearch.map(item => (
            <View key={item.id} style={styles.popularCardWrapper}>
              {renderCategoriesItem({ item })}
            </View>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => navigation.push('Panier', { cartItems, setCartItems })}
      >
        <Feather name="shopping-cart" size={24} color="black" />
        {cartItems.length > 0 && (
          <View style={styles.cartCounter}>
            <Text style={styles.cartCounterText}>{cartItems.length}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    flex: 1
  },
  titleWrapper: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  categoriestext: {
    fontWeight: 'semibold',
    fontSize: 30,
    marginVertical: 20,
    marginLeft: 20,
  },
  popularWrapper: {
    paddingHorizontal: 20,
    ...(Platform.OS === 'web'
      ? {
        flexDirection: 'row',
        flexWrap: 'wrap',
      }
      : {}),
  },

  popularCardWrapper: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    position: 'relative',
    ...(Platform.OS === 'web'
      ? {
        width: 'calc(33.33% - 14px)', // 33.33% pour 3 cartes par ligne et 14px pour l'espacement entre les cartes
        margin: '7px',
      }
      : {}),
  },
  categoryCard: {
    paddingTop: 10,
    paddingBottom: 0,
    alignItems: 'center',
    flexDirection: 'row', // Pour afficher les éléments côte à côte
    justifyContent: 'space-between', // Pour les espacer

  },
  categoryImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  categoryInfo: {
    paddingLeft: 10,
    flex: 1, // Pour occuper tout l'espace disponible à gauche de l'image
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  categoryDescr: {
    paddingTop: 10,
    paddingBottom: 5,
    fontSize: 15,
    color: '#777',
  },
  categoriePrice: {
    paddingTop: 5,
    paddingBottom: 10,
    left: 0,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#777',
  },
  addButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFC700',
    width: 85,
    height: 40,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
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
  quantityText: {
    padding: 8
  },
  cartButton: {
    position: 'absolute',
    bottom: 20, // Ajustez la position verticale selon vos préférences
    left: 20,   // Ajustez la position horizontale selon vos préférences
    backgroundColor: '#FF9900',
    width: 60,
    height: 60,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2, // Assurez-vous que le bouton est au-dessus du contenu de la ScrollView
  },
  cartCounter: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },

  cartCounterText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  categoryButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  categoryButton: {
    height: 100,
    width: 130,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    alignItems: 'center',
    ...(Platform.OS === 'web'
      ? {
        width: 220,
      }
      : {}),
  },
  selectedCategoryButton: {
    backgroundColor: "#FFC700",
  },
  categoryButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,

  },
  searchInput: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  logoCategory: {
    height: 50,
    width: 50,
  },
  CategoryText: {
    fontWeight: 'semibold',
    fontSize: 30,
    marginVertical: 20,
    marginLeft: 20,
  }

});
