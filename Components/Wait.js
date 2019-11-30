import React from 'react';
import {
    View,
    ImageBackground,
    TouchableOpacity
} from 'react-native';

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Header} from "react-native-elements";
const MyCustomLeftComponent = (props) =>{
    return (
        <TouchableOpacity onPress={()=>props.navigation.goBack()}>
            <Icon name="arrow-left-bold" color="#4dbcc7"
                  size={25} />
        </TouchableOpacity>
    );
};

export default class Wait extends React.Component{
    constructor(props){
        super(props)
    }
    render() {
        return (
            <View style={{flex: 1}}>
                <Header
                    leftComponent={<MyCustomLeftComponent navigation={this.props.navigation}/>}
                    centerComponent={{ text: "Livraison Médicament", style: { color: '#4dbcc7' } }}
                    containerStyle={{
                        backgroundColor: '#fff',
                        justifyContent: 'space-around',
                    }}
                />
                <ImageBackground source={require('../assets/images/wait.png')} style={{flex:1}}>
                
                </ImageBackground>
                
               </View>
        );
    }
}
