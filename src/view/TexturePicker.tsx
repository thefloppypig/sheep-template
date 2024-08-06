import { connect } from "react-redux";
import { SheepModelType } from "../sheep/sheep";
import { SheepState } from "../state/reducer";
import { AppDispatch } from "../state/store";

function TexturePickerComponent(props: TexturePickerStateProp & { type: SheepModelType }) {
    const { type, src, dispatch } = props;

    return (
        <div className="texturepicker">
            {type}:
            <img src={src[type]} width={100} height={50} />
        </div>
    )
}

type TexturePickerStateProp = ReturnType<typeof mapState> & { dispatch: AppDispatch };

function mapState(state: SheepState) {
    return {
        src: state.sheep,
    }
}

const TexturePicker = connect(mapState)(TexturePickerComponent)

export default TexturePicker;