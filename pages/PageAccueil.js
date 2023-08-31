import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'; // Import de l'icône Feather
import logo from '../assets/logo.png';
import { useFonts, Montserrat_700Bold } from '@expo-google-fonts/montserrat';

const PageAccueil = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false); // État pour afficher ou masquer le mot de passe

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const goToCreationCompte = () => {
    navigation.navigate('PageCreationCompte');
  };

  let [fontsLoaded] = useFonts({
    Montserrat_700Bold,
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.center}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.titreDelivecrous}>Delivecrous</Text>
      <Text style={styles.appName}>Connexion</Text>
      </View>

      <View style={styles.mailContainer}>
        <Feather name="mail" size={24} color="black" style={styles.icon} />
        <TextInput
          placeholder="Adresse mail"
          style={styles.input}
        />
      </View>

      <View style={styles.passwordContainer}>
        <Feather name="lock" size={24} color="black" style={styles.icon} />
        <TextInput
          placeholder="Mot de passe"
          secureTextEntry={!showPassword}
          style={styles.passwordInput}
        />
        <TouchableOpacity onPress={toggleShowPassword} style={styles.showPasswordButton}>
          <Feather name={showPassword ? 'eye-off' : 'eye'} size={24} color="black" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
      <View style={styles.createAccountContainer}>
        <Text style={styles.createAccountText}>
          Vous n'avez pas de compte ?<Text style={styles.linkText} onPress={goToCreationCompte}> Créer un compte</Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  center:{
    alignItems:'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titreDelivecrous: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 40,
  },
  logo: {
    width: 150,
    height: 150,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
  },
  input: {
    width: '80%',
    height: 45,
    paddingHorizontal: 10,
  },
  mailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    width: '80%',
    paddingHorizontal: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    width: '80%',
    paddingHorizontal: 10,
  },
  passwordInput: {
    paddingLeft: 10,
    flex: 1,
  },
  showPasswordButton: {
    padding: 10,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 20,
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
  createAccountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  linkText: {
    fontWeight: 'bold',
    color: '#007bff',
  },

});

export default PageAccueil;
