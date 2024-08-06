import { Application, settings, SCALE_MODES, Container } from "pixi.js";
import { Model, CameraOrbitControl } from "pixi3d";
import { setUnlit } from "../utils/model";
import { Sheep } from "./sheep";

export function setupModel(resources: any, id: string, parent: Container) {
    // @ts-ignore
    const gltf = resources[id].gltf;
    const model = Model.from(gltf);
    parent.addChild(model);
    setUnlit(model);
    model.y = -0.7;
    return model;
}

export async function setupApplication() {

    const app = new Application({
        width: 375, height: 450, backgroundColor: 0x000000, antialias: true, backgroundAlpha: 0
    });
    settings.SCALE_MODE = SCALE_MODES.NEAREST;
    // @ts-ignore
    window.__PIXI_APP__ = app;

    const sheep = app.stage.addChild(new Sheep(app));
    await sheep.awaitLoaded();

    const control = new CameraOrbitControl(app.view);
    control.distance = 2.6;
    control.angles.x = 20;
    control.angles.y = 45;

    return sheep;
}
