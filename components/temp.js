import React from 'react';
import { View, StyleSheet} from 'react-native';
import { Card, Title, Paragraph, Image } from 'react-native-paper';
import tacos from './assets/images/tacos.png';
import bolognaise from './assets/images/bolognaise.jpg';

const dishes = [
  {
    id: 1,
    title: 'Pizza Margherita',
    description: 'Classic pizza with tomato sauce, mozzarella, and basil.',
    image: bolognaise,
  },
  {
    id: 2,
    title: 'Chicken Tacos',
    description: 'Tasty tacos with grilled chicken and fresh toppings.',
    image: tacos,
  },
];

const DishCard = ({ title, description, image }) => (
  <Card style={styles.card}>
    <Card.Cover source={image} style={styles.cardImage} />
    <Card.Content>
      <Title>{title}</Title>
      <Paragraph>{description}</Paragraph>
    </Card.Content>
  </Card>
);

const App = () => {
  return (
    <View style={styles.container}>
      {dishes.map((dish) => (
        <DishCard key={dish.id} title={dish.title} description={dish.description} image={dish.image}/>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    marginBottom: 16,
  },
  cardImage: {
    alignItems: 'center',
  },
});

export default App;
