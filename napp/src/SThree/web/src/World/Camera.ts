import * as THREE from "three";
import { GUI } from 'dat.gui'

export default class Camera {
    props = {
        velocity: 2,
        speedRun: 3,
        speedRotation: 0.5
    }
    main;
    gui;
    keystate = {};
    constructor(main) {
        this.main = main;
        main.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        main.addToRender('Camera', this);
        main.camera.position.set(0, -7, 1.5);
        main.camera.rotation.x = Math.PI / 360 * 180;

        // this.createGUIControls();
        document.addEventListener('keydown', this.onKeyDown.bind(this), false);
        document.addEventListener('keyup', this.onKeyUp.bind(this), false);
    }
    onKeyDown(evt) {
        this.keystate[evt.keyCode] = true;
    }
    onKeyUp(evt) {
        delete this.keystate[evt.keyCode];
    }
    createGUIControls() {
        this.gui = new GUI()
        const cameraFolder = this.gui.addFolder('Camera Position')
        cameraFolder.add(this.main.camera.position, 'y', 0, 10)
        cameraFolder.open()
        const cameraRotationFolder = this.gui.addFolder('Camera Rotation')
        cameraRotationFolder.add(this.main.camera.rotation, 'x', Math.PI * -1, Math.PI * 1)
        cameraRotationFolder.open()
    }

    render() {
        var pos = { ...this.main.camera.position };
        var delta = this.main.DELTA;
        var speed = 1;
        if (this.keystate[16]) {
            speed = this.props.speedRun;
        }
        if (this.keystate[81]) {
            this.main.camera.rotation.y += this.props.speedRotation * delta * speed;
        }
        if (this.keystate[69]) {
            this.main.camera.rotation.y -= this.props.speedRotation * delta * speed;
        }
        if (this.keystate[38] || this.keystate[87]) {
            pos.y += this.props.velocity * delta * speed;
        }
        if (this.keystate[40] || this.keystate[83]) {
            pos.y -= this.props.velocity * delta * speed;
        }
        if (this.keystate[37] || this.keystate[65]) {
            pos.x -= this.props.velocity * delta * speed;
        }
        if (this.keystate[39] || this.keystate[68]) {
            pos.x += this.props.velocity * delta * speed;
        }
        this.main.camera.position.set(pos.x, pos.y, pos.z);

    }
}
