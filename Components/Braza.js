import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    StatusBar,
    ActivityIndicator,
    AsyncStorage, FlatList, ScrollView
} from 'react-native';
import * as Font from 'expo-font';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Header} from "react-native-elements";
import {getAllPharmaBraza} from '../ServiceWorker/helper';

function elevationShadowStyle(elevation) {
    return {
        elevation,
        shadowColor: '#606060',
        shadowOffset: { width: 15, height: 0.5 * elevation },
        shadowOpacity: 0.5,
        shadowRadius: 0.8 * elevation
    };
}
const MyCustomLeftComponent = (props) =>{
    return (
        <TouchableOpacity onPress={()=>props.navigation.goBack()}>
            <Icon name="arrow-left-bold" color="#fff"
                  size={25} />
        </TouchableOpacity>
    );
};
const CardPharma = (props) =>{
        let fake = "https://abidjan.net/img_pharmacies/FRONT/L/parma.jpg";
        if(props.ele.title !== ""){
            return (
                <View style={styles.blockPub}>
                    <View style={styles.abss}>
                        <Image source={{uri:fake}} style={styles.fr}/>
                    </View>
                    <View style={styles.containerPub}>
                        <View style={styles.containerForText}>
                            <Text style={styles.title}>{props.ele.title}</Text>
                        </View>
                        <View style={styles.containerForPrice}>
                            <View style={{flex:1, justifyContent: "flex-start"}}>
                                <Text numberOfLines={3} style={styles.price}>{props.ele.address}</Text>
                                <Text numberOfLines={2} style={styles.price}>{props.ele.autor}</Text>
                                <Text numberOfLines={2} style={styles.price}>{props.ele.numero}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            );
        }
        else return null
        

};

export default class Braza extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            meta:[],
            isFont:false,
            backClickCount: 0,
            name:"",
            title:'',
            modalVisible: false,
        }
    }
    back(){
        AsyncStorage.removeItem('newUser');
        this.setState({
            modalVisible:false,
        })
    }
    async componentDidMount() {
        StatusBar.setHidden(false);
        let scrap = await getAllPharmaBraza();
        await Font.loadAsync({
            LexendExa: require('../assets/fonts/LexendExa-Regular.ttf'),
            'Blinker-Black': require('../assets/fonts/Blinker-Black.ttf'),
            'PTSans-Bold': require('../assets/fonts/PTSans-Bold.ttf')
        });
        this.setState({
            meta:scrap.pharmacie,
            isFont:true,
        })
    }
    render() {
        if(this.state.isFont) {
            return (
                <View style={{flex: 1}}>
                    <Header
                        leftComponent={<MyCustomLeftComponent navigation={this.props.navigation}/>}
                        centerComponent={{ text: "Brazaville: Garde de la semaine", style: { color: '#fff' } }}
                        containerStyle={{
                            backgroundColor: '#4dbcc7',
                            justifyContent: 'space-around',
                        }}
                    />
                    <ScrollView style={styles.padding}>
                        <FlatList
                            data={this.state.meta}
                            keyExtractor={(item) => item.title+Math.floor(Math.random()*555)}
                            renderItem={({item}) => <CardPharma ele={item} />}
                        />
                        <View style={{height:60}}>

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
    },abss:{
        position: "absolute",
        top:13,
        left: 7,
        bottom: 7,
        width: 110,
        elevation: 5
    },
    blockPub:{
        height: 170,
        marginTop: 10
    },
    containerPub:{
        marginTop:13,
        margin:7,
        paddingLeft:120,
        ...elevationShadowStyle(1),
        borderRadius:5,
        flex:1,
        backgroundColor: "#fff",
    },
    containerForText:{
        flex:1
    },
    containerForPrice:{
        flex:2,
    },
    title:{
        fontWeight: "300",
        marginTop: 5,
        marginLeft: 10,
        fontSize: 13,
        fontFamily:"LexendExa"
    },
    price:{
        color: "#777",
        fontSize: 12,
        marginLeft: 15,
        marginBottom:2,
        marginRight: 5
    },
    fr:{
        width: "100%",
        height:"100%",
    }
})