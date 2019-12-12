import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    ActivityIndicator,
    ImageBackground,
    Image
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

export default class IntDeGarde extends React.Component{
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
            this.props.navigation.navigate('pharma')
        }
        else if(ele === 2){
            this.props.navigation.navigate('BrazaVille')
        }
        else if(ele === 3){
            this.props.navigation.navigate('Faso')
        }
        else if(ele === 4){
            this.props.navigation.navigate('Paris')
        }
        else if(ele === 6){
            this.props.navigation.navigate('Yaounde')
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
                        centerComponent={{ text: "Pharmacie de Garde", style: { color: '#fff' } }}
                        containerStyle={{
                            backgroundColor: '#4dbcc7',
                            justifyContent: 'space-around',
                        }}
                    />
                    <ImageBackground source={require('../assets/bg.jpg')} style={styles.padding}>
                        <Text style={{position:"absolute", top:"7%", left:10, right:10, fontSize:20, fontFamily:"LexendExa", textTransform:"uppercase", textAlign:"center" }}>Afficher les pharmacies de garde de votre pays</Text>
                        <View style={styles.items}>
                            
                        </View>
                        <View style={styles.item}>
                            <TouchableOpacity onPress={()=>this.enterEvent(1)} style={styles.clickable}>
                                <Image style={{width:100, height:"100%", borderBottomLeftRadius:7, borderTopLeftRadius:7}} source={require('../assets/images/ci.png')} />
                                <Text style={styles.title}>Côte D'Ivoire</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.item}>
                            <TouchableOpacity onPress={()=>this.enterEvent(2)} style={styles.clickable}>
                            <Image style={{width:100, height:"100%" , borderBottomLeftRadius:7,borderTopLeftRadius:7}} source={require('../assets/images/cg.png')}/>
                                <Text style={styles.title}>Congo Brazzaville</Text>

                            </TouchableOpacity>
                        </View>
                        <View style={styles.item}>
                            <TouchableOpacity onPress={()=>this.enterEvent(3)} style={styles.clickable}>
                            <Image style={{width:100, height:"100%" , borderBottomLeftRadius:7,borderTopLeftRadius:7}} source={require('../assets/images/bf.png')}/>
                                <Text style={styles.title}>Burkina-Faso</Text>

                            </TouchableOpacity>
                        </View>
                        <View style={styles.item}>
                            <TouchableOpacity onPress={()=>this.enterEvent(4)} style={styles.clickable}>
                            <Image style={{width:100, height:"100%" , borderBottomLeftRadius:7,borderTopLeftRadius:7}} source={require('../assets/images/fr.jpg')}/>
                                <Text style={styles.title}>France - Paris</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.item}>
                            <TouchableOpacity onPress={()=>this.enterEvent(6)} style={styles.clickable}>
                            <Image style={{width:100, height:"100%" , borderBottomLeftRadius:7,borderTopLeftRadius:7}} source={require('../assets/images/cm.png')}/>
                                <Text style={styles.title}>Cameroun - Yaoundé</Text>
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
            paddingBottom:15,
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
            borderRadius:7,
            alignItems: "center",
            justifyContent:"space-between",
            flexDirection:"row"
        },
        image:{
            height:"45%",
            width:"45%"
        },
        title:{
            fontFamily:"LexendExa",
            fontSize: 14,
            textAlign:"center",
            marginRight:95,
            fontWeight:"700",
        },
        numberLibre:{
            position:"absolute",
            backgroundColor: "#fff",
            borderColor:"#777",
            borderWidth:1,
            width:30,
            height:30,
            paddingTop:3,
            color: "#4dbcc7",
            borderRadius:100,
            textAlign: "center",
            fontSize:15,
            top:"50%",
            right:"5%",
        }
    })