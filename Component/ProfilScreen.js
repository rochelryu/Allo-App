import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    StatusBar,
    FlatList,AsyncStorage
} from 'react-native';
import {history} from '../ServiceWorker/helper'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Header} from "react-native-elements";
import CardProfil from './Partials/CardProfil'
const MyCustomLeftComponent = (props) =>{
    return (
        <TouchableOpacity onPress={()=>props.drawler.openDrawer()}>
            <Icon name="menu" color="#fff"
                  size={20} />
        </TouchableOpacity>
    );
};
let datas =[];
let count = 0;
export default class ProfilScreen extends React.Component{
    constructor(props){
        super(props)
        this.state={
            info:[],
            name:""
        }
        this._search = this._search.bind(this);
    }
    async componentDidMount() {
        const ident = await AsyncStorage.getItem("identAllo");
        const name = await AsyncStorage.getItem("nameAllo");
        const isMe = await history(ident);
        this.setState({
            name:name
        });
        StatusBar.setHidden(false);
        this.setState({
            info:isMe.user.services.reverse()
        })
    }
    _search(text){
        if(count === 0){
            datas = this.state.info;
            count = 1;
            if(text !== ""){
                let fake = text.toString().toLowerCase();
                let tack = [];
                datas.forEach((value, key)=> {
                    if (value.code.toLowerCase().indexOf(fake) !== -1 || value.Motif.toLowerCase().indexOf(fake) !== -1 || value.date.toLowerCase().indexOf(fake) !== -1 || value.medecin.toLowerCase().indexOf(fake) !== -1) {
                        tack.push(value)

                    }
                });
                this.setState({
                    info: tack
                })
            }
            else{
                this.setState({
                    info: datas
                })
            }
        }
        else{
            if(text !== ""){
                let fake = text.toString().toLowerCase();
                let tack = [];
                datas.forEach((value, key)=> {
                    if (value.code.toLowerCase().indexOf(fake) !== -1 || value.Motif.toLowerCase().indexOf(fake) !== -1 || value.date.toLowerCase().indexOf(fake) !== -1 || value.medecin.toLowerCase().indexOf(fake) !== -1) {
                        tack.push(value)

                    }
                });
                this.setState({
                    info: tack
                })
            }
            else{
                this.setState({
                    info: datas
                })
            }
        }
    }
    static navigationOptions = {
        drawerIcon: ({tintColor}) => (
            <Icon
                name="account"
                color={tintColor}
                size={20}
            />
        )
    }

    render() {
        return(
            <View style={{flex:1, backgroundColor:"#e0e0e0"}}>
                <Header
                    leftComponent={<MyCustomLeftComponent drawler={this.props.navigation} />}
                    centerComponent={{ text: this.state.name, style: { color: '#fff' } }}
                    containerStyle={{
                        backgroundColor: '#4dbcc7',
                        justifyContent: 'space-around',
                    }}
                />
                <View style={{height:40, marginLeft:30, paddingLeft:5, marginRight:30, marginTop:5, backgroundColor:"#fff", elevation:3, borderRadius:20, flexDirection: "row",alignItems:"center"}}>
                    <Icon name="cloud-search-outline" color="#999"
                          size={20}/>
                    <TextInput onChangeText={(value)=>this._search(value)} placeholder="Rechercher par code, par date ou par nom du medecin" style={{height:35,color:"#999",width:"85%", paddingLeft:10, borderRadius:20}}/>
                </View>
                <ScrollView>
                    <FlatList
                        data={this.state.info}
                        keyExtractor={(item) => item.code}
                        renderItem={({item}) => <CardProfil ele={item} />}
                    />
                </ScrollView>
            </View>
        )
    }
}