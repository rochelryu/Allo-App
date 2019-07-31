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
    KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, SafeAreaView, AsyncStorage, ToastAndroid
} from 'react-native';
import { ListItem, Radio, Right, Left, CheckBox, Body} from 'native-base';

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Header} from 'react-native-elements';
window.navigator.userAgent = "react-native";
import io from "socket.io-client/dist/socket.io";

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
            motif:"",
            choice:0,
            name: "",
            old: 0,
            addresse:"",
            cheked:false,
            ident:""
        }

        this.socket = io("http://allosanteexpress.com:8080",{jsonp:true})
        this.send =this.send.bind(this);
    }
    async componentDidMount() {
        const ident = await AsyncStorage.getItem("identAllo");
        this.setState({
            ident:ident,
        })
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
        if(this.state.choice === 0){
            let data = {ident:this.state.ident, motif:this.state.motif,address:this.state.addresse}
            this.socket.emit("assurance", data)

        }else if(this.state.choice === 1){
            let data = {name:this.state.name,age:this.state.old,ident:this.state.ident, motif:this.state.motif,address:this.state.addresse}
            this.socket.emit("assurance", data)
        }
        ToastAndroid.showWithGravity(
            "Assistance enregistrée nous vous tenons informé pour la suite",
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
        );
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
                            <TextInput style={styles.input}
                                       placeholder="Motif de l'assitance (ex: Palue, Corps qui chauf, etc...)"
                                       placeholderTextColor='#999'
                                       keyboardType ='default'
                                       returnKeyType='next'
                                       onChangeText={(value)=>this.motifText(value)}
                                       autoCorrect={false}/>
                            <ListItem onPress={() => this.setState({ cheked: !this.state.cheked })}>
                                <CheckBox checked={this.state.cheked} color="#4dbcc7"/>
                                <Body>
                                    <Text style={{marginLeft:10}}>C'est ma première consultation</Text>
                                </Body>
                            </ListItem>
                            <View style={styles.button}>
                                <Button
                                    onPress={()=>this.send()}
                                    color="#028fb0"
                                    title="Envoyer"
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