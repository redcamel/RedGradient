import ContextGradient from "../../../contexts/system/ContextGradient.js";
import {useContext} from "react";
import ConstCanvasScale from "./ConstCanvasScale.js";
import './RedCanvasWindow.css'
import RedSelect from "../../../basicUI/RedSelect.jsx";
import RedButton from "../../../basicUI/RedButton.jsx";

/**
 * 윈도우내 하단 메뉴 담당
 * @param viewKey
 * @returns {JSX.Element}
 * @constructor
 */
const RedCanvasWindowBottom = ({viewKey}) => {
	const {state, actions: gradientActions} = useContext(ContextGradient)
	const {canvasInfo} = state
	const targetView = canvasInfo[viewKey]
	const {viewScale, viewOffset} = targetView.viewTransformInfo
	const scaleKeyData = Object.assign({}, ConstCanvasScale)
	const intViewScale = (viewScale * 100)
	if (!scaleKeyData[`SCALE_${intViewScale}`]) scaleKeyData[`SCALE_${intViewScale}`] = intViewScale
	const {containerInfo} = targetView
	const {sizeInfo, positionInfo} = containerInfo || {}
	return (
		<div className={'RedCanvasWindow_bottomContainer'}>
			<RedSelect
				optionData={scaleKeyData}
				value={intViewScale}
				unit={'%'}
				toFixed={0}
				onChange={e => gradientActions.updateCanvasViewScale({
					viewKey,
					value: e.target.value / 100
				})}
			/>
			<RedButton label={'setCenter'} onClick={() => gradientActions.updateCanvasViewOffset({
				viewKey,
				//TODO - 계산기 기반으로 처리
				value: {
					x: -sizeInfo.width / 2 * viewScale - positionInfo.x * viewScale,
					y: -sizeInfo.height / 2 * viewScale - positionInfo.y * viewScale
				}
			})}/>
			<div className={'RedCanvasWindow_centerPoint'}>Offset {viewOffset.x}px {viewOffset.y}px</div>
		</div>
	)
}
export default RedCanvasWindowBottom