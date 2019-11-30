import React from 'react';
import {View,TextInput, Text, StyleSheet, AsyncStorage, StatusBar, SafeAreaView, Keyboard, Image, TouchableOpacity,KeyboardAvoidingView,ImageBackground,TouchableWithoutFeedback, Alert} from 'react-native';
import {login} from '../ServiceWorker/helper';
import {Spinner} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {  WebBrowser } from 'expo';

export default class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            email:"",
            password:"",
            err:"",
            showRealApp: false,
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
                console.log(status.user)
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
            Alert.alert("Erreur", "Veillez remplir les champs correctement")
            this.setState({
                showRealApp:false,
            })
        }
                
    }
    _onDoneInscription = () => {
        this.props.navigation.navigate('Signup')
    }
    render() {
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
                                    placeholder = "01020304"
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
                            <View style={{ width:300, height:40, alignItems:"flex-end", justifyContent:"flex-end"}}>
                                <TouchableOpacity>
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
}

const styles = StyleSheet.create(
    {
        container:{
            flex:1,
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