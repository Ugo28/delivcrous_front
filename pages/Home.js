import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity,FlatList } from 'react-native';
import categoriesdata from '../assets/data/categoriesdata';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { TextInput } from 'react-native';



export default function Home() {

  const [searchText, setSearchText] = useState('');

  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = ["Pâtes", 'Tacos', "Pizza", "Asiatique", "Burger"];

  const renderCategoriesItem = ({ item }) => {
    return (
      <View style={styles.categoryCard}>
        <Image source={item.image} style={styles.categoryImage} />
        <TouchableOpacity style={styles.categoryInfo} onPress={() => handleCategoryPress(item)}>
          <Text style={styles.categoryTitle}>{item.title}</Text>
          <Text style={styles.categoryDescr}>{item.description}</Text>
          <Text style={styles.categoriePrice}>{item.prix}€</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
          }}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const navigation = useNavigation();

  const handleCategoryPress = (item) => {
    navigation.navigate('DataDetails', { item });
  };

  const handleCategoryToggle = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null); // Si la catégorie est déjà sélectionnée, désélectionnez-la
    } else {
      setSelectedCategory(category); // Sinon, sélectionnez-la
    }
  };

  const filteredCategoriesData = selectedCategory
    ? categoriesdata.filter((item) => item.category === selectedCategory)
    : categoriesdata;


  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Feather name="search" size={24} color="black" style={styles.icon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher..."
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterScrollView}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category
                ? styles.selectedCategoryButton
                : styles.unselectedCategoryButton,
            ]}
            onPress={() => handleCategoryToggle(category)}
          >
            <Text
              style ={styles.categoryButtonText}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>


      <ScrollView>
        {/* Popular */}
        <View style={styles.popularWrapper}>
          <Text style={styles.categoriestext}>Carte</Text>
          {filteredCategoriesData.map(item => (
            <View key={item.id} style={styles.popularCardWrapper}>
              {renderCategoriesItem({ item })}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
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
  },
  popularCardWrapper: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    position: 'relative', // Pour permettre un positionnement absolu des éléments enfants
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
  addButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
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
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  selectedCategoryButton: {
    backgroundColor: "#FFC700",
  },
  categoryButtonText: {
    fontSize: 16,
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

});
