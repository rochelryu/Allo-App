import React from 'react'
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default class CardHistorique extends React.Component{
    render() {
        const {ele,action} = this.props;
        let img = (ele.serviceName == "Assistance") ? require('../../assets/images/assistance.png'):require('../../assets/images/rdv.png');
        let medecin = (ele.medecin)? ele.medecin: "Veillez patienter traitement";
        let etablissement = (ele.etablissement)? ele.etablissement: "Veillez patienter traitement";
        let titre = (ele.serviceName == "Assistance") ? medecin:etablissement;
        if(ele.del != 2){
            return(
                <View style={styles.card}>
                    <View style={styles.CardEssentials}>
                        <Image source={img} style={styles.CardIcon}/>
                    </View>
                    <View style={styles.CardAction}>
                        <View style={styles.block1}>
                            <Text style={styles.horos}>{titre}</Text>
                        </View>
                        <View style={styles.block2}>
                            <Text style={styles.horo}>{ele.code}</Text>
                            <Text style={styles.horo}>{ele.date.substring(0, 10)} {ele.date.substring(12, 16)}</Text>
                        </View>
                    </View>
                    <View style={styles.foot}>
                        <TouchableOpacity style={styles.del} onPress={()=>action(ele)}>
                        <Icon name="close-circle-outline" color="#a55"
                              size={35}/>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
        else return null
    }
}
const styles = StyleSheet.create({
    card:{
        height:105,
        margin:10,
        flexDirection:"row",
        borderRadius:5,
        borderColor:"#555",
        borderWidth:1,
        backgroundColor:"#fff"
    },
    CardEssentials:{
        flex:2,
        alignItems:"center",
        justifyContent:"center",
    },
    CardIcon:{
        width:70,
        height: 70,
    },
    CardAction:{
        flex:6,
        alignItems:"flex-start",
        justifyContent:"center",

    },
    block1:{
        flex:1,
        alignItems: "center",
        justifyContent: "center",
    },
    block2:{
        flex:1,
        alignItems: "center",
        justifyContent: "center",
    },
    horo:{
        color:"#999"
    },
    horos:{
        color:"#000"
    },
    med:{
        fontWeight:"bold",
        fontSize:18
    },
    foot:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
    }
})