import React from 'react';
import {View,TextInput,ScrollView, Text, StyleSheet,Modal,ActivityIndicator, StatusBar, SafeAreaView, Keyboard, Image, TouchableOpacity,KeyboardAvoidingView,ImageBackground,TouchableWithoutFeedback, Alert} from 'react-native';
import {Left, ListItem, Radio, Right, Spinner} from "native-base";
import DateTimePicker from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {socketLink} from '../ServiceWorker/helper';
window.navigator.userAgent = "react-native";
import io from "socket.io-client/dist/socket.io";
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
const MyCustomLeftComponent = (props) =>{
    return (
        <TouchableOpacity style={{position:"absolute", top:0,left:0, width:50, height:50, borderBottomEndRadius:20, backgroundColor:"#000", justifyContent:"center", alignItems:"center"}} onPress={()=>props.navigation.goBack()}>
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
export default class intAssurance extends React.Component{
    constructor(props){
        super(props)
        this.state={
            hasCameraPermission: null,
    type: Camera.Constants.Type.back,
            showRealApp: false,
            selected: undefined,
            totalAd: [],
            passport:"",
            carteGrise:"",
            horo:0,
            commune:"",
            ville:"",
            name:"",
            firstname:"",
            modalVisible:false,
            isDateTimePickerVisible: false,
            isDateTimePickerVisibles: false,
            isDateTimePickerVisibless: false,
            chosenDate:"",
            trueDates:"", 
            trueDatess:"",
            trueDate:"", //effet
            chosenDates:"", //date de naissance
            numero:"",
            numeroSecond:"",
            email:"",
            nameUsage:"",
            paysO:'',
            paysD:'',
            changeNumberDeJours:'',
            load:0,
        }
        this.socket = io(socketLink,{jsonp:true});
        this.onValueChange = this.onValueChange.bind(this);
    }

    takeCirconstanceCamera(){
        this.setState({
            load:8,
        }, async ()=>{
            const { status } = await Permissions.askAsync(Permissions.CAMERA);
            this.setState({ hasCameraPermission: status === 'granted' });
        })
    }
    closePhoto = ()=>{
        this.setState({
            load:4,
        })
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
    onPhoneSecond(value) {
        this.setState({
            numeroSecond: value
        });
    }
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }
    componentWillMount() {
        this.setState({ load: parseInt(this.props.navigation.state.params.inter,10)
        });
        StatusBar.setHidden(false);
    }

    setDate = (newDate)=>{
        this.setState({ chosenDate: newDate });
    }
    _onDoneSante = () => {
            
            this.setState({
                showRealApp:true,
            })
            let data = {name:this.state.name,numero:this.state.numero,nameUsage:this.state.nameUsage,address:this.state.commune, birthDate: this.state.trueDates,firstname: this.state.firstname,sexe: (this.state.horo == 0) ? "Homme": "Femme",email:this.state.email,numeroS:this.state.numeroSecond}

                    if(data.name !== "" && data.numero !== ""){
                        this.socket.emit("ass", data);
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
    _onDoneVoyage = () => {
        this.setState({
            showRealApp:true,
        })
        
                let data = {name:this.state.name,numero:this.state.numero,origine:this.state.paysO,destination:this.state.paysD, birthDate: this.state.chosenDates,firstname: this.state.firstname,sexe: (this.state.horo == 0) ? "Homme": "Femme",changeNumberDeJours:this.state.changeNumberDeJours, passport:this.state.passport.uri};
                if(data.name !== "" && data.numero !== "" && data.origine !== "" && data.destination !== "" && data.passport !== ""){
                    this.socket.emit("assVoyage", data);
                        this.setState({
                            modalVisible:true,
                            isLoad:false,
                            isLoad2:true,
                            showRealApp:false,
                        });
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
    changeNumberDeJours(value){
        this.setState({
            changeNumberDeJours:value
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
    changePaysOrigine(value){
        this.setState({
            paysO:value
        })
    }
    changePaysDest(value){
        this.setState({
            paysD:value
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
    render(){
        if(this.state.load === 0){
            return(
                <View style={{flex:1,alignItems:"center", justifyContent:"center"}}>
                    <Spinner color='#4dbcc7' />
                </View>
            )
        }
        else if(this.state.load === 1) {
            return (
                <SafeAreaView style={styles.container}>
                    <KeyboardAvoidingView style={styles.container}>
                        <TouchableWithoutFeedback style={styles.container}
                                                  onPress={Keyboard.dismiss}>
                            <ImageBackground source={require('../assets/images/sante.png')} style={styles.containers}>
                                <MyCustomLeftComponent navigation={this.props.navigation}/>
                                <Text style={styles.enTete}> Assurance Santé </Text>
                                <ScrollView>
                                <View style={{width:"80%", height:50}}>

                                </View>
                                <View style={{alignItems:"center", justifyContent:"center"}}>
                                    <View style={styles.input}>
                                        <Icon name="account" size={30} color="#4dbcc7"/>
                                        <TextInput
                                            placeholderTextColor="#555"
                                            onChangeText={(value) => this.changeName(value)}
                                            style={styles.focus}
                                            keyboardType="default"
                                            placeholder="Votre Nom(de naissance)"
                                        />
                                    </View>
                                    <View style={styles.input}>
                                        <Icon name="account" size={30} color="#4dbcc7"/>
                                        <TextInput
                                            placeholderTextColor="#555"
                                            onChangeText={(value) => this.changeFirstName(value)}
                                            style={styles.focus}
                                            keyboardType="default"
                                            placeholder="Votre Prénom"
                                        />
                                    </View>
                                    <View style={styles.input}>
                                        <Icon name="account" size={30} color="#4dbcc7"/>
                                        <TextInput
                                            onChangeText={(value) => this.changeNameUsage(value)}
                                            placeholderTextColor="#555"
                                            style={styles.focus}                                            placeholder="Votre Nom d'usage (ex: nom d'épouse)"
                                        />
                                    </View>
                                    <View style={styles.input}>
                                        <View style={{flex:1}}>
                                            <ListItem onPress={() => this.setState({ horo: 0 })}>
                                                <Left>
                                                    <Text style={{color:"#4dbcc7"}}>Masculin</Text>
                                                </Left>
                                                <Right>
                                                    <Radio color={"#e0e0e0"}
                                                           selectedColor={"#4dbcc7"} selected={this.state.horo === 0} />
                                                </Right>
                                            </ListItem>
                                        </View>
                                        <View style={{flex:1}}>
                                            <ListItem onPress={() => this.setState({ horo: 1 })}>
                                                <Left>
                                                    <Text style={{color:"#4dbcc7"}}>Féminin</Text>
                                                </Left>
                                                <Right>
                                                    <Radio color={"#e0e0e0"}
                                                           selectedColor={"#4dbcc7"} selected={this.state.horo === 1} />
                                                </Right>
                                            </ListItem>
                                        </View>
                                    </View>
                                    <View style={styles.input}>
                                    <Icon name="phone" size={30} color="#4dbcc7"/>

                                        <TextInput style={styles.focus}
                                                   placeholder="Numéro (ex:+XXX XXXXXXXX)"
                                                   placeholderTextColor='#555'
                                                   keyboardType="phone-pad"
                                                   onChangeText={(value)=>this.changeNumber(value)}/>
                                    </View>
                                    <View style={styles.input}>
                                        <Icon name="phone-plus" size={30} color="#4dbcc7"/>
                                        <TextInput
                                            placeholderTextColor="#555"
                                            onChangeText={(value) => this.onPhoneSecond(value)}
                                            style={styles.focus}
                                            keyboardType="phone-pad"
                                            placeholder="Votre second contact si possible"
                                        
                                        />
                                    </View>
                                    <View style={styles.input}>
                                        <Icon name="home-currency-usd" size={30} color="#4dbcc7"/>
                                        <TextInput
                                            placeholderTextColor="#555"
                                            onChangeText={(value) => this.changeCommune(value)}
                                            style={styles.focus}
                                            keyboardType="default"
                                            placeholder="Lieu de Naissance"
                                        />
                                    </View>
                                    <TouchableOpacity style={styles.input} title="Date de Naissance" onPress={this.showDateTimePickers} >
                                        <Icon name="calendar" size={30} color="#4dbcc7"/>
                                        <Text style={{color:"#4dbcc7", textAlign: "center", marginLeft:15}}>{(this.state.chosenDates === "")? "Date de naissance" : this.state.chosenDates}</Text>
                                    </TouchableOpacity>
                                    <DateTimePicker
                                        mode="date"
                                        datePickerModeAndroid="spinner"
                                        isVisible={this.state.isDateTimePickerVisibles}
                                        onConfirm={this.handleDatePickeds}
                                        onCancel={this.hideDateTimePickers}
                                    />
                                    <View style={styles.input}>
                                        <Icon name="mail-ru" size={30} color="#4dbcc7"/>
                                        <TextInput
                                            placeholderTextColor="#555"
                                            onChangeText={(value) => this.changeEmail(value)}
                                            style={styles.focus}
                                            keyboardType="email-address"
                                            placeholder="Votre Email"
                                        />
                                    </View>
                                    </View>
                                    <TouchableOpacity onPress={this._onDoneSante} style={styles.inscription}>
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
        else if(this.state.load === 3) {
            return (
                <SafeAreaView style={styles.container}>
                    <KeyboardAvoidingView style={styles.container}>
                        <TouchableWithoutFeedback style={styles.container}
                                                  onPress={Keyboard.dismiss}>
                            <ImageBackground source={require('../assets/images/multirisque.png')} style={styles.containers}>
                            <MyCustomLeftComponent navigation={this.props.navigation}/>
                            <Text style={styles.enTete}> Assurance Multirisque et Habitation  </Text>
                            <View style={styles.containerss}>
                            <TouchableOpacity onPress={this._onDone} style={{width:"80%", height:60, alignItems:"center", justifyContent:"center", backgroundColor:"#4dbcc7", elevation:2,borderRadius:50}}>
            {(this.state.showRealApp)? <Spinner color="#000"/>: <Text style={{color:"#4dbcc7", fontSize:22, color:"#fff"}}>Telecharger le Document</Text>}
                                    </TouchableOpacity>
                            </View>
                            </ImageBackground>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            )
        }
        else if(this.state.load === 4) {
            return (
                <SafeAreaView style={styles.container}>
                    <KeyboardAvoidingView style={styles.container}>
                        <TouchableWithoutFeedback style={styles.container}
                                                  onPress={Keyboard.dismiss}>
                            <ImageBackground source={require('../assets/images/voyage.png')} style={styles.containers}>
                            <MyCustomLeftComponent navigation={this.props.navigation}/>
                            <Text style={styles.enTete}> Assurance Voyage </Text>
                                <ScrollView>
                                <View style={{width:"80%", height:50}}>

                                </View>
                                <View style={{alignItems:"center", justifyContent:"center"}}>
                                    <View style={styles.input}>
                                        <Icon name="account" size={30} color="#4dbcc7"/>
                                        <TextInput
                                            placeholderTextColor="#555"
                                            onChangeText={(value) => this.changeName(value)}
                                            style={styles.focus}
                                            keyboardType="default"
                                            placeholder="Nom"
                                            
                                        />
                                    </View>
                                    <View style={styles.input}>
                                        <Icon name="account" size={30} color="#4dbcc7"/>
                                        <TextInput
                                            onChangeText={(value) => this.changeFirstName(value)}
                                            placeholderTextColor="#555"
                                            placeholder="Prénom"
                                            style={styles.focus}
                                            
                                        />
                                    </View>
                                    <View style={styles.input}>
                                        <View style={{flex:1}}>
                                            <ListItem onPress={() => this.setState({ horo: 0 })}>
                                                <Left>
                                                    <Text style={{color:"#4dbcc7"}}>Masculin</Text>
                                                </Left>
                                                <Right>
                                                    <Radio color={"#e0e0e0"}
                                                           selectedColor={"#4dbcc7"} selected={this.state.horo === 0} />
                                                </Right>
                                            </ListItem>
                                        </View>
                                        <View style={{flex:1}}>
                                            <ListItem onPress={() => this.setState({ horo: 1 })}>
                                                <Left>
                                                    <Text style={{color:"#4dbcc7"}}>Féminin</Text>
                                                </Left>
                                                <Right>
                                                    <Radio color={"#e0e0e0"}
                                                           selectedColor={"#4dbcc7"} selected={this.state.horo === 1} />
                                                </Right>
                                            </ListItem>
                                        </View>
                                    </View>
                                    
                                    <View style={styles.input}>
                                        <Icon name="home-floor-1" size={30} color="#4dbcc7"/>
                                        <TextInput
                                            placeholderTextColor="#555"
                                            onChangeText={(value) => this.changePaysOrigine(value)}
                                            style={styles.focus}
                                            keyboardType="default"
                                            placeholder="Pays d'origine"                                        />
                                    </View>
                                    <View style={styles.input}>
                                        <Icon name="home-floor-2" size={30} color="#4dbcc7"/>
                                        <TextInput style={styles.focus}
                                                   placeholder="Pays de destination"
                                                   placeholderTextColor='#555'
                                                   keyboardType="default"
                                                   onChangeText={(value)=>this.changePaysDest(value)}
                                                   />
                                    </View>
                                    <View style={styles.input}>
                                        <Icon name="calendar" size={30} color="#4dbcc7"/>
                                        <TextInput
                                            placeholderTextColor="#555"
                                            onChangeText={(value) => this.changeNumberDeJours(value)}
                                            style={styles.focus}
                                            keyboardType="phone-pad"
                                            placeholder="Nombres de jours à faire (pays de destination)"
                                        />
                                    </View>
                                    <View style={styles.input}>
                                    <Icon name="phone" size={30} color="#4dbcc7"/>

                                        <TextInput style={styles.focus}
                                                   placeholder="Numéro (ex:+XXX XXXXXXXX)"
                                                   placeholderTextColor='#555'
                                                   keyboardType="phone-pad"
                                                   onChangeText={(value)=>this.changeNumber(value)}
                                                   />
                                    </View>
                                    <TouchableOpacity onPress={()=>this.takeCirconstanceCamera()} style={styles.inscription}>
                                        {(this.state.passport !="")?  <View style={{flexDirection:"row", flex:1, alignItems:"center", justifyContent:"space-around"}}><Image source={this.state.passport} style={{width:80,height:80,borderRadius:100}} /><Icon name="check" color="#009688" size={50}/></View>:<View style={{flex:1, alignItems:"center", justifyContent:"space-around"}}><Icon name="camera" color="#4dbcc7" size={50} /><Text style={{color:"#4dbcc7", fontWeight:"bold"}}>Photo du passeport(la page 02 et 03)</Text></View>}
                                    </TouchableOpacity>
                                
                                    <TouchableOpacity onPress={this._onDoneVoyage} style={styles.inscription}>
                                        {(this.state.showRealApp)? <Spinner color="#4dbcc7"/>: <Image style={styles.signinImg}
                                               source={require('../assets/images/envoyer.png')}/>}
                                    </TouchableOpacity>
                                    </View>
                                    <View style={{height:55}}>

                                    </View>
                                     </ScrollView>
                                     </ImageBackground>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            )
        }
        else if(this.state.load == 8){
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
                    <Camera style={{ flex: 7, justifyContent:"flex-end" }} type={this.state.type}
                        ref={ref => {
                        this.camera = ref;
                    }}>
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
                                    passport: { uri: `data:image/jpg;base64,${photo.base64}` },
                                    load:4,
                                },()=>{
                                    this.setModalVisible(false);
                                }
                            )
                        
    
                        }
                        }}>
                          <Icon name="camera-iris" color="#fff"
                      size={35} />
                        </TouchableOpacity>
                      </View>
                    </Camera>
                  </View>);
            

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
            marginTop:10,
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