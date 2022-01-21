import TEST from "./test.json";

export default class Blender {
    
    constructor(ThreeScene) {
        this.ThreeScene = ThreeScene;
        this.createTest();
    }
    createTest () {
        const INSTANCE = this.ThreeScene;

        // loader.load("./test.gltf", function (gltf) {
        this.ThreeScene.gltfLoader.parse(JSON.stringify(TEST), '',  async (gltf) => {
            INSTANCE.test = gltf.scene;
            INSTANCE.scene.add(INSTANCE.test);

            INSTANCE.camera = INSTANCE.scene.getObjectByName("Camera").children[0];
            INSTANCE.piso = INSTANCE.scene.getObjectByName("Piso");
            INSTANCE.piso.receiveShadow = true;

            INSTANCE.cubo = INSTANCE.scene.getObjectByName("Guitarra");
            INSTANCE.cubo.receiveShadow = true;
            INSTANCE.cubo.castShadow = true;

            INSTANCE.ventana = INSTANCE.scene.getObjectByName("Ventana");
            INSTANCE.ventana.receiveShadow = true;
            // INSTANCE.ventana.castShadow = true;

            INSTANCE.mixer.actions = [];
            for (var i = 0; i < gltf.animations.length; i++) {
                var action = await INSTANCE.mixer.clipAction(gltf.animations[i]);
                INSTANCE.mixer.actions.push(action);
            }
            INSTANCE.mixers.push(INSTANCE.mixer);
            
            INSTANCE.mixer.actions[0].setLoop(INSTANCE.LoopOnce);
            INSTANCE.mixer.actions[0].clampWhenFinished = true;

            INSTANCE.mixer.actions[0].play();

            INSTANCE.light = INSTANCE.scene.getObjectByName("Light").children[0];
            INSTANCE.light.castShadow = true;
            // INSTANCE.light.shadow.mapSize.width = 2048;
            // INSTANCE.light.shadow.mapSize.height = 2048;
            // INSTANCE.light.shadow.camera.near = 0.5;
            // INSTANCE.light.shadow.camera.far = 500;
            // INSTANCE.light.shadow.camera.fov = 45;
            
            // INSTANCE.light.shadow.mapSize.width = 2048;


        }, undefined, function (error) {
            console.log(error.message);
            console.log(error.stack);
        });
    }
    movimiento() {

    }
    render() {

    }
}
