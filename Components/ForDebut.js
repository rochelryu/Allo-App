import React from 'react';
import {View,AsyncStorage, BackHandler } from 'react-native';

import { Spinner } from 'native-base';


export default class ForDebut extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            load:0,
        }
    }
    async componentWillMount() {
        /*AsyncStorage.removeItem('premier');
        AsyncStorage.removeItem('identAllo');*/
        const mom = await AsyncStorage.getItem("premier");
        const ident = await AsyncStorage.getItem("identAllo");
        AsyncStorage.setItem("premier","true");
            if(mom && ident){
                this.props.navigation.navigate('Home');
        }
        else if (mom){
            this.props.navigation.navigate('LoginScreen');
        }
        else{
            this.props.navigation.navigate('SplashScreen');
        
        }
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);

    }
    componentDidUpdate(){
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);   
    }

    handleBackPress = () => {
        BackHandler.exitApp(); // works best when the goBack is async
        return true;
    };
    componentWillUnmount(){
        BackHandler.remove()
    }
    render() {
        if(this.state.load === 0){
            return(
                <View style={{flex:1,alignItems:"center", justifyContent:"center"}}>
                    <Spinner color='#4dbcc7' />
                </View>
            )
        }
    }
}