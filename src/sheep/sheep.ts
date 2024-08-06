import { Application, Container, Texture } from "pixi.js";
import { setupModel } from "./setup";
import { Container3D, Model } from "pixi3d";
import { getTexture, setTexture } from "../utils/model";
import { Signal } from "type-signals";
import { saveAs } from "file-saver";

export type SheepPart<T> = {
    body: T,
    wool: T,
}
export type SheepModelType = keyof SheepPart<Model>

export class Sheep extends Container {

    loaded = false;
    sheepModel!: SheepPart<Model>

    defaultTexture!: SheepPart<Texture>
    defaultSrc!: SheepPart<string>

    protected _onLoaded: Signal = new Signal();
    private _woolEnabled: boolean = true;

    public get woolEnabled(): boolean {
        return this._woolEnabled;
    }
    public set woolEnabled(value: boolean) {
        this._woolEnabled = value;
        this.sheepModel.wool.visible = value;
    }

    constructor(public readonly app: Application) {
        super();
        app.loader
            .add("sheep.gltf")
            .add("sheep_wool.gltf")
            .load((_, resources) => {
                this.sheepModel = {
                    body: setupModel(resources, "sheep.gltf", this),
                    wool: setupModel(resources, "sheep_wool.gltf", this),
                }
                this.defaultTexture = {
                    body: getTexture(this.sheepModel.body),
                    wool: getTexture(this.sheepModel.wool),
                }
                this.defaultSrc = {
                    // @ts-ignore
                    body: this.defaultTexture.body.baseTexture.resource.url, wool: this.defaultTexture.wool.baseTexture.resource.url,
                }

                this.loaded = true;
                this._onLoaded.dispatch()
            })
    }

    awaitLoaded(): Promise<void> {
        if (this.loaded) return Promise.resolve();
        return new Promise((res) => {
            this._onLoaded.once(() => res());
        })
    }

    setSheepTexture(type: SheepModelType, texture: Texture) {
        setTexture(this.sheepModel[type], texture);
    }

    setSheepTextureFromUrl(type: SheepModelType, src: string) {
        const texture = Texture.from(src);//Texture.from is cached
        setTexture(this.sheepModel[type], texture);
    }

    resetSheepTexture(type?: SheepModelType) {
        if (type) {
            this.setSheepTexture(type, this.defaultTexture[type])
        }
        else {
            this.resetSheepTexture("body")
            this.resetSheepTexture("wool")
        }
    }

    setPartRotation(bodyPart: string, x: number, y: number, z: number) {
        this.getBodyPart("body", bodyPart)?.rotationQuaternion.setEulerAngles(x, y, z)
        this.getBodyPart("wool", bodyPart)?.rotationQuaternion.setEulerAngles(x, y, z)
    }

    getBodyPart(type: SheepModelType, name: string) {
        const model = this.sheepModel[type];
        return model.getChildByName(name, true) as Container3D | undefined
    }

    screenshot() {
        return new Promise<Blob>((res, rej) => requestAnimationFrame(() => {
            this.app.view.toBlob((b) => b ? res(b) : rej(b));
        }))
    }
}