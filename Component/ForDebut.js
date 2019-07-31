import React from 'react';
import {View,AsyncStorage, } from 'react-native';
import { Spinner } from 'native-base';


export default class ForDebut extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            load:0,
        }
    }
    async componentWillMount() {
        const mom = await AsyncStorage.getItem("premier");
        const ident = await AsyncStorage.getItem("identAllo");
        AsyncStorage.setItem("premier","true");
        if(mom && ident){
            this.props.navigation.navigate('Ele')
        }
        else if (mom){
            this.props.navigation.navigate('SignUp')
        }
        else{
            this.props.navigation.navigate('GuardSplash')
        }

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