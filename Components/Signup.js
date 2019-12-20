import React from 'react';
import {View,TextInput,ScrollView, Text, StyleSheet, AsyncStorage, StatusBar, SafeAreaView, Keyboard, Image, TouchableOpacity,KeyboardAvoidingView,ImageBackground,TouchableWithoutFeedback, Alert} from 'react-native';
import {getAllVille, signin} from '../ServiceWorker/helper'
import {Left, ListItem, Picker, Radio, Right, Spinner} from "native-base";
import DateTimePicker from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'react-native-web-swiper/build/colors';

export default class Signup extends React.Component{
    constructor(props){
        super(props)
        this.state={
            showRealApp: false,
            selected: undefined,
            totalAd: [],
            horo:0,
            commune:"",
            ville:"",
            prefix:"Prefixe",
            pays:'Votre Pays',
            name:"",
            firstname:"",
            isDateTimePickerVisible: false,
            chosenDate:"",
            numero:"",
            email:"",
            commune:[],
            password:"",
            confpassword:"",
            load:0
        }
        this.onValueChange = this.onValueChange.bind(this);
        this.onPrefixChange = this.onPrefixChange.bind(this);
        this.onPaysChange = this.onPaysChange.bind(this);
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
    onPaysChange(value) {
        this.setState({
            pays: value
        });
    }
    async componentDidMount() {
        const ville = await getAllVille();
        let verif = new Array();
        for(let i in ville){
            verif.push({labelle:ville[i].name,value: ville[i].prefix})
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
        const fd = {labelle:this.state.pays,value:this.state.prefix}
        let pays = false;
        for (let i in this.state.totalAd){
            if (this.state.totalAd[i].labelle === fd.labelle && this.state.totalAd[i].value === fd.value) pays = true;
        }
        
        if(this.state.email.length > 5 && this.state.password.length > 3 && this.state.name.length + this.state.firstname.length > 5 && this.state.numero.length >= 8 && pays ){
            const status = await signin(this.state.email,this.state.password,this.state.numero,this.state.ville + ':' + this.state.commune,this.state.chosenDate.toString(),this.state.name + ' '+ this.state.firstname, this.state.horo, this.state.prefix)
            if(status.etat ){
                AsyncStorage.setItem("identAllo", status.user.ident);
                AsyncStorage.setItem("prefix", status.user.prefix);
                AsyncStorage.setItem("nameAllo", status.user.name);
                AsyncStorage.setItem("newUser", status.user.name);
                AsyncStorage.setItem("address", status.user.address);
                this.props.navigation.navigate('Welcome')
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
    _onDoneInscription = () => {

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
        else {
            return (
                <SafeAreaView style={styles.container}>
                    <KeyboardAvoidingView style={styles.container}>
                        <TouchableWithoutFeedback behavior="padding" style={styles.container}
                                                  onPress={Keyboard.dismiss}>
                            <ImageBackground source={require('../assets/bg.jpg')} style={styles.containers}>
                                <ScrollView style={{paddingLeft:25, paddingRight:35}}>
                                    <View style={styles.input}>
                                        <Icon name="account" size={30} color="#fff"/>
                                        <TextInput
                                            placeholderTextColor="#fff"
                                            onChangeText={(value) => this.changeName(value)}
                                            style={styles.focus}
                                            keyboardType="default"
                                            placeholder="Votre Nom"
                                            returnKeyType={"next"}
                                            onSubmitEditing={() => {
                                                this.secondTextInput.focus();
                                            }}
                                            blurOnSubmit={false}
                                        />
                                    </View>
                                    <View style={styles.input}>
                                        <Icon name="account" size={30} color="#fff"/>
                                        <TextInput
                                            onChangeText={(value) => this.changeFirstName(value)}
                                            placeholderTextColor="#fff"
                                            style={styles.focus}
                                            ref={(input) => {
                                                this.secondTextInput = input;
                                            }}
                                            placeholder="Votre Prénom"
                                        />
                                    </View>
                                    <View style={styles.input}>
                                        <View style={{flex:1}}>
                                            <ListItem onPress={() => this.setState({ horo: 0 })}>
                                                <Left>
                                                    <Text style={{color:"#fff"}}>Masculin</Text>
                                                </Left>
                                                <Right>
                                                    <Radio color={"#e0e0e0"}
                                                           selectedColor={"#fff"} selected={this.state.horo === 0} />
                                                </Right>
                                            </ListItem>
                                        </View>
                                        <View style={{flex:1}}>
                                            <ListItem onPress={() => this.setState({ horo: 1 })}>
                                                <Left>
                                                    <Text style={{color:"#fff"}}>Féminin</Text>
                                                </Left>
                                                <Right>
                                                    <Radio color={"#e0e0e0"}
                                                           selectedColor={"#fff"} selected={this.state.horo === 1} />
                                                </Right>
                                            </ListItem>
                                        </View>
                                    </View>
                                    <View style={styles.input}>
                                        <Icon name="mail-ru" size={30} color="#fff"/>
                                        <TextInput
                                            placeholderTextColor="#fff"
                                            onChangeText={(value) => this.changeEmail(value)}
                                            style={styles.focus}
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
                                    <Picker
                                                mode="dropdown"
                                                placeholder="Votre Pays"
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
                                                selectedValue={this.state.pays}
                                                onValueChange={this.onPaysChange}
                                                ref={(input) => {
                                                    this.thirdTextInput = input;
                                                }}
                                                returnKeyType={"next"}
                                                onSubmitEditing={() => {
                                                    this.fourTextInput.focus();
                                                }}
                                                blurOnSubmit={false}
                                            >
                                                <Picker.Item label="Votre Pays" value="Votre Pays" />
                                                {this.state.totalAd.map((value,index)=><Picker.Item key={index} label={value.labelle} value={value.labelle} />)}
                                            </Picker>
                                        
                                    </View>
                                    <View style={styles.input}>
                                        <View style={{width:"35%"}}>
                                            <Picker
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-down" colors='#ffffff' />}
                                                placeholder="Prefix"
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
                                                selectedValue={this.state.prefix}
                                                onValueChange={this.onPrefixChange}
                                            >
                                                <Picker.Item label="Prefixe" value="prefixe" />
                                                {this.state.totalAd.map((value,index)=><Picker.Item key={index} label={value.value} value={value.value} />)}
                                            </Picker>
                                        </View>
                                        <TextInput style={styles.focus2}
                                                   placeholder="Numéro de téléphone"
                                                   placeholderTextColor='#fff'
                                                   keyboardType="phone-pad"
                                                   ref={(input) => {
                                                       this.fourTextInput = input;
                                                   }}
                                                   onChangeText={(value)=>this.changeNumber(value)}
                                                   returnKeyType={"next"}
                                                   onSubmitEditing={() => {
                                                       this.fiveTextInput.focus();
                                                   }}
                                                   blurOnSubmit={false}/>
                                    </View>
                                    <View style={styles.input}>
                                        <Icon name="map-marker-radius" size={30} color="#fff"/>
                                        <TextInput
                                            placeholderTextColor="#fff"
                                            onChangeText={(value) => this.changeVille(value)}
                                            style={styles.focus}
                                            keyboardType="default"
                                            placeholder="Votre Ville"
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
                                    <View style={styles.input}>
                                        <Icon name="home-city" size={30} color="#fff"/>
                                        <TextInput
                                            placeholderTextColor="#fff"
                                            onChangeText={(value) => this.changeCommune(value)}
                                            style={styles.focus}
                                            keyboardType="default"
                                            placeholder="Votre Commune et quartier"
                                            ref={(input) => {
                                                this.sixTextInput = input;
                                            }}
                                            returnKeyType={"next"}
                                            onSubmitEditing={() => {
                                                this.sevenTextInput.focus();
                                            }}
                                            blurOnSubmit={false}
                                        />
                                    </View>
                                    <TouchableOpacity style={styles.input} title="Date de Naissance" onPress={this.showDateTimePicker} >
                                        <Icon name="calendar" size={30} color="#fff"/>
                                        <Text style={{color:"#fff", textAlign: "center", marginLeft:15}}>{(this.state.chosenDate === "")? "Date de naissance" : this.state.chosenDate}</Text>
                                    </TouchableOpacity>
                                    <DateTimePicker
                                        mode="date"
                                        datePickerModeAndroid="spinner"
                                        isVisible={this.state.isDateTimePickerVisible}
                                        onConfirm={this.handleDatePicked}
                                        onCancel={this.hideDateTimePicker}
                                    />
                                    <View style={styles.input}>
                                        <Icon name="textbox-password" size={30} color="#fff"/>
                                        <TextInput
                                            onChangeText={(value) => this.changePass(value)}
                                            placeholderTextColor="#fff"
                                            style={styles.focus}
                                            secureTextEntry
                                            ref={(input) => {
                                                this.sevenTextInput = input;
                                            }}
                                            placeholder="Mot de passe"
                                            returnKeyType={"next"}
                                            onSubmitEditing={() => {
                                                this.heightTextInput.focus();
                                            }}
                                            blurOnSubmit={false}
                                        />
                                    </View>
                                    <View style={styles.input}>
                                        <Icon name="textbox-password" size={30} color="#fff"/>
                                        <TextInput
                                            onChangeText={(value) => this.changePassConf(value)}
                                            placeholderTextColor="#fff"
                                            style={styles.focus}
                                            secureTextEntry
                                            ref={(input) => {
                                                this.heightTextInput = input;
                                            }}
                                            placeholder="Confirmez mot de passe"
                                        />
                                    </View>
                                    <TouchableOpacity onPress={this._onDone} style={styles.inscription}>
                                        {(this.state.showRealApp)? <Spinner color="#fff"/>: <Image style={styles.signinImg}
                                               source={require('../assets/images/inscription.png')}/>}
                                    </TouchableOpacity>
                                    <View style={{height:25}}>
                                    </View>
                                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('LoginScreen')}} style={styles.inscription}>
                                        <Image style={styles.signinImg} source={require('../assets/images/btcon.png')} />
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
        containers:{
            flex:1,
            alignItems:"center",
            justifyContent:"center"
        },
        containerss:{
            flex:2,
            padding:15,
            alignItems:"center",
            justifyContent:"center"
        },
        input:{
            marginTop:25,
            paddingLeft:15,
            borderRadius:100,
            borderWidth:1,
            borderColor:"#fff",
            height: 50,
            flexDirection:'row',
            alignItems:"center"
        },
        focus:{
            color:"#fff",
            width:"70%",
            marginLeft:20,
            borderWidth: 0,
            backgroundColor: "transparent",
        },
        focus2:{
            color:"#fff",
            width:"59%",
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
            marginBottom:30,
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