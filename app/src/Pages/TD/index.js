import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WebView } from 'react-native-webview'
import { renderToString } from 'react-dom/server'
import { SText, SView } from 'servisofts-component';
import Web, { JavaScript } from './Web';

export default class TD extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SView col={"xs-12"} height>
                <WebView
                    style={{ height: "100%", width: "100%" }}
                    source={{ html: renderToString(<Web />) }}
                ></WebView>
            </SView>
        );
    }
}