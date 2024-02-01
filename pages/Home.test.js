import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import Home from './Home';
import { mockPlatsData } from './testData';

jest.mock('axios');

describe('Home Component', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: mockPlatsData,
    });
  });

  it('renders correctly', () => {
    const { getByText } = render(
      <NavigationContainer>
        <Home />
      </NavigationContainer>
    );
  });

  it('displays and interacts with the search bar', () => {
    const { getByPlaceholderText, getByDisplayValue } = render(
      <NavigationContainer>
        <Home />
      </NavigationContainer>
    );

    // Vérifier la présence de la barre de recherche
    const searchBar = getByPlaceholderText('Rechercher...');
    expect(searchBar).toBeTruthy();

    // Simuler une entrée utilisateur dans la barre de recherche
    fireEvent.changeText(searchBar, 'Pizza');
    expect(getByDisplayValue('Pizza')).toBeTruthy();
  });
});
