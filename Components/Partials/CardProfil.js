import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {socketLink} from "../../ServiceWorker/helper";
export default class CardProfil extends React.Component{
    render() {
        const {ele} = this.props
        ele.url = socketLink+"/images/tools/"+ele.image;
            return(
                <View style={styles.card}>
                    <View style={styles.CardActions}>
                    <Image source={{uri:ele.url}} style={styles.CardIcon}/>
                        <Text style={styles.med}> <Icon name="doctor" color="#4dbcc7" size={24}/> {ele.name}</Text>
                    </View>
                    <View style={styles.CardEssentials}>
                    <View style={styles.img}></View>
                        <View style={styles.cardHeade}>                            
                                <Text style={styles.propos}>Clinique : </Text>
                                <Text style={styles.propose}>{ele.clinic}</Text>
                            <Text style={styles.propos}>Addresse :</Text>
                            <Text style={styles.propose}>{ele.address.replace(/\//gi,', ')}</Text>
                            <Text style={styles.propos}>Specialité :</Text>
                            <Text style={styles.propose}>{ele.specialite}</Text>
                            <Text style={styles.propos}>Tarif :</Text>
                            <Text style={styles.propose}>{ele.tarif}</Text>
                            <Text style={styles.propos}>Contact Primaire :</Text>
                            <Text style={styles.propose}>{ele.numero}</Text>
                            </View>
                        <View style={styles.cardHeade}>                            
                                <Text style={styles.propos}>ONM : </Text>
                                <Text style={styles.propose}>{ele.onm}</Text>
                            <Text style={styles.propos}>Moyen de Paiement :</Text>
                            <Text style={styles.propose}>{ele.moyenDePayement}</Text>
                            <Text style={styles.propos}>Remboursement :</Text>
                            <Text style={styles.propose}>{ele.remboursement}</Text>
                            <Text style={styles.propos}>Email :</Text>
                            <Text style={styles.propose}>{ele.email}</Text>
                            <Text style={styles.propos}>Contact Secondaire :</Text>
                            <Text style={styles.propose}>{ele.numeroSe ?? "N/A" }</Text>
                            </View>
                    </View>
                    <View style={styles.CardAction}>
                        <View style={styles.block1}>
                            <Text style={styles.horo}>Debut: {ele.ouverture}</Text>
                        </View>
                        <View style={styles.block2}>
                            <Text style={styles.horo}>Fin: {ele.fermerture}</Text>
                        </View>
                    </View>
                </View>
            )
    }
}
const styles = StyleSheet.create({
    card:{
        elevation:4,
        margin:10,
        backgroundColor:"#fff"
    },
    CardEssentials:{
        flex:4,
        flexDirection:"row",
        justifyContent: 'space-evenly',
    },
    img:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    propose:{
        fontSize: 13,
        fontWeight:"bold"
    },
    propos:{
        color:"#777",
        fontSize:10,
    },
    CardIcon:{
        width:60,
        height: 60,
        borderColor:"#4dbcc7",
        borderRadius:100,
    },
    CardAction:{
        flex:1,
        flexDirection: "row",
        borderTopWidth:1,
        alignItems:"center",
        justifyContent:"center",
        borderTopColor:"#bbb",

    },
    CardActions:{
        flex:2,
        borderTopWidth:1,
        alignItems:"center",
        justifyContent:"center",
        borderTopColor:"#bbb",

    },
    block1:{
        flex:1,
        padding:10,
        borderRightColor:"#bbb",
        borderRightWidth:1,
        alignItems: "center",
        justifyContent: "center",
    },
    block2:{
        flex:1,
        padding:10,
        alignItems: "center",
        justifyContent: "center",
    },
    cardHeade:{
        flex:4
    },
    horo:{
        color:"#999"
    },
    med:{
        fontWeight:"bold",
        fontSize:18,
        color:"#4dbcc7"
    }
})