import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const PageConfirmation = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Feather name="thumbs-up" size={100} />
      <Text style={styles.text}>Merci !</Text>
      <Text style={styles.text}>
        Votre commande a bien été enregistrée.
        <Feather name='smile' size={20} />
      </Text>
      <Text style={styles.text}>
        Nos équipes font leur maximum pour que vous soyez livré dans les plus brefs délais.
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Carte')}>
        <Text style={styles.buttonText}>Terminer</Text>
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
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#FFC700',
    borderRadius: 20,
    marginVertical: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 25,
  },
});

export default PageConfirmation;
