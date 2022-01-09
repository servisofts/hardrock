import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { SButtom, SHr, SIcon, SNavigation, SPage, SText, SThread, SView } from 'servisofts-component';
import SThree from '../SThree';
import TD from './TD';

class Carga extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delay: 2500,
        };
    }

    redirect() {
        if (!usuario.Actions.validateSession(this.props, true)) {
            SNavigation.replace("login");
        } else {
            SNavigation.replace("/");
        }
    }
    hilo() {
        new SThread(this.state.delay, "cargaHilo", true).start(() => {
            this.redirect();
        });
    }
    render() {
        // this.hilo()
        return (
            <SPage hidden disableScroll center >

                <SView style={{
                    position: "absolute",
                }} col={"xs-12"} height>
                    <SThree ref={(ref) => { this.td = ref }} />
                </SView>
                {/* <SView style={{
                    position: "absolute",
                    left: 0,
                }}>
                    <SButtom type='danger' onPress={() => {
                        this.td.send({ component: "test" })
                    }}>VER</SButtom>
                </SView> */}
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Carga);