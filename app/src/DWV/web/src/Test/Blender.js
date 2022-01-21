import TEST from "./test.json";

export default class Blender {
    
    constructor(ThreeScene) {
        this.ThreeScene = ThreeScene;
        this.createTest();
    }
    createTest() {
        const INSTANCE = this.ThreeScene;

        // loader.load("./test.gltf", function (gltf) {
        this.ThreeScene.gltfLoader.parse(JSON.stringify(TEST), '', function (gltf) {
            INSTANCE.test = gltf.scene;
            INSTANCE.scene.add(INSTANCE.test);

            INSTANCE.camera = INSTANCE.scene.getObjectByName("Camera").children[0];
            INSTANCE.piso = INSTANCE.scene.getObjectByName("Piso");
            INSTANCE.piso.receiveShadow = true;

            INSTANCE.cubo = INSTANCE.scene.getObjectByName("Cube");
            INSTANCE.cubo.castShadow = true;

            INSTANCE.ventana = INSTANCE.scene.getObjectByName("Ventana");
            INSTANCE.ventana.receiveShadow = true;



            INSTANCE.light = INSTANCE.scene.getObjectByName("Light").children[0];
            INSTANCE.light.castShadow = true;


        }, undefined, function (error) {
            console.log(error.message);
            console.log(error.stack);
        });
    }
    render() {

    }
}
