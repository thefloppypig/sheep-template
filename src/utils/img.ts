import {Image as IJSImage} from "image-js";

export function overlayImage(base: IJSImage, overlay: IJSImage, options: { x?: number, y?: number }) {
    const x = options.x ?? 0;
    const y = options.y ?? 0;
    //@ts-ignore
    const combined = base.insert(overlay, { x, y, inPlace: true }) 
    return combined;
}