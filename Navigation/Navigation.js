import React from 'react';
import { SafeAreaView, View, Image, ScrollView,StyleSheet } from "react-native";
import {createStackNavigator, createAppContainer, createBottomTabNavigator, createDrawerNavigator, DrawerItems, NavigationActions} from 'react-navigation';

//import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import SplashScreen from "../Component/SplashScreen";
import SigninScreen from "../Component/SigninScreen";
import Home from "../Component/Home";
import LogoutScreen from "../Component/LogoutScreen";
import ProfilScreen from "../Component/ProfilScreen";
import LoginScreen from "../Component/LoginScreen";
import SettingScreen from "../Component/SettingScreen";
import AsScreen from "../Component/AsScreen";
import RvScreen from "../Component/RvScreen";
import ForDebut from "../Component/ForDebut";

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1
    },
    image: {
        height: 70,
        width: 70,
    }
})

const CustomDrawler = (props)=>(
    <SafeAreaView style={{flex:1}}>
        <View style={{ height: 150, backgroundColor: '#4dbcc7', alignItems: 'center', justifyContent: 'center'}}>
            <Image
                style={styles.image}
                source={require('../assets/images/heartbeat.png')}
            />
        </View>
        <ScrollView style={{backgroundColor: '#fff'}}>
            <DrawerItems {...props} />
        </ScrollView>
    </SafeAreaView>
)
const AppDrawlerNavigation = createDrawerNavigator({
    Accueil:{
        screen: Home,
        navigationOptions: ()=>({
            header: null,
        })
    },
    Historique:{
        screen: ProfilScreen,
        navigationOptions: ()=>({
            header: null,
        })
    },
    Paramettre:{
      screen:SettingScreen,
      navigationOptions:()=>({
          header:null,
      })
    },
    Deconnection: {
        screen: LogoutScreen,
        navigationOptions: ()=>({
            header: null,
        })
    }
}, {
    headerMode: 'screen',
    contentComponent: CustomDrawler,
    contentOptions : {
        activeTintColor: '#f7931e'
    }
});
/*
const TabR = createMaterialBottomTabNavigator({
    Actu:{screen:ActuScreen,
    navigationOptions:{
        tabBarLabel:'Actualité',
        tabBarIcon:({tintColor})=>(
             <Icon name="newspaper" color={tintColor} size={27}/>

        )}},
    Deals:{screen:DealsScreen,
        navigationOptions:{
            tabBarLabel:'Deals',
            tabBarIcon:({tintColor})=>(
                <Icon name="store" color={tintColor} size={27}/>
            )}},
    Evenement:{screen:EventScreen,
        navigationOptions:{
            tabBarLabel:'Actualité',
            tabBarIcon:({tintColor})=>(
                <Icon name="calendar" color={tintColor} size={27}/>

            )}},
},{
    initialRouteName:'Deals',
    barStyle: { backgroundColor: '#4E272E' },
    order:['Actu', 'Deals', 'Evenement'],
    navigationOptions:{
        tabBarVisible:true,
    },
    activeTintColor:"#fff",
    inactiveTintColor:'grey',

})
*/

const Stacked = createStackNavigator({
    /*Login: {
        screen: LoginScreen,
        navigationOptions: ()=>({
            header: null,
        })
    },*/
        GuardSplash: {
            screen: SplashScreen,
            navigationOptions: ()=>({
                header: null,
            })
        },
        SignUp: {
            screen: SigninScreen,
            navigationOptions: ()=>({
                header: null,
            })
        },
        Login: {
            screen: LoginScreen,
            navigationOptions: ()=>({
                header: null,
            })
        },
        Ele: {
            screen: AppDrawlerNavigation,
            navigationOptions: ()=>({
                header: null,
            })
        },
    Debut:{
        screen: ForDebut,
        navigationOptions: ()=>({
            header: null,
        })
    },
    Assistance:{
        screen: AsScreen,
        navigationOptions: ()=>({
            header: null,
        })
    },
        RendezVous:{
            screen: RvScreen,
            navigationOptions: ()=>({
                header: null,
            })
        },
},
{
    initialRouteName: 'Debut',
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
  })

export default createAppContainer(Stacked)
