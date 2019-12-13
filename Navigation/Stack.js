import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { StyleSheet, View } from "react-native";
import Login from '../Components/Login';
import Set from '../Components/Set';
import Signup from '../Components/Signup';
import HomeScreen from '../Components/HomeScreen';
import Wait from '../Components/Wait';
import ContactScreen from '../Components/ContactScreen';
import Condition from '../Components/Condition';
import About from '../Components/About';
import Politique from '../Components/Politique';
import QRScreen from '../Components/QRScreen';
import ForDebut from '../Components/ForDebut';
import AsScreen from '../Components/AsScreen';
import RvScreen from '../Components/RvScreen';
import TypeAss from '../Components/TypeAss';
import ChooseType from '../Components/ChooseType';
import intAssurance from '../Components/intAssurance';
import intPharmaSeco from '../Components/intPharmaSeco';
import intPharma from '../Components/intPharma';
import Prof from '../Components/Prof';
import DeGardeCommune from '../Components/DeGardeCommune';
import IntDeGarde from '../Components/IntDeGarde';
import Braza from '../Components/Braza';
import Paris from '../Components/Paris';
import Faso from '../Components/Faso';
import Yaounde from '../Components/Yaounde';
import SplashScreen from '../Components/SplashScreen';
import ProfilScreen from '../Components/ProfilScreen';
import HistoriqueScreen from '../Components/HistoriqueScreen';
import Setting from '../Components/Setting';
import intMedoc from '../Components/intMedoc';
import Welcome from '../Components/Welcome';
import ChooseAutoMoto from '../Components/ChooseAutoMoto';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const styles = StyleSheet.create({
  backgroundImage: {
      flex: 1
  },
  tab:{
    backgroundColor:"#fff"

  },
  image: {
      height: 70,
      width: 70,
  }
})

const TabR = createMaterialBottomTabNavigator({
  Accueil:{screen:HomeScreen,
      navigationOptions:{
          tabBarLabel:'Accueil',
          tabBarIcon:({tintColor})=>(
              <View>
                  <Icon name="home" color={tintColor} size={24}/>
              </View>
          ),
      }},
  HistoriqueD:{screen:HistoriqueScreen,
      navigationOptions:{
          tabBarLabel:'Historique',
          tabBarIcon:({tintColor})=>(
              <View>
                  <Icon name="history" color={tintColor} size={24}/>
              </View>
          ),
      }},
  ProfileD:{screen:Set,
      navigationOptions:{
          tabBarLabel:'Paramètre',
          tabBarIcon:({tintColor})=>(
              <View>
                  <Icon name="cogs" color={tintColor} size={24}/>
              </View>

          ),
      }}
},{
  initialRouteName:'Accueil',
  barStyle: { backgroundColor: '#fff' },
  order:['Accueil', 'HistoriqueD', 'ProfileD'],
  navigationOptions:{
      tabBarVisible:true,
  },
  style: styles.tab,
  activeColor:"#46808b",
  inactiveColor:'grey',
  shifting:true
})

const Stacked = createStackNavigator({
        LoginScreen: {
            screen: Login,
            navigationOptions: ()=>({
                header: null,
            })
        },
        ForDebut: {
          screen: ForDebut,
          navigationOptions: ()=>({
              header: null,
          })
      },
        Signup: {
            screen: Signup,
            navigationOptions: ()=>({
                header: null,
            })
        },

        ChoixAssurance: {
          screen: ChooseType,
          navigationOptions: ()=>({
              header: null,
          })
      },
        Home: {
          screen: TabR,
      },
      assistance: {
        screen: AsScreen,
        navigationOptions: ()=>({
            header: null,
        })
    },
    rendezVous: {
      screen: RvScreen,
      navigationOptions: ()=>({
          header: null,
      })
      },
      intPharma: {
        screen: intPharma,
        navigationOptions: ()=>({
            header: null,
        })
        },
        BrazaVille: {
          screen: Braza,
          navigationOptions: ()=>({
              header: null,
          })
          },
          Prof: {
            screen: Prof,
            navigationOptions: ()=>({
                header: null,
            })
            },
      MonAssurance: {
        screen: TypeAss,
        navigationOptions: ()=>({
            header: null,
          })
        },
        prixMedoc: {
          screen: intMedoc,
          navigationOptions: ()=>({
              header: null,
            })
          },
        pharma: {
          screen: DeGardeCommune,
          navigationOptions: ()=>({
              header: null,
            })
          },
          IntDeGarde: {
            screen: IntDeGarde,
            navigationOptions: ()=>({
                header: null,
              })
            },
        intAssurance: {
          screen: intAssurance,
          navigationOptions: ()=>({
              header: null,
            })
          },
          intPharmaSeco: {
          screen: intPharmaSeco,
          navigationOptions: ()=>({
              header: null,
            })
          },
          search: {
            screen: ProfilScreen,
            navigationOptions: ()=>({
                header: null,
              })
            },
            
            Profil: {
              screen: Setting,
              navigationOptions: ()=>({
                  header: null,
                })
              },
              Welcome:{
                screen: Welcome,
              navigationOptions: ()=>({
                  header: null,
                })
              },
              ChooseAutoMoto:{
                screen: ChooseAutoMoto,
              navigationOptions: ()=>({
                  header: null,
                })
              },
              SplashScreen:{
                screen: SplashScreen,
              navigationOptions: ()=>({
                  header: null,
                })
              },
              ContactScreen:{
                screen:ContactScreen,
                navigationOptions:()=>({
                  header: null,
                })
              },
              QRScreen:{
                screen:QRScreen,
                navigationOptions:()=>({
                  header: null,
                })
              },
              Condition:{
                screen:Condition,
                navigationOptions:()=>({
                  header: null,
                })
              },
              Politique:{
                screen:Politique,
                navigationOptions:()=>({
                  header: null,
                })
              },
              Paris:{
                screen:Paris,
                navigationOptions:()=>({
                  header: null,
                })
              },
              Yaounde:{
                screen:Yaounde,
                navigationOptions:()=>({
                  header: null,
                })
              },
              Faso:{
                screen:Faso,
                navigationOptions:()=>({
                  header: null,
                })
              },
              About:{
                screen:About,
                navigationOptions:()=>({
                  header: null,
                })
              },
              Wait:{
                screen:Wait,
                navigationOptions:()=>({
                  header: null,
                })
              }
    },
    {

        initialRouteName: 'ForDebut',
        headerMode: 'none',
        /* The header config from HomeScreen is now here
        defaultNavigationOptions: {
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        },*/
    });

    
export default createAppContainer(Stacked)
