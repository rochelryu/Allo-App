import React from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput,
    ToastAndroid,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    SafeAreaView,
    AsyncStorage,
    ImageBackground,
    Image,
    Modal,
    ActivityIndicator,
    Dimensions,
    Button,
    Alert
} from 'react-native';

import {ListItem, Radio, Right, Left, Picker} from 'native-base';
import DateTimePicker from "react-native-modal-datetime-picker";


window.navigator.userAgent = "react-native";
import io from "socket.io-client/dist/socket.io";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {autre, socketLink} from "../ServiceWorker/helper";
const {height} = Dimensions.get('window');
const {width} = Dimensions.get('window');
function elevationShadowStyle(elevation) {
    return {
        elevation,
        shadowColor: '#606060',
        shadowOffset: { width: 15, height: 0.5 * elevation },
        shadowOpacity: 0.5,
        shadowRadius: 0.8 * elevation
    };
}
const MyCustomLeftComponent = (props) =>{
    return (
        <TouchableOpacity style={{position:"absolute", top:0,left:0,width:50,height:50}} onPress={()=>props.navigation.goBack()}>
        </TouchableOpacity>
    );
};

class OutMe extends React.Component{
    constructor(props){
        super(props)
    }
    render() {
        const {changeAge, changeName} = this.props
        return(
            <View>
                <TextInput style={styles.inputs}
                           placeholder="Le nom du concerné"
                           placeholderTextColor='#999'
                           keyboardType ='default'
                           returnKeyType='next'
                           onChangeText={(value)=>changeName(value)}
                           autoCorrect={false}/>
                <TextInput style={styles.inputs}
                           placeholder="Son âge"
                           placeholderTextColor='#999'
                           keyboardType ='phone-pad'
                           returnKeyType='next'
                           onChangeText={(value)=>changeAge(value)}
                           autoCorrect={false}/>
            </View>
        )
    }
}

export default class RvScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            motif:"",
            addresse:"",
            choice:0,
            name: "",
            old: 0,
            selected:"",
            cheked:false,
            isDateTimePickerVisible: false,
            chosenDate:"",
            trueDate:new Date(),
            ident:"",
            horo:0,
            actu:0,
            modalVisible:false,
            isLoad:false,
            isLoad2:false,
            isLoad3:false,
        }
        this.socket = io(socketLink,{jsonp:true})
        this.send =this.send.bind(this);
        this.onValueChange = this.onValueChange.bind(this)
    }
    onValueChange(value) {
        this.setState({
            selected: value
        });
    }
    async componentDidMount() {
        StatusBar.setHidden(true);
        const ident = await AsyncStorage.getItem("identAllo");
        const name = await AsyncStorage.getItem("nameAllo");
        const isMe = await autre(ident);
        this.setState({
            name: name,
            ident:ident,
            totalAd: isMe.rdv,
            isLoad3: true,
        });
    }
    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };
    back(){
        this.setState({
            modalVisible:false,
        }, ()=>{this.props.navigation.navigate('Home')})
    }
    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        const mom = new Date().getTime()/1000;
        const actu = new Date(date).getTime()/1000;
        if((mom - actu) < - 86000){
            this.setState({ trueDate:date,
                chosenDate: date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear() });
            this.hideDateTimePicker();
        }
        else{
            this.hideDateTimePicker();
            Alert.alert('Date indisponible', "Vous ne pouvez que prendre un rendez pour une date ultérieure de demain");
        }
        
    };
    changeAdd = (value)=>{
        if(value.length > 0){
            this.setState({
                addresse:value,
                actu:1
            })
        }
        else{
            this.setState({
                addresse:"",
                actu:0
            })
        }
    }
    changeAge = (value)=>{
        this.setState({
            old:value,
        })
    }
    changeName = (value)=>{
        this.setState({
            name:value,
        })
    }
    async send(){
        this.setState({
            isLoad:true,
            isLoad2:true,
        })
        if(this.state.selected !== "Service médical" && this.state.chosenDate !== "" && this.state.selected !== ""){
            if(this.state.choice === 0){
                let address = (this.state.actu === 0)? await AsyncStorage.getItem('address'): this.state.addresse;
                let horo = (this.state.horo === 0)? "Matinée": "Après-midi";
                let data = {ident:this.state.ident, motif:this.state.motif,address:address,date:this.state.trueDate, autre:this.state.selected,choice:horo}
                this.socket.emit("rdv", data);
                this.setState({
                    modalVisible:true,
                    isLoad:false,
                    isLoad2:true
                })
            }else if(this.state.choice === 1){
                let address = (this.state.actu === 0)? await AsyncStorage.getItem('address'): this.state.addresse;
                let horo = (this.state.horo === 0)? "Matinée": "Après-midi";
                let data = {name:this.state.name,age:this.state.old,ident:this.state.ident, motif:this.state.motif,address:address,date:this.state.trueDate, autre:this.state.selected,choice:horo}
                this.socket.emit("rdv", data);
                
                this.setState({
                    modalVisible:true,
                    isLoad:false,
                    isLoad2:true
                })
            }
        }
        else{
            ToastAndroid.showWithGravity(
                "Remplissez les champs correctement afin qu'on puisse mieux vous aider",
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
            );
            this.setState({
                isLoad:false,
                isLoad2:false
            })
        }
    }
    motifText = (value)=>{
        this.setState({
            motif:value,
        })
    }
    render() {
        const choice = this.state.choice;
       let shows  = (choice === 1 ) ? <OutMe changeName={this.changeName} changeAge={this.changeAge} /> : null;
        if(this.state.isLoad3){
            return(
                <SafeAreaView style={styles.container}>
                    <KeyboardAvoidingView behavior="padding" style={styles.container}>
                        <TouchableWithoutFeedback style={styles.container}
                                                  onPress={Keyboard.dismiss}>
                            <ScrollView>
                                <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={this.state.modalVisible}>
                                    <View style={{position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,.5)", alignItems:"center", justifyContent:"center"}}></View>
                                    <View style={{marginTop: 150, marginLeft: 50, marginRight:50, elevation: 4}}>
                                        <View style={styles.blockHeader}>
                                            <Image style={{width:55,height:55}} source={require('../assets/images/checked.png')} />
                                            <Text style={{fontSize: 18, color:"#fff", fontWeight:"700",marginTop:20}}>Rendez-vous pris</Text>
                                        </View>
                                        <View style={styles.blockHeaders}>
                                            <Text style={{textAlign:"center",fontSize: 14}}>Votre demande de prise de rendez-vous est en cours de traitement et vous allez recevoir une confirmation par message.</Text>
                                            <Text style={{textAlign:"center",fontSize: 14}}>Veuillez communiquer votre numéro de demande de prise de rendez-vous  à l’accueil de l’établissement de santé.</Text>
                                            <View style={{margin:20}}>
                                                <TouchableOpacity onPress={()=>this.back()} style={styles.button}>
                                                    <Text style={{color:"#fff", letterSpacing: 2}}>OK</Text>
                                                </TouchableOpacity>
                                            </View>

                                        </View>
                                    </View>
                                </Modal>
                                <ImageBackground style={styles.header}  source={require('../assets/images/priserdv.png')}>
                                    <MyCustomLeftComponent navigation={this.props.navigation}/>
                                </ImageBackground>
                                <View style={{padding:10}}>
                                    <Text style={{textAlign: "center", fontSize:17, marginBottom:5}}>Pour qui est destiné le rendez-vous ?</Text>
                                    <ListItem onPress={() => this.setState({ choice: 0 })}>
                                        <Left>
                                            <Text>Pour moi même</Text>
                                        </Left>
                                        <Right>
                                            <Radio color={"#e0e0e0"}
                                                   selectedColor={"#4dbcc7"} selected={this.state.choice === 0} />
                                        </Right>
                                    </ListItem>
                                    <ListItem onPress={() => this.setState({ choice: 1 })}>
                                        <Left>
                                            <Text>Pour une tierce personne</Text>
                                        </Left>
                                        <Right>
                                            <Radio color={"#e0e0e0"}
                                                   selectedColor={"#4dbcc7"}  selected={this.state.choice === 1} />
                                        </Right>
                                    </ListItem>
                                    <View
                                        style={styles.root}>
                                        {shows}
                                        <View style={{flexDirection:"row", marginTop:10}}>
                                            <View style={{flex:1}}>
                                                <TouchableOpacity style={{alignItems:"center", justifyContent:"center"}} onPress={() => this.setState({ actu: 0 })}>
                                                    <Text style={{marginRight:20}}>Celle de Votre Inscription</Text>

                                                    <Radio color={"#e0e0e0"}
                                                           selectedColor={"#4dbcc7"} selected={this.state.actu === 0} />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{flex:1}}>

                                                <Text> Ou sinon : </Text>
                                                <TextInput style={styles.inputss}
                                                           placeholder="Entrer ville commune et quartier"
                                                           placeholderTextColor='#999'
                                                           keyboardType ='default'
                                                           returnKeyType='next'
                                                           onChangeText={(value)=>this.changeAdd(value)}
                                                           autoCorrect={false}/>
                                            </View>
                                        </View>
                                        <View style={{height:40,marginBottom:20,paddingRight: 5}}>
                                            <Picker
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-down" />}
                                                placeholder="Service médical"
                                                placeholderStyle={{ color: "#555" }}
                                                placeholderIconColor="#007aff"
                                                style={styles.inputs}
                                                textStyle={{ color: "#222" }}
                                                itemStyle={{
                                                    backgroundColor: "#d3d3d3",
                                                    marginLeft: 0,
                                                    paddingLeft: 10
                                                }}
                                                itemTextStyle={{ color: '#222' }}
                                                selectedValue={this.state.selected}
                                                onValueChange={this.onValueChange}
                                            >
                                                <Picker.Item label="Service médical" value="Service médical" />
                                                {this.state.totalAd.map((value,index)=> <Picker.Item key={index} label={value.name} value={value.name} />)}
                                                <Picker.Item label="Autres" value="Autres" />
                                            </Picker>
                                        </View>
                                        <TouchableOpacity style={{padding:10,flexDirection:"row", alignItems: 'center', justifyContent:"center"}} title="Show DatePicker" onPress={this.showDateTimePicker} >
                                            <View style={{elevation:3,backgroundColor:"#4dbcc7", borderRadius:20, height:40,width:260, alignItems:"center", justifyContent:"center"}}>
                                                <Text style={{color:"#fff",marginLeft:5}}><Icon name="calendar" color="#fff" size={20} />{(this.state.chosenDate === "")? "choisir la date du rendez-vous" : this.state.chosenDate}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <DateTimePicker
                                            mode="date"
                                            isVisible={this.state.isDateTimePickerVisible}
                                            onConfirm={this.handleDatePicked}
                                            onCancel={this.hideDateTimePicker}
                                        />
                                        <View style={{flexDirection:'row', marginBottom:10}}>
                                            <View style={{flex:1}}>
                                                <ListItem onPress={() => this.setState({ horo: 0 })}>
                                                    <Left>
                                                        <Text>Matinée</Text>
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
                                                        <Text>Après-midi</Text>
                                                    </Left>
                                                    <Right>
                                                        <Radio color={"#e0e0e0"}
                                                               selectedColor={"#4dbcc7"} selected={this.state.horo === 1} />
                                                    </Right>
                                                </ListItem>
                                            </View>
                                        </View>
                                        <View>
                                            <View style={{marginBottom: 30}}>
                                                <Button
                                                    color="#028fb0"
                                                    title="Envoyer"
                                                    onPress={()=>this.send()}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </View>


                            </ScrollView>
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

const styles = StyleSheet.create({
    root: {
        padding: 20
    },
    container: {
        flex: 1,
    },
    input: {
        height: 70,
        borderWidth:1,
        borderColor:'#4dbcc7',
        color:'#444',
        paddingHorizontal: 10,
        marginBottom:20,
        marginTop:10
    },
    header:{
        height:height/3.33,
    },
    inputs: {
        height: 40,
        textAlign:"center",
        borderBottomWidth:1,
        borderBottomColor:'#4dbcc7',
        color:'#444',
        paddingHorizontal: 10,
        marginBottom:20,
        marginTop:10
    },
    inputss: {
        height: 40,
        borderBottomWidth:1,
        borderBottomColor:'#4dbcc7',
        color:'#444',
        paddingHorizontal: 10,
        marginBottom:20,
        marginTop:10
    },
    blockHeader:{
    backgroundColor:"#4dbcc7",
        alignItems:"center",
        justifyContent:"center",
        height:150,
        borderTopEndRadius: 15,
        borderTopStartRadius: 15,
},
blockHeaders:{
    height:230,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#fff",
        borderBottomEndRadius: 15,
        borderBottomStartRadius: 15,
        paddingLeft:5,
        paddingRight:5,
},
button:{
    backgroundColor:"#4dbcc7",
        height:40,
        width:width/2,
        borderRadius: 30,
        alignItems:"center",
        justifyContent:"center",
...elevationShadowStyle(2)
}
});