import './RedFrameBottom.css'
import RedPreset from "../panels/presets/preset/RedPreset";
import RedGroupPreset from "../panels/presets/groupPreset/RedGroupPreset";
import RedBorderPreset from "../panels/presets/borderPreset/RedBorderPreset";
import ContextGradient from "../contexts/system/ContextGradient";
import {useContext} from "react";
import HELPER_GET_DATA from "../contexts/system/HELPER_GET_DATA";
import ConstBoxBorderModeType from "../panels/container/cssProperty/border/ConstBoxBorderModeType";

/**
 * 미들 프레임의 왼쪽부분
 * @returns {JSX.Element}
 * @constructor
 */
const RedFrameBottom = () => {
	const {state} = useContext(ContextGradient)
	const targetView = HELPER_GET_DATA.getTargetViewInfo(state)
	const {borderInfo} = targetView['containerInfo']
	const {mode} = borderInfo
	return (
		<div className={'RedFrameBottom_container'}>
			<div style={{
				display: 'flex',
				height: '100%',
				width: '100%',
				alignItems: 'flex-start',
				justifyContent: 'space-between',
				gap: '1px',
				background: '#000'
			}}>
				{mode === ConstBoxBorderModeType.GRADIENT && <RedBorderPreset/>}
				<RedPreset/>
				<RedGroupPreset/>
			</div>

		</div>
	)
}
export default RedFrameBottom
