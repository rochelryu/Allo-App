import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    ActivityIndicator,
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

export default class ContactScreen extends React.Component{
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
                        centerComponent={{ text: "Contactez nous", style: { color: '#4dbcc7' } }}
                        containerStyle={{
                            backgroundColor: '#fff',
                            justifyContent: 'space-around',
                        }}
                    />
                    <View style={styles.padding}>
                        <View style={styles.item}>
                        <Text style={styles.app}>Allo Sante Express </Text>
                        <View style={{width:137, borderTopWidth:2, borderTopColor:'#4dbcc7'}}>
                        </View>
                        </View>
                        <View style={styles.item}>
                        <Text style={styles.titleT}>Site Web : </Text>
                        <Text style={styles.title} onPress={this._handlePress}>www.allosanteexpress.com</Text>
                        </View>
                        <View style={styles.item}>
                        <Text style={styles.titleT}>Contact : </Text>
                        <Text style={styles.title}>Côte d’ivoire : +(225) 66 000 700</Text>
                        <Text style={styles.title}>France : +(33)687412377</Text>
                        </View>
                        <View style={styles.item}>
                        <Text style={styles.titleT}>Email : </Text>
                        <Text style={styles.title}>Ataliasarl.ase@gmail.com</Text>
                        </View>
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
        padding:{
            flex:1,
            justifyContent:"center",
            paddingLeft:40,
        },
        item:{
            height:60,
            justifyContent:"space-evenly",
            marginBottom:10,
        },
        title:{
            fontFamily:"LexendExa",
            fontSize: 15,
            color:"#4dbcc7",
        },
        app:{
            fontFamily:"LexendExa",
            fontSize: 22,
        },
        titleT:{
            fontFamily:"LexendExa",
            fontSize: 15,
            color:"#555555",
        },
        
    })