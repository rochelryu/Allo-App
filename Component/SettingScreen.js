import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, StatusBar} from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import {Header} from "react-native-elements";


const MyCustomLeftComponent = (props) =>{
    return (
        <TouchableOpacity onPress={()=>props.drawler.openDrawer()}>
            <Icon name="menu" color="#fff"
                  size={20} />
        </TouchableOpacity>
    );
};
export default class LogoutScreen extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount() {
        StatusBar.setHidden(false);
    }
    static navigationOptions = {
        drawerIcon: ({tintColor}) => (
            <Icon
                name="settings-outline"
                color={tintColor}
                size={20}
            />
        )
    }

    render() {
        return(
            <View style={{flex:1, backgroundColor:'#e0e0e0'}}>
                <Header
                    leftComponent={<MyCustomLeftComponent drawler={this.props.navigation} />}
                    containerStyle={{
                        backgroundColor: '#4dbcc7',
                        justifyContent: 'space-around',
                    }}
                />
                <View style={{paddingTop:40}}>
                    <Text style={styles.title}>GENERAL</Text>
                    <View style={styles.blocus}>
                        <TouchableOpacity onPress={()=>console.log("email")} style={styles.Item}>
                            <Icon name="account-settings" color='#4dbcc7' size={30} />
                            <Text style={styles.textItem}>Email | Numéro de téléphone </Text>
                                <Icon name="arrow-right" color="#888" style={styles.iconOptions} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>console.log("numero")} style={styles.Item}>
                            <Icon name="textbox-password" color='#4dbcc7' size={30} />
                            <Text style={styles.textItem}>Mot de Passe </Text>
                            <Icon name="arrow-right" color="#888" style={styles.iconOptions} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    blocus:{
        backgroundColor: "#fff",
        elevation:2,
        padding:7,
    },
    Item:{
        height:30,
        flexDirection:"row",
        alignItems:"center",
        marginBottom:5
        /*borderBottomWidth:1,
        borderBottomColor:"#999"*/
    },
    textItem:{
        marginLeft:15,
    },
    iconOptions:{
        position:"absolute",
        right:10,
        top:"40%",
    },
    title:{
        color:"#888",
        fontSize:16,
        fontWeight:"800",
        marginLeft: 18,
        marginBottom: 5,
    }
})