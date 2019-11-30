import React from 'react';
import {
    View,
    ScrollView,
    StatusBar,
    FlatList,AsyncStorage
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
    filtrage(value, code){
        return value.code !== code;
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
}