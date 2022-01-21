
import React, { Component } from "react";
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

import TEST from "./test.json";
class Test extends Component {
    createRender() {
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.outputEnconding = THREE.sRGBEncoding;
        this.renderer.setClearColor(0x000000)
        
        this.renderer.physicallyCorrectLights = true;
        this.renderer.shadowMap.enabled = true;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 0.25;
        document.getElementById("three").appendChild(this.renderer.domElement);

    }
    createCamera() {
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    }
    createTest() {
        const INSTANCE = this;

        // loader.load("./test.gltf", function (gltf) {
        this.gltfLoader.parse(JSON.stringify(TEST), '', function (gltf) {
            INSTANCE.test = gltf.scene;
            INSTANCE.scene.add(INSTANCE.test);

            INSTANCE.camera = INSTANCE.scene.getObjectByName("Camera").children[0];
            INSTANCE.piso = INSTANCE.scene.getObjectByName("Piso");
            INSTANCE.piso.receiveShadow = true;

            INSTANCE.cubo = INSTANCE.scene.getObjectByName("Cube");
            INSTANCE.cubo.castShadow = true;

            INSTANCE.ventana = INSTANCE.scene.getObjectByName("Ventana");
            
            INSTANCE.ventana.material.transparent = true;
            INSTANCE.ventana.castShadow = true;
            


            INSTANCE.light = INSTANCE.scene.getObjectByName("Light").children[0];
            INSTANCE.light.castShadow = true;


        }, undefined, function (error) {
            console.log(error.message);
            console.log(error.stack);
        });
    }
    resizeCanvasToDisplaySize() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        const canvas = this.renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        this.renderer.setSize(width, height, false);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }
    componentDidMount() {
        this.createRender();
        this.scene = new THREE.Scene();
        this.createCamera();

        this.gltfLoader = new GLTFLoader();
        var dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('three/examples/js/libs/draco/');
        this.gltfLoader.setDRACOLoader(dracoLoader);

        // const gridHelper = new THREE.GridHelper(200, 200);
        // this.scene.add(gridHelper);
        // const gridHelper2 = new THREE.GridHelper(200, 200);
        // gridHelper2.rotation.x = Math.PI / 2;
        // this.scene.add(gridHelper2);

        // const axesHelper = new THREE.AxesHelper(100);
        // this.scene.add(axesHelper);

        this.createTest();

        // const geometry = new THREE.BoxGeometry(5, 5, 5);
        // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        // const cube = new THREE.Mesh(geometry, material);
        // this.scene.add(cube);


        // ----RENDER----
        const animate = () => {
            this.resizeCanvasToDisplaySize();
            this.renderer.render(this.scene, this.camera);
        }
        this.animate = animate;
        this.renderer.setAnimationLoop(animate);
    }
    render() {
        return (
            <div id="three" />
        )
    }
}
export default Test;