import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';


export default class HtmlObj {
    main;
    constructor(main, mesh, content) {
        this.main = main;
        var div = document.createElement('div');
        var ampliar = 500;

        div.style.width = ampliar * 2 + "px";
        div.style.height = ampliar * 2 + "px";
        div.style.margin = "0px";
        div.style.padding = "0px";
        div.style.position = "absolute";

        // div.style.overflow = "hidden";
        div.innerHTML = `
        <div style="position: bsolute;width: 100%;height:100%; ">
            <div style="position: absolute;width:100%;height:100%;  ">
                <div style="position:absolute; width:100%; height:100%;">
                ${content}
                </div>
            </div>
        </div>
        `;
        var cssObject = new CSS3DObject(div);
        cssObject.scale.set(mesh.scale.x / ampliar, mesh.scale.y / ampliar, mesh.scale.z / ampliar);
        cssObject.rotation.set(mesh.rotation.x, mesh.rotation.y, main.pantalla.rotation.z);
        cssObject.position.set(mesh.position.x, mesh.position.y, main.pantalla.position.z);
        main.scene.add(cssObject);
        return cssObject;
    }

    render() {
    }
}
