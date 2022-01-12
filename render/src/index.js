import React from 'react';
import ReactDOM from 'react-dom';

function App() {

    return (
        <div >
            <h1 id="test" onClick={() => {
                document.getElementById("test").innerHTML = "Hello World";
            }}>Hola mundo App</h1>
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);