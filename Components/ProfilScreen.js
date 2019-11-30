import React from 'react';
import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    StatusBar,
    FlatList,AsyncStorage,
    Alert
} from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Header} from "react-native-elements";
import CardProfil from './Partials/CardProfil';
import CardProfils from './Partials/CardProfils';
import {getAllVille, searchMedecin, searchMedecinPays} from '../ServiceWorker/helper';
import {Picker, Spinner} from "native-base";

const MyCustomLeftComponent = (props) =>{
    return (
        <TouchableOpacity onPress={()=>props.navigation.goBack()}>
            <Icon name="arrow-left-bold" color="#fff"
                  size={25} />
        </TouchableOpacity>
    );
};
const MyAllAffiche = (props)=>{
    if(props.etat){
        return(
            <TouchableOpacity style={{width:"90%", marginTop:15, marginBottom:10}} onPress={()=>props.searchAll()}>
                        <Text style={{textAlign:"right"}}>Afficher tous les etablissements de ce pays</Text>
                    </TouchableOpacity>
        )
    }
    else return null
}
export default class ProfilScreen extends React.Component{
    constructor(props){
        super(props)
        this.state={
            info:[],
            eta:[],
            name:"",
            prefix:"",
            specialite:"",
            totalAd:[],
            load:0,
            searching:0,
            lancer:false
        }
        this._search = this._search.bind(this);
        this.specialite = this.specialite.bind(this);
        this.onPrefixChange = this.onPrefixChange.bind(this);

    }
    async componentDidMount() {
        const ident = await AsyncStorage.getItem("identAllo");
        const name = await AsyncStorage.getItem("nameAllo");
        const ville = await getAllVille();
        let verif = new Array();
        for(let i in ville){
            verif.push({labelle:ville[i].name,value: ville[i].prefix})
            continue;
        }
        this.setState({
            name:name,
            totalAd:verif,
            load:1
        });
        StatusBar.setHidden(false);
    }

    searchAll = async () =>{
        const contain = await searchMedecinPays(this.state.prefix);
        this.setState({
            info:contain.info,
            eta:contain.eta,
            searching:1
        })
    }
    onPrefixChange(value) {
        console.log("ici", this.state.prefix);
        if(this.state.prefix == "Sélectionner votre pays" || this.state.prefix == ""){
            this.setState({
                prefix: value,
            });
        }
        else{
            this.setState({
                prefix: value,
                lancer:true
            });
        }
        
    
    }
    specialite(value){
        this.setState({
            specialite:value
        })
    }

    async _search(){
        this.setState(
            {
                searching:2,
            }
        )
        if(this.state.specialite.length >= 3 && this.state.prefix.length >= 3){
            let contain = await searchMedecin(this.state.prefix, this.state.specialite.toLowerCase());
            this.setState({
                info:contain.info,
                eta:contain.eta,
                searching:1
            })
        }
        else{
            this.setState({
                searching:0
            })
            Alert.alert("Invalide", "Veillez remplir correctement ce que vous recherchez")
        }
    }


    render() {
        if(this.state.load == 1){
            let show = null;
            let how = null;
            switch(this.state.searching){
                case 1:
                    show = <ScrollView>
                        <FlatList
                            data={this.state.info}
                            keyExtractor={(item) => item._id}
                            renderItem={({item}) => <CardProfil ele={item} />}
                        />
                    </ScrollView>;
                    how = <ScrollView>
                    <FlatList
                        data={this.state.eta}
                        keyExtractor={(item) => item._id}
                        renderItem={({item}) => <CardProfils ele={item} />}
                    />
                </ScrollView>;
                    break;
                case 2:
                        how = null;
                        show = <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
                            <Spinner color='#4dbcc7' />
                        </View>;
                        break;
                default: 
                    how = null;
                    show= null;
                    break;
            }
            return(
                <ScrollView>
                    <Header
                        leftComponent={<MyCustomLeftComponent navigation={this.props.navigation}/>}
                        centerComponent={{ text: "ANNUAIRE SANTE", style: { color: '#fff' } }}
                        containerStyle={{
                            backgroundColor: '#4dbcc7',
                            justifyContent: 'space-around',
                        }}
                    />
                    <View style={{height:40, marginLeft:30, paddingLeft:5, marginRight:30, marginTop:5, backgroundColor:"#fff", elevation:3, borderRadius:20, flexDirection: "row",alignItems:"center"}}>
                    <Picker
                                                    mode="dropdown"
                                                    iosIcon={<Icon name="arrow-down" />}
                                                    placeholder="Sélectionner votre pays"
                                                    placeholderStyle={{ color: "#fff" }}
                                                    placeholderIconColor="#007aff"
                                                    textStyle={{ color: "#fff" }}
                                                    itemStyle={{
                                                        backgroundColor: "#d3d3d3",
                                                        marginLeft: 0,
                                                        paddingLeft: 10
                                                    }}
                                                    itemTextStyle={{ color: '#fff' }}
                                                    selectedValue={this.state.prefix}
                                                    onValueChange={this.onPrefixChange}
                                                >
                                                <Picker.Item label="Sélectionner votre pays" value="Sélectionner votre pays" />
                                                    {this.state.totalAd.map((value,index)=><Picker.Item key={index} label={value.labelle} value={value.labelle} />)}
                                                </Picker>
                    </View>
                    <View style={{height:40, marginLeft:30, paddingLeft:5, marginRight:30, marginBottom:10, marginTop:5, backgroundColor:"#fff", elevation:3, borderRadius:20, flexDirection: "row",alignItems:"center"}}>
                        <TextInput onChangeText={(value)=>this.specialite(value)} placeholder="(Médecin,etablissement,spécialité)" style={{height:35,color:"#999",width:"75%", paddingLeft:10, borderRadius:20}}/>
                        <TouchableOpacity style={{width:"20%", alignItems:"center", justifyContent:"center"}} onPress={()=> this._search() }>
                        <Icon name="cloud-search-outline" color="#999"
                              size={20}/>
                        </TouchableOpacity>
                    </View>
                    <MyAllAffiche etat={this.state.lancer} searchAll={this.searchAll}  />
                    {how}
                    {show}
                    
                </ScrollView>
            )
        }
        else{
            return(
                <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
                    <Spinner color='#4dbcc7' />
                </View>
            )
        }
        
    }
}