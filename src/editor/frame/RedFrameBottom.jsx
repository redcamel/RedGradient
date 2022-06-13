import './RedFrameBottom.css'
import RedPreset from "../panels/presets/preset/RedPreset";
import RedGroupPreset from "../panels/presets/groupPreset/RedGroupPreset";
import RedBorderPreset from "../panels/presets/borderPreset/RedBorderPreset";
import ContextGradient from "../contexts/system/ContextGradient";
import {useContext} from "react";
import HELPER_GET_DATA from "../contexts/system/HELPER_GET_DATA";
import ConstBoxBorderModeType from "../panels/container/cssProperty/border/ConstBoxBorderModeType";

/**
 * RedFrameBottom
 * @returns {JSX.Element}
 * @constructor
 */
const RedFrameBottom = () => {
	const {state} = useContext(ContextGradient)
	const targetView = HELPER_GET_DATA.getActiveViewInfo(state)
	const {borderInfo} = targetView['containerInfo']
	const {mode} = borderInfo
	return (
		<div className={'RedFrameBottom_root'}>
			<div className={'RedFrameBottom_container'}>
				{mode === ConstBoxBorderModeType.GRADIENT && <RedBorderPreset/>}
				<RedPreset/>
				<RedGroupPreset/>
			</div>
		</div>
	)
}
export default RedFrameBottom
