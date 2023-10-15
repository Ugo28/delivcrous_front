import bolognaise from '../images/bolognaise.png';
import tacos from '../images/tacos.png';
import pizza from '../images/pizza.jpeg';
import sushi from'../images/sushi.png';
import burger from '../images/burger.png';

const categoriesdata = [
    {
        id: 1,
        image: bolognaise,
        title: "Pâtes bolognaise",
        description: "Délicieuse pâtes avec sa viande tendre.",
        prix: 14,
        category: 'Pâtes',
        allergenes: ['gluten', 'lactose', 'céleri', 'œufs']
    },
    {
        id: 2,
        image: tacos,
        title: "Tacos",
        description: "Giga tacos 3 viandes.",
        prix: 9,
        category: 'Tacos',
        allergenes: ['gluten', 'lactose', 'soja', 'moutarde']
    },
    {
        id: 3,
        image: pizza,
        title: "Margherita",
        description: "Incroyable pizza avec sa mozzarella moelleuse.",
        prix: 12,
        category: 'Pizza',
        allergenes: ['gluten', 'lactose', 'noix', 'soja']
    },
    {
        id: 4,
        image: sushi,
        title: "Sushi",
        description: "Riz savoureux avec saumon frais.",
        prix: 8,
        category: 'Asiatique',
        allergenes: ['poisson', 'crustacés', 'soja', 'sésame']
    },
    {
        id: 5,
        image: burger,
        title: "Burger",
        description: "Excellent pain avec son steak haché angus.",
        prix: 12,
        category: 'Burger',
        allergenes: ['gluten', 'lactose', 'moutarde', 'céleri']
    },
]


export default categoriesdata;