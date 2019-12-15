import React from 'react';
import {View,TextInput,ScrollView, Text, StyleSheet, StatusBar, SafeAreaView, Keyboard, Image, TouchableOpacity,KeyboardAvoidingView,ImageBackground,TouchableWithoutFeedback, Alert, Modal, ActivityIndicator} from 'react-native';
import {Left, ListItem, Radio, Right, Spinner, Picker} from "native-base";
import DateTimePicker from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
window.navigator.userAgent = "react-native";
import {socketLink} from '../ServiceWorker/helper';
import io from "socket.io-client/dist/socket.io";
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
const MyCustomLeftComponent = (props) => {
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
export default class intPharmaSeco extends React.Component{
    constructor(props){
        super(props)
        this.state={
            hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    carteGrise:"",
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
            modalVisible:false,
            trueDates:"",
            trueDate:"",
            chosenDates:"",
            numero:"",
            email:"",
            nameUsage:"",
            commune:[],
            password:"",
            confpassword:"",
            load:0,
            dureeContrat:"",
            immatriculation:"",
            profession:"",
            nationnalite:"",
            typeCarte:"",
            marque:"",
            numeroChassis:"",
            puissance:"",
            energie:"",
            numberPlace:"",
            numberPassager:"",
            pv:"",
            ptac:"",
            cu:"",
        }
        this.socket = io(socketLink,{jsonp:true});
        this.onValueGenre = this.onValueGenre.bind(this);
        this.onValueCarosserie = this.onValueCarosserie.bind(this);
        this.onValueGaranties = this.onValueGaranties.bind(this);
        this.onPrefixChange = this.onPrefixChange.bind(this);
    }

    takeCirconstanceCamera(){
        this.setState({
            load:8,
        }, async ()=>{
            const { status } = await Permissions.askAsync(Permissions.CAMERA);
            this.setState({ hasCameraPermission: status === 'granted' });
        })
    }
    takeCirconstanceCameraTwo(){
        this.setState({
            load:6,
        }, async ()=>{
            const { status } = await Permissions.askAsync(Permissions.CAMERA);
            this.setState({ hasCameraPermission: status === 'granted' });
        })
    }

    closePhoto = ()=>{
        this.setState({
            load:2,
        })
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
        this.setState({ load: parseInt(this.props.navigation.state.params.inter,10)
        });
        StatusBar.setHidden(true);
    }

    setDate = (newDate)=>{
        this.setState({ chosenDate: newDate });
    }
    _onDone = async () => {
        this.setState({
            showRealApp:true
        });
        let envv = true;
        let data = {name:this.state.name,numero:this.state.numero,durrerContrat:this.state.dureeContrat,address:this.state.ville+ "/"+this.state.commune, immatriculation: this.state.immatriculation,firstname: this.state.firstname,sexe: (this.state.horo == 0) ? "Homme": "Femme",email:this.state.email,typeCarte:this.state.typeCarte, profession:this.state.profession,nationnalite:this.state.nationnalite,effetContrat:this.state.chosenDate,marque:this.state.marque,genre:this.state.genre,chasis:this.state.numeroChassis,puissanceVehicule:this.state.puissance,energie:this.state.energie,nombreDePlace:this.state.numberPlace,nombreDePassager:this.state.numberPassager,cassorie:this.state.carosserie,pv:this.state.pv,ptac:this.state.ptac,cu:this.state.cu,garantie:this.state.garanties,profil:this.state.carteGrise.uri}
        let leta = Object.entries(data);

        for(let i in leta){
            if(leta[i][1]==""){
                envv = false;
                break;
            }
        }

            if(envv){
                this.socket.emit("assAutoV", data);
                        this.setState({
                                showRealApp:false,
                            });
                            Alert.alert('Reussie', "La redaction de votre assurance à été prise en compte")
                            this.props.navigation.goBack();
            }
            else{
                this.setState({
                    showRealApp:false
                })
                Alert.alert("Erreur", "Veuillez remplir tous les champs correctement")
            }
        
    }

    _onDoneInscriptioon = async () => {
        this.setState({
            showRealApp:true
        });
        let envv = true;
        let data = {name:this.state.name,numero:this.state.numero,durrerContrat:this.state.dureeContrat,address:this.state.ville+ "/"+this.state.commune, immatriculation: this.state.immatriculation,firstname: this.state.firstname,sexe: (this.state.horo == 0) ? "Homme": "Femme",email:this.state.email,typeCarte:this.state.typeCarte, profession:this.state.profession,nationnalite:this.state.nationnalite,effetContrat:this.state.chosenDate,marque:this.state.marque,genre:this.state.genre,chasis:this.state.numeroChassis,puissanceVehicule:this.state.puissance,energie:this.state.energie,nombreDePlace:this.state.numberPlace, garantie:this.state.garanties,profil: this.state.carteGrise.uri,numeroSe:this.state.numberSec,premierImmatriculation:this.state.chosenDates}
        let leta = Object.entries(data);
        for(let i in leta){
            if(leta[i][1]==""){
                envv = false;
                break;
            }
        }
            if(envv){
                this.socket.emit("assAutoM", data);
                        this.setState({
                                modalVisible:true,
                                showRealApp:false,
                            });
                            Alert.alert('Reussie', "La redaction de votre assurance à été prise en compte")
                            this.props.navigation.goBack();
            }
            else{
                this.setState({
                    showRealApp:false
                })
                Alert.alert("Erreur", "Veuillez remplir tous les champs correctement")
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
    
    changeContrat(value){
        this.setState({
            dureeContrat:value
        })
    }
    changeImmatriculation(value){
        this.setState({
            immatriculation:value
        })
    }
    changeTypeCarte(value){
        this.setState({
            typeCarte:value
        })
    }
    changeMarque(value){
        this.setState({
            marque:value
        })
    }
    changeNumeroChassis(value){
        this.setState({
            numeroChassis:value
        })
    }
    changePuissance(value){
        this.setState({
            puissance:value
        })
    }
    changeEnergie(value){
        this.setState({
            energie:value
        })
    }
    changeNumberPlace(value){
        this.setState({
            numberPlace:value
        })
    }
    changePassager(value){
        this.setState({
            numberPassager:value
        })
    }
    changePV(value){
        this.setState({
            pv:value
        })
    }
    changePTAC(value){
        this.setState({
            ptac:value
        })
    }
    changeCU(value){
        this.setState({
            cu:value
        })
    }
    changeProfession(value){
        this.setState({
            profession:value
        })
    }
    changeNationnalite(value){
        this.setState({
            nationnalite:value
        })
    }
    changeVille(value){
        this.setState({
            ville:value
        })
    }
    changeSecond(value){
        this.setState({
            numberSec:value
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
        
        else if(this.state.load === 2) {
            return (
                <SafeAreaView style={styles.container}>
                    <KeyboardAvoidingView style={styles.container}>
                        <TouchableWithoutFeedback style={styles.container}
                                                  onPress={Keyboard.dismiss}>
                            <ImageBackground source={require('../assets/images/auto_moto.png')} style={styles.containers}>
                            <MyCustomLeftComponent navigation={this.props.navigation}/>
                            <Text style={styles.enTete}> Assurance Auto </Text>

                                <ScrollView>
                                <View style={{width:"80%", height:50}}>

                                </View>
                                <View style={{alignItems:"center", justifyContent:"center"}}>
                                <TouchableOpacity onPress={()=>this.takeCirconstanceCamera()} style={styles.inscription}>
                                        {(this.state.carteGrise !="")?  <View style={{flexDirection:"row", flex:1, alignItems:"center", justifyContent:"space-around"}}><Image source={this.state.carteGrise} style={{width:80,height:80,borderRadius:100}} /><Icon name="check" color="#009688" size={50}/></View>:<View style={{flex:1, alignItems:"center", justifyContent:"space-around"}}><Icon name="camera" color="#4dbcc7" size={50} /><Text style={{color:"#4dbcc7", fontWeight:"bold"}}>Photo de la carte grise</Text></View>}
                                    </TouchableOpacity>
                                    <View style={styles.input}>
                                        <Icon name="account" size={30} color="#4dbcc7"/>
                                        <TextInput
                                            placeholderTextColor="#555"
                                            onChangeText={(value) => this.changeName(value)}
                                            style={styles.focus}
                                            keyboardType="default"
                                            placeholder="Votre Nom"
                                            
                                        />
                                    </View>
                                    <View style={styles.input}>
                                        <Icon name="account" size={30} color="#4dbcc7"/>
                                        <TextInput
                                            onChangeText={(value) => this.changeFirstName(value)}
                                            placeholderTextColor="#555"
                                            style={styles.focus}
                                            
                                            placeholder="Votre Prénom"
                                        />
                                    </View>
                                    <View style={styles.input}>
                                        <Icon name="home" size={30} color="#4dbcc7"/>
                                        <TextInput
                                            onChangeText={(value) => this.changeNationnalite(value)}
                                            placeholderTextColor="#555"
                                            style={styles.focus}
                                            
                                            placeholder="Nationalité"
                                        />
                                    </View>
                                    <View style={styles.input}>
                                        <Icon name="account-group" size={30} color="#4dbcc7"/>
                                        <TextInput
                                            onChangeText={(value) => this.changeProfession(value)}
                                            placeholderTextColor="#555"
                                            style={styles.focus}
                                            
                                            placeholder="Profession"
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
                                        <Icon name="mail-ru" size={30} color="#4dbcc7"/>
                                        <TextInput
                                            placeholderTextColor="#555"
                                            onChangeText={(value) => this.changeEmail(value)}
                                            style={styles.focus}
                                            keyboardType="email-address"
                                            placeholder="Votre Email"
                                            
                                        />
                                    </View>
                                    <View style={styles.input}>
                                    <Icon name="phone" size={30} color="#4dbcc7"/>

                                        <TextInput style={styles.focus}
                                                   placeholder="Entrer votre numéro"
                                                   placeholderTextColor='#555'
                                                   onChangeText={(value) => this.changeNumber(value)}

                                                   keyboardType="phone-pad"
                                                   />
                                    </View>
                                    <View style={styles.input}>
                                        <Icon name="home-city" size={30} color="#4dbcc7"/>
                                        <TextInput
                                            placeholderTextColor="#555"
                                            onChangeText={(value) => this.changeVille(value)}
                                            style={styles.focus}
                                            keyboardType="default"
                                            placeholder="Votre Ville"
                                            
                                        />
                                    </View>
                                    <View style={styles.input}>
                                        <Icon name="map-marker-radius" size={30} color="#4dbcc7"/>
                                        <TextInput
                                            placeholderTextColor="#555"
                                            onChangeText={(value) => this.changeCommune(value)}
                                            style={styles.focus}
                                            keyboardType="default"
                                            placeholder="Votre Commune"
                                            
                                        />
                                    </View>
                                    <TouchableOpacity style={styles.input} onPress={this.showDateTimePicker} >
                                        <Icon name="calendar" size={30} color="#4dbcc7"/>
                                        <Text style={{color:"#4dbcc7", textAlign: "center", marginLeft:15}}>{(this.state.chosenDate === "")? "Date effet  du contrat d’assurance" : this.state.chosenDate}</Text>
                                    </TouchableOpacity>
                                    <DateTimePicker
                                        mode="date"
                                        datePickerModeAndroid="spinner"
                                        isVisible={this.state.isDateTimePickerVisible}
                                        onConfirm={this.handleDatePicked}
                                        onCancel={this.hideDateTimePicker}
                                    />
                                    <View style={styles.input}>
                                        <Icon name="calendar" size={30} color="#4dbcc7"/>
                                        <TextInput
                                            placeholderTextColor="#555"
                                            onChangeText={(value) => this.changeContrat(value)}
                                            style={styles.focus}
                                            keyboardType="phone-pad"
                                            placeholder="Duree du contrat"
                                        
                                        />
                                    </View>
                                    <View style={styles.input}>
                                        <Icon name="calendar" size={30} color="#4dbcc7"/>
                                        <TextInput
                                            placeholderTextColor="#555"
                                            onChangeText={(value) => this.changeImmatriculation(value)}
                                            style={styles.focus}
                                            keyboardType="default"
                                            placeholder="Immatriculation"
                                        
                                        />
                                    </View>
                                    <View style={styles.input}>
                                    <Icon name="car" size={30} color="#4dbcc7"/>

                                        <TextInput
                                            placeholderTextColor="#555"
                                            onChangeText={(value) => this.changeTypeCarte(value)}
                                            style={styles.focus}
                                            keyboardType="default"
                                            placeholder="Type(sur la carte grise) "
                                        
                                        />
                                    </View>
                                    <View style={styles.input}>
                                    <Icon name="car" size={30} color="#4dbcc7"/>

                                        <TextInput
                                            placeholderTextColor="#555"
                                            onChangeText={(value) => this.changeMarque(value)}
                                            style={styles.focus}
                                            keyboardType="default"
                                            placeholder="Marque(sur la carte grise) "
                                        
                                        />
                                    </View>
                                    <View style={styles.input}>
                                    <Picker
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-down" />}
                                                placeholder="Genre vehicule"
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
                                                onValueChange={this.onValueGenre}
                                            >

                                               <Picker.Item label="Genre vehicule" value="Genre vehicule" />
                                                <Picker.Item label="fourgonnette" value="fourgonnette" />
                                                <Picker.Item label="remorque" value="remorque" />
                                                <Picker.Item label="semi-remorque" value="semi-remorque" />
                                                <Picker.Item label="taxi ville" value="taxi ville" />
                                                <Picker.Item label="tracteur" value="tracteur" />
                                                <Picker.Item label="tricycle" value="tricycle" />
                                                <Picker.Item label="vie privée et affaire" value="vie privée et affaire" />
                                           </Picker>
                                    </View>
                                    <View style={styles.input}>
                                    <Icon name="car" size={30} color="#4dbcc7"/>
                                        <TextInput
                                            placeholderTextColor="#555"
                                            onChangeText={(value) => this.changeNumeroChassis(value)}
                                            style={styles.focus}
                                            keyboardType="default"
                                            placeholder="Numero de chassis ou de serie(carte grise)"
                                        />
                                    </View>
                                    <View style={styles.input}>
                                    <Icon name="car" size={30} color="#4dbcc7"/>
                                        <TextInput
                                            placeholderTextColor="#555"
                                            onChangeText={(value) => this.changePuissance(value)}
                                            style={styles.focus}
                                            keyboardType="default"
                                            placeholder="Puissance du vehicule(carte grise)"
                                        
                                        />
                                    </View>
                                    <View style={styles.input}>
                                    <Icon name="car" size={30} color="#4dbcc7"/>
                                        <TextInput
                                            placeholderTextColor="#555"
                                            onChangeText={(value) => this.changeEnergie(value)}
                                            style={styles.focus}
                                            keyboardType="default"
                                            placeholder="Energie(essence ou diesel)"
                                        
                                        />
                                    </View>
                                    <View style={styles.input}>
                                        <Icon name="motorbike" size={30} color="#4dbcc7"/>
                                        <TextInput
                                            placeholderTextColor="#555"
                                            onChangeText={(value) => this.changeNumberPlace(value)}
                                            style={styles.focus}
                                            keyboardType="phone-pad"
                                            placeholder="Nbr de place :"
                                        />
                                    </View>
                                    <View style={styles.input}>
                                        <Icon name="motorbike" size={30} color="#4dbcc7"/>
                                        <TextInput
                                            placeholderTextColor="#555"
                                            onChangeText={(value) => this.changePassager(value)}
                                            style={styles.focus}
                                            keyboardType="phone-pad"
                                            placeholder="Nbr de passager(carte grise)"
                                        />
                                    </View>
                                    <View style={styles.input}>
                                    <Picker
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-down" />}
                                                placeholder="Carosserie"
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
                                                selectedValue={this.state.carosserie}
                                                onValueChange={this.onValueCarosserie}
                                            >

                                               <Picker.Item label="Carosserie" value="Carosserie" />
                                                <Picker.Item label="Ambulance" value="Ambulance" />
                                                <Picker.Item label="Arroseuse" value="Arroseuse" />
                                                <Picker.Item label="autocar" value="autocar" />
                                                <Picker.Item label="bachee" value="bachee" />
                                                <Picker.Item label="balayeuse" value="balayeuse" />
                                                <Picker.Item label="benne" value="benne" />
                                                <Picker.Item label="berline" value="berline" />

                                                <Picker.Item label="breack" value="breack" />
                                                <Picker.Item label="cabriolet" value="cabriolet" />
                                                <Picker.Item label="catepillar" value="catepillar" />
                                                <Picker.Item label="conducteur 2 portes" value="conducteur 2 portes" />
                                                <Picker.Item label="conducteur 4 portes" value="conducteur 4 portes" />
                                                <Picker.Item label="citerne" value="citerne" />
                                                <Picker.Item label="corbillard" value="corbillard" />
                                                <Picker.Item label="cyclomoteur" value="cyclomoteur" />

                                                <Picker.Item label="familial" value="familial" />
                                                <Picker.Item label="fardier" value="fardier" />
                                                <Picker.Item label="fourchette" value="fourchette" />
                                                <Picker.Item label="fourgon" value="fourgon" />
                                                <Picker.Item label="fourgon funeraire" value="fourgon funeraire" />
                                                <Picker.Item label="goudronneuse" value="goudronneuse" />
                                                <Picker.Item label="marque vehicule" value="marque vehicule" />
                                                <Picker.Item label="mini bus" value="mini bus" />

                                                <Picker.Item label="p/r" value="p/r" />
                                                <Picker.Item label="pick up" value="pick up" />
                                                <Picker.Item label="plateau" value="plateau" />
                                                <Picker.Item label="porte char" value="porte char" />
                                                <Picker.Item label="pour semi-remorque" value="pour semi-remorque" />
                                                <Picker.Item label="tracteur agricole" value="tracteur agricole" />
                                                <Picker.Item label="tracteur routier" value="tracteur routier" />
                                                <Picker.Item label="trvaux  indistruel" value="trvaux  indistruel" />
                                                <Picker.Item label="voiture de vidange" value="voiture de vidange" />
                                           </Picker>
                                    </View>
                                    <View style={styles.input}>
                                    <Icon name="car" size={30} color="#4dbcc7"/>
                                        <TextInput
                                            placeholderTextColor="#555"
                                            onChangeText={(value) => this.changePV(value)}
                                            style={styles.focus}
                                            keyboardType="default"
                                            placeholder="PV : (carte grise)"
                                        
                                        />
                                    </View>
                                    <View style={styles.input}>
                                        <Icon name="car" size={30} color="#4dbcc7"/>
                                        <TextInput
                                            placeholderTextColor="#555"
                                            onChangeText={(value) => this.changePTAC(value)}
                                            style={styles.focus}
                                            keyboardType="default"
                                            placeholder="PTAC :carte grise"
                                        
                                        />
                                    </View>
                                    <View style={styles.input}>
                                        <Icon name="car" size={30} color="#4dbcc7"/>
                                        <TextInput
                                            placeholderTextColor="#555"
                                            onChangeText={(value) => this.changeCU(value)}
                                            style={styles.focus}
                                            keyboardType="default"
                                            placeholder="CU :crte grise"
                                        
                                        />
                                    </View>
                                    <View style={styles.input}>
                                    <Picker
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-down" />}
                                                placeholder="Garanties"
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
                                                selectedValue={this.state.garanties}
                                                onValueChange={this.onValueGaranties}
                                            >

                                               <Picker.Item label="Garanties" value="Garanties" />
                                                <Picker.Item label="responsabilité civile" value="responsabilité civile" />
                                                <Picker.Item label="defense et recours" value="defense et recours" />
                                                <Picker.Item label="individuelle(obligtoirement)" value="individuelle(obligtoirement)" />
                                                <Picker.Item label="avance sur recours ou recours anticipé" value="avance sur recours ou recours anticipé" />
                                                <Picker.Item label="bris de glace" value="bris de glace" />
                                                <Picker.Item label="vol" value="vol" />
                                                <Picker.Item label="vol attaque à main armé" value="vol attaque à main armé" />
                                               <Picker.Item label="vol accessoire" value="vol accessoire" />
                                                <Picker.Item label="incendie" value="incendie" />
                                                <Picker.Item label="dommage tout accident" value="dommage tout accident" />
                                                <Picker.Item label="dommage tierce collision" value="dommage tierce collision" />
                                                <Picker.Item label="assistance a reparation( à cocher) à partir de 3 mois d’assurance" value="assistance a reparation( à cocher) à partir de 3 mois d’assurance" />
                                           </Picker>
                                        
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
                                    carteGrise: { uri: `data:image/jpg;base64,${photo.base64}` },
                                    load:2,
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
        else if(this.state.load == 6){
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
                                    carteGrise: { uri: `data:image/jpg;base64,${photo.base64}` },
                                    load:5,
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
        else if(this.state.load === 5) {
            return (
                <SafeAreaView style={styles.container}>
                    <KeyboardAvoidingView style={styles.container}>
                        <TouchableWithoutFeedback style={styles.container}
                                                  onPress={Keyboard.dismiss}>
                            <ImageBackground source={require('../assets/images/auto_moto.png')} style={styles.containers}>
                            <MyCustomLeftComponent navigation={this.props.navigation}/>
                            <Text style={styles.enTete}> Assurance Moto </Text>
                                <ScrollView>
                                <View style={{width:"80%", height:50}}>

                                </View>
                                <View style={{alignItems:"center", justifyContent:"center"}}>
                                <TouchableOpacity onPress={()=>this.takeCirconstanceCameraTwo()} style={styles.inscription}>
                                        {(this.state.carteGrise !="")?  <View style={{flexDirection:"row", flex:1, alignItems:"center", justifyContent:"space-around"}}><Image source={this.state.carteGrise} style={{width:80,height:80,borderRadius:100}} /><Icon name="check" color="#009688" size={50}/></View>:<View style={{flex:1, alignItems:"center", justifyContent:"space-around"}}><Icon name="camera" color="#4dbcc7" size={50} /><Text style={{color:"#4dbcc7", fontWeight:"bold"}}>Photo de la carte grise</Text></View>}
                                </TouchableOpacity>
                                    <View style={styles.input}>
                                        <Icon name="account" size={30} color="#4dbcc7"/>
                                        <TextInput
                                            placeholderTextColor="#555"
                                            onChangeText={(value) => this.changeName(value)}
                                            style={styles.focus}
                                            keyboardType="default"
                                            placeholder="Votre Nom"
                                            
                                        />
                                    </View>
                                    <View style={styles.input}>
                                        <Icon name="account" size={30} color="#4dbcc7"/>
                                        <TextInput
                                            onChangeText={(value) => this.changeFirstName(value)}
                                            placeholderTextColor="#555"
                                            style={styles.focus}
                                            placeholder="Votre Prénom"
                                        />
                                    </View>
                                    <View style={styles.input}>
                                        <Icon name="mail-ru" size={30} color="#4dbcc7"/>
                                        <TextInput
                                            onChangeText={(value) => this.changeEmail(value)}
                                            placeholderTextColor="#555"
                                            style={styles.focus}
                                            placeholder="Votre Email"
                                        />
                                    </View>
                                    <View style={styles.input}>
                                        <Icon name="home" size={30} color="#4dbcc7"/>
                                        <TextInput
                                            onChangeText={(value) => this.changeNationnalite(value)}
                                            placeholderTextColor="#555"
                                            style={styles.focus}
                                            placeholder="Nationalité"
                                        />
                                    </View>
                                    <View style={styles.input}>
                                        <Icon name="account-group" size={30} color="#4dbcc7"/>
                                        <TextInput
                                            onChangeText={(value) => this.changeProfession(value)}
                                            placeholderTextColor="#555"
                                            style={styles.focus}
                                            placeholder="Profession"
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
                                                   placeholder="Entrer votre numéro"
                                                   placeholderTextColor='#555'
                                                   keyboardType="phone-pad"
                                                   onChangeText={(value)=>this.changeNumber(value)}
                                                   />
                                    </View>
                                    <View style={styles.input}>
                                        <Icon name="phone-plus" size={30} color="#4dbcc7"/>
                                        <TextInput
                                            placeholderTextColor="#555"
                                            onChangeText={(value) => this.changeSecond(value)}
                                            style={styles.focus}
                                            keyboardType="phone-pad"
                                            placeholder="Votre second contact"
                                        />
                                    </View>
                                    <View style={styles.input}>
                                        <Icon name="home-city" size={30} color="#4dbcc7"/>
                                        <TextInput
                                            placeholderTextColor="#555"
                                            onChangeText={(value) => this.changeVille(value)}
                                            style={styles.focus}
                                            keyboardType="default"
                                            placeholder="Adresse geographique(Ville)"
                                            
                                            
                                        />
                                    </View>
                                    <View style={styles.input}>
                                        <Icon name="map-marker-radius" size={30} color="#4dbcc7"/>
                                        <TextInput
                                            placeholderTextColor="#555"
                                            onChangeText={(value) => this.changeCommune(value)}
                                            style={styles.focus}
                                            keyboardType="default"
                                            placeholder="Votre Commune"
                                            
                                        />
                                    </View>
                                    <TouchableOpacity style={styles.input} onPress={this.showDateTimePicker} >
                                        <Icon name="calendar" size={30} color="#4dbcc7"/>
                                        <Text style={{color:"#4dbcc7", textAlign: "center", marginLeft:15}}>{(this.state.chosenDate === "")? "Date effet  du contrat d’assurance" : this.state.chosenDate}</Text>
                                    </TouchableOpacity>
                                    <DateTimePicker
                                        mode="date"
                                        datePickerModeAndroid="spinner"
                                        isVisible={this.state.isDateTimePickerVisible}
                                        onConfirm={this.handleDatePicked}
                                        onCancel={this.hideDateTimePicker}
                                    />
                                    <View style={styles.input}>
                                        <Icon name="calendar-search" size={30} color="#4dbcc7"/>
                                        <TextInput
                                            placeholderTextColor="#555"
                                            onChangeText={(value) => this.changeContrat(value)}
                                            style={styles.focus}
                                            keyboardType="phone-pad"
                                            placeholder="Duree du contrat"
                                        
                                        />
                                    </View>
                                    <View style={styles.input}>
                                        <Icon name="motorbike" size={30} color="#4dbcc7"/>
                                        <TextInput
                                            placeholderTextColor="#555"
                                            onChangeText={(value) => this.changeImmatriculation(value)}
                                            style={styles.focus}
                                            keyboardType="default"
                                            placeholder="Immatriculation"
                                        
                                        />
                                    </View>
                                    <TouchableOpacity style={styles.input} onPress={this.showDateTimePickers} >
                                        <Icon name="calendar" size={30} color="#4dbcc7"/>
                                        <Text style={{color:"#4dbcc7", textAlign: "center", marginLeft:15, width:"70%"}}>{(this.state.chosenDates === "")? "Date de 1ère immatriculation ou date d’achat(carte grise)" : this.state.chosenDates}</Text>
                                    </TouchableOpacity>
                                    <DateTimePicker
                                        mode="date"
                                        datePickerModeAndroid="spinner"
                                        isVisible={this.state.isDateTimePickerVisibles}
                                        onConfirm={this.handleDatePickeds}
                                        onCancel={this.hideDateTimePickers}
                                    />
                                    
                                    <View style={styles.input}>
                                        <Icon name="motorbike" size={30} color="#4dbcc7"/>

                                        <TextInput
                                            placeholderTextColor="#555"
                                            onChangeText={(value) => this.changeTypeCarte(value)}
                                            style={styles.focus}
                                            keyboardType="default"
                                            placeholder="Type(carte grise) "
                                        
                                        />
                                    </View>
                                    <View style={styles.input}>
                                        <Icon name="motorbike" size={30} color="#4dbcc7"/>

                                        <TextInput
                                            placeholderTextColor="#555"
                                            onChangeText={(value) => this.changeMarque(value)}
                                            style={styles.focus}
                                            keyboardType="default"
                                            placeholder="Marque(carte grise) "
                                        
                                        />
                                    </View>
                                    <View style={styles.input}>
                                    <Picker
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-down" />}
                                                placeholder="Genre vehicule"
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
                                                onValueChange={this.onValueGenre}
                                            >

                                               <Picker.Item label="Genre vehicule" value="Genre vehicule" />
                                                <Picker.Item label="fourgonnette" value="fourgonnette" />
                                                <Picker.Item label="remorque" value="remorque" />
                                                <Picker.Item label="semi-remorque" value="semi-remorque" />
                                                <Picker.Item label="taxi ville" value="taxi ville" />
                                                <Picker.Item label="tracteur" value="tracteur" />
                                                <Picker.Item label="tricycle" value="tricycle" />
                                                <Picker.Item label="vie privée et affaire" value="vie privée et affaire" />
                                           </Picker>
                                    </View>
                                    <View style={styles.input}>
                                        <Icon name="motorbike" size={30} color="#4dbcc7"/>
                                        <TextInput
                                            placeholderTextColor="#555"
                                            onChangeText={(value) => this.changeNumeroChassis(value)}
                                            style={styles.focus}
                                            keyboardType="default"
                                            placeholder="Numero de chassis ou de serie(carte grise)"
                                        
                                        />
                                    </View>
                                    <View style={styles.input}>
                                        <Icon name="motorbike" size={30} color="#4dbcc7"/>
                                        <TextInput
                                            placeholderTextColor="#555"
                                            onChangeText={(value) => this.changePuissance(value)}
                                            style={styles.focus}
                                            keyboardType="default"
                                            placeholder="Puissance ou cylindré (attestation d’achat)"
                                        
                                        />
                                    </View>
                                    <View style={styles.input}>
                                        <Icon name="motorbike" size={30} color="#4dbcc7"/>
                                        <TextInput
                                            placeholderTextColor="#555"
                                            onChangeText={(value) => this.changeEnergie(value)}
                                            style={styles.focus}
                                            keyboardType="default"
                                            placeholder="Energie(essence ou diesel)"
                                        
                                        />
                                    </View>
                                    <View style={styles.input}>
                                        <Icon name="motorbike" size={30} color="#4dbcc7"/>
                                        <TextInput
                                            placeholderTextColor="#555"
                                            onChangeText={(value) => this.changeNumberPlace(value)}
                                            style={styles.focus}
                                            keyboardType="phone-pad"
                                            placeholder="Nbr de place :"
                                        />
                                    </View>
                                    <View style={styles.input}>
                                    <Picker
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-down" />}
                                                placeholder="Garanties"
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
                                                selectedValue={this.state.garanties}
                                                onValueChange={this.onValueGaranties}
                                            >

                                               <Picker.Item label="Garanties" value="Garanties" />
                                                <Picker.Item label="responsabilité civile" value="responsabilité civile" />
                                                <Picker.Item label="defense et recours" value="defense et recours" />
                                                <Picker.Item label="individuelle(obligtoirement)" value="individuelle(obligtoirement)" />
                                                <Picker.Item label="avance sur recours ou recours anticipé" value="avance sur recours ou recours anticipé" />
                                                <Picker.Item label="bris de glace" value="bris de glace" />
                                                <Picker.Item label="vol" value="vol" />
                                                <Picker.Item label="vol attaque à main armé" value="vol attaque à main armé" />
                                               <Picker.Item label="vol accessoire" value="vol accessoire" />
                                                <Picker.Item label="incendie" value="incendie" />
                                                <Picker.Item label="dommage tout accident" value="dommage tout accident" />
                                                <Picker.Item label="dommage tierce collision" value="dommage tierce collision" />
                                                <Picker.Item label="assistance a reparation( à cocher) à partir de 3 mois d’assurance" value="assistance a reparation( à cocher) à partir de 3 mois d’assurance" />
                                           </Picker>
                                    </View>
                                </View>
                                    <TouchableOpacity onPress={this._onDoneInscriptioon} style={styles.inscription}>
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