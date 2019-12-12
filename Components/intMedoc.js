import React from 'react';
import {View, Text, TouchableOpacity,FlatList, AsyncStorage, ScrollView, ActivityIndicator, TextInput, StyleSheet} from 'react-native';
import {Header} from "react-native-elements";
import {  ListItem, Left, Body, Thumbnail, Right } from 'native-base';

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
    SCLAlert,
    SCLAlertButton
  } from 'react-native-scl-alert';
  import * as Font from 'expo-font';

import {getAllMedoc} from '../ServiceWorker/helper';

let block = [];
const CardPharma = (props) =>{
    return (
        <ListItem avatar>
              <Left>
                <Thumbnail source={require('../assets/images/livr.png')} />
              </Left>
              <Body>
                <Text style={styles.title}>{props.ele.name}</Text>
                <Text style={styles.famille}>{props.ele.familie}</Text>
                
                <Text style={styles.ordonnance}>{(props.ele.ordonnance)? 'Avec ordonnance': 'Sans ordonnance'}</Text>
              </Body>
              <Right>
              <Text style={styles.prix}>{props.ele.price}</Text>
              </Right>
              
       </ListItem>
    );
};
const MyCustomLeftComponent = (props) =>{
    return (
        <TouchableOpacity onPress={()=>props.navigation.goBack()}>
            <Icon name="arrow-left-bold" color="#fff"
                  size={25} />
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    padding:{
        padding: 10,
    },
    block:{
        borderBottomWidth:1,
        borderBottomColor:"#777",
        height:50,
        margin:10,
        alignItems: "center",
        justifyContent:"center"
    },
    title:{
        fontFamily:"LexendExa",
        fontSize: 14,
        fontWeight:"700",
    },
    famille:{
        fontFamily:"LexendExa",
        fontSize: 13,
        color:'#555555',
    },
    prix:{
        fontFamily:"LexendExa",
        fontSize: 13,
        color:'#4dbcc7',
    },
    ordonnance:{
        fontFamily:"LexendExa",
        color:'#aa3454',
        fontSize: 14,
        textAlign:'right'
    }
});
export default class intMedoc extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            info:[],
            loading:false,
            show:false,
        }
    }

    async componentDidMount(){
        block = await getAllMedoc();
        const message = await AsyncStorage.getItem('premierMedoc');
        await Font.loadAsync({
            LexendExa: require('../assets/fonts/LexendExa-Regular.ttf'),
            'Blinker-Black': require('../assets/fonts/Blinker-Black.ttf'),
            'PTSans-Bold': require('../assets/fonts/PTSans-Bold.ttf')
        });
        this.setState({
            info:block,
            loading:true,
        });
        if(!message){
            this.setState({
                show:true
            });
            AsyncStorage.setItem('premierMedoc', 'fait');
        }

    }
    filtrage(value,item){
        return value.name.toLowerCase().indexOf(item) !== -1 || value.familie.toLowerCase().indexOf(item) !== -1 || value.price.indexOf(item) !== -1
    }
    specialite(item){
        if(item.length > 0){
            const fade =  block.filter((value)=>this.filtrage(value,item.toLowerCase()));
            this.setState({
                info:fade
            })
        }
        else{
            this.setState({
                info:block
            })

        }
        
    }
    handleClose = () => {
        this.setState({ show: false })
      }


    render(){
        if(this.state.loading){
            return(
                <View style={{flex:1}}>
                    <Header
                            leftComponent={<MyCustomLeftComponent navigation={this.props.navigation}/>}
                            centerComponent={{ text: "Prix de Médicament", style: { color: '#fff' } }}
                            containerStyle={{
                                backgroundColor: '#4dbcc7',
                                justifyContent: 'space-around',
                            }}
                        />
                    <SCLAlert
                        theme="info"
                        show={this.state.show}
                        title="NOTE D'INFORMATION"
                        onRequestClose={()=>{console.log("ok")}}
                        subtitle="Les différents prix peuvent varier de 10% selon chaque pharmacie"
                        >
                        <SCLAlertButton theme="info" onPress={this.handleClose}>OK</SCLAlertButton>
                    </SCLAlert>
                    <View style={{height:40, marginLeft:30, paddingLeft:5, marginRight:30, marginBottom:10, marginTop:5, backgroundColor:"#fff", elevation:3, borderRadius:20, flexDirection: "row",alignItems:"center"}}>
                        <TextInput onChangeText={(value)=>this.specialite(value)} placeholder="Recherche par nom, prix ou famille" style={{height:35,color:"#999", paddingLeft:10, borderRadius:20}}/>
                    </View>
                <ScrollView>
                <FlatList
                            data={this.state.info}
                            keyExtractor={(item) => item._id}
                            renderItem={({item}) => <CardPharma ele={item} action={this.enterEvent} />}
                        />
                </ScrollView>
                </View>
                
            )
        }
        else{
            return (
            <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
                <ActivityIndicator color="#4dbcc7" />
            </View>
            )
        }
    }
}