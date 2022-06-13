import './RedGradientVisibleEditor.css'
import {useContext, useEffect, useRef, useState} from "react";
import ContextGradient from "../../../contexts/system/ContextGradient.js";
import getCalcedGradientEditorLayoutInfo_pixel from "../getCalcedGradientEditorLayoutInfo_pixel";
import ConstGradientType from "../../../../data/const/ConstGradientType";
import ConstUnitPxPercent from "../../../../data/const/ConstUnitPxPercent";
import ConstGradientStepMode from "../../../../data/const/ConstGradientStepMode";
import ConstUnitPxPercentAuto from "../../../../data/const/ConstUnitPxPercentAuto";
import HELPER_GET_DATA from "../../../contexts/system/HELPER_GET_DATA";
import RedColorPickerButton from "../../../basicUI/RedColorPickerButton";

let tX, tY
let rect
let startCircle
let rangeBarHeight
let targetPercent
const RedGradientVisibleEditor = ({calcedLayoutInfo, viewScale, targetView, HD_ActiveWindow}) => {
	const {state: gradientState, actions: gradientActions} = useContext(ContextGradient)
	const [modeAngleEdit, setModeAngleEdit] = useState(false)
	const [targetMoveInfo, setTargetMoveInfo] = useState()
	// const [version, setVersion] = useState()
	const time = gradientState['timelineInfo']['time']
	const {layerGroupInfo} = targetView
	const ref = useRef()
	const ref2 = useRef()
	const {
		activeGroupIndex,
		activeGroupLayerIndex,
		groupList
	} = layerGroupInfo
	useEffect(() => {

			const HD_up = (e) => {
				tX = e.pageX;
				tY = e.pageY;
				tX = e.pageX;
				tY = e.pageY;
				tX = e.pageX - (rect.x + rect.width / 2);
				tY = e.pageY - (rect.y + rect.height / 2);
				const angle = Math.atan2(tY, tX) * 180 / Math.PI + 90 + (startCircle ? 180 : 0);
				gradientActions.updateLayerValueInfoByKey(
					{
						targetInfoKey: 'valueInfo',
						key: 'angle',
						time,
						groupIndex: activeGroupIndex,
						groupLayerIndex: activeGroupLayerIndex,
						value: angle,
						saveHistoryYn: true
					}
				)
				setModeAngleEdit(false)
			};
			const HD_move = (e) => {
				e.preventDefault()
				e.stopPropagation()
				tX = e.pageX;
				tY = e.pageY;
				tX = e.pageX - (rect.x + rect.width / 2);
				tY = e.pageY - (rect.y + rect.height / 2);
				const angle = Math.atan2(tY, tX) * 180 / Math.PI + 90 + (startCircle ? 180 : 0);
				gradientActions.updateLayerValueInfoByKey(
					{
						targetInfoKey: 'valueInfo',
						key: 'angle',
						time,
						groupIndex: activeGroupIndex,
						groupLayerIndex: activeGroupLayerIndex,
						value: angle,
						saveHistoryYn: false
					}
				)
			};
			if (modeAngleEdit) {
				window.addEventListener('mousemove', HD_move, true);
				window.addEventListener('mouseup', HD_up, true);
			}
			return () => {
				window.removeEventListener('mousemove', HD_move, true);
				window.removeEventListener('mouseup', HD_up, true);
			}
		}, [modeAngleEdit]
	)
	useEffect(() => {
		const {point_moveData} = targetMoveInfo || {}
		const HD_point_move = (e) => {
			const tPercent = targetPercent
			if (conicYn) {
				tX = (rect.x + rect.width / 2) - e.pageX;
				tY = e.pageY - (rect.y + rect.height / 2);
				const angle = 360 - (Math.atan2(tY, tX) * 180 / Math.PI) - 90 - activeLayerInfo['valueInfo']['angle']
				const angle2 = (angle / 360 * 100)
				const toPercent = angle > 0 ? angle2 : 100 + angle2
				const tPx = layerSizeW * (toPercent / 360) * 0.01
				const tValue = point_moveData['stopUnit'] === ConstUnitPxPercent.PERCENT ? toPercent : tPx
				point_moveData['stop'] = tValue
				const updateList = []
				updateList.push(
					{
						key: 'stop',
						targetInfo: point_moveData.endItem ? 'end' : 'start',
						stepIDX: point_moveData['stepIDX'],
						time,
						value: tValue,
						groupIndex: activeGroupIndex,
						groupLayerIndex: activeGroupLayerIndex,
						saveHistoryYn: false
					}
				)
				gradientActions.updateLayerStepInfoByKey(
					updateList
				)
			} else {

				const tPx = layerSizeW * tPercent * 0.01
				const tValue = point_moveData['stopUnit'] === ConstUnitPxPercent.PERCENT ? tPercent : tPx
				point_moveData['stop'] = tValue


				const updateList = []
				updateList.push(
					{
						key: 'stop',
						targetInfo: point_moveData.endItem ? 'end' : 'start',
						stepIDX: point_moveData['stepIDX'],
						time,
						value: tValue,
						groupIndex: activeGroupIndex,
						groupLayerIndex: activeGroupLayerIndex,
						saveHistoryYn: false
					}
				)
				gradientActions.updateLayerStepInfoByKey(
					updateList
				)
			}

			// setVersion(Math.random())
		}
		const HD_point_up = () => {
			const updateList = []
			updateList.push(
				{
					key: 'stop',
					targetInfo: point_moveData.endItem ? 'end' : 'start',
					stepIDX: point_moveData['stepIDX'],
					time,
					value: point_moveData['stop'],
					groupIndex: activeGroupIndex,
					groupLayerIndex: activeGroupLayerIndex,
					saveHistoryYn: true
				}
			)
			gradientActions.updateLayerStepInfoByKey(
				updateList
			)
			setTargetMoveInfo(null)
		}
		if (targetMoveInfo) {
			window.addEventListener('mousemove', HD_point_move, true);
			window.addEventListener('mouseup', HD_point_up, true);
		}

		return () => {
			window.removeEventListener('mousemove', HD_point_move, true);
			window.removeEventListener('mouseup', HD_point_up, true);

		}
	}, [targetMoveInfo])
	const activeLayer = groupList?.[activeGroupIndex]?.['children']?.[activeGroupLayerIndex]
	if (!groupList[activeGroupIndex] || !activeLayer) return null;
	const type = activeLayer['type']

	const linearYn = type === ConstGradientType.LINEAR || type === ConstGradientType.REPEATING_LINEAR
	const radialYn = type === ConstGradientType.RADIAL || type === ConstGradientType.REPEATING_RADIAL
	const conicYn = type === ConstGradientType.CONIC || type === ConstGradientType.REPEATING_CONIC
	const activeLayerInfo = activeLayer['timeline'][time]
	const gradient_calcedLayoutInfo = getCalcedGradientEditorLayoutInfo_pixel(targetView.containerInfo, activeLayerInfo, calcedLayoutInfo, viewScale)
	const {viewScalePixel} = gradient_calcedLayoutInfo
	const {atInfo} = activeLayerInfo['valueInfo']
	const W = parseFloat(viewScalePixel.width)
	const H = parseFloat(viewScalePixel.height)
	const x = parseFloat(viewScalePixel.x) + W / 2 + (!linearYn ? atInfo['xUnit'] === ConstUnitPxPercent.PERCENT ? (atInfo['x'] - 50) * W * 0.01 : atInfo['x'] * viewScale - W / 2 : 0)
	const y = parseFloat(viewScalePixel.y) + H / 2 + (!linearYn ? atInfo['yUnit'] === ConstUnitPxPercent.PERCENT ? (atInfo['y'] - 50) * H * 0.01 : atInfo['y'] * viewScale - H / 2 : 0)
	const maxSize = Math.max(Math.max(activeLayerInfo['sizeInfo']['width'], activeLayerInfo['sizeInfo']['height']), 1) * viewScale
	const tempX = maxSize * Math.cos((activeLayerInfo['valueInfo']['angle'] - 90) * Math.PI / 180)
	const tempY = maxSize * Math.sin((activeLayerInfo['valueInfo']['angle'] - 90) * Math.PI / 180)
	const tT = Math.sqrt(Math.pow(tempX, 2) + Math.pow(tempY, 2));

	const textRotateStr = radialYn ? `rotate(-45deg)` : `rotate(${360 - activeLayerInfo['valueInfo']['angle']}deg)`
	// const textRotateConicStr = `rotate(${activeLayerInfo['valueInfo']['angle']}deg)`
	const renderRotatePoint = (title, top, startCircleYn) => {
		return (
			<div className={'RedGradientVisibleEditorRotatePoint'}
					 style={{top}}
					 onMouseDownCapture={(e) => {
						 e.nativeEvent.preventDefault()
						 e.nativeEvent.stopPropagation()
						 rect = ref.current.getBoundingClientRect()
						 setModeAngleEdit(true)
						 HD_ActiveWindow?.()
						 startCircle = startCircleYn
					 }}
			><span style={{
				transform: `translate(0.5px, 0) ${textRotateStr}`,
				fontSize: '10px',
				fontWeight: 'bold',
				color: 'rgba(0,0,0,0.85)'
			}}>{conicYn ? (title === 'E' ? '0%' : '50%') : title === 'E' ? '100%' : '0%'}</span>
			</div>
		)
	}
	rangeBarHeight = radialYn ? tT : tT * 2
	const ref2Current = ref2.current
	const {
		layerSizeW
	} = HELPER_GET_DATA.calcLayerPixelSize(gradientState, HELPER_GET_DATA.getActiveLayerInfo(gradientState));

	const renderPreview = (activeLayer, time) => {
		// 막대로 표시가능하게 변경
		const previewDataAtTime = JSON.parse(JSON.stringify(activeLayer['timeline'][time]))
		const {stepInfoList} = previewDataAtTime

		//TODO - 정리
		const renderPoint = () => {
			let i = 0;
			const newList = stepInfoList.map((v, index) => {
				v['end']['stepIDX'] = index
				v['start']['stepIDX'] = index
				v['end']['mode'] = v['mode']
				v['start']['mode'] = v['mode']
				if (v['mode'] === ConstGradientStepMode.RANGE) {
					v['end']['endItem'] = true
					return [v['start'], v['end']]
				}
				return [v['start']]
			}).flat()
			const len = newList.length
			const result = []
			let prevStop, prevStopUnit
			const baseStyle = {
				position: "absolute",
				width: '20px',
				height: '20px',
				outline: '2px solid #111',
				borderRadius: '50%',
				boxShadow: '0 0 10px rgba(0,0,0,1)',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				textShadow: '0 0 5px rgba(0,0,0,1)',
				cursor: 'pointer',
				pointerEvents: 'painted',
				fontWeight: 'bold',
				left: 0,
				transform: `translate(-50%, -50%)`,
				overflow: 'hidden'
			}
			for (i; i < len; i++) {
				const targetData = newList[i]
				const {stop, stopUnit, colorHint, endItem} = targetData
				const borderRadius = targetData['mode'] === ConstGradientStepMode.RANGE ? (targetData['endItem'] ? '0 0 50% 50%' : '50% 50% 0 0') : '50%'
				const endStopText = endItem ? 'E' : 'S'
				if (i === 0) {
					if (stopUnit === ConstUnitPxPercentAuto.AUTO) {
						prevStop = 0
						prevStopUnit = ConstUnitPxPercentAuto.PERCENT
					} else {
						prevStop = stop
						prevStopUnit = stopUnit
					}
				} else {
				}

				const renderColorButton = (targetData, title) => {
					return <>
						<div className={'RedGradientVisibleEditorColorBox'} style={{}}>
							<RedColorPickerButton
								getColorFunction={() => targetData['colorHint']}
								updateFunction={(v) => {
									const updateList = []
									updateList.push(
										{
											key: 'colorHint',
											targetInfo: targetData.endItem ? 'end' : 'start',
											stepIDX: targetData['stepIDX'],
											time,
											value: v['value'],
											groupIndex: activeGroupIndex,
											groupLayerIndex: activeGroupLayerIndex,
											saveHistoryYn: v.saveHistoryYn
										}
									)
									gradientActions.updateLayerStepInfoByKey(
										updateList
									)
								}}
							/>
						</div>
						<div
							style={{
								width: '100%',
								height: '100%',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								transform: `${textRotateStr} ${endItem ? 'scale(-1,1)' : ''}`
							}}
							onMouseDownCapture={e => {
								e.stopPropagation()
								e.preventDefault()
								rect = ref.current.getBoundingClientRect()
								HD_ActiveWindow?.()
								setTargetMoveInfo({
									point_startPoint: {x: e.pageX, y: e.pageY},
									point_moveData: targetData,
									startStop: targetData['stop'],
								})
							}}
						>
							<span>{title || endStopText}</span>
						</div>
					</>
				}

				if (stopUnit !== ConstUnitPxPercentAuto.AUTO) {
					const tStopPercent = `${stopUnit === ConstUnitPxPercent.PX ? (stop / (layerSizeW) * 100) : stop}`
					result.push(
						<div
							key={i}
							className={`visibleEditorPoint${i}`}
							style={{
								background: colorHint,
								...baseStyle,
								left: (conicYn ? Math.sin(Math.PI - tStopPercent * Math.PI * 2 * 0.01) * tT + ConstUnitPxPercentAuto.PX : 0),
								top: (conicYn ? Math.cos(Math.PI - tStopPercent * Math.PI * 2 * 0.01) * tT + tT + ConstUnitPxPercentAuto.PX : (tStopPercent + ConstUnitPxPercent.PERCENT)),
								pointerEvents: targetMoveInfo ? 'none' : 'auto',
								transform: `translate(-50%,-50%) ${conicYn ? `rotate(${(tStopPercent) * 360 * 0.01 - 90}deg)` : ''}`,
								borderRadius
							}}
						>
							{renderColorButton(targetData, endStopText)}
							{/*{stop}*/}
						</div>
					)
					prevStop = stop
					prevStopUnit = stopUnit
				} else {
					if (i === 0 || i === len - 1) {
						const tStopPercent = (i === 0 ? 0 : 100)
						result.push(
							<div
								key={i}
								className={`visibleEditorPoint${i}`}
								style={{
									background: newList[i]['colorHint'],
									...baseStyle,
									left: (conicYn ? Math.sin(Math.PI - (i === 0 ? 0 : 100) * Math.PI * 2 * 0.01) * tT + ConstUnitPxPercentAuto.PX : 0),
									top: (conicYn ? Math.cos(Math.PI - (i === 0 ? 0 : 100) * Math.PI * 2 * 0.01) * tT + tT + ConstUnitPxPercentAuto.PX : (i === 0 ? 0 : '100%')),
									borderRadius: 0,
									cursor: 'default',
									pointerEvents: targetMoveInfo ? 'none' : 'auto',
									transform: `translate(-50%,-50%) ${conicYn ? `rotate(${(tStopPercent) * 360 * 0.01 - 90}deg)` : ''}`,
								}}>
								{renderColorButton(targetData, endStopText)}
								{/*{stop}*/}

							</div>
						)
						prevStop = 0
						prevStopUnit = ConstUnitPxPercentAuto.PERCENT
					} else {
						// 현재 부터 다음 값이 null 인 경우를 찾는다.
						let i2 = i
						let num = 0
						for (i2; i2 < len; i2++) {
							const v2 = newList[i2]
							const {stopUnit} = v2
							if (stopUnit === ConstUnitPxPercentAuto.AUTO) {
								num += 1
							} else break
						}
						i2 = i
						let nextStop
						let nextStopUnit
						const lastItem = newList[i + num]
						if (lastItem) {
							if (lastItem['stopUnit'] === ConstUnitPxPercentAuto.AUTO) {
								nextStop = 100
								nextStopUnit = ConstUnitPxPercentAuto.PERCENT
							} else {
								if (lastItem['stop'] === ConstUnitPxPercent.PX) {
									nextStop = lastItem['stop'] / layerSizeW * 100
									nextStopUnit = ConstUnitPxPercentAuto.PERCENT
								} else {
									nextStop = lastItem['stop']
									nextStopUnit = lastItem['stopUnit']
								}
							}
						} else {
							nextStop = 100
							nextStopUnit = ConstUnitPxPercentAuto.PERCENT
						}
						let gap = newList[i + num] ? 1 : 0
						for (i2; i2 <= num + i; i2++) {
							const str = `calc(${prevStop}${prevStopUnit} + calc(calc(calc(${nextStop}${nextStopUnit} - ${prevStop}${prevStopUnit})/${num + gap}) * ${i2 - i + 1})`
							const conicStr = prevStop + (nextStop - prevStop) / (num + gap) * (i2 - i + 1)

							const targetData = newList[i2]
							if (targetData) {
								const borderRadius = targetData['mode'] === ConstGradientStepMode.RANGE ? (targetData['endItem'] ? '0 0 50% 50%' : '50% 50% 0 0') : '50%'
								const endStopText = targetData['endItem'] ? 'E' : 'S'
								result.push(
									<div
										key={i2}
										className={`visibleEditorPoint${i2}`}
										style={{
											background: targetData['colorHint'],
											...baseStyle,
											left: conicYn ? (Math.sin(Math.PI - conicStr * Math.PI * 2 * 0.01) * tT + ConstUnitPxPercentAuto.PX) : 0,
											top: conicYn ? (Math.cos(Math.PI - conicStr * Math.PI * 2 * 0.01) * tT + tT + ConstUnitPxPercentAuto.PX) : str,
											transform: `translate(-50%,-50%) ${conicYn ? `rotate(${(conicStr) * 360 * 0.01 - 90}deg)` : ''}`,

											borderRadius: targetData['stopUnit'] === ConstUnitPxPercentAuto.AUTO ? 0 : borderRadius,
											cursor: targetData['stopUnit'] === ConstUnitPxPercentAuto.AUTO ? 'default' : ' pointer',
											pointerEvents: targetMoveInfo ? 'none' : 'auto',
										}}
									>
										{renderColorButton(targetData, endStopText)}
										{/*{stop}*/}
									</div>
								)
							}
							if (lastItem) {
								prevStop = nextStop
								prevStopUnit = nextStopUnit
							} else {
								prevStop = prevStop
								nextStopUnit = ConstUnitPxPercentAuto.PERCENT
							}
						}
						i += num
					}
				}
			}
			return result
		}
		return <>
			<div
				style={{
					height: '100%',
					transform: conicYn ? '' : 'rotate(180deg)'
				}}
			>
				{renderPoint()}
			</div>
		</>
	}
	return <>
		<div
			className={'RedGradientVisibleEditor'}
			style={{transform: `translate(${x}px,${y}px) ${radialYn ? `rotate(45deg)` : `rotate(${activeLayerInfo['valueInfo']['angle']}deg)`}`}}
		>
			<div
				className={'RedGradientVisibleEditorRangeBarContainer'}
				ref={ref}
				style={{height: rangeBarHeight + 'px', top: radialYn ? -rangeBarHeight / 2 + 'px' : 0}}
			>
				{
					!radialYn && <div
						className={'RedGradientVisibleEditorCircle'}
						style={{width: rangeBarHeight + 'px', height: rangeBarHeight + 'px'}}
					/>
				}
				{!conicYn && <div className={'RedGradientVisibleEditorRangeBar'}/>}
				<div className={'RedGradientVisibleEditorRangeBarArea'}
						 ref={ref}
						 style={{height: rangeBarHeight + 'px', pointerEvents: conicYn ? 'none' : 'painted'}}
						 onMouseDownCapture={e => {
							 if (!conicYn) {
								 const {offsetY} = e.nativeEvent
								 targetPercent = 100 - offsetY / rangeBarHeight * 100
							 }
						 }}
						 onMouseMove={e => {
							 if (!conicYn) {
								 const {offsetY} = e.nativeEvent
								 const percent = 100 - (offsetY) / rangeBarHeight * 100
								 targetPercent = percent
								 if (ref2Current) {
									 ref2Current['style'].top = offsetY + 'px'
									 ref2Current['style'].opacity = targetMoveInfo ? 0 : 1
									 ref2Current.innerHTML = `<span style="transform: ${textRotateStr}">${percent.toFixed(0)}</span>`
								 }

							 }
						 }}
						 onMouseLeave={() => {
							 if (!conicYn) {
								 if (ref2Current) {
									 ref2Current['style'].opacity = 0
								 }

							 }
						 }}
						 onClick={e => {
							 if (!conicYn) {
								 const {offsetY} = e.nativeEvent
								 const percent = 100 - offsetY / rangeBarHeight * 100
								 let stepIDX = null
								 const {stepInfoList} = activeLayerInfo

								 {
									 let i = 0
									 const len = stepInfoList.length
									 for (i; i < len; i++) {
										 const v = stepInfoList[i]
										 const {start} = v
										 const {stop, stopUnit} = start
										 const tPercent = stopUnit === ConstUnitPxPercent.PX ? (stop / (layerSizeW) * 100) : stop

										 if (tPercent < percent) {
											 stepIDX = i
										 }
									 }
								 }
								 gradientActions.addAtLayerStepInfo(
									 {
										 stepIDX,
										 time,
										 percent: percent,
										 groupIndex: activeGroupIndex,
										 groupLayerIndex: activeGroupLayerIndex,
									 }
								 )
							 }
						 }}
				>
					<div className={'RedGradientVisibleEditorBarAreaCircle'} ref={ref2}
							 style={{display: conicYn ? 'none' : '', opacity: 0}}/>
				</div>

				{renderPreview(activeLayer, time)}
				{!radialYn && renderRotatePoint('E', '-30px', false)}
				{!radialYn && renderRotatePoint('S', `calc(100% + 30px)`, true)}
			</div>
		</div>

	</>
}
export default RedGradientVisibleEditor
