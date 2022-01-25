
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

import PRUEBA1 from "../../../../Assets/3d/prueba1.json";
import * as THREE from "three";

export default class Blender {
    main;
    mixer;
    constructor(main) {
        this.main = main;
        this.mixer = new THREE.AnimationMixer(main.scene);

        //INITIALIZE LOADERS
        main.gltfLoader = new GLTFLoader();
        var dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('three/examples/js/libs/draco/');
        main.gltfLoader.setDRACOLoader(dracoLoader);
        main.gltfLoader.parse(JSON.stringify(PRUEBA1), '', (async (gltf) => {
            main.test = gltf.scene;
            main.scene.add(main.test);
            main.light = main.scene.getObjectByName("Point").children[0];
            main.light.castShadow = true;
            main.light = main.scene.getObjectByName("Point1").children[0];
            main.light.castShadow = true;
            main.light = main.scene.getObjectByName("Point2").children[0];
            main.light.castShadow = true;


            gltf.scene.traverse(function (model) {
                if (model.isMesh && model.name.includes("_cs")) {
                    model.castShadow = true;
                }
                if (model.isMesh && model.name.includes("_rs")) {
                    model.receiveShadow = true;
                }
            });

            this.mixer.actions = [];
            for (var i = 0; i < gltf.animations.length; i++) {
                var action = await this.mixer.clipAction(gltf.animations[i]);
                // this.mixer.actions[gltf.animations[i].name] = action;
                this.mixer.actions.push(action);
                // action.play();
            }

            main.pantalla = main.scene.getObjectByName("Pantalla2");
            var html = '<iframe src="https://calisteniabolivia.com" width="100%" height="100%">';
            var div = document.createElement('div');

            div.innerHTML = html;
            var cssObject = new CSS3DObject(div);

            let scale = 0.008;
            cssObject.scale.set(scale ,scale ,scale);
            cssObject.position.set(main.pantalla.position.x,main.pantalla.position.y,main.pantalla.position.z);
            cssObject.rotation.set(0,-0.5,0);
            //cssObject.position.copy( main.pantalla.position );
            //cssObject.rotation.copy( main.pantalla.rotation );
            //cssObject.scale.copy( main.pantalla.scale );

            main.scene.add(cssObject);


            // this.mixers.push(this.mixer);

            // this.mixer[0].setLoop(THREE.LoopOnce);
            // this.mixer[0].clampWhenFinished = true;
            // INSTANCE.mixer.actions[0].play();
            // main.piso = main.scene.getObjectByName("Piso");
            // main.piso.receiveShadow = true;
            // main.piso.castShadowq = true;

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
