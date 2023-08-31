import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Image,ScrollView} from 'react-native';
import { useFonts, Montserrat_400Regular, Montserrat_500Medium, Montserrat_700Bold, Montserrat_600SemiBold} from '@expo-google-fonts/montserrat';
import logo from '../assets/logo.jpg';
import categoriesdata from '../assets/data/catégoriesdata';

export default Home = () => {

  const renderCategoriesItem=({ item })=>{
    return(
      <View>
        <Image source={item.image}/>
        <Text>{item.title}</Text>
      </View>
    );
  };


  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  return (
    <View style = {styles.container}>
      <ScrollView>

      <View style={styles.titleWrapper}> 
        <Text style={styles.title}>Delivecrous</Text>
      </View>


      {/*popular*/}
      <View style={styles.popularWrapper}>
        <Text style={styles.categoriestext}>Carte</Text>
        {categoriesdata.map(item =>(
          <View style={[styles.popularCardWrapper,{marginTop: item.id ==1 ? 10 : 20,}]}>
            <View>
              <View>
                <View style={styles.populartitleswrapper}>
                  <Text style ={styles.populartitletitle}>{item.title}</Text>
                  <Text style ={styles.populartitleweight}>Poids : {item.weight}</Text>
                </View>
              </View>
            </View>
            <View style={styles.popularcardright}>
              <Image source={item.image} style={styles.popularcardimage}/>
            </View>
          </View>
        ))}
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  titleWrapper:{
    marginTop:30,
    paddingHorizontal:20,
  },
  title:{
    fontFamily:'Montserrat_700Bold',
    fontSize: 32,
  },
  categoriesview:{
    marginTop:20,
    paddingHorizontal:20
  },
  categoriestext:{
    fontFamily:'Montserrat_600SemiBold',
    fontSize:16
  },
  popularWrapper:{
    paddingTop:30,
    paddingHorizontal:20,

  },
  popularCardWrapper:{
    borderRadius:20,
    paddingTop:20,
    paddingLeft:20,
    flexDirection:'row',
    overflow:'hidden',
  },
  populartitleswrapper:{
    marginTop:20,
  },
  populartitletitle:{
    fontFamily:'Montserrat_600SemiBold',
    fontSize:16,
  },
  populartitleweight:{
    fontFamily:'Montserrat_500Medium',
    fontSize:12,
  },
  popularcardright:{
    marginLeft:40,
  },
  popularcardimage:{
    width:210,
    height:125,
    resizeMode:'contain',
  }

});
