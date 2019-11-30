import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    ActivityIndicator,
    ImageBackground,
} from 'react-native';
import * as Font from 'expo-font';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Header} from "react-native-elements";
const MyCustomLeftComponent = (props) =>{
    return (
        <TouchableOpacity onPress={()=>props.navigation.goBack()}>
            <Icon name="arrow-left-bold" color="#fff"
                  size={25} />
        </TouchableOpacity>
    );
};

export default class ChooseType extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            meta:[],
            isFont:false,
            backClickCount: 0,
            name:"",
            modalVisible: false,
        }
    }

    enterEvent(ele){
        if(ele === 1){
            this.props.navigation.navigate('MonAssurance');
        }
        else{
            this.props.navigation.navigate('Prof')
        }
    };
    async componentDidMount() {
        StatusBar.setHidden(false);
        await Font.loadAsync({
            LexendExa: require('../assets/fonts/LexendExa-Regular.ttf'),
            'Blinker-Black': require('../assets/fonts/Blinker-Black.ttf'),
            'PTSans-Bold': require('../assets/fonts/PTSans-Bold.ttf')
        });
        this.setState({
            isFont:true
        })
    }
    render() {
        if(this.state.isFont) {
            return (
                <View style={{flex: 1}}>
                    <Header
                        leftComponent={<MyCustomLeftComponent navigation={this.props.navigation}/>}
                        centerComponent={{ text: "", style: { color: '#fff' } }}
                        containerStyle={{
                            backgroundColor: '#4dbcc7',
                            justifyContent: 'space-around',
                        }}
                    />
                    <ImageBackground source={require('../assets/bg.jpg')} style={styles.padding}>
                        <Text style={{position:"absolute", top:"20%", left:10, right:10, fontSize:20, fontFamily:"LexendExa", textTransform:"uppercase", textAlign:"center" }}>De quel type faites vous partie</Text>
                        <View style={styles.item}>
                            <TouchableOpacity onPress={()=>this.enterEvent(1)} style={styles.clickable}>
                                <Text style={styles.title}>Particulier</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.items}>
                            <TouchableOpacity onPress={()=>this.enterEvent(2)} style={styles.clickable}>
                                <Text style={styles.title}>Professionnel</Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
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
        padding:{
            flex:1,
            alignItems:"center",
            justifyContent:"center",
        },
        item:{
            flex:1,
            alignItems:"flex-end",
            justifyContent:"flex-end",
            paddingBottom:35,
        },
        items:{
            flex:1,
            alignItems:"flex-start",
            justifyContent:"flex-start"
        },
        clickable:{
            height:50,
            width:340,
            backgroundColor:"#fff",
            elevation:10,
            borderRadius:7,
            alignItems: "center",
            justifyContent:"center",
        },
        image:{
            height:"45%",
            width:"45%"
        },
        title:{
            fontFamily:"LexendExa",
            fontSize: 14,
            textAlign:"center",
            fontWeight:"700",
        },
    })