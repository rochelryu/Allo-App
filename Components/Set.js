import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image, ActivityIndicator, AsyncStorage} from 'react-native';
import {history} from '../ServiceWorker/helper';



export default class Set extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            load:0,
            info:{},
            ville:"",
            communes:"",
            profil:require('../assets/icon.png'),
        }

    }
    async componentDidMount() {
        const ident = await AsyncStorage.getItem("identAllo");
        const isMe = await history(ident);
        if(isMe.etat){
            const adds = isMe.user.address.split(':');
            this.setState({
                load:1,
                profil:(isMe.user.profil != "") ? {uri:isMe.user.profil}:require('../assets/images/boss.png'),
                info:isMe.user,
                ville:adds[0],
                communes:adds[1]
            });
        }
        
    }

    render(){
        if(this.state.load != 0){
            return(
                <View style={styles.container}>
                    <View style={styles.hearder}>
                        <View style={styles.rondedImage}>
                        <Image source={this.state.profil} style={{width:80,height:80,borderRadius:100}} />
                        </View>
                        <Text>{this.state.info.name}</Text>
                    </View>
    
                    <View style={styles.body}>
                        <Text style={styles.textTitle}>Paramètre</Text>
                    </View>
    
                    <View style={styles.footer}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('QRScreen')} style={styles.item}>
                        <Text style={styles.text}>Q&R</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('ContactScreen')} style={styles.item}>
                        <Text style={styles.text}>Contactez-nous</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Condition')}  style={styles.item}>
                        <Text style={styles.text}>Conditions Générale d'utilisation</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Politique')} style={styles.item}>
                        <Text style={styles.text}>Politique de confidentialité</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('About')} style={styles.item}>
                        <Text style={styles.text}>A propos de nous</Text>
                        </TouchableOpacity>
                    </View>
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
    container:{
        flex:1,
        paddingTop:40,
        paddingLeft:20,
        paddingRight:20,
    },
    hearder:{
        flex:3,
        justifyContent:"space-around",
        borderBottomWidth:1,
        borderBottomColor:"#aaa",
    },
    body:{
        marginTop:30,
        flex:1,
        backgroundColor:"#caeff7cc",
        justifyContent:"center",
        paddingLeft:15,
    },
    footer:{
        flex:7,
        paddingTop:30,
    },
    item:{
        marginLeft:10,
        marginRight: 10,
        borderBottomColor:"#4dbcc7",
        borderBottomWidth:1,
        height:50,
        justifyContent:"center",
        paddingLeft:10,
    },
    text:{
        fontWeight:"500",
        fontSize:17,
        color:"#4dbcc7",
    },
    textTitle:{
        fontSize:20,
        fontWeight: "bold",
        letterSpacing:1.5,
    },
    rondedImage:{
        height:80,
        width:80,
        borderRadius:50,
        elevation:2,
        alignContent:"center",
        justifyContent:"center",
    }
})