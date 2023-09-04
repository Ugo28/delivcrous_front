import bolognaise from '../images/bolognaise.png';
import tacos from '../images/tacos.png';
import pizza from '../images/pizza.jpeg';
import sushi from'../images/sushi.png';
import burger from '../images/burger.png';

const categoriesdata = [
    {
        id:1,
        image:bolognaise,
        title: "Pâtes bolognaise",
        description:"Délicieuse pâtes avec sa viande tendre et sa sauce onctueuse.",
        prix: "14",
        category:'pâtes'
    },
    {
        id:2,
        image:tacos,
        title: "Tacos",
        description:"Giga tacos 3 viandes.",
        prix: "9",
        category:'Tacos'

    },
    {
        id:3,
        image: pizza,
        title: "Margherita",
        description:"Incroyable pizza avec sa mozzarella moeulleuse et sa sauce tomate onctueuse.",
        prix: "12",
        category:'pizza'

    },
    {
        id:4,
        image: sushi,
        title: "Sushi",
        description:"Riz savoureux avec saumon frais.",
        prix: "8",
        category:'asiatique'

    },
    {
        id:5,
        image: burger,
        title: "Burger",
        description:"Excellent pain de boulanger avec son steack haché angus.",
        prix: "12",
        category:'burger'

    },
]

export default categoriesdata;