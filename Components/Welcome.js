import React from 'react'
import {View, TouchableOpacity, ImageBackground, StyleSheet, Image} from 'react-native';
import {Spinner} from "native-base";

const styles = StyleSheet.create({
    connect:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
    },
    connectImg:{
        height:80,
        width:80,
    },
})
export default class Welcome extends React.Component{
    constructor(props){
        super(props);
        this.state={
            showRealApp:false,
        }
    }
    _onDone = async () => {
        this.setState({
            showRealApp:true
        })
        setTimeout(()=>{
            this.props.navigation.navigate('Home');
        })
    }


    render(){
        return(
            <ImageBackground source={require('../assets/images/4.png')}  style={{flex:1}}>
                <View style={{flex:2, alignItems:"center", justifyContent:"center", padding:10}}>
                
                </View>
                <TouchableOpacity onPress={this._onDone} style={styles.connect}>
                            {(this.state.showRealApp)? <Spinner color="#fff"/>:  <Image style={styles.connectImg} source={require('../assets/images/connecter.png')} />}
                              
                            </TouchableOpacity>
            </ImageBackground>
            
        )
    }
}