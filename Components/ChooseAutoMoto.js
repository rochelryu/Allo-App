import React from 'react'
import {View, TouchableOpacity, ImageBackground, StyleSheet, Image, Text, StatusBar} from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


const MyCustomLeftComponent = (props) =>{
    return (
        <TouchableOpacity onPress={()=>props.navigation.goBack()} style={{position:"absolute", top:0,left:0, width:70, height:50, backgroundColor:"#000", borderBottomEndRadius:30, justifyContent:"center", alignItems:"center"}}>
            <Icon name="arrow-left-bold" color="#fff"
                  size={25} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create(
    {
        container:{
            flex:1,
        },
        containers:{
            flex:1,
            paddingTop:85,
        },
        containerss:{
            flex:2,
        },
        header:{
            flex:1,
            alignItems: 'center',
            justifyContent: 'flex-end',
        },
        block:{
            flex:4,
            alignItems: 'center',
            justifyContent: 'center',
        },
        blockIntent:{
            marginBottom: 25,
        },
        icon:{
            height:90,
            width:150,
        }

    }
)
export default class ChooseAutoMoto extends React.Component{
    constructor(props){
        super(props);
        this.state={
            showRealApp:false,
        }
    }
        async componentDidMount() {
        StatusBar.setHidden(true);
    }
    _onDone(id){
        if(id === 1){
            this.props.navigation.navigate('intPharmaSeco', {inter:2});
        }
        else{
            this.props.navigation.navigate('intPharmaSeco', {inter:5});
        }
    }


    render(){
        return(
            <ImageBackground source={require('../assets/images/auto_moto.png')}  style={styles.containers}>
                                        <MyCustomLeftComponent navigation={this.props.navigation}/>
               <ImageBackground source={require('../assets/images/backa.png')}  style={styles.containerss}>
               <View style={styles.header}>
               <Text style={{textAlign:"center"}}>FORMULAIRE ALLO SANTE EXPRESS ASSURANCE AUTO MOTO</Text>
               </View>
               <View style={styles.block}>
               <TouchableOpacity style={styles.blockIntent} onPress={()=>this._onDone(1)}>
               <Image source={require('../assets/images/auto.png')} style={styles.icon}/>
               </TouchableOpacity>

               <TouchableOpacity style={styles.blockIntent} onPress={()=>this._onDone(2)}>
               <Image source={require('../assets/images/moto.png')} style={styles.icon}/>
               </TouchableOpacity>
               </View>
               </ImageBackground>
            </ImageBackground>
            
        )
    }
}