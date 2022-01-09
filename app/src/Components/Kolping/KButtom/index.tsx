import React, { Component } from 'react';
import { SLoad, SText, STheme, SView } from 'servisofts-component';

type KButtom_props = {
    primary?: boolean,
    secondary?: boolean,
    onPress?: () => void,
    loading?: boolean,
    small?: boolean,
}

export default class KButtom extends Component<KButtom_props> {
    constructor(props: any) {
        super(props);
        this.state = {
        };
    }

    render() {
        var bgColor = this.props.primary ? STheme.color.primary : this.props.secondary ? STheme.color.info : STheme.color.primary;
        var size = {
            width: 350,
            height: 50
        }
        if (this.props.small) {
            size.width = 100;
            size.height = 30;
        }
        return (<SView height={size.height} width={size.width} backgroundColor={bgColor} style={{
            borderRadius: 8,
            
        }} center onPress={() => {
            if (this.props.loading) return;
            if (this.props.onPress) {
                this.props.onPress();
            }
        }} activeOpacity={this.props.loading ? 1 : 0.5}>
            {this.props.loading ? <SLoad /> : <SText color={STheme.color.white} font={"Roboto-Bold"} >{this.props.children}</SText>}
        </SView>);
    }
}
