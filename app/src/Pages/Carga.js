import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { SButtom, SHr, SIcon, SNavigation, SPage, SText, SThread, SView } from 'servisofts-component';
import DWV from '../DWV';

class Carga extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delay: 2500,
        };
    }


    render() {
        return (
            <SPage hidden disableScroll center >
                <SView style={{
                    position: "absolute",
                }} col={"xs-12"} height>
                    {/* <SThree ref={(ref) => { this.td = ref }} /> */}
                    <DWV />
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Carga);