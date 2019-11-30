import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    ActivityIndicator,
    ScrollView
} from 'react-native';
import {  WebBrowser } from 'expo';

import * as Font from 'expo-font';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Header} from "react-native-elements";
const MyCustomLeftComponent = (props) =>{
    return (
        <TouchableOpacity onPress={()=>props.navigation.goBack()}>
            <Icon name="arrow-left-bold" color="#4dbcc7"
                  size={25} />
        </TouchableOpacity>
    );
};

export default class About extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            meta:[],
            isFont:false,
            backClickCount: 0,
            name:"",
            modalVisible: false,
        }
    }
    _handlePress = () => {
        //Linking.openURL('www.allosanteexpress.com');
        WebBrowser.openBrowserAsync('https://www.allosanteexpress.com');
      };
    async componentDidMount() {
        StatusBar.setHidden(false);
        await Font.loadAsync({
            LexendExa: require('../assets/fonts/LexendExa-Regular.ttf'),
            'Blinker-Black': require('../assets/fonts/Blinker-Black.ttf'),
            'PTSans-Bold': require('../assets/fonts/PTSans-Bold.ttf')
        });
        this.setState({
            isFont:true
        })
    }
    render() {
        if(this.state.isFont) {
            return (
                <View style={{flex: 1}}>
                    <Header
                        leftComponent={<MyCustomLeftComponent navigation={this.props.navigation}/>}
                        centerComponent={{ text: "A propos de nous", style: { color: '#4dbcc7' } }}
                        containerStyle={{
                            backgroundColor: '#fff',
                            justifyContent: 'space-around',
                        }}
                    />
                    <ScrollView style={styles.padding}>
                    <Text style={styles.title}>A PROPOS DE NOUS </Text>
                    <Text style={styles.titleT}>ALLO SANTE EXPRESS fournit un service en ligne de prise de rendez-vous chez des professionnels de santé ,d’un service d’assistance médicale à domicile, permet la souscription à des polices d’assurances, dispose d’un service de livraison de produits pharmaceutiques, de consulter les pharmacies de garde et de consulter le prix des médicaments.
Elle est la première plateforme de service E-santé en Afrique de l’ouest qui facilite l’accès des patients aux professionnels de santé en simplifiant les usages grâce à un système rapide ,fiable et sécurisé.
ALLO SANTE EXPRESS s’engage à améliorer le parcours des soins des utilisateurs et s’appuie pour ce faire sur des solutions digitales, elle entend ainsi renforcer son rôle de maillon-clé au cœur de la relation Médecin-pharmacie-patient.</Text>
                    </ScrollView>
                    
                   </View>
            )
        }
        else{
            return (<View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
                <ActivityIndicator color="#4dbcc7" />
            </View>)
        }
    }
    }


    const styles = StyleSheet.create({
        padding:{
            paddingLeft:5,
            paddingRight:5,
        },
        
        title:{
            fontFamily:"LexendExa",
            fontSize: 19,
            marginLeft:5,
            marginBottom:7,
            color:"#4dbcc7",
        },
        app:{
            fontFamily:"LexendExa",
            fontSize: 20,
            textAlign:"center",
            margin:3,
            fontWeight:"100"
        },
        titleT:{
            fontFamily:"LexendExa",
            fontSize: 15,
            marginLeft:7,
            marginBottom:9,

            color:"#555555",
        },
        titl:{
            fontFamily:"LexendExa",
            fontSize: 17,
            marginLeft:5,
            marginBottom:7,
        },
        tit:{
            fontFamily:"LexendExa",
            fontSize: 16,
            marginLeft:5,
            marginBottom:7,
            color:"#444444",
        },
        ti:{
            fontFamily:"LexendExa",
            fontSize: 14,
            marginLeft:10,
            marginBottom:2,
            color:"#777777",
        },
        
    })