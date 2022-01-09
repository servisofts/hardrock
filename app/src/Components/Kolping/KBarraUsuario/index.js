import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SImage, SLoad, SNavigation, SText, STheme, SView } from 'servisofts-component';
import NavBar from '../../NavBar';
import SSocket from "servisofts-socket"

class KBarraUsuario extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        var usuario = this.props.state.usuarioReducer.usuarioLog
        if (!usuario) {
            // SNavigation.navigate("login");
            return <SView />
        }

        return (
            <SView col={"xs-12"} height={100} backgroundColor={STheme.color.primary} style={{
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                position: 'absolute',
            }} center>
                <SHr height={16} />
                <SView col={"xs-12"} height={50} row flex style={{
                    paddingLeft: 16,
                }}>
                    <SView height={50} width={50} style={{
                        borderRadius: 50,
                        overflow: 'hidden',
                        backgroundColor: STheme.color.card,
                    }}>
                        <SImage src={SSocket.api.root + "usuario/" + usuario.key + "?date=" + new Date().getTime()} />
                    </SView>
                    <SView height={50} flex style={{
                        justifyContent: 'center',
                    }}>
                        <SText font={"Roboto-Bold"} fontSize={20} flex color={"#fff"}> {usuario.Nombres}</SText>
                        <SView height={22} onPress={() => {
                            SNavigation.navigate('editar')
                        }} style={{
                            paddingLeft: 6,
                            alignItems: 'center',
                        }} row>
                            <SText fontSize={12} color={"#fff"} font='LondonTwo' style={{
                                // textDecorationLine: 'underline',
                            }}>Ver perfil </SText>
                            <SIcon name="Ver" width={9} color="#fff" />
                        </SView>
                    </SView>
                    <SView height={50} row>
                        <SView height width={40} center onPress={() => {
                            SNavigation.navigate("notificaciones");
                        }}>
                            <SIcon name={"KNotify"} width={18} fill="#fff" />
                        </SView>
                        <SView height width={40} center onPress={() => {
                            NavBar.open();
                        }}>
                            <SIcon name={"KMenu"} width={28} />
                        </SView>
                    </SView>
                </SView>
            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(KBarraUsuario);