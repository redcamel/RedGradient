import ContextGradient from "../../../contexts/system/ContextGradient.js";
import {useContext} from "react";
import ConstCanvasViewKey from "../../../../data/const/ConstCanvasViewKey.js";
import './RedCanvasWindow.css'
import RedToolTipIcon from "../../../basicUI/icon/RedToolTipIcon.jsx";
import {faImage, faImages, faMobile, faMobileAlt, faRulerCombined} from "@fortawesome/free-solid-svg-icons";
import RedCanvasWindowViewControl from "./RedCanvasWindowViewControl.jsx";
import RedCanvasWindowBottom from "./RedCanvasWindowBottom.jsx";
import RedContainerBackgroundColor from "../../../panels/container/cssProperty/RedContainerBackgroundColor.jsx";
import RedCanvasWindowEditMode from "./editMode/RedCanvasWindowEditMode";

/**
 * 캔버스 컨트롤을 담당
 * @param frameViewKey
 * @param setLayout
 * @param activeYn
 * @param onClick
 * @returns {JSX.Element}
 * @constructor
 */
const RedCanvasWindow = ({frameViewKey, setLayout, activeYn, onClick}) => {
	const {state, actions: gradientActions} = useContext(ContextGradient)
	const {canvasInfo} = state
	const viewKey = canvasInfo[frameViewKey]['viewKey']
	const targetView = canvasInfo[viewKey] || {}
	const valueVisibleGradientEditor = targetView['visualGradientEditorVisible']
	const valueSnapToContainer = state['snapToContainer']
	const HD_DeviceVisible = () => gradientActions.updateCanvasDeviceVisible({
		viewKey,
		value: !targetView['deviceVisible']
	})
	const HD_RulerVisible = () => gradientActions.updateCanvasRulerVisible({
		viewKey,
		value: !targetView['rulerVisible']
	})
	const HD_overflowHidden = () => gradientActions.updateCanvasOverflowHidden({
		viewKey,
		value: !targetView['overflowHiddenYn']
	})
	const HD_editMode = value => gradientActions.updateCanvasEditMode({
		viewKey,
		value
	})
	const HD_withView = value => gradientActions.updateCanvasWithView({
		viewKey,
		value
	})
	const HD_VisibleGradientEditor = () => {
		gradientActions.updateVisualGradientEditorVisible({
			viewKey,
			value: !valueVisibleGradientEditor
		})
	}
	const HD_snap = () => {
		gradientActions.updateSnapToContainer({
			viewKey,
			value: !valueSnapToContainer
		})
	}
	return (
		<div className={`RedCanvasWindow_container ${activeYn ? 'active' : ''}`}>
			<div
				className={`RedCanvasWindow_topContainer ${activeYn ? 'active' : ''}`}
				onMouseDown={onClick}
				onClick={onClick}
			>
				{/*<RedSelect*/}
				{/*	optionData={ConstCanvasViewKey}*/}
				{/*	value={frameViewKey}*/}
				{/*	onChange={e => setLayout(e.target.value)}*/}
				{/*/>*/}
				<div style={{
					display: 'flex', gap: '1px', borderRadius: '4px', overflow: 'hidden',
					background: '#111',
					border: '1px solid #333'
				}}>
					{
						Object.values(ConstCanvasViewKey).map((v, index) => {
							const activeYn = frameViewKey === v
							return <div
								key={index}
								className={`RedCanvasWindow_topContainer_viewKey ${activeYn ? 'active' : ''}`}
								onClick={() => setLayout(v)}
							>{v}</div>
						})
					}
				</div>
				{/*frameViewKey : {frameViewKey} / viewKey : {viewKey}*/}
				<RedToolTipIcon
					icon={targetView['deviceVisible'] ? faMobileAlt : faMobile}
					toolTip={'Device Visible'}
					activeYn={targetView['deviceVisible']}
					onClick={HD_DeviceVisible}
				/>
				<RedToolTipIcon
					icon={faRulerCombined}
					toolTip={'Ruler Visible'}
					activeYn={targetView['rulerVisible']}
					onClick={HD_RulerVisible}
				/>
				<RedToolTipIcon
					icon={targetView['overflowHiddenYn'] ? faImages : faImage}
					toolTip={'Device Overflow Allow'}
					activeYn={targetView['overflowHiddenYn']}
					onClick={HD_overflowHidden}
				/>
				<RedContainerBackgroundColor viewKey={viewKey}/>
			</div>
			<RedCanvasWindowViewControl viewKey={viewKey} onClick={onClick}/>
			<RedCanvasWindowEditMode
				viewKey={viewKey}
				value={targetView['editMode']}
				valueWithView={targetView['withView']}
				valueVisibleGradientEditor={valueVisibleGradientEditor}
				valueSnapToContainer={valueSnapToContainer}
				onChangeEditMode={HD_editMode}
				onWithViewChange={HD_withView}
				onVisibleGradientEditor={HD_VisibleGradientEditor}
				onSnapToContainer={HD_snap}
			/>
			<RedCanvasWindowBottom viewKey={viewKey}/>
		</div>
	)
}
export default RedCanvasWindow