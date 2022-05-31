import RedItemTitle from "../../../basicUI/RedItemTitle.jsx";
import RedDivision from "../../../basicUI/RedDivision.jsx";
import calcLayerGradient from "../../layer/calcLayerGradient.js";
import ConstGradientType from "../../../../data/const/ConstGradientType.js";
import ConstGradientRepeatType from "../../../../data/const/ConstGradientRepeatType.js";
import ConstBlendModeType from "../../../../data/const/ConstBlendModeType.js";
import DataRedSizeInfo from "../../../../data/DataRedSizeInfo";
import ConstUnitPxPercent from "../../../../data/const/ConstUnitPxPercent";
import DataRedPositionInfo from "../../../../data/DataRedPositionInfo";
import ConstUnitPxPercentAuto from "../../../../data/const/ConstUnitPxPercentAuto.js";
import ConstGradientStepMode from "../../../../data/const/ConstGradientStepMode";
import {useContext} from "react";
import ContextGradient from "../../../contexts/system/ContextGradient";
import HELPER_GET_DATA from "../../../contexts/system/HELPER_GET_DATA";

/**
 * RedGradientStepEditorPreview
 * @returns {JSX.Element}
 * @constructor
 */
const RedGradientStepEditorPreview = ({data, time, title = 'Preview'}) => {
	const {state: gradientState} = useContext(ContextGradient)
	const previewData = JSON.parse(JSON.stringify(data))
	// 막대로 표시가능하게 변경
	const previewDataAtTime = previewData['timeline'][time]
	previewDataAtTime['valueInfo']['angle'] = 90
	previewDataAtTime['sizeInfo'] = new DataRedSizeInfo(100, 100, ConstUnitPxPercent.PERCENT, ConstUnitPxPercent.PERCENT)
	previewDataAtTime['positionInfo'] = new DataRedPositionInfo()
	previewData['type'] = ConstGradientType.LINEAR
	previewData['repeatType'] = ConstGradientRepeatType.NO_REPEAT
	previewData['blendMode'] = ConstBlendModeType.NORMAL
	const {
		layerSizeW
	} = HELPER_GET_DATA.calcLayerPixelSize(gradientState, HELPER_GET_DATA.getActiveLayerInfo(gradientState));
	const {stepInfoList} = previewDataAtTime
	//TODO - 정리
	const renderPoint = () => {
		let i = 0;
		const newList = stepInfoList.map(v => {
			if (v['mode'] === ConstGradientStepMode.RANGE) {
				return [v['start'], v['end']]
			}
			return [v['start']]
		}).flat()
		// console.log('newList', newList)
		const len = newList.length
		const result = []
		let prevStop, prevStopUnit
		for (i; i < len; i++) {
			const targetData = newList[i]
			const {stop, stopUnit, colorHint} = targetData
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
			if (stopUnit !== ConstUnitPxPercentAuto.AUTO) {
				result.push(
					<div
						key={i}
						style={{
							position: "absolute",
							bottom: 0, left: `${stop}${stopUnit}`,
							width: '4px', height: '10px',
							background: colorHint,
							transform: 'translate(-50%, 50%)',
							outline: '1px solid #222',
							// border: '1px solid #ffffff99',
							boxShadow: '0 0 4px rgba(0,0,0,1)',
							borderRadius: '2px 2px 0 0'
						}}>
						{/*{stop}*/}
					</div>
				)
				prevStop = stop
				prevStopUnit = stopUnit
			} else {
				if (i === 0) {
					result.push(
						<div
							key={i}
							style={{
								position: "absolute",
								bottom: 0,
								left: 0,
								width: '4px', height: '10px',
								background: newList[i]['colorHint'],
								transform: 'translate(-50%, 50%)',
								outline: '1px solid #222',
								// border: '1px solid #ffffff99',
								boxShadow: '0 0 4px rgba(0,0,0,1)',
								borderRadius: '2px 2px 0 0'
							}}>
							{/*{stop}*/}
						</div>
					)
					prevStop = 0
					prevStopUnit = ConstUnitPxPercentAuto.PERCENT
				} else if (i === len - 1) {
					result.push(
						<div
							key={i}
							style={{
								position: "absolute",
								bottom: 0,
								left: '100%',
								width: '4px', height: '10px',
								background: newList[i]['colorHint'],
								transform: 'translate(-50%, 50%)',
								outline: '1px solid #222',
								// border: '1px solid #ffffff99',
								boxShadow: '0 0 4px rgba(0,0,0,1)',
								borderRadius: '2px 2px 0 0'
							}}>
							{/*{stop}*/}
						</div>
					)
				} else {
					// 현재 부터 다음 값이 null인경우를 찾는다.
					let i2 = i
					let num = 0
					for (i2; i2 < len; i2++) {
						const v2 = newList[i2]
						const {stopUnit} = v2
						if (stopUnit === ConstUnitPxPercentAuto.AUTO) {
							num += 1
						} else {
							break
						}
					}
					i2 = i
					// console.log('num', num)
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
					// console.log('num',num,len,i + num,lastItem)
					let gap = newList[i + num] ? 1 : 0
					for (i2; i2 <= num + i; i2++) {
						// const str = `calc(${prevStop}${prevStopUnit} + calc(calc(90% - 10%) / ${num}) * ${i2 - i}) )`
						const str = `calc(${prevStop}${prevStopUnit} + calc(calc(calc(${nextStop}${nextStopUnit} - ${prevStop}${prevStopUnit})/${num + gap}) * ${i2 - i + 1})`
						// console.log('num', str)
						if (newList[i2]) {
							result.push(
								<div
									key={i2}
									style={{
										position: "absolute",
										bottom: 0,
										left: `${str}`,
										width: '4px', height: '10px',
										background: newList[i2]['colorHint'],
										transform: 'translate(-50%, 50%)',
										outline: '1px solid #222',
										// border: '1px solid #ffffff99',
										boxShadow: '0 0 4px rgba(0,0,0,1)',
										borderRadius: '2px 2px 0 0'
									}}>
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
		<RedItemTitle label={title}/>
		<RedDivision/>
		<div
			style={{
				width: '100%',
				height: '36px',
				backgroundImage: `linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%)`,
				backgroundPosition: '0 0, 0 5px, 5px -5px, -5px 0',
				backgroundSize: '10px 10px',
				border: '1px solid #222'
			}}
		>
			<div
				style={{
					border: '1px solid #222',
					width: '100%',
					height: '100%',
					overflowX: 'hidden',
					// background: `${data['type'].indexOf('repeating') > -1 ? 'repeating-' : ''}${calcLayerGradient(previewData)}`,
					background: `${data['type'].indexOf('repeating') > -1 ? '' : ''}${calcLayerGradient(previewData)}`,
				}}
			>
				<div
					style={{
						width: '100%',
						height: 'calc(100%)',
						overflow: 'hidden'
					}}
				>
					{renderPoint()}
				</div>
			</div>
		</div>
		<RedDivision/>
	</>
}
export default RedGradientStepEditorPreview