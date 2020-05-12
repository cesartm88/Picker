import {  StyleSheet } from 'react-native';
import { normalize } from '../../Libs/Utils';

export const styles = StyleSheet.create({
    container:{
        flex:1,
       
    },
    sfView:{
        flex:1,
    },
    ViewTextArea:{height:normalize(50,'H'),width:'100%',backgroundColor: 'white' },
    TextPlace:{flex:1,flexDirection:'column',alignItems: 'center',justifyContent: 'center'},
    TextStyle:{fontSize:normalize(30)},
    btnSave:{
        marginTop:normalize(55,'H'),
        height:normalize(60,'H'),
        width:'100%',
        backgroundColor:'blue',
    },
    TextSave:{
        color:'white',
        fontSize:normalize(30)
    },
    row:{
        height:normalize(50,'H'),
        width:'100%',
        borderWidth:1
    },
    rowPlace:{flex:1,flexDirection:'row',alignItems: 'center',justifyContent: 'center'},
    list:{marginTop:normalize(15,'H')}
});