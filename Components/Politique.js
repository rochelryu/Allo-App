import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    ActivityIndicator,
    ScrollView
} from 'react-native';
import {  WebBrowser } from 'expo';

import * as Font from 'expo-font';
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

export default class Politique extends React.Component{
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
    _handlePress = () => {
        //Linking.openURL('www.allosanteexpress.com');
        WebBrowser.openBrowserAsync('https://www.allosanteexpress.com');
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
                        centerComponent={{ text: "Politique de Confidentialité", style: { color: '#4dbcc7' } }}
                        containerStyle={{
                            backgroundColor: '#fff',
                            justifyContent: 'space-around',
                        }}
                    />
                    <ScrollView style={styles.padding}>
                    <Text style={styles.title}>1- Objet </Text>
                    <Text style={styles.titleT}>Pour satisfaire à ses besoins, la Société ATALIA – ALLO SANTE EXPRESS met en œuvre et exploite des traitements de données à caractère personnel relatifs à ses Utilisateurs et partenaires.
La présente politique a pour objet de satisfaire à l’obligation d’information de la Société ATALIA – ALLO SANTE EXPRESS et ainsi de formaliser les droits et les obligations de ses Utilisateurs et Partenaires au regard du traitement de leurs données à caractère personnel.</Text>
                    <Text style={styles.title}>2- Portée </Text>
                    <Text style={styles.titleT}>La présente politique de protection des données à caractère personnel a vocation à s’appliquer dans le cadre de la mise en place du traitement des données à caractère personnel des Utilisateurs et Partenaires de la Société ATALIA – ALLO SANTE EXPRESS.
La présente politique ne porte que sur les traitements dont la Société ATALIA – ALLO SANTE EXPRESS est responsable ainsi que sur les données qualifiées de « structurées ».
De même, la politique ne vise pas les traitements mis en œuvre par les collaborateurs de la Société ATALIA – ALLO SANTE EXPRESS dans le traitement de leur clientèle personnelle.
Le traitement de données à caractère personnel peut être géré directement par la Société ATALIA – ALLO SANTE EXPRESS ou par le biais d’un sous-traitant spécifiquement désigné par lui.
Cette politique est indépendante de tout autre document pouvant s’appliquer au sein de la relation contractuelle entre la Société ATALIA – ALLO SANTE EXPRESS et ses Utilisateurs, notamment nos conditions générales d’intervention ou notre politique de cookies.</Text>
                    <Text style={styles.title}>3- Principes généraux et engagement </Text>
                    <Text style={styles.titleT}>Aucun traitement n’est mis en œuvre par la Société ATALIA – ALLO SANTE EXPRESS concernant des données de clients et contacts s’il ne porte pas sur des données à caractère personnel collectées par ou pour nos services ou traitées en relation avec nos services et s’il ne répond pas aux principes généraux du RGPD.
Tout nouveau traitement, modification ou suppression d’un traitement existant sera porté à la connaissance des clients et contacts par le biais d’une modification de la présente politique.</Text>
                    <Text style={styles.title}>4- Types de données collectées</Text>
                    <Text style={styles.titleT}>DONNÉES NON TECHNIQUES (selon les cas d’usage) :</Text>
                    <Text style={styles.ti}>• Identification : nom, prénom, civilité, date de naissance</Text>
                    <Text style={styles.ti}>• Coordonnées : Téléphone, adresse e-mail, adresse postale, fax, ...</Text>
                    <Text style={styles.ti}>• Photo lorsque vous nous accordez ce droit (généralement renseignée sur le profil du client à sa création de compte et à destination du Pharmacien)</Text>
                    <Text style={styles.ti}>• Les Données d’identité : photo de la carte grise, photo du passeport</Text>
                    <Text style={styles.titleT}>DONNÉES TECHNIQUES (selon les cas d’usage)</Text>
                    <Text style={styles.title}>5- Origines des données</Text>
                    <Text style={styles.titleT}>La Société ATALIA – ALLO SANTE EXPRESS  collecte les données de ses Utilisateurs et de ses Partenaires à partir de :</Text>

                    <Text style={styles.ti}>• données fournies par l’utilisateur lors de la création d’un compte sur l’application ;</Text>
                    <Text style={styles.ti}>• lors de la confirmation d’une commande via l’application sur la 2e étape de l’inscription</Text>
                    <Text style={styles.ti}>• inscription à nos services en ligne (site web, réseaux sociaux, chaine Youtube, …) ; </Text>
                    <Text style={styles.ti}>• inscription à des évènements organisés par la Société ATALIA – ALLO SANTE EXPRESS ;</Text>
                    <Text style={styles.ti}>• échanges via les réseaux sociaux.</Text>
                    <Text style={styles.title}>6- Finalités du traitement</Text>
                    <Text style={styles.titleT}>Selon les cas, la Société ATALIA – ALLO SANTE EXPRESS traite vos données pour les finalités suivantes :</Text>

                    <Text style={styles.ti}>• transmission de la commande sur l’application ALLO SANTE EXPRESS vers la plateforme du Professionnel de santé;</Text>
                    <Text style={styles.ti}>• gestion des événements organisés par la Société ATALIA – ALLO SANTE EXPRESS (conférences, petits déjeuners, etc.) ;</Text>
                    <Text style={styles.ti}>• envoi de nos newsletters ou fils d’informations ;</Text>
                    <Text style={styles.ti}>• réponses aux questions qui nous sont posées (par téléphone ou en ligne) ;</Text>
                    <Text style={styles.ti}>• envoi de vœux et autres félicitations de la part la Société ATALIA – ALLO SANTE EXPRESS;</Text>
                    <Text style={styles.ti}>• amélioration de nos services ;</Text>
                    <Text style={styles.ti}>• réponses à nos obligations administratives ;</Text>
                    <Text style={styles.ti}>• réalisation de statistiques.</Text>
                    <Text style={styles.title}>7- Destinataires des données</Text>
                    <Text style={styles.titleT}>La Société ATALIA – ALLO SANTE EXPRESS s’assure que les données ne soient accessibles qu’à des destinataires internes ou externes autorisés. Destinataires internes :</Text>
                    <Text style={styles.ti}>• Personnel </Text>
                    <Text style={styles.ti}>• Stagiaires</Text>
                    <Text style={styles.ti}>• Direction de la communication et marketing</Text>
                    <Text style={styles.ti}>• Direction informatique</Text>
                    <Text style={styles.titleT}>Destinataires externes :</Text>
                    <Text style={styles.ti}>• Prestataires, Partenaires( établissement de santé, Professionnel de santé, société de courtage en assurance)</Text>
                    <Text style={styles.title}>8- Durée de conservation</Text>
                    <Text style={styles.titleT}>La durée de conservation des données est définie par la Société ATALIA – ALLO SANTE EXPRESS au regard des contraintes légales et contractuelles qui pèsent sur lui. Elle est fixée dans le cadre de sa politique de durée de conservation.
Passés les délais fixés dans ladite politique, les données sont soit supprimées, soit conservées après avoir été anonymisées, notamment pour des raisons d’usage statistique.</Text>
                    <Text style={styles.title}>9- Droit à la portabilité</Text>
                    <Text style={styles.titleT}>La Société ATALIA – ALLO SANTE EXPRESS fait droit à la portabilité des données dans le cas particulier des données communiquées par les clients ou les contacts eux-mêmes, sur des services en ligne proposés par la Société ATALIA – ALLO SANTE EXPRESS et pour les finalités reposant sur le seul consentement des personnes. Dans ce cas les données seront communiquées dans un format structuré, couramment utilisé et lisible par une machine.</Text>
                    <Text style={styles.title}>10- Justification</Text>
                    <Text style={styles.titleT}>Pour l’ensemble des droits mentionnés dont bénéficie le client ou le contact et conformément à la législation sur la protection des données à caractère personnel, vous êtes informés qu’il s’agit de droits de nature individuelle qui ne peuvent être exercés que par la personne concernée relativement à ses propres informations. Pour satisfaire à cette obligation, nous vérifierons l’identité de la personne concernée.</Text>
                    <Text style={styles.title}>11- Droit d’usage</Text>
                    <Text style={styles.titleT}>La Société ATALIA – ALLO SANTE EXPRESS se voit conférer par les Utilisateurs un droit d’usage et de traitement de leurs données à caractère personnel pour les finalités exposées ci-dessus.
Toutefois, les données enrichies qui sont le fruit d’un travail de traitement et d’analyse de la Société ATALIA – ALLO SANTE EXPRESS I, autrement appelées les données enrichies, demeurent sa propriété exclusive (analyse d’usage, statistiques, etc.).</Text>
                    <Text style={styles.title}>12- Pour plus d’informations</Text>
                    <Text style={styles.titleT}>Pour toutes informations complémentaires, vous pouvez contacter notre référent à l’adresse électronique suivante : ataliasarl.ase@gmail.com
Pour toute autre information plus générale sur la protection des données personnelles, vous pouvez consulter le site de la Cnil www.cnil.fr.</Text>

                    </ScrollView>
                    
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
            paddingLeft:5,
            paddingRight:5,
        },
        
        title:{
            fontFamily:"LexendExa",
            fontSize: 19,
            marginLeft:5,
            marginBottom:7,
            color:"#4dbcc7",
        },
        app:{
            fontFamily:"LexendExa",
            fontSize: 20,
            textAlign:"center",
            margin:3,
            fontWeight:"100"
        },
        titleT:{
            fontFamily:"LexendExa",
            fontSize: 15,
            marginLeft:7,
            marginBottom:9,

            color:"#555555",
        },
        titl:{
            fontFamily:"LexendExa",
            fontSize: 17,
            marginLeft:5,
            marginBottom:7,
        },
        tit:{
            fontFamily:"LexendExa",
            fontSize: 16,
            marginLeft:5,
            marginBottom:7,
            color:"#444444",
        },
        ti:{
            fontFamily:"LexendExa",
            fontSize: 14,
            marginLeft:10,
            marginBottom:2,
            color:"#777777",
        },
        
    })