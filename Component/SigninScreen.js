import React from 'react';
import {
    StyleSheet, Text, View,
    StatusBar, Image, TextInput,
    SafeAreaView, Keyboard, TouchableOpacity,
    KeyboardAvoidingView, ImageBackground,
    TouchableWithoutFeedback, Button, AsyncStorage, Alert,ScrollView
} from 'react-native';
import {Icon, Picker, DatePicker, Spinner} from "native-base";
import {getAllVille, signin} from '../ServiceWorker/helper'


export default class  SigninScreen extends React.Component {
    constructor(props){
        super(props)
        this.state={
            showRealApp: false,
            selected: undefined,
            totalAd: [],
            name:"",
            numero:"",
            email:"",
            commune:[],
            password:"",
            chosenDate: new Date(),
            load:0
        }
        this.onValueChange = this.onValueChange.bind(this)
    }
    onValueChange(value) {
        this.setState({
            selected: value
        });
        console.log(value)
    }
    async componentDidMount() {
        const ville = await getAllVille();
        let verif = new Array();
        for(let i in ville){
            for (let j in ville[i].commune) {
                verif.push({labelle:ville[i].name+ " - "+ ville[i].commune[j].nameCommune})
                continue;
            }
            continue;
        }
        this.setState({totalAd:verif,load:1});
        StatusBar.setHidden(true);
    }

    setDate = (newDate)=>{
        this.setState({ chosenDate: newDate });
    }
    _onDone = async () => {
        this.setState({
            showRealApp:true
        })
        console.log(this.state.email,this.state.password,this.state.name,this.state.numero,this.state.selected, this.state.chosenDate)
        if(this.state.email.length > 5 && this.state.password.length > 3 && this.state.name.length > 5 && this.state.numero.length === 8 && this.state.selected){
            const status = await signin(this.state.email,this.state.password,this.state.numero,this.state.selected,this.state.chosenDate.toString(),this.state.name)
            if(status.etat){
                console.log(status.user)
                AsyncStorage.setItem("identAllo", status.user.ident);
                AsyncStorage.setItem("nameAllo", status.user.name);
                this.props.navigation.navigate('Ele')
            }
            else {
                if(status.err.errors[0]){
                    this.setState({
                        showRealApp:false,
                        err:status.err.errors[0].msg
                    })
                    Alert.alert("Invalide", status.err.errors[0].msg)
                }
                else{
                    this.setState({
                        showRealApp:false,
                        err:status.err
                    })
                    Alert.alert("Erreur", status.err)
                }

            }
        }
        else {
            Alert.alert("Erreur", "Veillez remplir les champs correctement")
            this.setState({
                showRealApp:false
            })
        }
    }
    _onDoneInscription = () => {
        // User finished the introduction. Show real app through
        // navigation or simply by controlling state
        this.setState({ showRealApp: true });
        this.props.navigation.navigate('Login')
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
    render(){
        if(this.state.load === 0){
            return(
                <View style={{flex:1,alignItems:"center", justifyContent:"center"}}>
                    <Spinner color='#4dbcc7' />
                </View>
            )
        }
        else{
            return (
                <SafeAreaView style={styles.containers}>
                    <KeyboardAvoidingView behavior="padding" style={styles.containers}>
                        <TouchableWithoutFeedback style={styles.containers}
                                                  onPress={Keyboard.dismiss}>
                            <ScrollView style={styles.containers}>
                                <View style={styles.intent}>
                                    <Image style={styles.logo}
                                           source={require('../assets/images/Logo.png')}>
                                    </Image>
                                </View>

                                <View style={styles.infoContainer}>
                                    <TextInput style={styles.input}
                                               placeholder="Entrer votre nom et prenom(s)"
                                               placeholderTextColor='rgba(255,255,255,0.8)'
                                               keyboardType ='default'
                                               onChangeText={(value)=>this.changeName(value)}

                                               returnKeyType='next'
                                               autoCorrect={false}/>
                                    <TextInput style={styles.input}
                                               placeholder="Entrer votre e-mail"
                                               placeholderTextColor='rgba(255,255,255,0.8)'
                                               keyboardType="email-address"
                                               onChangeText={(value)=>this.changeEmail(value)}

                                               returnKeyType='next'
                                    />
                                    <TextInput style={styles.input}
                                               placeholder="Entrer votre numéro"
                                               placeholderTextColor='rgba(255,255,255,0.8)'
                                               keyboardType="phone-pad"
                                               onChangeText={(value)=>this.changeNumber(value)}
                                               maxLength = {8}
                                               returnKeyType='next'/>
                                    <View style={{height:40,marginBottom:20,paddingRight: 5}}>
                                        <Picker
                                            mode="dropdown"
                                            iosIcon={<Icon name="arrow-down" />}
                                            placeholder="Selectionner votre commune"
                                            placeholderStyle={{ color: "#bfc6ea" }}
                                            placeholderIconColor="#007aff"
                                            style={styles.inputs}
                                            selectedValue={this.state.selected}
                                            onValueChange={this.onValueChange}
                                        >
                                            {this.state.totalAd.map((value,index)=> <Picker.Item key={index} label={value.labelle} value={value.labelle} />)}
                                            <Picker.Item label="Autres" value="Autres" />
                                        </Picker>
                                    </View>
                                    <DatePicker
                                        defaultDate={new Date()}
                                        minimumDate={new Date(1929, 1, 1)}
                                        maximumDate={new Date(2148, 12, 31)}
                                        locale={"fr"}
                                        timeZoneOffsetInMinutes={undefined}
                                        modalTransparent={false}
                                        animationType={"fade"}
                                        androidMode={"calendar"}
                                        placeHolderText="Date de Naissance"
                                        textStyle={{ color: "#4dbcc7" }}
                                        placeHolderTextStyle={{ color: "#d3d3d3" }}
                                        onDateChange={this.setDate}
                                        disabled={false}
                                    />
                                    <TextInput style={styles.input}
                                               placeholder="Entrer votre mot de passe"
                                               placeholderTextColor='rgba(255,255,255,0.8)'
                                               secureTextEntry
                                               onChangeText={(value)=>this.changePass(value)}
                                               returnKeyType='go'
                                               ref={"txtPassword"}/>
                                    <Button color="#f7931e" onPress={()=>this._onDone()} title="INSCRIPTION" disabled={this.state.showRealApp} />
                                    <View style={{flexDirection: "row", alignItems:"center", justifyContent:"center"}}>
                                        <Text style={styles.preConnect}>Vous avez déjà un compte ? </Text>
                                        <TouchableOpacity  onPress={()=>this._onDoneInscription()}><Text style={styles.connect}>Connectez-vous</Text></TouchableOpacity>
                                    </View>


                                </View>
                            </ScrollView>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            );
        }
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containers: {
        flex:1,
        padding:0,
        backgroundColor: '#474f62',
        flexDirection: 'column',
    },
    intent:{
        height:150,
        marginBottom:30,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    logo: {
        height: 75,
        width: 165,
    },
    text: {
        color: '#f7931e',
        fontSize: 18,
        alignItems: 'center',
        marginTop: 5,
        opacity: 0.9,
        marginBottom:10,
    },
    infoContainer: {
        justifyContent:"flex-end",
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom:20,
        /*backgroundColor:'#00ff00'*/
    },
    input: {
        borderRadius:10,
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        color:'rgba(255,255,255,0.8)',
        paddingHorizontal: 10,
        marginBottom:20,
    },
    inputs:{
        borderRadius:10,
        backgroundColor: 'rgba(255,255,255,0.2)',
        color:'rgba(0,0,0,0.8)',

    },
    buttonContainer: {
        backgroundColor:'#f7931e',
        paddingVertical: 13,
    },
    buttonText: {
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    preConnect:{
        color:"#fff",
        marginRight:10
    },
    connect:{
        color:'#f7931e'
    }
});