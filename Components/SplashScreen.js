import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity,ImageBackground} from 'react-native';
import Swiper from "react-native-web-swiper";


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    slideContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    connectImg:{
        height:80,
        width:80,
    },
});

export default class Screen extends React.Component {

    _onDoneInscription = () => {
        this.props.navigation.navigate('LoginScreen')
    }
    render() {
        return (
            <View style={styles.container}>
                <Swiper>
                    <ImageBackground source={require('../assets/images/0.png')} style={styles.slideContainer}>
                    </ImageBackground>
                    <ImageBackground source={require('../assets/images/1.png')} style={styles.slideContainer}>
                    </ImageBackground>
                    <ImageBackground source={require('../assets/images/2.png')} style={styles.slideContainer}>
                        <View style={{flex:5}}>

                        </View>
                        <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
                        <TouchableOpacity onPress={this._onDoneInscription} style={styles.connect}>
                           <Image style={styles.connectImg} source={require('../assets/images/connecter.png')} />
                              
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </Swiper>
            </View>
        )
    }
}