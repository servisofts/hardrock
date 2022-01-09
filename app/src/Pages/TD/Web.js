import React, { Component } from 'react'

export default class Web extends Component {
    render() {
        return (
            <div>
                <h1 onClick={()=>{ 
                    document.getElementById("web").innerHTML = "https://www.google.com"
                }}>Hola mundo</h1>
                <div id={"web"}>Algo</div>
            </div>
        )
    }
}
