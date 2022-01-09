import React, { Component } from 'react';
import { SHr, SIcon, SImage, SText, STheme, SView } from 'servisofts-component';

export default class KFooter extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getCardFooter({ svg }) {
        return <SView col={"xs-1"} style={{ margin: 7, }} onPress={() => {
            alert(svg);
        }}>
            <SIcon name={svg} fill={STheme.color.secondary} width={20} height={20} />
        </SView>
    }

    render() {
        return (
            <SView col={"xs-12"} row height={70} backgroundColor={STheme.color.text} center>
                <SView col={"xs-6"} row center>
                    <SIcon name={"logowhite"} width={220} height={45} fill={STheme.color.secondary} />
                </SView>
                <SView col={"xs-6"} center row>
                    {this.getCardFooter({ svg: "facebook" })}
                    {this.getCardFooter({ svg: "instagram" })}
                    {this.getCardFooter({ svg: "tiktok" })}
                    {this.getCardFooter({ svg: "youtube" })}
                    {this.getCardFooter({ svg: "linkedin" })}
                </SView>
            </SView>
        );
    }
}
