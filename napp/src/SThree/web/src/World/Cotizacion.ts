
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
                    //model.castShadow = true
                    model.power = model.power*0.5;
                    //model.position.set(main.camera.position.x, main.camera.position.y, main.camera.position.z);
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

            main.sceneCotizacionPantalla1 = main.sceneCotizacion.getObjectByName("Pantalla_1");
            main.sceneCotizacionPantalla2 = main.sceneCotizacion.getObjectByName("Pantalla_2");
            main.sceneCotizacionPantalla3 = main.sceneCotizacion.getObjectByName("Pantalla_3");
            main.sceneCotizacionPantalla4 = main.sceneCotizacion.getObjectByName("Pantalla_4");
            main.sceneCotizacionPantalla5 = main.sceneCotizacion.getObjectByName("Pantalla_5");
            main.sceneCotizacionPantalla6 = main.sceneCotizacion.getObjectByName("Pantalla_6");
            var material = new THREE.MeshBasicMaterial();
            material.color.set('black')
            material.opacity = 0;
            material.blending = THREE.NoBlending;
            main.sceneCotizacionPantalla1.material = material;
            main.sceneCotizacionPantalla2.material = material;
            main.sceneCotizacionPantalla3.material = material;
            main.sceneCotizacionPantalla4.material = material;
            main.sceneCotizacionPantalla5.material = material;
            main.sceneCotizacionPantalla6.material = material;
            var html1 = `<iframe width="100%" height="100%" 
                src="https://www.youtube.com/embed/32XsfeIX_rM?autoplay=1" 
                title="YouTube video player" frameborder="0" allow="autoplay;" allowfullscreen></iframe>`;
            var html2 = `<iframe width="100%" height="100%" 
                src="https://www.youtube.com/embed/Ml3V9o7Oyuw?autoplay=1" 
                title="YouTube video player" frameborder="0" allow="autoplay;" allowfullscreen></iframe>`;
            var html3 = `<iframe width="100%" height="100%" 
                src="https://www.youtube.com/embed/WQSnqKgQ-yk?autoplay=1" 
                title="YouTube video player" frameborder="0" allow="autoplay;" allowfullscreen></iframe>`;
            var html4 = `<iframe width="100%" height="100%" 
                src="https://www.youtube.com/embed/62Mr0elsf0s?autoplay=1" 
                title="YouTube video player" frameborder="0" allow="autoplay;" allowfullscreen></iframe>`;
            var html5 = `<iframe width="100%" height="100%" 
                src="https://www.youtube.com/embed/GgnClrx8N2k?autoplay=1" 
                title="YouTube video player" frameborder="0" allow="autoplay;" allowfullscreen></iframe>`;
            var html6 = `<iframe width="100%" height="100%" 
                src="https://www.youtube.com/embed/Z-VfaG9ZN_U?autoplay=1" 
                title="YouTube video player" frameborder="0" allow="autoplay;" allowfullscreen></iframe>`;
      
            // var html = `
            //<div>
            // <h1 style="color:#fff;">Test</h1>
            //</div>
            //`;

            new HtmlObj(main, main.sceneCotizacionPantalla1, html1);
            new HtmlObj(main, main.sceneCotizacionPantalla2, html2);
            new HtmlObj(main, main.sceneCotizacionPantalla3, html3);
            new HtmlObj(main, main.sceneCotizacionPantalla4, html4);
            new HtmlObj(main, main.sceneCotizacionPantalla5, html5);
            new HtmlObj(main, main.sceneCotizacionPantalla6, html6);
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
