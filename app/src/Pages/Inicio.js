import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SGradient, SHr, SIcon, SImage, SLoad, SPage, SScrollView2, SText, STheme, SView, SNavigation } from 'servisofts-component';
import Pages from '.';
import Kolping from '../Components/Kolping';
import Roles_permisos from '../Services/Roles_permisos';
import usuarioPage from '../Services/Roles_permisos/Components/usuarioPage';
import usuario from '../Services/Usuario/Components/usuario';

class Inicio extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        if (!usuario.Actions.validateSession(this.props)) {
            return <SLoad />
        }
    }
    getCard() {
        return <SView col={"xs-12"} center style={{
            position: 'absolute',
            top: 70,
        }}>
            <SView width={300} height={195}>
                <SView col={"xs-12"} height style={{ position: "absolute", }}>
                    <SIcon name={"homeBox"} fill={"#01899233"} width={"100%"} />
                </SView>
                <SView height={150} style={{
                    paddingLeft: 24,
                    paddingRight: 24,
                    paddingTop: 24,
                }}>
                    <SText font={"LondonTwo"} color={STheme.color.white} fontSize={18}>{`¿Necesitas un Doctor?`}</SText>
                    <SHr height={14} />
                    <SText font={"LondonBetween"} color={STheme.color.white} fontSize={16} width={220}>{`Reserva tu cita con nuestros especialistas!`}</SText>
                    <SHr height={16} />
                    <SView col={"xs-12"} center style={{
                    }}>
                        <Kolping.KButtom secondary small >Comprar ficha</Kolping.KButtom>
                    </SView>
                </SView>
                <SView style={{
                    position: "absolute",
                    right: -13,
                    top: -10,
                }} width={115} height={170}>
                    <SIcon name={"Enfermera7"} />
                </SView>
            </SView>
        </SView>
    }
    getCardSucursales({ svg, title, texto, numero }) {
        return <SView col={"xs-12"} row height={110} backgroundColor={STheme.color.card} style={{ borderRadius: 24, }} onPress={() => {
            alert(title + '\n' + texto + '\n' + numero);
        }}>
            <SView col={"xs-3"} center height >
                <SIcon name={svg} width={60} />
            </SView>
            <SView col={"xs-8"} height >
                <SHr height={8} />
                <SText font={"LondonMM"} fontSize={18}>{title}</SText>
                <SHr height={8} />
                <SView col={"xs-12"} row flex>
                    <SView col={"xs-1"} height style={{
                        justifyContent: 'center',
                    }}>
                        <SIcon name={"map"} width={10} />
                    </SView>
                    <SView col={"xs-11"} height={50}>
                        <SText font={"LondonMM"} fontSize={12}>{texto}</SText>
                    </SView>
                </SView>
                <SHr height={10} />
                <SView col={"xs-12"} row flex center>
                    <SView col={"xs-1"} style={{
                        justifyContent: 'center',
                    }}>
                        <SIcon name={"cellphone"} width={10} />
                    </SView>
                    <SView col={"xs-11"} >
                        <SText font={"LondonBetween"} fontSize={14} color={STheme.color.info}>{numero}</SText>
                    </SView>
                </SView>
            </SView>
            <SView col={"xs-1"} center height>
                <SIcon name={"arrowRight"} width={30} fill={"transparent"} />
            </SView>
        </SView>
    }
    getSucursales() {
        return <SView col={"xs-12"} center >
            <SView col={"xs-11"}>
                <SText font={"LondonMM"} fontSize={18} >{'Visita nuestro centro médico'}</SText>
            </SView>
            <SHr height={20} />
            <SView col={"xs-11"} >
                {this.getCardSucursales({
                    svg: "sservicios",
                    title: 'Kolping "PARAISO"',
                    texto: 'Barrio El Paraiso, Av. Bernabe Sosa esq. Luis Lavadenz entre 1er y 2do anillo',
                    numero: '346-9946'
                })}
                <SHr height={20} />
                {this.getCardSucursales({
                    svg: "sservicios",
                    title: 'Kolping "LOS CHACOS"',
                    texto: 'Z/ Noroeste, atrás del Parque industrial a una cuadra de la plaza los Chacos',
                    numero: '346-6981'
                })}
                <SHr height={20} />
                {this.getCardSucursales({
                    svg: "sservicios",
                    title: 'Kolping "15 DE DICIEMBRE"',
                    texto: 'Z/ Norte, Barrio 15 de diciembre Av. 2 de agosto, 7mo anillo',
                    numero: '346-1430'
                })}

                <SHr height={35} />
            </SView>
        </SView>
    }
    getContactanos() {
        return <SView col={"xs-12"} center >
            <SView col={"xs-11"} center>
                <SHr height={14} />
                <SText font={"Dancing Script"} fontSize={16} color={"#018992"} style={{
                    fontStyle: "italic",
                    fontWeight: "bold",
                    textAlign: "center"
                }}>
                    {'«Cuando se trata de hacer el bien, el hombre debe ser semejante a Dios o por lo menos tratar de serlo.»\n\(P.B. Adolfo Kolping)'}
                </SText>
                <SHr height={20} />
                <SView>
                    <Kolping.KButtom primary small>Contáctanos</Kolping.KButtom>
                </SView>
                <SHr height={20} />
            </SView>
        </SView>
    }
    getCardTrabajoSocial({ img, title, description }) {
        return <SView backgroundColor={STheme.color.card} height={200} width={150} style={{
            borderRadius: 20,
            borderWidth: 2,
            borderColor: STheme.color.card,
        }}>
            <SView center style={{ height: 100, width: 146 }}>
                <SImage src={img} style={{
                    borderTopEndRadius: 20,
                    borderTopStartRadius: 20,
                }} />
            </SView>
            <SView center style={{ height: 66 }}>
                <SText font={"LondonMM"} style={{ padding: 3, }} fontSize={14} color={STheme.color.primary}>{title}</SText>
            </SView>
            <SView center style={{ height: 20 }} onPress={() => {
                alert(title);
            }}>
                <SText font={"LondonMM"} fontSize={14} textDecorationLine={"underline"} color={STheme.color.info}>{description}</SText>
            </SView>
        </SView>
    }
    getTrabajoSocial() {
        return <SView col={"xs-12"} center >
            <SView col={"xs-11"}>
                <SHr height={15} />
                <SText font={"LondonMM"} fontSize={18} color={"#000"}>{'Trabajo social'}</SText>
                <SHr height={15} />
            </SView>
            <SView col={"xs-11"} row>
                {this.getCardTrabajoSocial({ img: require('../Assets/img/ts1.jpg'), title: 'Campaña “Atención médica y Cirugías oftalmológicas”', description: 'Leer mas >' })}
                <SView width={10} />
                {this.getCardTrabajoSocial({ img: require('../Assets/img/ts1.jpg'), title: 'Campaña “Veo Veo”', description: 'Leer mas >' })}
            </SView>
            <SHr height={25} />
        </SView >
    }

    getButtom({ label, url, icon }) {
        return <SView width={110} height={130} style={{
            padding: 5,            
        }}>
            <SView col={"xs-12"} height center style={{
                overflow: "hidden",
            }} onPress={() => {
                SNavigation.navigate(url)
            }}>
                <SView center col={"xs-12"}>
                    <SIcon name={icon} height={80} width={80} />
                </SView>
                <SView col={"xs-12"} height={34} center>
                    <SText center >{label}</SText>
                </SView>
            </SView>
        </SView>
    }
    getContent1() {
        return <SView col={"xs-11"} row center>
            <SHr height={10}/>
            {this.getButtom({ label: 'Farmacia', url: 'la', icon: 'SDfarmacia' })}
            {this.getButtom({ label: 'Óptica', url: 'optica', icon: 'SDoptica' })}
            {this.getButtom({ label: 'Laboratorio', url: 'laboratorio', icon: 'SDlaboratorio' })}
        </SView>
    }

    getContent2() {
        return <SView col={"xs-12"} row center>
            <SHr height={10}/>
            {this.getButtom({ label: 'Farmacia', url: 'farmacia', icon: 'sfarmacia' })}
            {this.getButtom({ label: 'Óptica', url: 'farmacia', icon: 'soptica' })}
            {this.getButtom({ label: 'Laboratorio', url: 'farmacia', icon: 'slaboratorio' })}
            {this.getButtom({ label: 'Enfermería', url: 'farmacia', icon: 'senfermeria' })}
            {this.getButtom({ label: 'Imagenología y electromedicina', url: 'farmacia', icon: 'simagenologia' })}

        </SView>
    }

    render() {

        // var UsuaioPage = Pages["usuarioPage/lista"];
        return (
            <SPage title={'Inicio'} hidden disableScroll>
                <SView col={"xs-12"} flex>
                    <SScrollView2 disableHorizontal>
                        <SView col={"xs-12"} center>
                            <SHr height={280} />
                            <SView col={"xs-12 sm-10 md-8 lg-6 xl-4"} center>
                                <SView col={"xs-11"}>
                                    <SText font={"LondonMM"} fontSize={18}>{'Servicios a domicilio!'}</SText>
                                </SView>
                                {this.getContent1()}
                                <SView col={"xs-12"} height={20}></SView>
                                <SView col={"xs-11"}>
                                    <SText font={"LondonMM"} fontSize={18}>{'Nuestros servicios!'}</SText>
                                </SView>
                                {this.getContent2()}
                                <SHr height={30} />
                                {this.getSucursales()}
                                <SHr height={20} />
                                {/* {this.getContactanos()} */}
                                {/* {this.getTrabajoSocial()} */}
                                {/* <SView col={"xs-11"} center height={200}>
                                    <SIcon name={"tuvidaesmejor"} fill={"#eeeeee"} width={300} />
                                </SView> */}
                            </SView>
                            <SView col={"xs-10"} center height={200}>
                                <SIcon name={"Logo"} width={300} />
                            </SView>
                            <Kolping.KFooter />
                        </SView>
                    </SScrollView2>
                </SView>
                <SView height={250} col={"xs-12"} style={{
                    position: "absolute",
                }}>
                    <SGradient colors={[
                        STheme.color.background + "00",
                        STheme.color.background,
                        STheme.color.background,
                        STheme.color.background,
                        STheme.color.background,
                        STheme.color.background,
                        STheme.color.background,
                    ]} />
                </SView>
                <Kolping.KBarraUsuario />
                {this.getCard()}
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Inicio);