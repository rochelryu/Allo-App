import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, StatusBar} from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Header} from "react-native-elements";


const MyCustomLeftComponent = (props) =>{
    return (
        <TouchableOpacity onPress={()=>props.drawler.openDrawer()}>
            <Icon name="menu" color="#fff"
                  size={20} />
        </TouchableOpacity>
    );
};
export default class LogoutScreen extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount() {
        StatusBar.setHidden(false);
    }
    static navigationOptions = {
        drawerIcon: ({tintColor}) => (
            <Icon
        name="logout"
        color={tintColor}
        size={20}
/>
        )
    }

    render() {
        return(
            <View style={{flex:1}}>
                <Header
                    leftComponent={<MyCustomLeftComponent drawler={this.props.navigation} />}
                    containerStyle={{
                        backgroundColor: '#474f62',
                        justifyContent: 'space-around',
                    }}
                />
            </View>
        )
    }
}