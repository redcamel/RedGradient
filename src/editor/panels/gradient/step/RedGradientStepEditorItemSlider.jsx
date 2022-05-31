import './RedGradientStepEditorItemSlider.css'
import ContextGradient from "../../../contexts/system/ContextGradient.js";
import {useContext, useEffect, useRef, useState} from "react";
import ConstUnitPxPercentAuto from "../../../../data/const/ConstUnitPxPercentAuto";
import ConstGradientStepMode from "../../../../data/const/ConstGradientStepMode";
import HELPER_GET_DATA from "../../../contexts/system/HELPER_GET_DATA.js";
import ConstUnitPxPercent from "../../../../data/const/ConstUnitPxPercent.js";

let requestAni;
let startValue, moveTargetKey, currentValue;
/**
 * RedGradientStepEditorItemSlider
 * @returns {JSX.Element}
 * @constructor
 */
const RedGradientStepEditorItemSlider = ({
																					 data,
																					 onChange
																				 }) => {
	const {state: gradientState} = useContext(ContextGradient)
	const {deviceInfo} = gradientState
	const ref = useRef()
	const deviceWidth = deviceInfo.sizeInfo['width']
/////////////////
	const targetViewInfo = HELPER_GET_DATA.getTargetViewInfo(gradientState)
	const {containerInfo} = targetViewInfo
	const {sizeInfo: containerSizeInfo} = containerInfo
	const time = gradientState['timelineInfo']['time']
	const activeLayer = HELPER_GET_DATA.getActiveLayerInfo(gradientState)['timeline'][time]
	const {sizeInfo: layerSizeInfo} = activeLayer
	const [newRenderVersion, setNewRenderVersion] = useState()
	// console.log('activeLayer', activeLayer)
	//
	const containerWidthPX = containerSizeInfo['widthUnit'] === ConstUnitPxPercent.PERCENT ? deviceWidth * containerSizeInfo['width'] / 100 : containerSizeInfo['width']
	const layerWidthPX = layerSizeInfo['widthUnit'] === ConstUnitPxPercent.PERCENT ? containerWidthPX * layerSizeInfo['width'] / 100 : layerSizeInfo['width']
/////////////////
	const refW = ref.current?.offsetWidth
	let startX, endX
	const calc = () => {
		switch (data['start']['stopUnit']) {
			case ConstUnitPxPercentAuto.PX :
				startX = ref.current ? refW / layerWidthPX * data['start']['stop'] : 0
				break
			case ConstUnitPxPercentAuto.PERCENT :
				startX = ref.current ? refW * data['start']['stop'] / 100 : 0
				break
			default :
				break
		}
		switch (data['end']['stopUnit']) {
			case ConstUnitPxPercentAuto.PX :
				endX = ref.current ? refW / layerWidthPX * data['end']['stop'] : 0
				break
			case ConstUnitPxPercentAuto.PERCENT :
				endX = ref.current ? refW * data['end']['stop'] / 100 : 0
				break
			default :
				break
		}
	}
	calc()
	if (ref.current) {
		// if (data['mode'] === ConstGradientStepMode.RANGE && startX >= endX) {
		// 	const tS = JSON.parse(JSON.stringify(data['start']))
		// 	const tE = JSON.parse(JSON.stringify(data['end']))
		// 	data['start']['stop'] = tE['stop']
		// 	data['start']['stopUnit'] = tE['stopUnit']
		// 	data['end']['stop'] = tS['stop']
		// 	data['end']['stopUnit'] = tS['stopUnit']
		// 	moveTargetKey = moveTargetKey === 'start' ? 'end' : 'start'
		// 	calc()
		// }
	}

	//
	let startToUnit = startX
	let endToUnit = endX
	if (data['start']['stopUnit'] === ConstUnitPxPercentAuto.PERCENT) startToUnit = startX / refW * 100
	if (data['end']['stopUnit'] === ConstUnitPxPercentAuto.PERCENT) endToUnit = endX / refW * 100
	//
	const visibleStart = data['start']['stopUnit'] !== ConstUnitPxPercentAuto.AUTO
	const visibleEnd = data['end']['stopUnit'] !== ConstUnitPxPercentAuto.AUTO && data['mode'] === ConstGradientStepMode.RANGE
	const HD_moveStart = (targetKey, e) => {
		moveTargetKey = targetKey
		startValue = currentValue = data[moveTargetKey]['stop']
		startX = e.nativeEvent.pageX
		window.addEventListener('mousemove', HD_move);
		window.addEventListener('mouseup', HD_up);
	}
	const HD_move = e => {
		let tX = e.pageX - startX;
		let value
		if (data[moveTargetKey]['stopUnit'] === ConstUnitPxPercentAuto.PERCENT) {
			tX = tX / refW * 100
			value = +startValue + tX
			value = Math.max(Math.min(100, value), 0)
		} else if (data[moveTargetKey]['stopUnit'] === ConstUnitPxPercentAuto.PX) {
			value = +startValue + tX * layerWidthPX / refW
			value = Math.max(Math.min(layerWidthPX, value), 0)
		}
		update(value)
	};
	const update = (v, saveHistoryYn) => {
		// console.log(v)
		currentValue = v
		onChange?.(moveTargetKey, v, saveHistoryYn)
	}
	const HD_up = () => {
		onChange?.(moveTargetKey, currentValue, true)
		cancelAnimationFrame(requestAni);
		window.removeEventListener('mousemove', HD_move);
		window.removeEventListener('mouseup', HD_up);
	};
	// console.log(startX, endX)
	useEffect(() => {
		setNewRenderVersion(Math.random())
	}, [ref.current])
	return (
		<div className={`RedGradientStepEditorItemSlider`}>
			<div className={'RedGradientStepEditorItemSlider_bar_container'} ref={ref}>
				<div className={'RedGradientStepEditorItemSlider_bar'}
						 style={{
							 display: visibleStart && visibleEnd ? '' : 'none',
							 left: `${Math.min(startX, endX)}px`,
							 width: `${Math.abs(endX - startX)}px`,
							 background: endX - startX < 0 ? 'red' : '#5691ec'
						 }}
				/>
				<div style={{display: 'none'}}>{newRenderVersion}</div>
			</div>

			{
				visibleStart &&
				<div
					className={'RedGradientStepEditorItemSlider_ball'}
					style={{
						left: startToUnit + data['start']['stopUnit'],
						transform: `translate(calc(-50% ),-50%)`,
						borderRadius: data['mode'] === ConstGradientStepMode.RANGE ? '50% 0 0 50%' : '50%'
					}}
					onMouseDown={e => HD_moveStart('start', e)}
				>
				</div>
			}
			{
				visibleEnd &&
				<div
					className={'RedGradientStepEditorItemSlider_ball'}
					style={{
						left: endToUnit + data['end']['stopUnit'],
						transform: `translate(calc(-50%),-50%)`,
						borderRadius: data['mode'] === ConstGradientStepMode.RANGE ? '0 50% 50% 0' : '50%'
					}}
					onMouseDown={e => HD_moveStart('end', e)}
				>
				</div>
			}
		</div>
	)
}
export default RedGradientStepEditorItemSlider