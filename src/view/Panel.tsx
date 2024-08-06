
import IJS, { Image as IJSImage } from "image-js";
import { connect } from "react-redux";
import { downloadFile } from "../sheep/pack";
import { SheepState, setCurrentName, setCurrentTexture, setStateWoolEnabled } from "../state/reducer";
import { AppDispatch } from "../state/store";
import TexturePicker from "./TexturePicker";
import { split, templates } from "../sheep/templates";


export function PanelComponent(props: PanelStateProp) {
    const { dispatch, woolEnabled, sheep } = props;
    return <>
        <div className="panel">
            
            <div>
                <a href="https://www.planetminecraft.com/skin-editor/?model=geometry.sheep">You can edit sheep skins at planet minecraft</a>
                <div>Choose a template:</div>
                {templates.map((template) => {
                    return <div
                        key={template.name}
                        className="texturepicker"
                        onClick={async (ev) => {
                            const { body, wool } = await split(template.combined)
                            dispatch(setCurrentName(template.name))
                            dispatch(setCurrentTexture({ type: "body", src: body.toDataURL() }))
                            dispatch(setCurrentTexture({ type: "wool", src: wool.toDataURL() }))
                        }}
                    >
                        <div>{template.name}</div>
                        <img
                            width={64}
                            height={64}
                            src={template.combined}

                        />
                    </div>
                })}
            </div>
            <span>
                Or upload your texture to view it: <br /><input type="file"
                    onChange={async (ev) => {
                        const thisIn = ev.currentTarget
                        if (thisIn.files && thisIn.files[0]) {
                            const file = thisIn.files[0];
                            const image = await IJS.load(await file.arrayBuffer());
                            const { width, height } = image;
                            const body = image.crop({ width, height: height / 2 })
                            const wool = image.crop({ y: height / 2, width, height: height / 2 })
                            dispatch(setCurrentName(file.name))
                            dispatch(setCurrentTexture({ type: "body", src: body.toDataURL() }))
                            dispatch(setCurrentTexture({ type: "wool", src: wool.toDataURL() }))
                            thisIn.files = null
                            thisIn.value = ""
                        }
                    }}
                />

            </span>

            {/*
            <TexturePicker type={"wool"} />
            <TexturePicker type={"body"} />
            <input type="text" value={sheep.name} onChange={(ev) => dispatch(setCurrentName(ev.currentTarget.value))} /> */}
            <br />
            <br />
            <button onClick={async () => {
                let body = await IJS.load(sheep.body)
                let wool = await IJS.load(sheep.wool)
                const width = Math.max(wool.width, body.width);
                const combined = new IJSImage(width, width);
                body = body.resize({ width: width, height: width / 2, interpolation: "nearestNeighbor" });
                wool = wool.resize({ width: width, height: width / 2, interpolation: "nearestNeighbor" });
                // @ts-ignore
                combined.insert(body, { y: 0, inPlace: true })
                // @ts-ignore
                combined.insert(wool, { y: width / 2, inPlace: true })
                downloadFile(`${sheep.name}.png`,await combined.toBlob("png"))
            }}>
                Download
            </button>
        </div >
        <br />
        <div>
            Toggle Wool: <input type="checkbox" checked={woolEnabled} onChange={(ev) => dispatch(setStateWoolEnabled(ev.currentTarget.checked))} />
        </div>
    </>
}

type PanelStateProp = ReturnType<typeof mapState> & { dispatch: AppDispatch };

function mapState(state: SheepState) {
    return state;
}

const Panel = connect(mapState)(PanelComponent)

export default Panel;

