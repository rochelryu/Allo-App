import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    ActivityIndicator,
    AsyncStorage, FlatList, ScrollView, TextInput
} from 'react-native';
import * as Font from 'expo-font';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Header} from "react-native-elements";
import {getAllPharma} from '../ServiceWorker/helper';
let count = 0;
let datas = [];
const MyCustomLeftComponent = (props) =>{
    return (
        <TouchableOpacity onPress={()=>props.navigation.goBack()}>
            <Icon name="arrow-left-bold" color="#fff"
                  size={25} />
        </TouchableOpacity>
    );
};
const CardPharma = (props) =>{
    return (
        <TouchableOpacity style={styles.block} onPress={()=>props.action(props.ele)}>
            <Text style={styles.numberLibre}>{props.ele.block.length}</Text>
            <Text style={styles.title}> {props.ele.name}</Text>
        </TouchableOpacity>
    );
};

export default class DeGardeCommune extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            meta:[],
            isFont:false,
            backClickCount: 0,
            name:"",
            modalVisible: false,
        }
        this._search = this._search.bind(this);
    }

    back(){
        AsyncStorage.removeItem('newUser');
        this.setState({
            modalVisible:false,
        })
    }
    enterEvent = (ele)=>{
        this.props.navigation.navigate('intPharma', {inter:ele})
    };
    _search(text){
        if(count === 0){
            datas = this.state.meta;
            count = 1;
            if(text !== ""){
                let fake = text.toString().toLowerCase();
                let tack = [];
                datas.forEach((value, key)=> {
                    if (value.name.toLowerCase().indexOf(fake) !== -1) {
                        tack.push(value)

                    }
                });
                this.setState({
                    meta: tack
                })
            }
            else{
                this.setState({
                    meta: datas
                })
            }
        }
        else{
            if(text !== ""){
                let fake = text.toString().toLowerCase();
                let tack = [];
                datas.forEach((value, key)=> {
                    if (value.name.toLowerCase().indexOf(fake) !== -1) {
                        tack.push(value)
                    }
                });
                this.setState({
                    meta: tack
                })
            }
            else{
                this.setState({
                    meta: datas
                })
            }
        }
    }
    async componentDidMount() {
        StatusBar.setHidden(false);
        await Font.loadAsync({
            LexendExa: require('../assets/fonts/LexendExa-Regular.ttf'),
            'Blinker-Black': require('../assets/fonts/Blinker-Black.ttf'),
            'PTSans-Bold': require('../assets/fonts/PTSans-Bold.ttf')
        });
        let neta = (await AsyncStorage.getItem("newUser") === null)? "Heureux de vous revoir "+await AsyncStorage.getItem("nameAllo"): "Bienvenue à vous "+await AsyncStorage.getItem("nameAllo") +" dans Allô Santé Express";
        let scrap = await getAllPharma();
        this.setState({
            tite:scrap.title,
            meta:scrap.body,
            name:neta,
            modalVisible:(await AsyncStorage.getItem("newUser") !== null),
            isFont:true,

        })
    }
    render() {
        if(this.state.isFont) {
            return (
                <View style={{flex: 1}}>
                    <Header
                        leftComponent={<MyCustomLeftComponent navigation={this.props.navigation}/>}
                        centerComponent={{ text: "Côte d'Ivoire", style: { color: '#fff' } }}
                        containerStyle={{
                            backgroundColor: '#4dbcc7',
                            justifyContent: 'space-around',
                        }}
                    />
                    <View style={{height:40, marginLeft:30, paddingLeft:5, marginRight:30, marginTop:5, backgroundColor:"#fff", elevation:3, borderRadius:20, flexDirection: "row",alignItems:"center"}}>
                        <Icon name="hospital-building" color="#047615"
                              size={20}/>
                        <TextInput onChangeText={(value)=>this._search(value)} placeholder="Rechercher par Commune" style={{height:35,color:"#999",width:"85%", paddingLeft:10, borderRadius:20}}/>
                    </View>
                    <Text style={{margin:15, textAlign:"center", fontSize:18, fontWeight:"600"}}>{this.state.tite}</Text>
                    <ScrollView style={styles.padding}>
                        <FlatList
                            data={this.state.meta}
                            keyExtractor={(item) => item.name}
                            renderItem={({item}) => <CardPharma ele={item} action={this.enterEvent} />}
                        />
                        <View style={{height:50}}>

                        </View>
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
            textAlign:"center",
            marginTop:5,
            fontWeight:"700",
        },
        numberLibre:{
            position:"absolute",
            backgroundColor: "#fff",
            borderColor:"#777",
            borderWidth:1,
            width:30,
            height:30,
            paddingTop:3,
            color: "#4dbcc7",
            borderRadius:100,
            textAlign: "center",
            fontSize:15,
            top:"50%",
            right:"5%",
        }
    })