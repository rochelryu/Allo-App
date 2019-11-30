import React from 'react';
import {View, Text, Image,ActivityIndicator, TouchableOpacity, StyleSheet, ImageBackground, StatusBar, BackHandler, Alert, AsyncStorage} from 'react-native';
import * as Font from 'expo-font';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const block = [
    {
        img:require('../assets/images/rdv.png'),
        id:1,
        title:"Prise de rendez-vous médicale"
    },
    {
        img:require('../assets/images/assistance.png'),
        id:2,
        title:"Assistance Médicale"
    },
    {
        img:require('../assets/images/livr.png'),
        id:3,
        title:"livraison de médicament"
    },
    {
        img:require('../assets/images/assurance.png'),
        id:4,
        title:"Mon assurance en ligne"
    },
    {
        img:require('../assets/images/pharma.png'),
        id:5,
        title:"pharmacies de garde"
    },
    {
        img:require('../assets/images/prixmed.png'),
        id:6,
        title:"Les prix des médicaments"
    },
]

const CardPharma = (props)=>{
    if(props.prefix || props.ele.title == "pharmacies de garde"){
        return(
            <TouchableOpacity style={styles.content} onPress={()=>props.action(props.ele)}>
                <Image style={styles.img} source={props.ele.img} />
                <Text style={styles.title}>{props.ele.title}</Text>
            </TouchableOpacity>
    )
    }
    else{
        return(
            <TouchableOpacity style={styles.content} onPress={()=>{Alert.alert("Indisponible", "Ce service n'est pas encore disponible dans votre pays")}}>
                <Image style={styles.img} source={props.ele.img} />
                <Text style={styles.title}>{props.ele.title}</Text>
            </TouchableOpacity>
    )
    }
}
export default class HomeScreen extends React.Component{
    constructor(props){
        super(props)
        this.state={
            isFont:false,
            main:false,
            prefix:false
        }
        
    }
    bele = 1;
    enterEvent =(ele)=>{
        switch(ele.id){
            case 1:
                this.props.navigation.navigate('rendezVous');
                break;
            case 2:
                this.props.navigation.navigate('assistance');
                break;
            case 3:
                    this.props.navigation.navigate('Wait');
                break;
            case 4:
                this.props.navigation.navigate('ChoixAssurance');
                break;
            case 5:
                    this.props.navigation.navigate('IntDeGarde');
                break;
            case 6:
                    this.props.navigation.navigate('prixMedoc');
                break;
        }
    }
    async componentDidMount() {
        StatusBar.setHidden(false);
        await Font.loadAsync({
            LexendExa: require('../assets/fonts/LexendExa-Regular.ttf'),
            'Blinker-Black': require('../assets/fonts/Blinker-Black.ttf'),
            'PTSans-Bold': require('../assets/fonts/PTSans-Bold.ttf')
        });
        let prefix = await AsyncStorage.getItem("prefix");
        this.setState({
            isFont:true,
            prefix: (prefix == "+225")? true:false,
        })
        BackHandler.addEventListener('hardwareBackPress', this.onButtonPress.bind(this));
    }
    onButtonPress() {

            BackHandler.exitApp();
        return true;
      }

    handleBackButton = () => {
         return true;
       } 
    componentWillUnmount(){
        this.backHandler.remove()
    }
    render(){
        if(this.state.isFont) {
            return(
                <ImageBackground source={require('../assets/bg.jpg')} style={styles.container}>
                    <View style={styles.blockss}>
                        <TouchableOpacity  onPress={()=> this.props.navigation.navigate('Profil') } style={{position:"absolute", top:10, left:8, backgroundColor:"#fff", elevation:3, width:40, height:40, borderRadius:100, alignItems:"center", justifyContent:"center"}}>
                        <Icon name="account" color="#4dbcc7"
                              size={25}/>
                        </TouchableOpacity>
                    <View style={{height:35, marginLeft:18, paddingLeft:5, marginRight:18, marginTop:45, backgroundColor:"#fff", elevation:3, borderRadius:20, flexDirection: "row",alignItems:"center", justifyContent:"center"}}>
                    <TouchableOpacity style={{width:"100%", alignItems:"center", justifyContent:"center", left:"10%"}} onPress={()=> this.props.navigation.navigate('search') }>
                        <Text style={{position:"absolute",top:"-90%"}}>Trouver votre professionnel de santé en ligne</Text>
                        <Text style={{color:"#aaa"}}>Un medecin, un établissement, une spécialité</Text>
                        </TouchableOpacity>

                    </View>
                    </View>
                    <View style={styles.blocksss}>
                    </View>
                    <View style={styles.blocks}>
                    <CardPharma ele={block[0]} action={this.enterEvent} prefix={this.state.prefix} />
                    <CardPharma ele={block[1]} action={this.enterEvent} prefix={this.state.prefix}/>
                    </View>
                    <View style={styles.blocks}>
                    <CardPharma ele={block[2]} action={this.enterEvent} prefix={this.state.prefix}/>
                    <CardPharma ele={block[3]} action={this.enterEvent} prefix={this.state.prefix}/>
                    </View>
                    <View style={styles.blocks}>
                    <CardPharma ele={block[4]} action={this.enterEvent} prefix={this.state.prefix}/>
                    <CardPharma ele={block[5]} action={this.enterEvent} prefix={this.state.prefix}/>
                    </View>
                    <View style={styles.blocksss}>
                    </View>
                </ImageBackground>
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
    container:{
        paddingTop:30,
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    content:{
        flex:1,
        margin:10,
        alignItems:"center",
        justifyContent:"center",
    },
    img:{
        width:70,
        height:70,
    },
    title:{
        fontFamily:"LexendExa",
        fontSize:14,
        textTransform: 'uppercase',
        textAlign:"center",
    },
    blocks:{
        flex:4,
        flexDirection:"row",
    },
    blockss:{
        flex:1,
        paddingTop:30,
    },
    blocksss:{
        flex:2,
    },
})