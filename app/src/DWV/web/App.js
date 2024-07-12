
import React, { Component } from "react";
import ReactDOM from "react-dom";
// import Guitarra from "./src/Guitarra";
import Test from "./src/Test";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    document.body.style.margin = 0;
    document.body.style.padding = 0;
    console.log("Start Webview...");
  }
  render() {
    return (
      // <h1>Hola</h1>
    //  <Guitarra />
     <Test />
    )
  }
}
// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);