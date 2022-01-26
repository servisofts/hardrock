
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

import cotizacion from "../../../../Assets/3d/cotizacion.json";
import * as THREE from "three";
import HtmlObj from './HtmlObj';

export default class Blender {
    main;
    mixer;
    constructor(main) {
        this.main = main;
        this.mixer = new THREE.AnimationMixer(main.scene);
        //INITIALIZE LOADERS
        main.gltfLoader = new GLTFLoader(main.loadingManager);
        var dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('three/examples/js/libs/draco/');
        main.gltfLoader.setDRACOLoader(dracoLoader);
        main.gltfLoader.parse(JSON.stringify(cotizacion), '', (async (gltf) => {
            main.sceneCotizacion = gltf.scene;
            main.scene.remove(main.sceneActual);
            main.scene.add(main.sceneCotizacion);
            main.sceneActual = main.sceneCotizacion;
            main.camera = main.sceneCotizacion.getObjectByName("Camera");
            gltf.scene.traverse(function (model) {
                if (model.isLight) {
                    model.castShadow = true
                    model.power = model.power*0.5;
                };

                if (model.name.includes("_cs")) {
                    model.castShadow = true;
                }
                if (model.name.includes("_rs")) {
                    model.receiveShadow = true;
                }
            });
            this.mixer.actions = [];
            for (var i = 0; i < gltf.animations.length; i++) {
                var action = await this.mixer.clipAction(gltf.animations[i]);
                this.mixer.actions.push(action);
                if (gltf.animations[i].name.indexOf("_nr") > -1) {
                    action.setLoop(THREE.LoopOnce);
                    action.clampWhenFinished = true;
                }
                if (gltf.animations[i].name.indexOf("_ns") < 0) {
                    action.play();
                }
                // console.log(gltf.animations[i]);
            }

            main.sceneCotizacionPantalla = main.sceneCotizacion.getObjectByName("Pantalla");
            var material = new THREE.MeshBasicMaterial();
            material.color.set('black')
            material.opacity = 0;
            material.blending = THREE.NoBlending;
            main.sceneCotizacionPantalla.material = material;
            // var html = `
            // <iframe 
            //     width="100%" 
            //     height="100%" 
            //     src="https://www.youtube.com/embed/lDK9QqIzhwk?autoplay=1" 
            //     title="YouTube video player" 
            //     frameborder="0" 
            //     allow="autoplay;" 
            //     allowfullscreen>
            // </iframe>`;D
      
            var html = `
           <div>
            <h1 style="color:#fff;">Test</h1>
           </div>
           `;

            new HtmlObj(main, main.sceneCotizacionPantalla, html);
        }).bind(this), undefined, function (error) {
            console.log(error.message);
            console.log(error.stack);
        });


        main.addToRender('Blender', this);
    }

    render() {
        if (this.mixer) {
            this.mixer.update(this.main.DELTA);
        }
    }
}
