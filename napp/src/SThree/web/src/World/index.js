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
        new Renderer(this);
        this.scene = new THREE.Scene();
        new Stats(this);
        new Camera(this);
        // new Helpers(this);
        new Blender(this);

        this.renderer.setAnimationLoop(this.animate.bind(this));

        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.renderer.domElement.addEventListener('click', (event) => this.onClick(event), false)
    }

    onClick(event) {
        const main = this;
        const mouse = {
            x: (event.clientX / main.renderer.domElement.clientWidth) * 2 - 1,
            y: -(event.clientY / main.renderer.domElement.clientHeight) * 2 + 1,
        }
    
        main.raycaster.setFromCamera(mouse, main.camera);
        const intersects = main.raycaster.intersectObjects(main.scene.children)

        if (intersects.length > 0) {
            var pantalla = intersects.filter(o => o.object.name.includes("pantalla"));
            if(pantalla.length>0){
                for (let i = 0; i < pantalla.length; i++) {

                    main.video = document.createElement( 'video' );
                    // video.id = 'video';
                    // video.type = ' video/ogg; codecs="theora, vorbis" ';
                    main.video.src = "ejemplo.ogv";
                    main.video.load(); // must call after setting/changing source
                    main.video.play();
                    
                    // alternative method -- 
                    // create DIV in HTML:
                    // <video id="myVideo" autoplay style="display:none">
                    //		<source src="videos/sintel.ogv" type='video/ogg; codecs="theora, vorbis"'>
                    // </video>
                    // and set JS variable:
                    // video = document.getElementById( 'myVideo' );
                    
                    main.videoImage = document.createElement( 'canvas' );
                    main.texture = new THREE.VideoTexture( main.videoImage );

                    main.texture.minFilter = THREE.LinearFilter;
                    main.texture.magFilter = THREE.LinearFilter;
                    const material = new THREE.MeshBasicMaterial({ 
                        map: main.texture, 
                    });

                    pantalla[i].object.material = material;
                    pantalla[i].object.material.needsUpdate = true;
                    pantalla[i].object.material.update();
                    console.log(pantalla);
                }
            }
            

        }
    }

    addToRender(name, instance) {
        this.ITEMS_TO_RENDER[name] = instance;
    }

    animate() {
        Object.keys(this.ITEMS_TO_RENDER).forEach(key => {
            this.ITEMS_TO_RENDER[key].render();
        })
        this.renderer.render(this.scene, this.camera);
        this.cssRenderer.render(this.scene, this.camera);
    }

    render() { return <div id="three" /> }
}
