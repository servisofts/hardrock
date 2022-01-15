
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Guitarra from "./src/Guitarra";
import Test from "./src/Test";
class App extends Component {
  componentDidMount() {

    document.body.style.margin = 0;
    document.body.style.padding = 0;
    console.log("Start Webview...");
  }
  render() {
    return (
      <>
        <Guitarra />
        {/* <Test/> */}
      </>
    )
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);