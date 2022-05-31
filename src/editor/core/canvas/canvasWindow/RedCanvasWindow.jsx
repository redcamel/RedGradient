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
	console.log('frameViewKey', frameViewKey)
	console.log('viewKey', viewKey)
	const targetView = canvasInfo[viewKey] || {}
	const valueVisibleGradientEditor = targetView['visualGradientEditorVisible']
	const valueSnapToContainer = state['snapToContainer']
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
					onClick={() => gradientActions.updateCanvasDeviceVisible({
						viewKey,
						value: !targetView['deviceVisible']
					})}
					style={{
						width: '22px',
						height: '21px',
					}}
				/>
				<RedToolTipIcon
					icon={faRulerCombined}
					toolTip={'Ruler Visible'}
					activeYn={targetView['rulerVisible']}
					onClick={() => gradientActions.updateCanvasRulerVisible({
						viewKey,
						value: !targetView['rulerVisible']
					})}
					style={{
						width: '22px',
						height: '21px',
					}}
				/>
				{
					<RedToolTipIcon
						icon={targetView['overflowHiddenYn'] ? faImages : faImage}
						toolTip={'Device Overflow Allow'}
						activeYn={targetView['overflowHiddenYn']}
						onClick={() => gradientActions.updateCanvasOverflowHidden({
							viewKey,
							value: !targetView['overflowHiddenYn']
						})}
						style={{
							width: '22px',
							height: '21px',
						}}
					/>
				}
				<RedContainerBackgroundColor viewKey={viewKey}/>
			</div>
			<RedCanvasWindowViewControl viewKey={viewKey} frameViewKey={frameViewKey} onClick={onClick}/>
			<RedCanvasWindowEditMode
				viewKey={viewKey}
				value={targetView['editMode']}
				valueWithView={targetView['withView']}
				valueVisibleGradientEditor={valueVisibleGradientEditor}
				valueSnapToContainer={valueSnapToContainer}
				onChangeMode={(value) => gradientActions.updateCanvasEditMode({
					viewKey,
					value
				})}
				onWithViewChange={(value) => gradientActions.updateCanvasWithView({
					viewKey,
					value
				})}
				onVisibleGradientEditor={(value) => {
					console.log('AAA', valueVisibleGradientEditor)
					gradientActions.updateVisualGradientEditorVisible({
						viewKey,
						value: !valueVisibleGradientEditor
					})
				}}
				onSnapToContainer={(value) => {
					console.log('AAA', valueVisibleGradientEditor)
					gradientActions.updateSnapToContainer({
						viewKey,
						value: !valueSnapToContainer
					})
				}}
			/>
			<RedCanvasWindowBottom viewKey={viewKey}/>

		</div>
	)
}
export default RedCanvasWindow