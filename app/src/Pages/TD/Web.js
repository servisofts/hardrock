import React, { Component } from 'react'

export default class Web extends Component {
    render() {
        return (
            <div style={{
                background: "#000",
                width: "100%",
                height: "100vh",
                border: 0,
                margin: 0,
                padding: 0,
            }}>
                <h1 id={"test"} style={{ color: "#fff" }} >Hola mundo</h1>
            </div>
        )
    }
}

export const JavaScript = `
    document.getElementById('test').innerHTML = 'Hola mundo desde JavaScript';


`
