
import React, { Component } from "react";
import World from "./src/World"
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {

  }
  render() {
    return (
      <World/>
    )
  }
}