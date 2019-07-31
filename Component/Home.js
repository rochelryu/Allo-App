import React from 'react';
import {BackHandler,View, Text, StyleSheet, TouchableOpacity, Image, StatusBar, Dimensions, ScrollView, ImageBackground} from 'react-native';

import {Header} from 'react-native-elements';

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Carousel from 'react-native-anchor-carousel';
import CardProfil from "./Partials/CardProfil";
const {width} = Dimensions.get('window')



const MyCustomLeftComponent = (props) =>{
        return (
            <TouchableOpacity onPress={()=>props.drawler.openDrawer()}>
                <Icon name="menu" color="#4dbcc7"
                      size={20} />
            </TouchableOpacity>
        );
};

export default class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            meta:[],
            backClickCount: 0
        }
    }
    enterEvent = (ele)=>{
        if(ele.id ===6){
            this.props.navigation.navigate('Assistance')
        }
        else if(ele.id ===5){
            this.props.navigation.navigate('RendezVous')
        }
        else return null
    };
    componentDidMount() {
        StatusBar.setHidden(false);
        this.setState({
            meta:[
                {
                    img:require('../assets/images/medical-app.png'),
                    id:6,
                    title: "Demander une Assistance Medicale",
                    },
                {
                    img:require('../assets/images/application.png'),
                    id:5,
                    title: "Prendre Un rendez-vous",
                },
                {
                    img:require('../assets/images/ambulance.png'),
                    id:7,
                    title: "Vous faire livrer un medicament",
                    },
                {
                    img:require('../assets/images/qa.png'),
                    id:8,
                    title: "Mon Assurance",
                }
            ]
        })
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    }
    /*componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }*/

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
    }

    handleBackPress = () => {
        BackHandler.exitApp(); // works best when the goBack is async
        return true;
    };
    renderItem = ({item, index}) => {
        return (
            <TouchableOpacity style={styles.ofView}
                onPress={() => {
                    this.enterEvent(item)
                }}>
                <View style={styles.blockf}>
                    <Image source={item.img} style={styles.bannerScroll}/>
                </View>
                <View style={styles.blockff}>
                    <Text style={styles.textIntent}>{item.title}</Text>
                </View>
            </TouchableOpacity>)
    };
    static navigationOptions = {
        drawerIcon: ({tintColor}) => (
            <Icon
                name="home"
                color={tintColor}
                size={20}
            />
        )
    }

    render() {
        return(

            <View style={{flex:1}}>
                <Header
                    leftComponent={<MyCustomLeftComponent drawler={this.props.navigation} />}
                    containerStyle={{
                        backgroundColor: '#fff',
                        justifyContent: 'space-around',
                    }}
                />
                <View style={styles.container}>
                    <ScrollView>
                        <ImageBackground style={styles.bg} source={require('../assets/images/bg.jpeg')}>

                        </ImageBackground>
                        <View style={{alignItems:"center", justifyContent:"center", marginTop:20,marginBottom:30,
                        paddingRight:50,paddingLeft:50}}>
                            <Text style={{fontFamily:"Roboto", textAlign:"center", color:"#000", fontWeight: "bold", fontSize:20, textTransform: "capitalize"}}>BIENVENUE à</Text>
                            <Text style={{ textAlign:"center", fontFamily:"Roboto",  color:"#000", fontWeight: "bold", fontSize:20, textTransform: "uppercase"}}>Allô Santé express</Text>
                        </View>
                        <View style={styles.footer}>
                            <Text style={styles.Subtitle}>Quel service vous intéresse ?</Text>
                            <Carousel style={styles.carousel}
                                      data={this.state.meta}
                                      renderItem={this.renderItem}
                                      itemWidth={200}
                                      containerWidth={width}
                                      separatorWidth={5}
                                      ref={(c) => {
                                          this._carousel = c;
                                      }}
                                      pagingEnable={false}
                            />
                        </View>
                        <View style={styles.header}>
                            <View style={styles.itemheader}>
                                <View style={styles.block1header}>
                                    <Text style={styles.titeheader}> PRESENTATION D'ACTIVITES</Text>
                                    <Text style={styles.titiheader}> Innovant, Flexible et adapté à votre mode de vie</Text>
                                </View>
                                <View style={styles.block2header}>
                                    <Image source={require('../assets/images/customer.png')} style={styles.imfFack}/>
                                </View>
                            </View>
                            <View style={styles.itemheader}>
                                <View style={styles.block1header}>
                                    <Text style={styles.titeheader}> AVANTAGES</Text>
                                    <Text style={styles.titiheader}> Proximité, confort, économie, qualité de service, simple d'utilisation et déonyologie dans votre main</Text>
                                </View>
                                <View style={styles.block2header}>
                                    <Image source={require('../assets/images/population.png')} style={styles.imfFack}/>
                                </View>
                            </View>
                            <View style={styles.itemheader}>
                                <View style={styles.block1header}>
                                    <Text style={styles.titeheader}> Où et quand vous voulez ?</Text>
                                    <Text style={styles.titiheader}> De jour comme de nuit, partout en tout temps et en tout lieu, vous pouvez bénéficier de nos services</Text>
                                </View>
                                <View style={styles.block2header}>
                                    <Image source={require('../assets/images/calendar.png')} style={styles.imfFack}/>
                                </View>
                            </View>
                            <View style={styles.itemheader}>
                                <View style={styles.block1header}>
                                    <Text style={styles.titeheader}> NOTRE EQUIPE</Text>
                                    <Text style={styles.titiheader}> Nous sommes composés de professionnels de santé expérimentés, d'une équipe de livraison compétente.</Text>
                                </View>
                                <View style={styles.block2header}>
                                    <Image source={require('../assets/images/doctor.png')} style={styles.imfFack}/>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>

        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#73edf2',

    },
    bannerScroll:{
        width:60,
        height: 60
    },
    header:{
      flex:2,
    },
    carousel: {
        flex:1
    },
    footer:{
        height:200
    },
    ofView:{backgroundColor:"#fff", elevation:3,
    padding:10, flexDirection:"row", height: "80%",
        borderRadius:8
    },
    sub:{
        textAlign:"center",
        color:"#555",
        fontSize:13,
        fontFamily:"Roboto",
    },
    textIntent:{
      color: "#777",
      fontSize:13,
      textAlign: "center",
        fontFamily:"Roboto",

    },
    blockf:{
      flex:1,
        alignItems:"center",
        justifyContent: "center"
    },
    blockff:{
        flex:2,
        alignItems:"center",
        justifyContent: "center"
    },
    bg:{
      height:200,
    },
    Subtitle:{
        fontSize: 16,
        letterSpacing: 2,
        color:"#333",
        marginTop: 5,
        marginLeft: 15,
        marginBottom: 5,
        fontFamily:"Roboto"
    },
    itemheader:{
        flex:1,
        backgroundColor:"transparent",
        flexDirection: "row",
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 8,
    },
    block1header:{
        flex:3,
        borderBottomStartRadius: 8,
        borderTopStartRadius: 8,
        padding: 10,
        backgroundColor:"rgba(255,255,255,.95)",
    },
    block2header:{
        flex:1,
        alignItems:"center",
        backgroundColor:"rgba(255,255,255,.55)",
        borderTopEndRadius: 8,
        borderBottomEndRadius: 8,

        justifyContent:"center",
    },
    imfFack:{
        width:50,
        height:50,
    },
    titeheader:{
        color:"#4dbcc7",
        fontSize:16,
        textAlign:"center",
        textTransform:"uppercase",
        fontFamily:"Roboto",
    },
    titiheader:{
        color:"#555",
        fontSize:13,
        fontFamily:"Roboto",
    }


})