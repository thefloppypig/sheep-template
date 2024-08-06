import { Texture } from "pixi.js";
import { Model, StandardMaterial } from "pixi3d";

export function setUnlit(model: Model) {
    model.meshes.forEach(m => {
        (m.material as StandardMaterial).unlit = true;
    })
}

export function setTexture(model: Model, texture: Texture) {
    model.meshes.forEach(m => {
        (m.material as StandardMaterial).baseColorTexture = texture;
    })
}

export function getTexture(model: Model) {
    return (model.meshes[0].material as StandardMaterial).baseColorTexture!;
}

export function setTint(model: Model, r: number, g: number, b: number, a?: number) {
    model.meshes.forEach(m => {
        const { baseColor } = m.material as StandardMaterial
        baseColor.r = r;
        baseColor.g = g;
        baseColor.b = b;
        if (a !== undefined) baseColor.a = a;
    })
}