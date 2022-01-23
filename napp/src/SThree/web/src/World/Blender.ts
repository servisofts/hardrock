import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import  {CSS3DObject}  from 'three/examples/jsm/renderers/CSS3DRenderer.js';

import PRUEBA1 from "../../../../Assets/3d/prueba1.json";
export default class Blender {
    main;
    constructor(main) {
        this.main = main;

        //INITIALIZE LOADERS
        main.gltfLoader = new GLTFLoader();
        var dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('three/examples/js/libs/draco/');
        main.gltfLoader.setDRACOLoader(dracoLoader);
        main.gltfLoader.parse(JSON.stringify(PRUEBA1), '', async (gltf) => {
            main.test = gltf.scene;
            main.scene.add(main.test);
            main.light = main.scene.getObjectByName("Light").children[0];
            main.light.castShadow = true;
            main.Pointlight = main.scene.getObjectByName("Point").children[0];
            main.Pointlight.castShadow = true;

            gltf.scene.traverse(function (model) {
                if (model.isMesh && model.name.includes("_cs")) {
                    model.castShadow = true;
                }
                if (model.isMesh && model.name.includes("_rs")) {
                    model.receiveShadow = true;
                }
            });
            // main.piso = main.scene.getObjectByName("Piso");
            // main.piso.receiveShadow = true;
            // main.piso.castShadowq = true;
            
            
            main.pantalla = main.scene.getObjectByName("pantalla");
            var html = '<iframe src="https://calisteniabolivia.com" width="100" height="50">';
            var div = document.createElement('div');
            div.innerHTML = html;
            var cssObject = new CSS3DObject(div);
            
            
            cssObject.position.copy( main.pantalla.position );
            cssObject.rotation.copy( main.pantalla.rotation );

            main.scene.add(cssObject);
/*
            var div = document.createElement( 'div' );
            div.style.width = '480px';
            div.style.height = '360px';
            var iframe = document.createElement( 'iframe' );
            iframe.style.width = '480px';
            iframe.style.height = '360px';
            iframe.style.border = '0px';
            iframe.src = [ 'https://www.youtube.com/embed/sd54sefd?rel=0'   ].join( '' );
            div.appendChild( iframe );
            main.pantalla.add(div);
*/
            //main.pantalla.receiveShadow = true;
            //main.pantalla.add(main.YoutubePlayer);
            
        }, undefined, function (error) {
            console.log(error.message);
            console.log(error.stack);
        });


        main.addToRender('Blender', this);
    }

    render() {

    }
}
