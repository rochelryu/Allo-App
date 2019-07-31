import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Ionicons from "react-native-vector-icons/Ionicons";

const styles = StyleSheet.create({
    image: {
        width: 240,
        height: 240,
    },
    buttonCircle: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(0, 0, 0, .2)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const slides = [
    {
        key: 'Inscription',
        title: 'PROCESSUS',
        text: "Incription par l'application mobile ou le site internet, remplissez correctement les champs puis choisissez un service",
        image: require('../assets/images/responsive.png'),
        imageStyle: styles.image,
        backgroundColor: '#59b2ab',
    },
    {
        key: 'Livraison',
        title: 'LIVRAISON MEDICAMENT',
        text: 'Passer la commande de medicament avec ou sans ordonnance, confirmé votre commande par notre assistance téléphonique et nous vous livrons',
        image: require('../assets/images/ambulance.png'),
        imageStyle: styles.image,
        backgroundColor: '#febe29',
    },
    {
        key: 'somethun1',
        title: 'ASSISTANCE MEDICALE',
        text: 'Un medecin prend contact avec vous et dépêche par la suite une equipe médicale dans les meilleurs délais pour un suivie santé',
        image: require('../assets/images/medical-app.png'),
        imageStyle: styles.image,
        backgroundColor: '#22bcb5',
    },
    {
        key: 'somethun-dos',
        title: 'RENDEZ-VOUS',
        text: 'Un ensemble de spécialiste vous ai proposé, faites votre choix et précisé la date à laquelle vous êtes disponibles',
        image: require('../assets/images/application.png'),
        imageStyle: styles.image,
        backgroundColor: '#febe29',
    },
    {
        key: 'payement1',
        title: 'MODE DE PAYEMENT',
        text: 'Payer par mobile money, carte bancaire ou à la livraison',
        image: require('../assets/images/online-payment.png'),
        imageStyle: styles.image,
        backgroundColor: '#22bcb5',
    }
];
//LOG #FF9518

export default class SplashScreen extends React.Component {
    constructor(props){
        super(props)
            this.state = {
                showRealApp: false
            }
    }
    componentDidMount() {
        StatusBar.setHidden(true);
    }

    _renderNextButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <Ionicons
                    name="md-arrow-round-forward"
                    color="rgba(255, 255, 255, .9)"
                    size={24}
                    style={{ backgroundColor: 'transparent' }}
                />
            </View>
        );
    }
    _renderDoneButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <Ionicons
                    name="md-checkmark"
                    color="rgba(255, 255, 255, .9)"
                    size={24}
                    style={{ backgroundColor: 'transparent' }}
                />
            </View>
        );
    }
    _onDone = () => {
        // User finished the introduction. Show real app through
        // navigation or simply by controlling state
        this.setState({ showRealApp: true });
        this.props.navigation.navigate('SignUp')
    }
    render() {
            return (<AppIntroSlider
                slides={slides}
                onDone={this._onDone}
                renderDoneButton={this._renderDoneButton}
                renderNextButton={this._renderNextButton}
            />);
    }
}