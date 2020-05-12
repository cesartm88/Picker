import { StyleSheet } from 'react-native';
import { normalize  } from "../../../Libs/Utils";

export const styles = StyleSheet.create({
    containerPicker:{
        width:'100%',
        height:normalize(80,'H'),
        backgroundColor:'white'
    },
     row:{
         width:'100%',
         height:normalize(80,'H'),
         borderWidth:1,
         flex:1,
         alignItems:'center',
         justifyContent:'center'
     },
     label:{
         fontSize:normalize(35),
     }
});