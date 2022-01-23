import React, { Component } from "react";
import * as THREE from "three";
import Blender from "./Blender";
import Camera from "./Camera";
import Helpers from "./Helpers";
import Renderer from "./Renderer";
import Stats from "./Stats";

export default class index extends Component {
    ITEMS_TO_RENDER = {};
    componentDidMount() {
        // var elem = document.getElementById("three");
        // if (elem.requestFullscreen) {
        //     elem.requestFullscreen();
        // } else if (elem.mozRequestFullScreen) { /* Firefox */
        //     elem.mozRequestFullScreen();
        // } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        //     elem.webkitRequestFullscreen();
        // } else if (elem.msRequestFullscreen) { /* IE/Edge */
        //     elem.msRequestFullscreen();
        // }
        // elem.style.width = '100%';
        // elem.style.height = '100%';
        new Renderer(this);
        this.scene = new THREE.Scene();

        new Stats(this);
        new Camera(this);
        // new Helpers(this);
        new Blender(this);
        this.renderer.setAnimationLoop(this.animate.bind(this));
    }

    addToRender(name, instance) {
        this.ITEMS_TO_RENDER[name] = instance;
    }

    animate() {
        this.DELTA = this.clock.getDelta();
        Object.keys(this.ITEMS_TO_RENDER).forEach(key => {
            this.ITEMS_TO_RENDER[key].render();
        })
        this.renderer.render(this.scene, this.camera);
    }

    render() { return <div id="three" /> }
}
