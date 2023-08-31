import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PageAccueil from './pages/PageAccueil';
import PageCreationCompte from './pages/PageCreationCompte';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PageAccueil">
        <Stack.Screen name="PageAccueil" options={{headerShown: false, headerTitle:"Se connecter"}} component={PageAccueil} />
        <Stack.Screen name="PageCreationCompte" options={{ headerTitle: "S'inscrire" }} component={PageCreationCompte} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
