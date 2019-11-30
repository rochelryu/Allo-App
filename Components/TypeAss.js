import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet, ImageBackground, Text, StatusBar} from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const block = [
    {
        img:require('../assets/images/5.png'),
        id:1,
        title:'Assurance Santé'
    },
    {
        img:require('../assets/images/3.png'),
        id:2,
        title:'Assurance Auto-Moto'
    },
    {
        img:require('../assets/images/8.png'),
        id:4,
        title:'Assurance Voyage'
    }
]

const CardPharma = (props)=>{
    return(
            <TouchableOpacity style={styles.content} onPress={()=>props.action(props.ele)}>
                <View style={styles.contentBlock}>
                <Image style={styles.img} source={props.ele.img} />
                </View>
                <Text style={styles.title}>{props.ele.title}</Text>
            </TouchableOpacity>
    )
}
const MyCustomLeftComponent = (props) =>{
    return (
        <TouchableOpacity onPress={()=>props.navigation.goBack()} style={{position:"absolute", top:0,left:0, width:70, height:50, backgroundColor:"#000", borderBottomEndRadius:30, justifyContent:"center", alignItems:"center"}}>
            <Icon name="arrow-left-bold" color="#fff"
                  size={25} />
        </TouchableOpacity>
    );
};

export default class TypeAss extends React.Component{
    constructor(props){
        super(props)
        
    }
    enterEvent =(ele)=>{
        if(ele.id === 2){

            this.props.navigation.navigate('ChooseAutoMoto');
        }
        else{
            this.props.navigation.navigate('intAssurance', {inter:ele.id});
        }

    }
    componentDidMount(){
        StatusBar.setHidden(true);

    }
    render(){
        return(
            <ImageBackground source={require('../assets/bg.jpg')} style={styles.container}>
                <View style={styles.block1}>
                    <MyCustomLeftComponent navigation={this.props.navigation}/>
                    <Image style={styles.headerImage} source={require('../assets/images/monassurance.png')}/>
                </View>
                <View style={styles.block2}>
                    {block.map((value,index)=><CardPharma key={index} ele={value} action={this.enterEvent} />)}
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    content:{
        height:70,
        paddingLeft:10,
        flexDirection:"row",
        margin:10,
        alignItems:"center",
        justifyContent:"flex-start",
        borderBottomStartRadius:50,
        borderTopStartRadius:50,
        backgroundColor:"#fff",
        width:"70%"
    },
    contentBlock:{
        width:60,
        height:60,
        elevation:5,
        borderRadius:100,
        marginRight:10,
    },
    img:{
        width:60,
        borderRadius:100,
        height:60,
    },
    title:{
        fontSize:16,
        width:"70%",
        textTransform: 'uppercase',
        textAlign:"center",
        fontWeight:"bold",
    },
    block1:{
        flex:2,
        alignItems:"center",
        justifyContent:"center"
    },
    block2:{
        flex:4,
        alignItems:"center",
        justifyContent:"center",
    },
    headerImage:{
        width:"92%",
        height:"42%",
    }
})