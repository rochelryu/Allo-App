import React from 'react'
import {View, Text, Image, StyleSheet} from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { horodatage } from '../Universel/Utils'

const Hor = (props) =>{
    let moment = horodatage(props.date.toString())
    return (<Text style={styles.horo} >{moment}</Text>)
}
export default class CardProfil extends React.Component{
    render() {
        const {ele} = this.props
        if(ele.serviceName ==="produit"){
            return(
                <View style={styles.card}>
                    <View style={styles.CardEssentials}>
                        <View style={styles.cardHeade}>
                            <Image source={require('../../assets/images/ambulance.png')} style={styles.CardIcon}/>
                            <Text style={styles.med}> <Icon name="doctor" size={24}/> {(ele.medecin)?ele.medecin:"En Attente de Medecin"}</Text>
                        </View>
                        <View style={{flex:1, flexDirection:"row", flexWrap: "wrap"}}>
                            {ele.cause.map((value,index) => <Text key={index} style={styles.propos}>{value}</Text>)}
                        </View>
                    </View>
                    <View style={styles.CardAction}>
                        <View style={styles.block1}>
                            <Hor date={ele.registerDate}/>
                        </View>
                        <View style={styles.block2}>
                            <Text style={styles.horo}>Code: {ele.code}</Text>
                        </View>
                    </View>

                </View>
            )

        }
        else if (ele.serviceName ==="Assistance"){
            return(
                <View style={styles.card}>
                    <View style={styles.CardEssentials}>
                        <View style={styles.cardHeade}>
                            <Image source={require('../../assets/images/medical-app.png')} style={styles.CardIcon}/>
                            <Text style={styles.med}> <Icon name="doctor" size={24}/> {(ele.medecin)?ele.medecin:"En Attente de Medecin"}</Text>
                        </View>
                        <View style={{flex:1, flexDirection:"row", flexWrap: "wrap"}}>
                           <Text style={styles.propos}>{ele.Motif}</Text>
                        </View>
                    </View>
                    <View style={styles.CardAction}>
                        <View style={styles.block1}>
                            <Hor date={ele.registerDate}/>
                        </View>
                        <View style={styles.block2}>
                            <Text style={styles.horo}>Code: {ele.code}</Text>
                        </View>
                    </View>
                </View>
            )
        }
        else if (ele.serviceName ==="Render-vous"){
            return(
                <View style={styles.card}>
                    <View style={styles.CardEssentials}>
                        <View style={styles.cardHeade}>
                            <Image source={require('../../assets/images/application.png')} style={styles.CardIcon}/>
                            <Text style={styles.med}> <Icon name="doctor" size={24}/> {(ele.medecin)?ele.medecin:"En Attente de Medecin"}</Text>
                        </View>
                        <View style={{flex:1, flexDirection:"row", flexWrap: "wrap"}}>
                            <Text style={styles.propos}>{ele.Motif}</Text>
                        </View>
                    </View>
                    <View style={styles.CardAction}>
                        <View style={styles.block1}>
                            <Hor date={ele.registerDate}/>
                        </View>
                        <View style={styles.block2}>
                            <Text style={styles.horo}>Code: {ele.code}</Text>
                        </View>
                    </View>
                </View>
            )
        }
        else return null
    }
}
const styles =StyleSheet.create({
    card:{
        height:225,
        elevation:4,
        margin:10,
        backgroundColor:"#fff"
    },
    CardEssentials:{
        flex:4,
        alignItems:"center",
        justifyContent:"center",
    },
    propose:{
        minWidth: 90,
        textAlign: "center",
        marginRight: 10,
        marginBottom: 20,
        elevation: 4,
        borderRadius:50,
        backgroundColor: "#fff",
        padding: 10
    },
    propos:{
        color:"#fff",
        minWidth: 90,
        height:35,
        textAlign: "center",
        marginRight: 10,
        marginBottom: 20,
        elevation: 4,
        borderRadius:50,
        backgroundColor: "#4dbcc7",
        padding: 6,
    },
    CardIcon:{
        width:60,
        height: 60,
        borderColor:"#4dbcc7",
    },
    CardAction:{
        flex:1,
        flexDirection: "row",
        borderTopWidth:1,
        borderTopColor:"#bbb",

    },
    block1:{
        flex:1,
        borderRightColor:"#bbb",
        borderRightWidth:1,
        alignItems: "center",
        justifyContent: "center",
    },
    block2:{
        flex:1,
        alignItems: "center",
        justifyContent: "center",
    },
    cardHeade:{flex:2, alignItems:"center", justifyContent:"center"},
    horo:{
        color:"#999"
    },
    med:{
        fontWeight:"bold",
        fontSize:18
    }
})