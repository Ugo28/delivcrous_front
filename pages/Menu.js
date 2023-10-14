import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ConfirmationDialog from '../components/ConfirmationDisconnected';
import { Feather } from '@expo/vector-icons';
import logo from '../assets/logo.png';


const Menu = ({ isconnected, setIsConnected }) => {
  const navigation = useNavigation();
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  const goToProfile = () => {
    // Naviguer vers la page de profil
    navigation.navigate('Profile');
  };

  const goToOrders = () => {
    // Naviguer vers la page des commandes
    navigation.navigate('Orders');
  };

  const goToCart = () => {
    // Naviguer vers la page du panier
  };

  const logout = () => {
    // Afficher la boîte de dialogue de confirmation
    setShowConfirmationDialog(true);
  };

  const handleConfirmLogout = () => {
    setIsConnected(false);
    navigation.navigate('Carte');
  };

  const handleCancelLogout = () => {
    // Annuler la déconnexion en masquant la boîte de dialogue
    setShowConfirmationDialog(false);
  };

  return (
    <View style={styles.container}>

      <View style={styles.positionlogo}>
        <Image source={logo} style={styles.taillelogo}/>
      </View>
      <TouchableOpacity style={styles.menuItem} onPress={goToProfile}>
        <Text>Mon Profil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={goToOrders}>
        <Text>Mes Commandes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={goToCart}>
        <Text>Mon Panier</Text>
      </TouchableOpacity>

      <View style={styles.logoutButtonContainer}>
      <Feather name='log-out' size={20}/>
        <TouchableOpacity onPress={logout}>
          <Text style={styles.logoutButtonText}>Se Déconnecter</Text>
        </TouchableOpacity>
      </View>

      {/* Afficher la boîte de dialogue de confirmation si showConfirmationDialog est vrai */}
      <ConfirmationDialog
        visible={showConfirmationDialog}
        onCancel={handleCancelLogout}
        onConfirm={handleConfirmLogout}
      />
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
  positionlogo:{
    alignItems: 'center',
  },
  taillelogo:{
    width:50,
    height:50,
  },
  menuItem: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  logoutButtonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 40,
    left: 20,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    margin: 20,
    paddingVertical: 10,
  },
  logoutButtonText: {
    fontSize: 16,
    flex:1,
    paddingLeft:10,
    fontWeight:'bold'
  },
});

export default Menu;