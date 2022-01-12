import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Platform } from 'react-native';
import { SView } from 'servisofts-component';
// import DomWebview from 'react-native-dom-webview';
import { WebView } from 'react-native-webview'

declare const DOM: any;

// Version: 1.0.183
const webApp = DOM("./web/App");

class DWV extends Component {
    webview;
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <WebView
                // app={webApp}

                scrollEnabled={false}
                pagingEnabled={false}
                // allowFileAccessFromFileURLs={true}
                // allowUniversalAccessFromFileURLs={true}
                originWhitelist={['*']}
                ref={(ref) => { this.webview = ref }}
                style={{ width: "100%", backgroundColor: 'transparent', }}
                javaScriptEnabled={true}
                javaScriptEnabledAndroid={true}
                // domStorageEnabled={true}
                // injectedJavaScript={App}
                // startInLoadingState={true}
                // injectedJavaScript={webApp}
                // injectedJavaScriptBeforeContentLoaded={webApp}
                injectedJavaScript={webApp}
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
                // app={webApp}
                // source={{ html: require("./web/html.js")() }}
                // style={{ flex: 1 }}
                source={Platform.OS === 'ios' ? require("./web/index.html") : { uri: "file:///android_asset/index.html"}}
            // source={{ uri: "file:///android_asset/index.html", baseUrl: "file:///android_asset/" }}

            />
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(DWV);