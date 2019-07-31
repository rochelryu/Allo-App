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
    ToastAndroid,
    KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, SafeAreaView, AsyncStorage
} from 'react-native';
import { ListItem, Radio, Right, Left, DatePicker, Body} from 'native-base';
import DateTimePicker from "react-native-modal-datetime-picker";

window.navigator.userAgent = "react-native";
import io from "socket.io-client/dist/socket.io";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Header} from 'react-native-elements';


const MyCustomLeftComponent = (props) =>{
    return (
        <TouchableOpacity onPress={()=>props.navigation.goBack()}>
            <Icon name="arrow-left-bold-box-outline" color="#fff"
                  size={25} />
        </TouchableOpacity>
    );
};

class IsMe extends React.Component{
    render() {
        const {changeAdd} = this.props
        return(
            <View>
                <TextInput style={styles.inputs}
                           placeholder="Votre position Actuelle"
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
                           keyboardType ='default'
                           returnKeyType='next'
                           onChangeText={(value)=>changeAge(value)}
                           autoCorrect={false}/>
                <TextInput style={styles.inputs}
                           placeholder="Votre position Actuelle"
                           placeholderTextColor='#999'
                           onChangeText={(value)=>changeAdd(value)}
                           keyboardType ='default'
                           returnKeyType='next'
                           onChange={(value)=>changeAdd(value)}
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
            cheked:false,
            isDateTimePickerVisible: false,
            chosenDate:"",
            trueDate:new Date(),
            ident:""
        }
        this.socket = io("http://allosanteexpress.com:8080",{jsonp:true})
        this.send =this.send.bind(this);
    }
    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        this.setState({ trueDate:date,
            chosenDate: date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+" à "+date.getHours()+":"+date.getMinutes() });
        this.hideDateTimePicker();
    };
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
    send(){
        if(this.state.choice === 0){
            console.log(this.state.ident, this.state.motif, this.state.addresse, this.state.trueDate)
            let data = {ident:this.state.ident, motif:this.state.motif,address:this.state.addresse,date:this.state.trueDate}
            this.socket.emit("rdv", data)

        }else if(this.state.choice === 1){
            let data = {name:this.state.name,age:this.state.old,ident:this.state.ident, motif:this.state.motif,address:this.state.addresse,date:this.state.trueDate}
            this.socket.emit("rdv", data)
        }
        ToastAndroid.showWithGravity(
            "Rendez-vous enregistré nous vous tenons informé pour la suite",
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
        );
    }
    async componentDidMount() {
        const ident = await AsyncStorage.getItem("identAllo");
        this.setState({
            ident:ident,
        })
    }
    motifText = (value)=>{
        this.setState({
            motif:value,
        })
    }
    render() {
        const choice = this.state.choice;
        let shows = null;
        if (choice === 0 ){
            shows = <IsMe changeAdd={this.changeAdd} />
        }else if (choice === 1) {
            shows = <OutMe changeAdd={this.changeAdd} changeName={this.changeName} changeAge={this.changeAge} />
        }
        return(
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView behavior="padding" style={styles.container}>
                    <TouchableWithoutFeedback style={styles.container}
                                              onPress={Keyboard.dismiss}>
                        <ScrollView>
                            <Header
                                leftComponent={<MyCustomLeftComponent navigation={this.props.navigation} />}
                                containerStyle={{
                                    backgroundColor: '#4dbcc7',
                                    justifyContent: 'space-around',
                                }}
                            />
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
                                    <TouchableOpacity style={{padding:10,flexDirection:"row"}} title="Show DatePicker" onPress={this.showDateTimePicker} >
                                        <View style={{elevation:3,backgroundColor:"#4dbcc7", borderRadius:20, height:40,width:260, alignItems:"center", justifyContent:"center"}}>
                                            <Text style={{color:"#fff",marginLeft:5}}><Icon name="calendar" color="#fff" size={20} />{(this.state.chosenDate === "")? "choisir la date du rendez-vous" : this.state.chosenDate}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <DateTimePicker
                                        mode="datetime"
                                        isVisible={this.state.isDateTimePickerVisible}
                                        onConfirm={this.handleDatePicked}
                                        onCancel={this.hideDateTimePicker}
                                    />
                                    <View>
                                        <TextInput style={styles.input}
                                                   placeholder="Motif de l'assitance (ex: Palue, Corps qui chauf, etc...)"
                                                   placeholderTextColor='#999'
                                                   keyboardType ='default'
                                                   onChangeText={(value)=>this.motifText(value)}
                                                   returnKeyType='next'
                                                   autoCorrect={false}/>
                                        <View style={styles.button}>
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
});