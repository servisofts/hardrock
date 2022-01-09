import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WebView } from 'react-native-webview'
import { SText, SView } from 'servisofts-component';

export default class SThree extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    send(obj) {
        this.webview.postMessage(JSON.stringify(obj));
    }
    render() {
        return (
            <SView col={"xs-12"} height>
                <WebView
                    ref={(ref) => {
                        this.webview = ref;
                    }}
                    style={{ width: "100%", backgroundColor: 'transparent', }}
                    originWhitelist={['*']}
                    source={require("../Components/3d/index.js")}
                    javaScriptEnabled={true}
                    // injectedJavaScript={require("./funcions.wbjs").default}
                    onLoadEnd={() => {
                        // this.send({
                        //     component: "init",
                        //     data: {
                        //         img1: "./ts1.jpg",
                        //     }
                        // });
                    }}
                    onMessage={(data) => {
                        var data = data.nativeEvent.data;
                        console.log(data);
                        // props.navigation.navigate("Home");
                    }}
                ></WebView>
            </SView >
        );
    }
}
