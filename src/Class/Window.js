import React from 'react';
import { StatusBar,StyleSheet,View,TouchableWithoutFeedback} from 'react-native';
import { OS_ANDROID,OS_IOS, normalize } from '../Libs/Utils';
import { NavigationService } from '../Routes';


export class Window extends React.Component {
    
    constructor(props){
        super(props);
    }

    validate_status_bar(){
        if(OS_ANDROID){
            //StatusBar.setHidden(true);
        }else if(OS_IOS){
            StatusBar.setHidden(false);
        }
    }

    UNSAFE_componentWillReceiveProps(someProp) {
    }

    Navigate(screen,args = {}) {
        const { navigate, goBack } = NavigationService;
        if (screen === undefined) {
            goBack();
        } else {
            navigate(screen,args);
        }
    }

    Back(){
        this.Navigate();    
    }
}

const styles = StyleSheet.create({
    container: {
        width:'100%',
        flexDirection:'row'
    }
})