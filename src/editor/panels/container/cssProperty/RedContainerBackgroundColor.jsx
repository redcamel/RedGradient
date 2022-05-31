import ContextGradient from "../../../contexts/system/ContextGradient.js";
import {useContext} from "react";
import ConstCanvasViewKey from "../../../../data/const/ConstCanvasViewKey.js";
import RedItemTitle from "../../../basicUI/RedItemTitle.jsx";
import RedColorPickerButton from "../../../basicUI/RedColorPickerButton.jsx";

/**
 * 컨테이너 컬러 담당
 * @param viewKey
 * @returns {JSX.Element}
 * @constructor
 */
const RedContainerBackgroundColor = ({viewKey, useLabel}) => {
	const {state, actions: gradientActions} = useContext(ContextGradient)
	if (viewKey === ConstCanvasViewKey.ALL) return null
	const {canvasInfo} = state
	const targetView = canvasInfo[viewKey]
	const HD_getColor = () => targetView['containerInfo']['backgroundColor']
	const HD_updateFunction = (v) => {
		gradientActions.updateContainerBackgroundColor(v)
	}
	return (
		<div style={style.container}>
			{
				useLabel && <>
					<RedItemTitle label={'Background Color'}/>
					{targetView['containerInfo']['backgroundColor']}
				</>
			}


			<RedColorPickerButton
				getColorFunction={HD_getColor}
				updateFunction={HD_updateFunction}
			/>
		</div>
	)
}
export default RedContainerBackgroundColor
const style = {
	container: {
		display: 'flex',
		gap: '5px',
		alignItems: 'center'
	},
}