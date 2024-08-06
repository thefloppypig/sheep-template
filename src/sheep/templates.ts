import IJS from "image-js";
import defaultTemplateStr from "../assets/templates/default.png"
import template2x from "../assets/templates/2x.png"
import template4x from "../assets/templates/4x.png"
import template8x from "../assets/templates/8x.png"
import templateSheepStr from "../assets/templates/template.png"

const defaultTemplateImage = await IJS.load(defaultTemplateStr)

export async function split(str: string) {
    const image = await IJS.load(str);
    const { width, height } = image;
    const body = image.crop({ width, height: height / 2 })
    const wool = image.crop({ y: height / 2, width, height: height / 2 })
    return { body, wool };
}
 
export const templates = [
    {
        name: "Default",
        combined: defaultTemplateImage.toDataURL()
    },
    {
        name: "Template Colors",
        combined: templateSheepStr
    },
    {
        name: "2x Resolution",
        combined: template2x
    },
    {
        name: "4x Resolution",
        combined: template4x
    },
    {
        name: "8x Resolution",
        combined: template8x
    },
]
