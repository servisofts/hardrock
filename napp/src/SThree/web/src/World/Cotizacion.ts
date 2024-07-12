
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';

import cotizacion from "../../../../Assets/3d/cotizacion.json";

import * as THREE from "three";
import HtmlObj from './HtmlObj';

export default class Blender {
    main;
    mixer;
    animations;
    constructor(main) {
        this.main = main;
        this.mixer = new THREE.AnimationMixer(main.scene);
        //INITIALIZE LOADERS
        main.gltfLoader = new GLTFLoader(main.loadingManager);
        var dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('three/examples/js/libs/draco/');
        main.gltfLoader.setDRACOLoader(dracoLoader);
        main.gltfLoader.parse(JSON.stringify(cotizacion), '', (async (gltf) => {
            // main.scene.rotation.x = Math.PI/2;

            main.sceneCotizacion = gltf.scene;
            main.sceneCotizacion.add(new THREE.AmbientLight(0xffffff, 0.32));

            main.scene.remove(main.sceneActual);
            main.scene.add(main.sceneCotizacion);
            main.sceneActual = main.sceneCotizacion;
            gltf.scene.traverse(function (model) {
                if (model.isCamera) {
                    main.camera = model;
                    // main.camera.setFocalLength(45);
                    // main.camera.rotation.order = 'XZY';
                    // main.controls = new PointerLockControls(main.camera, document.body);

                }
                if (model.isLight) {

                    model.castShadow = true
                    if (model.shadow) {
                        // model.shadow.mapSize.width = window.innerWidth*2;
                        // model.shadow.mapSize.height = window.innerHeight*2;

                    }
                };

                if (model.name.includes("_cs")) {
                    model.castShadow = true;
                }
                if (model.name.includes("_rs")) {
                    model.receiveShadow = true;
                }
            });
            this.mixer.actions = [];
            this.animations = {};
            for (var i = 0; i < gltf.animations.length; i++) {
                var action = await this.mixer.clipAction(gltf.animations[i]);
                this.mixer.actions.push(action);
                this.animations[gltf.animations[i].name] = action;
                if (gltf.animations[i].name.indexOf("_nr") > -1) {
                    action.setLoop(THREE.LoopOnce);
                    action.clampWhenFinished = true;
                }
                if (gltf.animations[i].name.indexOf("_ns") < 0) {
                    action.play();
                }
                // console.log(gltf.animations[i]);
            }
            this.createPantallas(main);

        }).bind(this), undefined, function (error) {
            console.log(error.message);
            console.log(error.stack);
        });


        main.addToRender('Blender', this);
    }

    loadDisplay(main, name, url) {
        // main["sceneCotizacion_" + name] = main.sceneCotizacion.getObjectByName(name);
        var pantalla = main.sceneCotizacion.getObjectByName(name);
        var material = new THREE.MeshBasicMaterial();
        material.color.set('black')
        material.opacity = 0;
        material.blending = THREE.NoBlending;
        pantalla.material = material;
        var html1 = `<iframe width="100%" height="100%" src="${url}" ></iframe>`;
        new HtmlObj(main, pantalla, html1, { width: 411, height: 823 });
    }
    createPantallas(main) {
        this.loadDisplay(main, "Pantalla_1", "https://tapekeapp.com")
        this.loadDisplay(main, "Pantalla_2", "https://calistenia.servisofts.com")
        this.loadDisplay(main, "Pantalla_3", "https://fullparts.servisofts.com")
        this.loadDisplay(main, "Pantalla_4", "https://www.npmjs.com/package/servisofts-component")
        this.loadDisplay(main, "Pantalla_5", "https://kolping.servisofts.com")
        this.loadDisplay(main, "Pantalla_6", "https://fullparts.servisofts.com")
        this.loadDisplay(main, "Pantalla_7", "https://motonet.servisofts.com")
        this.loadDisplay(main, "Pantalla_8", "https://motonet.servisofts.com")
    }
    render() {
        if (this.mixer) {
            this.mixer.update(this.main.DELTA);
        }
    }
}
