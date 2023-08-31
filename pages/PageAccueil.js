import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import logo from '../assets/logo.jpg';

const PageAccueil = () => {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.appName}>Delivecrous</Text>
      <TextInput
        placeholder="Adresse mail"
        style={styles.input}
      />
      <TextInput
        placeholder="Mot de passe"
        secureTextEntry={true}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
      <Text style={styles.createAccountText}>
        Vous n'avez pas de compte ?
      </Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Créer un compte</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007bff', // Choisis une couleur qui convient
    borderRadius: 5,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  createAccountText: {
    marginTop: 20,
  },
});

export default PageAccueil;
