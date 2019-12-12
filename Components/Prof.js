import React from 'react';
import {ActivityIndicator, View,TextInput,ScrollView, Text, StyleSheet, StatusBar, SafeAreaView, Keyboard, Image, TouchableOpacity,KeyboardAvoidingView,ImageBackground,TouchableWithoutFeedback, Alert} from 'react-native';

import * as Font from 'expo-font';
import {Picker} from 'native-base';

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
window.navigator.userAgent = "react-native";
import io from "socket.io-client/dist/socket.io";
import { socketLink} from '../ServiceWorker/helper';
const MyCustomLeftComponent = (props) =>{
    return (
        <TouchableOpacity style={{position:"absolute", top:0,left:0, width:50, height:50, borderBottomEndRadius:20, backgroundColor:"#000", justifyContent:"center", alignItems:"center"}} onPress={()=>props.navigation.goBack()}>
            <Icon name="arrow-left-bold" color="#fff"
                  size={25} />
        </TouchableOpacity>
    );
};

export default class ChooseType extends React.Component{
    constructor(props){
        super(props)
        this.state={
            showRealApp: false,
            selected: undefined,
            totalAd: [],
            horo:0,
            carosserie:"Carosserie",
            garanties:"Garanties",
            genre:"Genre vehicule",
            commune:"",
            ville:"",
            prefix:"+225",
            name:"",
            firstname:"",
            isDateTimePickerVisible: false,
            isDateTimePickerVisibles: false,
            chosenDate:"",
            trueDates:"",
            trueDate:"",
            chosenDates:"",
            numero:"",
            email:"",
            nameUsage:"",
            commune:[],
            password:"",
            confpassword:"",
            load:0
        }
        this.socket = io(socketLink,{jsonp:true});
        this.onValueGenre = this.onValueGenre.bind(this);
        this.onValueCarosserie = this.onValueCarosserie.bind(this);
        this.onValueGaranties = this.onValueGaranties.bind(this);
        this.onPrefixChange = this.onPrefixChange.bind(this);
    }
    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        this.setState({ trueDate:date,
            chosenDate: date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear() });
        this.hideDateTimePicker();
    };

    showDateTimePickers = () => {
        this.setState({ isDateTimePickerVisibles: true });
    };

    hideDateTimePickers = () => {
        this.setState({ isDateTimePickerVisibles: false });
    };

    handleDatePickeds = date => {
        this.setState({ trueDates:date,
            chosenDates: date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear() });
        this.hideDateTimePicker();
    };
    onValueChange(value) {
        this.setState({
            selected: value
        });
    }
    onValueGaranties(value) {
        this.setState({
            garanties: value
        });
    }
    onValueGenre(value) {
        this.setState({
            genre: value
        });
    }

    onValueCarosserie(value) {
        this.setState({
            carosserie: value
        });
    }
    onPrefixChange(value) {
        this.setState({
            prefix: value
        });
    }
    componentWillMount() {
        StatusBar.setHidden(true);
    }

    setDate = (newDate)=>{
        this.setState({ chosenDate: newDate });
    }
    _onDone = () => {
        this.setState({
            showRealApp:true,
        })
        
                let data = {name:this.state.name,numero:this.state.numero,commune:this.state.commune,ville:this.state.ville, email: this.state.email, genre:this.state.genre};
                if(data.name !== "" && data.numero !== "" && data.commune !== "" && data.ville !== "" && data.email !== ""){
                    this.socket.emit("assProfessionnelle", data);
                        this.setState({
                            modalVisible:true,
                            isLoad:false,
                            isLoad2:true,
                            showRealApp:false,
                        });
                        Alert.alert('Reussie', "La redaction de votre assurance à été prise en compte")
                        this.props.navigation.goBack();
                }
                else{

                    Alert.alert('Erreur', "Veuillez remplir tous les champs correctement")
                    this.setState({
                        showRealApp:false,
                    })
                }
        
    }

    changeNumber(value){
        this.setState({
            numero:value
        })
    }
    changeName(value){
        this.setState({
            name:value
        })
    }
    changeVille(value){
        this.setState({
            ville:value
        })
    }
    changeCommune(value){
        this.setState({
            commune:value
        })
    }
    changeNameUsage(value){
        this.setState({
            nameUsage:value
        })
    }
    changeFirstName(value){
        this.setState({
            firstname:value
        })
    }
    changeEmail(value){
        this.setState({
            email:value
        })
    }
    changePass(value){
        this.setState({
            password:value
        })
    }
    changePassConf(value){
        this.setState({
            confpassword:value
        })
    }
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
                <SafeAreaView style={styles.container}>
                    <KeyboardAvoidingView style={styles.container}>
                        <TouchableWithoutFeedback style={styles.container}
                                                  onPress={Keyboard.dismiss}>
                            <ImageBackground source={require('../assets/images/auto_moto.png')} style={styles.containers}>
                            <MyCustomLeftComponent navigation={this.props.navigation}/>
                            <Text style={styles.enTete}> Assurance Professionelle </Text>
                                <ScrollView>
                                <View style={{width:"80%", height:50}}>

                                </View>
                                <View style={{alignItems:"center", justifyContent:"center"}}>
                                    <View style={styles.input}>
                                            <Picker
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-down" />}
                                                placeholder="Type D'assurance"
                                                placeholderStyle={{ color: "#fff" }}
                                                placeholderIconColor="#007aff"
                                                style={styles.inputs}
                                                textStyle={{ color: "#fff" }}
                                                itemStyle={{
                                                    backgroundColor: "#d3d3d3",
                                                    marginLeft: 0,
                                                    paddingLeft: 10
                                                }}
                                                itemTextStyle={{ color: '#fff' }}
                                                selectedValue={this.state.genre}
                                                onValueChange={this.onValueGenre}>
                                                    <Picker.Item label="Type D'assurance" value="Type D'assurance" />
                                                    <Picker.Item label="Assurance Santé" value="Santé" />
                                                    <Picker.Item label="Assurance Auto" value="Auto" />
                                                    <Picker.Item label="Assurance Moto" value="Moto" />
                                                    <Picker.Item label="Assurance Voyage" value="Voyage" />
                                            </Picker>
                                    </View>
                                        <View style={styles.input}>
                                            <Icon name="account" size={30} color="#4dbcc7"/>
                                            <TextInput
                                                placeholderTextColor="#555"
                                                onChangeText={(value) => this.changeName(value)}
                                                style={styles.focus}
                                                keyboardType="default"
                                                placeholder="Nom de la société"
                                            
                                            />
                                        </View>
                                        <View style={styles.input}>
                                            <Icon name="mail-ru" size={30} color="#4dbcc7"/>
                                            <TextInput
                                                placeholderTextColor="#555"
                                                onChangeText={(value) => this.changeEmail(value)}
                                                style={styles.focus}
                                                keyboardType="email-address"
                                                placeholder="Votre email"
                                                
                                            />
                                        </View>

                                        <View style={styles.input}>
                                            <Icon name="home-city" size={30} color="#4dbcc7"/>
                                            <TextInput
                                                placeholderTextColor="#555"
                                                onChangeText={(value) => this.changeVille(value)}
                                                style={styles.focus}
                                                keyboardType="default"
                                                placeholder="Votre ville"
                                                
                                            />
                                        </View>
                                        <View style={styles.input}>
                                            <Icon name="map-marker-radius" size={30} color="#4dbcc7"/>
                                            <TextInput
                                                placeholderTextColor="#555"
                                                onChangeText={(value) => this.changeCommune(value)}
                                                style={styles.focus}
                                                keyboardType="default"
                                                placeholder="Votre commune et quartier"
                                                
                                            />
                                        </View>

                                        <View style={styles.input}>
                                            <Icon name="phone" size={30} color="#4dbcc7"/>

                                            <TextInput style={styles.focus}
                                                    placeholder="Numéro"
                                                    placeholderTextColor='#555'
                                                    keyboardType="phone-pad"
                                                    
                                                    onChangeText={(value)=>this.changeNumber(value)}
                                                    />
                                        </View>
                                        
                                    </View>
                                    
                                    <TouchableOpacity onPress={this._onDone} style={styles.inscription}>
                                        {(this.state.showRealApp)? <Spinner color="#4dbcc7"/>: <Image style={styles.signinImg}
                                               source={require('../assets/images/envoyer.png')}/>}
                                    </TouchableOpacity>
                                <View style={{height:55}}>

                                </View>
                                </ScrollView>
                            </ImageBackground>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            )
        }
        else{
            return (<View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
                <ActivityIndicator color="#4dbcc7" />
            </View>)
        }
    }
}


    const styles = StyleSheet.create(
        {
            container:{
                flex:1,
            },
            enTete:{
                position:"absolute",
                top:15,
                right:20,
                left:60,
                fontSize:17,
                textAlign:"center",
                textTransform:"uppercase"
            },
            containers:{
                flex:1,
                paddingTop:85,
            },
            containerss:{
                flex:2,
                alignItems:"center",
                justifyContent:"center"
            },
            input:{
                width:"80%",
                marginTop:25,
                paddingLeft:15,
                borderRadius:100,
                borderWidth:1,
                borderColor:"#4dbcc7",
                height: 50,
                flexDirection:'row',
                alignItems:"center"
            },
            focus:{
                color:"#4dbcc7",
                width:"80%",
                marginLeft:20,
                borderWidth: 0,
                backgroundColor: "transparent",
            },
            logo:{
                width:90,
                height:140,
            },
            connect:{
                height:80,
                width:"100%",
                alignItems:"center",
                justifyContent:"center",
            },
            inscription:{
                height:80,
                width:"100%",
                alignItems:"center",
                justifyContent:"center",
            },
            connectImg:{
                height:80,
                width:80,
            },
            signinImg:{
                height:60,
                width:270,
            }
    
        }
    )