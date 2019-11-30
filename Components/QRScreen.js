import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    ActivityIndicator,
} from 'react-native';
import * as Font from 'expo-font';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Header} from "react-native-elements";
const MyCustomLeftComponent = (props) =>{
    return (
        <TouchableOpacity onPress={()=>props.navigation.goBack()}>
            <Icon name="arrow-left-bold" color="#fff"
                  size={25} />
        </TouchableOpacity>
    );
};

export default class QRScreen extends React.Component{
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

    enterEvent(ele){
        if(ele === 1){
            this.props.navigation.navigate('pharma')
        }
        else{
            this.props.navigation.navigate('BrazaVille')
        }
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
                        centerComponent={{ text: "Q&R", style: { color: '#fff' } }}
                        containerStyle={{
                            backgroundColor: '#4dbcc7',
                            justifyContent: 'space-around',
                        }}
                    />
                    
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
            alignItems:"center",
            justifyContent:"center",
        },
        item:{
            flex:1,
            alignItems:"flex-end",
            justifyContent:"flex-end",
            paddingBottom:35,
        },
        items:{
            flex:1,
            alignItems:"flex-start",
            justifyContent:"flex-start"
        },

        clickable:{
            height:50,
            width:340,
            backgroundColor:"#fff",
            borderRadius:7,
            alignItems: "center",
            justifyContent:"space-between",
            flexDirection:"row"
        },
        image:{
            height:"45%",
            width:"45%"
        },
        title:{
            fontFamily:"LexendExa",
            fontSize: 14,
            textAlign:"center",
            marginRight:95,
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