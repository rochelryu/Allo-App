import React from 'react';
import { StyleSheet, Text, View,
    StatusBar,Image,TextInput,
    SafeAreaView, Keyboard, TouchableOpacity,
    KeyboardAvoidingView,AsyncStorage,
    TouchableWithoutFeedback,Button, Alert } from 'react-native';
import {login} from '../ServiceWorker/helper'

export default class  LoginScreen extends React.Component {
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
            console.log()

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
        this.props.navigation.navigate('SignUp')
    }
    render(){
        return (
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView behavior="padding" style={styles.container}>
                    <TouchableWithoutFeedback style={styles.container}
                                              onPress={Keyboard.dismiss}>
                        <View style={styles.containers}>
                            <View style={styles.intent}>
                                <Image style={styles.logo}
                                       source={require('../assets/images/Logo.png')}>
                                </Image>
                            </View>

                            <View style={styles.infoContainer}>
                                <TextInput style={styles.input}
                                           placeholder="Email"
                                           onChangeText={(value)=>this.changeEmail(value)}
                                           keyboardType="email-address"
                                           placeholderTextColor='rgba(255,255,255,0.8)' returnKeyType='next'
                                           ref={"email"}
                                />
                                <TextInput style={styles.input}
                                           placeholder="Entrer votre mot de passe"
                                           placeholderTextColor='rgba(255,255,255,0.8)'
                                           secureTextEntry
                                           onChangeText={(value)=>this.changePass(value)}
                                           returnKeyType='go'
                                           ref={"txtPassword"}/>
                                <Button color="#f7931e" onPress={()=>this._onDone()} title="CONNEXION" disabled={this.state.showRealApp} />
                                <View style={{flexDirection: "row", alignItems:"center", justifyContent:"center"}}>
                                    <Text style={styles.preConnect}>Vous n'avez pas de compte ? </Text>
                                    <TouchableOpacity onPress={()=>this._onDoneInscription()}><Text style={styles.connect}>Inscrivez-vous</Text></TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </SafeAreaView>

        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containers: {
        flex: 1,
        backgroundColor: '#474f62',
        flexDirection: 'column',
    },
    intent:{
        flex:2,
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
        flex: 4,
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
        marginRight:10,
    },
    connect:{
        color:'#f7931e'
    }
});