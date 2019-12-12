import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity,Modal, StatusBar, ImageBackground, TextInput, ScrollView, Image, AsyncStorage, ActivityIndicator, Alert} from 'react-native';
import DateTimePicker from "react-native-modal-datetime-picker";
import {Spinner} from "native-base";
import {socketLink} from '../ServiceWorker/helper';
import {getAllVille, editProfil, history, ChangePass} from '../ServiceWorker/helper';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import io from "socket.io-client/dist/socket.io";

window.navigator.userAgent = "react-native";
let suiveur = 0;
const MyCustomLeftComponent = (props) =>{
    return (
        <TouchableOpacity style={{position:"absolute", top:18,left:18}} onPress={()=>props.navigation.goBack()}>
            <Icon name="arrow-left-bold" color="#fff"
                  size={25} />
        </TouchableOpacity>
    );
};

const MyCustomLeftComponentTwo = (props) =>{
    return (
        <TouchableOpacity style={{position:"absolute", top:18,left:18}} onPress={()=>props.close()}>
            <Icon name="close-circle" color="#fff"
                  size={25} />
        </TouchableOpacity>
    );
};
export default class Setting extends React.Component{
    constructor(props){
        super(props)
        this.state={
            isPhoto:false,
            hasCameraPermission: null,
    type: Camera.Constants.Type.back,
            showRealApp: false,
            selected: undefined,
            totalAd: [],
            info:{},
            modalVisible: false,
            horo:0,
            communes:"",
            ville:"",
            prefix:"Prefix",
            profil:require('../assets/icon.png'),
            name:"",
            firstname:"",
            isDateTimePickerVisible: false,
            chosenDate:"",
            numero:"",
            email:"",
            commune:[],
            password:"",
            newPassword:"",
            confpassword:"",
            load:0
        }
        this.socket = io(socketLink,{jsonp:true});
        this.onValueChange = this.onValueChange.bind(this);
        this.onPrefixChange = this.onPrefixChange.bind(this);
        this.takeCirconstanceCamera = this.takeCirconstanceCamera.bind(this);
    }

    async componentDidMount() {
        const ville = await getAllVille();
        let verif = new Array();
        for(let i in ville){
            verif.push({labelle:ville[i].name,value: ville[i].prefix})
            continue;
        }
        const ident = await AsyncStorage.getItem("identAllo");
        const isMe = await history(ident);
        const adds = isMe.user.address.split(':');
        this.setState({
            totalAd:verif,
            load:1,
            info:isMe.user,
            name:isMe.user.name,
            email:isMe.user.email,
            numero:isMe.user.numero,
            profil:(isMe.user.profil != "") ? {uri:isMe.user.profil}:require('../assets/images/boss.png'),
            ville:adds[0],
            communes:adds[1],
            chosenDate:isMe.user.date
        });
        StatusBar.setHidden(true);
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
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
    takeCirconstanceCamera(){
        this.setState({
            isPhoto:true,
        }, async ()=>{
            const { status } = await Permissions.askAsync(Permissions.CAMERA);
            this.setState({ hasCameraPermission: status === 'granted' });
        })
    }
    onValueChange(value) {
        this.setState({
            selected: value
        });
    }
    onPrefixChange(value) {
        this.setState({
            prefix: value
        });
    }
    

    setDate = (newDate)=>{
        this.setState({ chosenDate: newDate });
    }

    _onDoneChangePass = async () => {
        this.setState({
            showRealApp:true
        })
        if(this.state.newPassword === this.state.confpassword && this.state.password !== '' && this.state.confpassword !== ''){
            AsyncStorage.setItem("identAllo", status.user.ident);
               const ident = await AsyncStorage.getItem("nameAllo");
            const status = await ChangePass(ident,this.state.password,this.state.confpassword)
            if(status.etat){
                Alert.alert('Reuissie', 'Votre mot de passe a été modifié avec succès')
                this.setState({
                    showRealApp:false
                })
            }
            else {
                Alert.alert('Erreur', 'Cette demande a echoué par presence de données erronées')
                this.setState({
                    showRealApp:false
                })
            }
        }
        else {
            Alert.alert("Erreur", "Veuillez remplir les champs correctement")
            this.setState({
                showRealApp:false
            })
        }
    }
    _onDone = async () => {
        this.setState({
            showRealApp:true
        })
        if(this.state.email.length > 5 && this.state.password.length > 3 && this.state.name.length + this.state.firstname.length > 5 && this.state.numero.length >= 8){
            const status = await editProfil(this.state.email,this.state.password,this.state.numero,this.state.ville + ':' + this.state.communes,this.state.chosenDate,this.state.name, this.state.profil, this.state.info.ident, suiveur)
            if(status.etat){
                AsyncStorage.setItem("identAllo", status.user.ident);
                AsyncStorage.setItem("nameAllo", status.user.name);
                AsyncStorage.setItem("newUser", status.user.name);
                AsyncStorage.setItem("address", status.user.address);
                this.props.navigation.navigate('Home')
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
            Alert.alert("Erreur", "Veuillez remplir les champs correctement")
            this.setState({
                showRealApp:false
            })
        }
    }
    _onDoneLogout(){
        AsyncStorage.removeItem("identAllo");
        AsyncStorage.removeItem("nameAllo");
        AsyncStorage.removeItem("prefix");
        Alert.alert("A bientôt", "Nous sommes toujours disponible pour vous");
        this.props.navigation.navigate('LoginScreen');
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
            communes:value
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
    changeNewPass(value){
        this.setState({
            newPassword:value
        })
    }
    closePhoto = ()=>{
        this.setState({
            isPhoto:false,
        })
    }
    render() {
        if(!this.state.isPhoto){
            return(
                <View style={{flex:1, backgroundColor:'#fff'}}>
                    <ImageBackground style={styles.imagBg} source={require('../assets/images/hh.png')}>
                    <MyCustomLeftComponent navigation={this.props.navigation}/>
                    <View style={styles.imagProfil}>
                    <Image source={this.state.profil} style={{width:94,height:94, borderRadius:100}}/>
                    <TouchableOpacity style={styles.IconPhoto} onPress={()=>{this.takeCirconstanceCamera()}}>
                    <Icon name="camera" color="#4dbcc7"
                      size={25} />
                    </TouchableOpacity>
                    </View>
                    </ImageBackground>
                    <ScrollView>
    
                        <View style={{paddingTop:40, width: "100%"}}>
                            <Text style={styles.title}>GENERAL</Text>
                            <ScrollView style={{paddingLeft:25, paddingRight:25}}>
                                            <View style={styles.input}>
                                                <Icon name="account" size={30} color="#555"/>
                                                <TextInput
                                                    placeholderTextColor="#555"
                                                    onChangeText={(value) => this.changeName(value)}
                                                    style={styles.focus}
                                                    keyboardType="default"
                                                    placeholder="Nom & Prénoms"
                                                    returnKeyType={"next"}
                                                    value={this.state.name}
                                                    onSubmitEditing={() => {
                                                        this.secondTextInput.focus();
                                                    }}
                                                    blurOnSubmit={false}
                                                />
                                            </View>
                                            <View style={styles.input}>
                                                <Icon name="mail-ru" size={30} color="#555"/>
                                                <TextInput
                                                    placeholderTextColor="#555"
                                                    onChangeText={(value) => this.changeEmail(value)}
                                                    style={styles.focus}
                                                    value={this.state.email}
                                                    keyboardType="email-address"
                                                    placeholder="Votre Email"
                                                    returnKeyType={"next"}
                                                    onSubmitEditing={() => {
                                                        this.thirdTextInput.focus();
                                                    }}
                                                    blurOnSubmit={false}
                                                />
                                            </View>
                                            <View style={styles.input}>
                                            <Icon name="phone" size={30} color="#555"/>
                                                <TextInput style={styles.focus}
                                                        placeholder="Numéro de téléphone"
                                                        placeholderTextColor='#fff'
                                                        value={this.state.numero.toString()}
                                                        keyboardType="phone-pad"
                                                        ref={(input) => {
                                                            this.thirdTextInput = input;
                                                        }}
                                                        onChangeText={(value)=>this.changeNumber(value)}
                                                        returnKeyType={"next"}
                                                        onSubmitEditing={() => {
                                                            this.fourTextInput.focus();
                                                        }}
                                                        blurOnSubmit={false}/>
                                            </View>
                                            <View style={styles.input}>
                                                <Icon name="map-marker-radius" size={30} color="#555"/>
                                                <TextInput
                                                    placeholderTextColor="#555"
                                                    onChangeText={(value) => this.changeVille(value)}
                                                    style={styles.focus}
                                                    value={this.state.ville}
                                                    keyboardType="default"
                                                    placeholder="Votre Ville"
                                                    ref={(input) => {
                                                        this.fourTextInput = input;
                                                    }}
                                                    returnKeyType={"next"}
                                                    onSubmitEditing={() => {
                                                        this.fiveTextInput.focus();
                                                    }}
                                                    blurOnSubmit={false}
                                                />
                                            </View>
                                            <View style={styles.input}>
                                                <Icon name="home-city" size={30} color="#555"/>
                                                <TextInput
                                                    placeholderTextColor="#555"
                                                    onChangeText={(value) => this.changeCommune(value)}
                                                    style={styles.focus}
                                                    keyboardType="default"
                                                    placeholder="Votre Commune"
                                                    value={this.state.communes}
                                                    ref={(input) => {
                                                        this.fiveTextInput = input;
                                                    }}
                                                    returnKeyType={"next"}
                                                    onSubmitEditing={() => {
                                                        this.sixTextInput.focus();
                                                    }}
                                                    blurOnSubmit={false}
                                                />
                                            </View>
                                            <TouchableOpacity style={styles.inputs} title="Date de Naissance" onPress={this.showDateTimePicker} >
                                                <Icon name="calendar" size={30} color="#555"/>
                                                <Text style={{color:"#000", width:"73%", textAlign: "center", marginLeft:15, borderBottomColor:"#4dbcc7",borderBottomWidth:1}}>{(this.state.chosenDate === "")? this.state.info.date : this.state.chosenDate}</Text>
                                            </TouchableOpacity>
                                            <DateTimePicker
                                                mode="date"
                                                datePickerModeAndroid="spinner"
                                                isVisible={this.state.isDateTimePickerVisible}
                                                onConfirm={this.handleDatePicked}
                                                onCancel={this.hideDateTimePicker}
                                            />
                                            <View style={styles.input}>
                                                <Icon name="textbox-password" size={30} color="#555"/>
                                                <TextInput
                                                    onChangeText={(value) => this.changePass(value)}
                                                    placeholderTextColor="#555"
                                                    style={styles.focus}
                                                    secureTextEntry
                                                    ref={(input) => {
                                                        this.sixTextInput = input;
                                                    }}
                                                    placeholder="Mot de passe"
                                                    returnKeyType={"next"}
                                                    onSubmitEditing={() => {
                                                        this.sevenTextInput.focus();
                                                    }}
                                                    blurOnSubmit={false}
                                                />
                                            </View>
                                            
                                            <TouchableOpacity onPress={this._onDone} style={styles.connect}>
                                                {(this.state.showRealApp)? <Spinner color="#555"/>: <Image style={styles.connectImg}
                                                    source={require('../assets/images/connecter.png')}/>}
                                            </TouchableOpacity>
                                            <View style={{height:55}}>
    
                                            </View>
                                        </ScrollView>
                                    
                        </View>
                        <View style={{paddingTop:40, width: "100%"}}>
                            <Text style={styles.title}>Confidentiel</Text>
                            <ScrollView style={{paddingLeft:25, paddingRight:25}}>
                                            <View style={styles.input}>
                                                <Icon name="textbox-password" size={30} color="#555"/>
                                                <TextInput
                                                    onChangeText={(value) => this.changePass(value)}
                                                    placeholderTextColor="#555"
                                                    style={styles.focus}
                                                    secureTextEntry

                                                    placeholder="Ancien mot de passe"
                                                    
                                                />
                                            </View>
                                            <View style={styles.input}>
                                                <Icon name="textbox-password" size={30} color="#555"/>
                                                <TextInput
                                                    onChangeText={(value) => this.changeNewPass(value)}
                                                    placeholderTextColor="#555"
                                                    style={styles.focus}
                                                    secureTextEntry
                                                    placeholder="Nouveau mot de passe"
                                                />
                                            </View>
                                            <View style={styles.input}>
                                                <Icon name="textbox-password" size={30} color="#555"/>
                                                <TextInput
                                                    onChangeText={(value) => this.changePassConf(value)}
                                                    placeholderTextColor="#555"
                                                    style={styles.focus}
                                                    secureTextEntry
                                                    placeholder="Confirmez mot de passe"
                                                />
                                            </View>
                                            
                                            <TouchableOpacity onPress={this._onDoneChangePass} style={styles.connect}>
                                                {(this.state.showRealApp)? <Spinner color="#555"/>: <Image style={styles.connectImg}
                                                    source={require('../assets/images/connecter.png')}/>}
                                            </TouchableOpacity>
                                        
                                            <TouchableOpacity onPress={()=>this._onDoneLogout()} style={styles.inscription}>
                                                <Image style={styles.signinImg} source={require('../assets/images/decoo.png')}/>
                                            </TouchableOpacity>
                                            <View style={{height:55}}>
    
                                            </View>
                                        </ScrollView>
                                    
                        </View>
                    </ScrollView>
                </View>
            )
        }
        else if(this.state.isPhoto && this.state.hasCameraPermission === false){
            return (<View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
                <Text>Aucun Accès à la camera n'a été donnée</Text>
            </View>);
        }
        else{
            return(<View style={{ flex: 1 }}>
            <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
          }}>
          <View style={{marginTop: 222, height:70, marginLeft:40,marginRight:40,backgroundColor:"#fff", alignItems:"center",justifyContent:"center"}}>
            <View>
            <ActivityIndicator color="#4dbcc7" />
              <Text>Chargement de la photo</Text>
            </View>
          </View>
        </Modal>
            <View style={{ flex: 1, backgroundColor:"#000", alignItems:"center", justifyContent:"space-around" }}>
            <MyCustomLeftComponentTwo close={this.closePhoto} />
            <Text style={{color:"#fff"}}>Allô Santé Express Camera</Text>
            </View>
                <Camera style={{ flex: 6, justifyContent:"flex-end" }} type={this.state.type}
                    ref={ref => {
                    this.camera = ref;
                }}>
                  
                </Camera>
                <View style={{ flex: 1,backgroundColor:'#000000', justifyContent:"flex-end" }}>
                <View
                    style={{
                      height:70,
                      padding:10,
                      backgroundColor: 'transparent',
                    }}>
                    <TouchableOpacity
                      style={{
                        height:40,
                        position:"absolute",
                        left:10,
                        top:10,
                        alignItems: 'center',
                        justifyContent:"center"
                      }}
                      onPress={() => {
                        this.setState({
                          type:
                            this.state.type === Camera.Constants.Type.back
                              ? Camera.Constants.Type.front
                              : Camera.Constants.Type.back,
                        });
                      }}>
                      <Icon name="rotate-3d" color="#fff"
                  size={35} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        height:40,
                        position:"absolute",
                        left:"49%",
                        top:10,
                        alignItems: 'center',
                        justifyContent:"center"
                      }}
                      onPress={async () => {
                    if (this.camera) {
                        this.setModalVisible(true);
                        let photo = await this.camera.takePictureAsync({base64:true});
                        this.setState(
                            {
                                profil: { uri: `data:image/jpg;base64,${photo.base64}` },
                                isPhoto:false,
                            },()=>{
                                suiveur = 1;
                                this.setModalVisible(false);
                                this.socket.emit("change photo", {profil:this.state.profil.uri, ident: this.state.info.ident});
                            }
                        )
                    

                    }
                    }}>
                      <Icon name="camera-iris" color="#fff"
                  size={35} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>);
        }
        
    }
}
const styles = StyleSheet.create({
    blocus:{
        backgroundColor: "#fff",
        elevation:2,
        padding:7,
    },
    Item:{
        height:30,
        flexDirection:"row",
        alignItems:"center",
        marginBottom:5
        /*borderBottomWidth:1,
        borderBottomColor:"#999"*/
    },
    textItem:{
        marginLeft:15,
    },
    iconOptions:{
        position:"absolute",
        right:10,
        top:"40%",
    },
    title:{
        color:"#888",
        fontSize:16,
        fontWeight:"800",
        marginLeft: 18,
        marginBottom: 5,
    },
    imagBg:{
        width:"100%",
        height:150
    },
    IconPhoto:{
        position:"absolute",
        right:5,
        bottom:15,
    },
    imagProfil:{
        position:"absolute",
        backgroundColor:"#fff",
        alignItems:"center",
        justifyContent:"center",
        left:"35%",
        bottom:15,
        width:110,
        height:110,
        borderRadius:100,
    },
    inputs:{
        marginTop:25,
        paddingLeft:15,
        borderRadius:100,
        height: 50,
        flexDirection:'row',
        alignItems:"center",
    },
    input:{
        marginTop:25,
        paddingLeft:15,
        borderRadius:100,
        height: 50,
        flexDirection:'row',
        alignItems:"center"
    },
    focus:{
        color:"#000",
        width:"70%",
        marginLeft:20,
        borderBottomWidth: 1,
        borderBottomColor:"#4dbcc7",
        backgroundColor: "transparent",
    },
    connectImg:{
        height:80,
        width:80,
    },
    connect:{
        height:60,
        width:"100%",
        alignItems:"center",
        justifyContent:"center",
    },
    focus2:{
        color:"#000",
        width:"59%",
        marginLeft:20,
        borderBottomWidth: 1,
        borderBottomColor:"#4dbcc7",
        borderWidth: 0,
        backgroundColor: "transparent",
    },
    signinImg:{
        height:60,
        width:270,
    },
    inscription:{
        height:80,
        width:"100%",
        alignItems:"center",
        justifyContent:"center",
    },
})