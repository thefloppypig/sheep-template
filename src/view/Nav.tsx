import { connect } from "react-redux";
import { SheepState } from "../state/reducer";
import { AppDispatch } from "../state/store";


function NavComponent(props: NavStateProp) {
    const { dispatch } = props
    return <div className="nav">
        
    </div>
}

type NavStateProp = ReturnType<typeof mapState> & { dispatch: AppDispatch };

function mapState(state: SheepState) {
    return state
}

const Nav = connect(mapState)(NavComponent)

export default Nav;