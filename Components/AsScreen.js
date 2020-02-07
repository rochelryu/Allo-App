import React from 'react';
import {
    StyleSheet,
    View,
    Button,
    StatusBar,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Modal,
    Keyboard,
    SafeAreaView,
    AsyncStorage,
    Image,
    ActivityIndicator,
    ImageBackground, Dimensions,
    ToastAndroid,
} from 'react-native';
import {ListItem, Radio, Right, Left, Picker} from 'native-base';

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
window.navigator.userAgent = "react-native";
import io from "socket.io-client/dist/socket.io";
import {autre , socketLink} from '../ServiceWorker/helper';
const {height, width} = Dimensions.get('window');


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

class IsMe extends React.Component{
    render() {
        const {changeAdd} = this.props
        return(
            <View>
                <TextInput style={styles.inputs}
                           placeholder="Votre position Actuelle (Ville/Commune)"
                           placeholderTextColor='#999'
                           keyboardType ='default'
                           returnKeyType='next'
                           onChangeText={(value)=>changeAdd(value)}
                           autoCorrect={false}/>
            </View>
        )
    }
}
class OutMe extends React.Component{
    constructor(props){
        super(props)
    }
    render() {
        const {changeAdd, changeAge, changeName} = this.props
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
                <TextInput style={styles.inputs}
                           placeholder="Votre position Actuelle (Ville/Commune)"
                           placeholderTextColor='#999'
                           keyboardType ='default'
                           returnKeyType='next'
                           onChangeText={(value)=>changeAdd(value)}
                           autoCorrect={false}/>
            </View>
        )
    }
}

export default class AsScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isLoad:false,
            totalAd:[],
            selected:"",
            motif:"",
            choice:0,
            name: "",
            old: 0,
            addresse:"",
            cheked:false,
            ident:""
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
        StatusBar.setHidden(false);
        const ident = await AsyncStorage.getItem("identAllo");
        const name = await AsyncStorage.getItem("nameAllo");
        const isMe = await autre(ident);
        this.setState({
            name:name,
            totalAd:isMe.assistance,
            modalVisible:false,
            isLoad:true,
            ident:ident,
        });
    }

    changeAdd = (value)=>{
        this.setState({
            addresse:value,
        })
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
    motifText = (value)=>{
        this.setState({
            motif:value,
        })
    }
    send(){
        if(this.state.selected !== "Pathologie" && this.state.motif !== "" && this.state.selected !== "" && this.state.addresse !== ""){

            if(this.state.choice === 0){
                let data = {ident:this.state.ident, motif:this.state.motif,address:this.state.addresse, autre:this.state.selected}
                this.socket.emit("assurance", data)
                this.setState({
                    modalVisible:true,
                    isLoad2:true
                })

            }else if(this.state.choice === 1){
                let data = {name:this.state.name,age:this.state.old,ident:this.state.ident, motif:this.state.motif,address:this.state.addresse, autre:this.state.selected}
                this.socket.emit("assurance", data)
                this.setState({
                    modalVisible:true,
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
        }
}
back(){
    this.setState({
        modalVisible:false,
    }, ()=>{this.props.navigation.navigate('Home')})
}

    render() {
        const choice = this.state.choice;
        let shows = (choice === 0 )?<IsMe changeAdd={this.changeAdd} />:<OutMe changeAdd={this.changeAdd} changeName={this.changeName} changeAge={this.changeAge} />;
        if(this.state.isLoad){
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
                                            <Text style={{fontSize: 18, color:"#fff", fontWeight:"700",marginTop:20}}>Assistance prise</Text>
                                        </View>
                                        <View style={styles.blockHeaders}>
                                            <Text style={{textAlign:"center",fontSize: 14}}>Votre demande d'assistance médicale est en cours de traitement et vous allez être mise contact avec un medecin.</Text>
                                            <Text style={{textAlign:"center",fontSize: 14}}>Veuillez communiquer votre numero de demande RDV en présence du medecin.</Text>
                                            <View style={{margin:20}}>
                                                <TouchableOpacity onPress={()=>this.back()} style={styles.button}>
                                                    <Text style={{color:"#fff", letterSpacing: 2}}>OK</Text>
                                                </TouchableOpacity>
                                            </View>

                                        </View>
                                    </View>
                                </Modal>
                                
                                <ImageBackground style={styles.header}  source={require('../assets/images/assG.png')}>
                                    <MyCustomLeftComponent navigation={this.props.navigation}/>
                                </ImageBackground>
                                <View style={{padding:10}}>
                                    <Text style={{textAlign: "center", fontSize:17, marginBottom:5}}>Pour qui est destiné l'assistance médical ?</Text>
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
                                        <View>
                                            <View style={{height:40,marginBottom:20,paddingRight: 5}}>
                                            <Picker
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-down" />}
                                                placeholder="Pathologie"
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
                                                selectedValue={this.state.selected}
                                                onValueChange={this.onValueChange}
                                            >
                                               <Picker.Item label="Pathologie" value="Pathologie" />

                                                {this.state.totalAd.map((value,index)=> <Picker.Item key={index} label={value.name} value={value.name} />)}
                                                <Picker.Item label="Autres" value="Autres" />
                                            </Picker>
                                            </View>
                                            <TextInput style={styles.input}
                                                       placeholder="Motif de l'assitance (ex: nez qui coule, Corps qui chauf, etc...)"
                                                       placeholderTextColor='#999'
                                                       keyboardType ='default'
                                                       returnKeyType='next'
                                                       onChangeText={(value)=>this.motifText(value)}
                                                       autoCorrect={false}/>
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
        else {
            return(<View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
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
    header:{
        height:height/3.33,
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
            paddingLeft:5,
            paddingRight:5,
            borderBottomStartRadius: 15,
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