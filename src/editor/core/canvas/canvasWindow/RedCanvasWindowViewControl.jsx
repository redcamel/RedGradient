import ContextGradient from "../../../contexts/system/ContextGradient.js";
import {useContext, useState} from "react";
import ConstCanvasViewKey from "../../../../data/const/ConstCanvasViewKey.js";
import ConstCanvasScale from "./ConstCanvasScale.js";
import RedCanvas from "../canvas/RedCanvas.jsx";
import './RedCanvasWindow.css'
import RedGrid from "../grid/RedGrid";

/**
 * 윈도우내 뷰컨트롤 담당
 * @param viewKey
 * @param onClick
 * @returns {JSX.Element}
 * @constructor
 */
const RedCanvasWindowViewControl = ({viewKey, onClick}) => {
	const {state, actions: gradientActions} = useContext(ContextGradient)
	const [moveModeYn, setMoveModeYn] = useState(false)
	const {canvasInfo} = state
	viewKey = canvasInfo[viewKey] ? viewKey : ConstCanvasViewKey.MAIN
	const targetView = canvasInfo[viewKey]
	const {viewScale, viewOffset} = targetView.viewTransformInfo
	//
	const HD_wheel = e => {
		let t0 = viewScale - e.nativeEvent.deltaY / 1000;
		if (t0 < 0.05) t0 = 0.05;
		gradientActions.updateCanvasViewScale({viewKey, value: t0})
	}
	const HD_moveStart = e => {
		if (e.button === 0) setMoveModeYn(true)
	}
	const HD_move = e => {
		if (moveModeYn) {
			e = e.nativeEvent;
			gradientActions.updateCanvasViewOffset({
				viewKey,
				value: {
					x: viewOffset.x + e.movementX,
					y: viewOffset.y + e.movementY
				}
			});
			document.body.style.cursor = 'move';
		}
	}
	const HD_moveEnd = () => {
		setMoveModeYn(false)
		document.body.style.cursor = 'default';
	}
	const scaleKeyData = Object.assign({}, ConstCanvasScale)
	const intViewScale = parseInt(viewScale * 100)
	if (!scaleKeyData[`SCALE_${intViewScale}`]) scaleKeyData[`SCALE_${intViewScale}`] = intViewScale
	return (
		<>
			<div
				className={'RedCanvasWindow_editArea'}
				onClick={e => {
					HD_moveEnd()
					onClick?.(e)
				}}
				onMouseLeave={HD_moveEnd}
				onWheel={HD_wheel}
				onMouseDown={e => {
					onClick?.(e)
					HD_moveStart(e)
				}}
				onMouseMove={HD_move}
			>
				<RedGrid
					viewScale={viewScale}
					viewOffset={viewOffset}
				/>
				<div className={'RedCanvasWindow_canvasContainer'}
						 onMouseDown={e => onClick?.(e)}
				>
					<RedCanvas
						viewKey={viewKey}
						viewScale={viewScale}
						viewOffset={viewOffset}
						deviceVisible={targetView['deviceVisible']}
						overflowHiddenYn={targetView['overflowHiddenYn']}
						HD_ActiveWindow={onClick}
					/>
				</div>
			</div>
		</>
	)
}
export default RedCanvasWindowViewControl