import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native'
//import { AppLoading, Font } from 'expo';

import Stacked from './Navigation/Stack';

export default class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            theme: null,
            currentTheme: null,
            isReady: false,
        };
    }
    /*componentDidMount() {
        Font.loadAsync({
            'PTSans-Bold': require('./assets/fonts/PTSans-Bold.ttf'),
            'RobotoSlab-Light': require('./assets/fonts/RobotoSlab-Light.ttf'),
        });
    }*/

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Stacked style={styles.container} />
            </SafeAreaView>
            

        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})
