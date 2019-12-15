import React from 'react';
import {View,TextInput, Text, StyleSheet, AsyncStorage, StatusBar, SafeAreaView, Keyboard, Image, TouchableOpacity,KeyboardAvoidingView,ImageBackground,TouchableWithoutFeedback, Alert} from 'react-native';
import {login, verifNumber, verifNumberFinal} from '../ServiceWorker/helper';
import {Spinner} from 'native-base';
import {  WebBrowser } from 'expo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Button } from 'react-native-elements';




export default class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            email:"",
            password:"",
            numVerif:'',
            code:'',
            newPass:'',
            err:"",
            ident:'',
            showRealApp: false,
            log:1,
            loadVerif:false,
            loadVerifFinal:false,
        }
        this.changeEmail = this.changeEmail.bind(this);
        this.changePass = this.changePass.bind(this);
    }
    componentDidMount() {
        StatusBar.setHidden(true);
    }

    changeEmail(value){
        this.setState({
            email:value
        })
    }
    
    changeNumVerif(value){
        this.setState({
            numVerif:value
        })
    }
    changeCode(value){
        this.setState({
            code:value
        })
    }
    changeNewPass(value){
        this.setState({
            newPass:value
        })
    }
    handleClick = () => {
        WebBrowser.openBrowserAsync('https://www.allosanteexpress.com');
      };
    changePass(value){
        this.setState({
            password:value
        })
    }
    _onDone = async () => {
        this.setState({
            showRealApp:true
        })
        if(this.state.email.length > 5 && this.state.password.length > 3){
            const status = await login(this.state.email, this.state.password)
            if(status.etat){
                AsyncStorage.setItem("identAllo", status.user.ident);
                AsyncStorage.setItem("nameAllo", status.user.name);
                AsyncStorage.setItem("prefix", status.user.prefix);
                this.props.navigation.navigate('Home')
            }
            else {
                this.setState({
                    showRealApp:false,
                })
                Alert.alert("Invalide", "Identifiant incorrect")

            }
        }
        else {
            Alert.alert("Erreur", "Veuillez remplir les champs correctement")
            this.setState({
                showRealApp:false,
            })
        }
                
    }
    async verif(){
        this.setState({loadVerif:true})
        const resultat = await verifNumber(this.state.numVerif)
        this.setState({loadVerif:false})
        if(resultat.etat){
            this.setState({
                ident:resultat.user.ident,
                log:3})
        }
        else{
            Alert.alert("Erreur", "Ce numero ne figure pas dans notre base de donnée")
        }
    }
    async verifFinal(){
        this.setState({loadVerifFinal:true})
        const resultat = await verifNumberFinal(this.state.code,this.state.newPass,this.state.ident)
        this.setState({loadVerifFinal:false})
        if(resultat.etat){
            AsyncStorage.setItem("identAllo", resultat.user.ident);
            AsyncStorage.setItem("nameAllo", resultat.user.name);
            AsyncStorage.setItem("prefix", resultat.user.prefix);
            this.props.navigation.navigate('Home')
        }
        else {
            Alert.alert("Invalide", "Identifiant incorrect")

        }
    }
    _onDoneInscription = () => {
        this.props.navigation.navigate('Signup')
    }
    render() {
        if(this.state.log === 1){
            return (
                <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView style={styles.container}>
                    <TouchableWithoutFeedback style={styles.container}
                                              onPress={Keyboard.dismiss}>
                        <ImageBackground source={require('../assets/images/login.jpg')} style={styles.containers}>
                            <View style={styles.containers}>
                                
                            </View>
                            <View style={styles.containerss}>
                                <View style={styles.input}>
                                    <Icon name="phone" size={30} color="#4dbcc7"/>
                                    <TextInput
                                        placeholderTextColor="#4dbcc7"
                                        onChangeText={(value)=>this.changeEmail(value)}
                                        style={styles.focus}
                                        keyboardType="number-pad"
                                        placeholder = "Veuillez entrer votre numero (ex : 01020304)"
                                        returnKeyType = { "next" }
                                        onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                        blurOnSubmit={false}
                                        />
                                </View>
                                <View style={styles.input}>
                                    <Icon name="textbox-password" size={30} color="#4dbcc7"/>
                                    <TextInput
                                        onChangeText={(value)=>this.changePass(value)}
                                        placeholderTextColor="#4dbcc7"
                                        style={styles.focus}
                                        secureTextEntry
                                        ref={(input) => { this.secondTextInput = input; }}
                                        placeholder = "*****"
                                    />
                                </View>
                                <View style={{ width:300, height:40, alignItems:"flex-end", justifyContent:"flex-end", marginBottom:15}}>
                                    <TouchableOpacity onPress={()=>{this.setState({log:2})}}>
                                        <Text style={{textAlign: "right"}}>Mot de passe oublié ?</Text>
                                    </TouchableOpacity> 
                                </View>
                                <TouchableOpacity onPress={this._onDone} style={styles.connect}>
                                {(this.state.showRealApp)? <Spinner color="#000"/>:  <Image style={styles.signinImg} source={require('../assets/images/btcon.png')} />}
                                  
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this._onDoneInscription} style={styles.inscription}>
                                    <Image style={styles.signinImg} source={require('../assets/images/inscription.png')} />
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </SafeAreaView>
            )
        }
        else if (this.state.log === 2){
            return (
                <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView style={styles.container}>
                    <TouchableWithoutFeedback style={styles.container}
                                              onPress={Keyboard.dismiss}>
                        <ImageBackground source={require('../assets/images/login.jpg')} style={styles.containers}>
                            <View style={styles.containers}>
                                
                            </View>
                            <View style={styles.containerss}>
                                <View style={styles.input}>
                                    <Icon name="phone" size={30} color="#4dbcc7"/>
                                    <TextInput
                                        placeholderTextColor="#4dbcc7"
                                        onChangeText={(value)=>this.changeNumVerif(value)}
                                        style={styles.focus}
                                        value={this.state.numVerif}
                                        keyboardType="number-pad"
                                        placeholder = "Veuillez entrer votre numero (ex : 01020304)"/>
                                </View>
                                <View style={{alignItems:'flex-start', width:'60%', height:100, marginTop:50, justifyContent:'space-around', flexDirection:'row'}}>
                                <Button 
                                icon={<Icon name="arrow-left-bold-outline" size={15} color="#4dbcc7" />}
                                title="Annuler" type="outline" raised titleStyle={{color:'#4dbcc7'}} onPress={()=>{this.setState({log:1})}}  />
                                <Button
                                    icon={
                                        <Icon
                                        name="arrow-right-bold-outline"
                                        size={15}
                                        color="white"
                                        />
                                    }
                                    onPress={()=>this.verif()}
                                    iconRight
                                    buttonStyle={{backgroundColor:'#4dbcc7'}}
                                    raised
                                    title="Vérifier"
                                    loading={this.state.loadVerif}
                                    disabled={this.state.loadVerif}
                                    />
                                </View>
                                    
                            </View>
                        </ImageBackground>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </SafeAreaView>
            )
        }
        else if (this.state.log === 3){
            return (
                <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView style={styles.container}>
                    <TouchableWithoutFeedback style={styles.container}
                                              onPress={Keyboard.dismiss}>
                        <ImageBackground source={require('../assets/images/login.jpg')} style={styles.containers}>
                            <View style={styles.containers}>
                                
                            </View>
                            <View style={styles.containerss}>
                                <View style={styles.input}>
                                    <Icon name="shield-account-outline" size={30} color="#4dbcc7"/>
                                    <TextInput
                                        placeholderTextColor="#4dbcc7"
                                        onChangeText={(value)=>this.changeCode(value)}
                                        value={this.state.code}
                                        style={styles.focus}
                                        keyboardType="phone-pad"
                                        placeholder = "Code de confirmation"
                                        />
                                </View>
                                <View style={styles.input}>
                                    <Icon name="textbox-password" size={30} color="#4dbcc7"/>
                                    <TextInput
                                        onChangeText={(value)=>this.changeNewPass(value)}
                                        placeholderTextColor="#4dbcc7"
                                        style={styles.focus}
                                        secureTextEntry
                                        
                                        placeholder = "Nouveau mot de passe"
                                    />
                                </View>
                                <View style={{alignItems:'flex-start', width:'60%', height:100, marginTop:50, justifyContent:'space-around', flexDirection:'row'}}>
                                <Button 
                                icon={<Icon name="arrow-left-bold-outline" size={15} color="#4dbcc7" />}
                                title="Annuler" type="outline" raised titleStyle={{color:'#4dbcc7'}} onPress={()=>{this.setState({log:2})}}  />
                                <Button
                                    icon={
                                        <Icon
                                        name="arrow-right-bold-outline"
                                        size={15}
                                        color="white"
                                        />
                                    }
                                    onPress={()=>this.verifFinal()}
                                    iconRight
                                    buttonStyle={{backgroundColor:'#4dbcc7'}}
                                    raised
                                    title="Confirmer"
                                    loading={this.state.loadVerifFinal}
                                    disabled={this.state.loadVerifFinal}
                                    />
                                </View>
                                    
                            </View>
                        </ImageBackground>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </SafeAreaView>
            )
        }
        
    }
}

const styles = StyleSheet.create(
    {
        container:{
            flex:1,
            padding:0,
        },
        containers:{
          flex:5,
          alignItems:"center",
          justifyContent:"center"
        },
        containerss:{
            flex:6,
            padding:15,
            alignItems:"center",
            justifyContent:"center"
        },
        input:{
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
            width:"70%",
            marginLeft:20,
            borderWidth: 0,
            backgroundColor: "transparent",
        },
        logo:{
            width:150,
            height:140,
        },
        connect:{
            height:60,
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