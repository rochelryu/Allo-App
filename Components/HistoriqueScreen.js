import React from 'react';
import {
    View,
    ScrollView,
    StatusBar,
    FlatList,AsyncStorage,
    ActivityIndicator
} from 'react-native';
import {history, delSer} from '../ServiceWorker/helper'
import {Header} from "react-native-elements";
import CardHistorique from './Partials/CardHistorique'
let datas =[];
let count = 0;
export default class HistoriqueScreen extends React.Component{
    constructor(props){
        super(props)
        this.state={
            info:[],
            name:"",
            load:false
        }
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
            info:isMe.user.services.reverse(),
            load:true
        })
    }

    del = async (ele) => {
        const ident = await AsyncStorage.getItem("identAllo");
     let focus = this.state.info.filter((value) => this.filtrage(value, ele.code));
     const del = await delSer(ident, ele.code);
     this.setState({
             info:focus
            })
     
    };

    render() {
        if(this.state.load){
            return(
                <View style={{flex:1, backgroundColor:"#fff"}}>
                    <Header
                        centerComponent={{ text: "Votre Historique", style: { color: '#fff' } }}
                        containerStyle={{
                            backgroundColor: '#4dbcc7',
                            justifyContent: 'space-around',
                        }}
                    />
                    <ScrollView>
                        <FlatList
                            data={this.state.info}
                            keyExtractor={(item) => item.code}
                            renderItem={({item}) => <CardHistorique ele={item} action={this.del} />}
                        />
                    </ScrollView>
                </View>
            )
        }
        else {
            return(
                <View style={{flex:1, backgroundColor:"#fff"}}>
                    <Header
                        centerComponent={{ text: "Votre Historique", style: { color: '#fff' } }}
                        containerStyle={{
                            backgroundColor: '#4dbcc7',
                            justifyContent: 'space-around',
                        }}
                    />
                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                        <ActivityIndicator color="#4dbcc7" />
                    </View>
                </View>
            )
        }
    }
}