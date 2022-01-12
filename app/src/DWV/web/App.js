
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Guitarra from "./src/Guitarra";
// import Logo from "./src/Logo";
class App extends Component {
  componentDidMount() {
    document.body.style.margin = 0;
    document.body.style.padding = 0;
  }
  render() {
    return (
      <>
        <Guitarra />
        <div id={"console"} style={{
          position: "fixed",
          // zIndex: "9999",
          bottom: 0,
          left: 0,
          width: 300,
          height: 100,
          background: "#00000066",
        }}>
          <img src={"./assets/ts1.jpg"} width={100} height={100} />
        </div>
      </>
    )
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);