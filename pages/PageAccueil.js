import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import axios from 'axios';
import logo from '../assets/logo.png';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importez AsyncStorage


const PageAccueil = ({ isconnected, setIsConnected }) => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const handleLogin = async () => {
    try {
      // Effectuez la demande de connexion
      const response = await axios.post('http://192.168.1.187:8080/api/utilisateurs/login', { username, password });
      const userData=response.data.body
      console.log(userData);
      setUserEmail(userData.email); // où "email" est l'e-mail obtenu après la connexion
      setusername(userData.username);
      console.log(userEmail)
      console.log(username)
    
      // Récupération du cookie
      const cookie = response.headers['Set-Cookie'];

      // Utilisation d'une expression régulière pour extraire le jeton JWT du cookie
      const jwtTokenMatch = /delivcrous=([^;]+)/.exec(cookie);
      if (jwtTokenMatch && jwtTokenMatch.length > 1) {
        const jwtToken = jwtTokenMatch[1];

        // Stockez le jeton dans AsyncStorage pour une utilisation ultérieure
        await AsyncStorage.setItem('jwtToken', jwtToken);

        // Configurez Axios pour inclure automatiquement le cookie dans les futures demandes
        axios.defaults.withCredentials = true;
      }

      // Marquez l'utilisateur comme connecté
      setIsConnected(true);

      // Naviguez vers la page 'Carte' ou toute autre page souhaitée
      navigation.navigate('Carte');
    } catch (error) {
      console.error('Erreur d\'authentification :', error);
    }
  };


  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const goToCreationCompte = () => {
    navigation.navigate('PageCreationCompte');
  };

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

      <View style={styles.inputContainer}>
        <Feather name="mail" size={24} color="black" style={styles.icon} />
        <TextInput
          placeholder="Adresse mail"
          style={styles.input}
          value={username}
          onChangeText={text => setusername(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Feather name="lock" size={24} color="black" style={styles.icon} />
        <TextInput
          placeholder="Mot de passe"
          secureTextEntry={!showPassword}
          style={styles.input}
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity onPress={toggleShowPassword} style={styles.showPasswordButton}>
          <Feather name={showPassword ? 'eye-off' : 'eye'} size={24} color="black" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
      <View style={styles.createAccountContainer}>
        <Text style={styles.createAccountText}>
          Vous n'avez pas de compte ?<Text style={styles.linkText} onPress={goToCreationCompte}> Créer un compte</Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titreDelivecrous: {
    fontWeight: 'bold',
    fontSize: 40,
  },
  logo: {
    width: 150,
    height: 150,
  },
  appName: {
    fontWeight: '600',
    fontSize: 24,
    marginTop: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    width: '80%',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 45,
    paddingHorizontal: 10,
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
    fontWeight: '400',
    marginTop: 20,
  },
  createAccountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  linkText: {
    fontWeight: '700',
    color: '#007bff',
  },
});

export default PageAccueil;
