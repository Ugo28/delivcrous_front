import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import categoriesdata from '../assets/data/catégoriesdata';
import { useNavigation } from '@react-navigation/native';

export default function Home() {

  const renderCategoriesItem = ({ item }) => {
    return (
      <View style={styles.categoryCard }>
        <Image source={item.image} style={styles.categoryImage} />
        <TouchableOpacity style={styles.categoryInfo} onPress={() => handleCategoryPress(item)}>
          <Text style={styles.categoryTitle}>{item.title}</Text>
          <Text style={styles.categoryDescr}>{item.description}</Text>
          <Text style={styles.categoriePrice}>{item.prix}€</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            // Ajoutez ici le code que vous souhaitez exécuter lorsque le bouton "+" est pressé.
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

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Popular */}
        <View style={styles.popularWrapper}>
          <Text style={styles.categoriestext}>Carte</Text>
          {categoriesdata.map(item => (
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
    paddingLeft:10,
    flex: 1, // Pour occuper tout l'espace disponible à gauche de l'image
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  categoryDescr: {
    paddingTop: 10,
    paddingBottom:5,

    fontSize: 15,
    color: '#777',
  },
  categoriePrice: {
    paddingTop: 5,
    paddingBottom:10,
    left:0,
    fontSize: 20,
    fontWeight:'bold',
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
    borderBottomRightRadius:10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});
