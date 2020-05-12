import React from 'react';
import { SafeAreaView, Dimensions, StyleSheet } from 'react-native';
import { applyOs, OS_VERSION } from '../../Libs/Utils';

const deviceH = Dimensions.get('screen').height;
const windowH = Dimensions.get('window').height;
const bottomNavBarH = deviceH - windowH;
const safePadding = OS_VERSION > 20 ? bottomNavBarH : 0;

export class SafeView extends React.Component {

    getStyles() {
        // const { left, right } = this.props;
        return StyleSheet.create({
            safeStyle : {
                flex: 1,
                backgroundColor: 'transparent',
                paddingBottom: applyOs(0, safePadding),
                // paddingLeft: applyOs(0, left),
                // paddingRight: applyOs(0, right),
                // marginLeft: applyOs(left, 0),
                // marginRight: applyOs(right, 0)
            }
        });
    }

    render() {
        const { style, ...props } = this.props;
        const styles = this.getStyles();
        return (
            <SafeAreaView style={[styles.safeStyle, style]} {...props}>
                {this.props.children}
            </SafeAreaView>
        );
    }

}