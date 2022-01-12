import React, { Component } from 'react'
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
export default class Guitarra extends Component {
    componentDidMount() {
        this.INSTANCE = this;
        this.createRender();
        this.createCamera();

        this.scene = new THREE.Scene();
        const lightAmbiental = new THREE.AmbientLight(0xffffff, 2.8);
        this.scene.add(lightAmbiental);
        this.addPointLight({ x: -10, y: 10, z: -10, intensity: 0.5, color: 0Xffffff });
        this.addPointLight({ x: 0, y: 10, z: -10, intensity: 7, color: 0Xffff00 });
        this.addPointLight({ x: 10, y: 10, z: -10, intensity: 7, color: 0Xff00ff });
        this.addPointLight({ x: 10, y: -10, z: 10, intensity: 1, color: 0Xffffff });
        this.addPointLight({ x: -10, y: -10, z: 10, intensity: 0.5, color: 0Xff00ff });

        const gridHelper = new THREE.GridHelper(200, 200);
        this.scene.add(gridHelper);

        this.createGuitarra();
        this.createHDR();

        // this.animate();
        const animate = () => {
            // requestAnimationFrame(this.animate);
            // this.camera.position.z -= 0.02;
            // this.camera.position.z -= 0;
            // this.camera.rotation.x -= 0.4;
            this.renderer.render(this.scene, this.camera);
        }
        this.animate = animate;
        this.orbitControls();
        this.renderer.setAnimationLoop(animate);

    }
    orbitControls() {
        const controls = new OrbitControls(this.camera, this.renderer.domElement);
        controls.addEventListener('change', this.animate); // use if there is no animation loop
        controls.minDistance = 20;
        controls.maxDistance = 100;
        controls.target.set(0, 0, - 0.2);
        controls.update();
    }
    createRender() {
        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.outputEnconding = THREE.sRGBEncoding;
        document.body.appendChild(this.renderer.domElement);

    }

    createCamera() {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        // camera.position.x = 105.60000000000038;
        var pos = 20;
        this.camera.position.y = -10;
        this.camera.position.z = pos;
        this.camera.rotation.x = 0.4;
        // camera.rotation.z = 0.4;
        // camera.rotation.y = 1.2799999999999736;
        // camera.rotation.z = 0;
    }
    createHDR() {
        const INSTANCE = this;
        new RGBELoader().load("./assets/hdr/3.hdr", function (texture) {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            INSTANCE.scene.background = texture;
            INSTANCE.scene.environment = texture;
            //  animate()
        });
    }
    createGuitarra() {
        var guitarra;
        const INSTANCE = this;
        const loader = new GLTFLoader();
        loader.load('./assets/hr.gltf', function (gltf) {
            const guitarra = gltf.scene;
            guitarra.scale.y += 10;
            guitarra.scale.x += 10;
            guitarra.scale.z += 10;
            INSTANCE.guitarra = guitarra;
            INSTANCE.scene.add(guitarra);
        }, undefined, function (error) {
            INSTANCE.log(error);
        });
    }
    addPointLight({ x, y, z, intensity, color }) {
        var pointLight = new THREE.PointLight(color);
        pointLight.position.set(x, y, z); // posición
        pointLight.intensity = intensity; // intensidad de la luz
        const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
        // scene.add(pointLightHelper);
        this.scene.add(pointLight);

    }
    log(msn) {
        document.getElementById("console").innerHTML = msn + "<br>" + document.getElementById("console").innerHTML;
    }
    render() {
        return (
            <div />
        )
    }
}
