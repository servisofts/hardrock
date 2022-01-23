import * as THREE from "three";
import  {CSS3DRenderer}  from 'three/examples/jsm/renderers/CSS3DRenderer.js';

export default class Renderer {
    main;
    constructor(main) {
        this.main = main;
        main.clock = new THREE.Clock();
        main.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        main.cssRenderer = new CSS3DRenderer();

        main.renderer.setPixelRatio(window.devicePixelRatio);
        //main.cssRenderer.setPixelRatio(window.devicePixelRatio);

        main.renderer.setSize(window.innerWidth, window.innerHeight);
        main.cssRenderer.setSize(window.innerWidth, window.innerHeight);

        main.renderer.outputEnconding = THREE.sRGBEncoding;
        main.renderer.setClearColor(0x000000);

        main.renderer.domElement.style.position = 'absolute';
        main.cssRenderer.domElement.style.position = 'absolute';

        main.renderer.domElement.style.top = 0;
        main.cssRenderer.domElement.style.top = 0;


        main.renderer.physicallyCorrectLights = true;
        main.renderer.shadowMap.enabled = true;
        main.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        main.renderer.toneMappingExposure = 0.5;
        
        document.getElementById("three").appendChild(main.renderer.domElement);
        document.getElementById("three").appendChild(main.cssRenderer.domElement);

        main.addToRender('Renderer', this);
    }

    resizeCanvasToDisplaySize() {
        this.main.renderer.setSize(window.innerWidth, window.innerHeight);
        const canvas = this.main.renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        this.main.renderer.setSize(width, height, false);
        this.main.camera.aspect = width / height;
        this.main.camera.updateProjectionMatrix();
    }
    render(){
        this.resizeCanvasToDisplaySize();
    }
}
