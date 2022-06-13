import ConstGradientType from "../../../../data/const/ConstGradientType";
import ConstUnitPxPercentAuto from "../../../../data/const/ConstUnitPxPercentAuto.js";
import ConstGradientStepMode from "../../../../data/const/ConstGradientStepMode.js";
import ConstUnitPxPercent from "../../../../data/const/ConstUnitPxPercent.js";

const calcGradientLayer = (layerData, time = 0, offsetInfo = {
	raw: {
		x: 0,
		xUnit: ConstUnitPxPercent.PX,
		y: 0,
		yUnit: ConstUnitPxPercent.PX
	}
}, viewScale = 1, presetMode = false, borderGradientMode) => {
	
	const targetData = layerData['timeline'][time]
	const {stepInfoList} = targetData
	const layerType = layerData.type
	const {valueInfo, sizeInfo, positionInfo} = targetData
	//
	let result
	let stepStr;
	switch (layerType) {
		case ConstGradientType.LINEAR :
		case ConstGradientType.REPEATING_LINEAR :
			stepStr = calcLinear(valueInfo, stepInfoList, viewScale)
			break
		case ConstGradientType.RADIAL :
		case ConstGradientType.REPEATING_RADIAL :
			stepStr = calcRadial(valueInfo, stepInfoList, viewScale)
			break
		case ConstGradientType.CONIC :
		case ConstGradientType.REPEATING_CONIC :
			stepStr = calcConic(valueInfo, stepInfoList, viewScale)
			break
		default:
			break
	}
	const positionStr = presetMode ? '50% 50%' : `calc(${positionInfo.xUnit === ConstUnitPxPercent.PX ? viewScale : 1} * ${positionInfo.x}${positionInfo.xUnit}) calc(${positionInfo.yUnit === ConstUnitPxPercent.PX ? viewScale : 1} * ${positionInfo.y}${positionInfo.yUnit})`
	const sizeStr = `${sizeInfo.width * (sizeInfo.widthUnit === ConstUnitPxPercent.PX ? viewScale : 1)}${sizeInfo.widthUnit} ${sizeInfo.height * (sizeInfo.heightUnit === ConstUnitPxPercent.PX ? viewScale : 1)}${sizeInfo.heightUnit}`
	// result = `${layerType}-gradient(${stepStr}) ${positionStr} / ${sizeStr} ${layerData.repeatType},transparent`
	if (borderGradientMode) {
		result = `${layerType}-gradient(${stepStr}) `
	} else {
		result = `${layerType}-gradient(${stepStr}) ${positionStr} / ${sizeStr} ${layerData.repeatType}`
	}


	return result
}
export default calcGradientLayer
const calcAt = (atInfo, viewScale) => {
	const at = 'at ' + [
		atInfo['xUnit'] !== ConstUnitPxPercentAuto.AUTO ? `${(atInfo['xUnit'] === ConstUnitPxPercent.PX ? viewScale : 1) * atInfo['x']}${atInfo['xUnit']}` : `${atInfo['x']}${atInfo['xUnit']}`,
		atInfo['yUnit'] !== ConstUnitPxPercentAuto.AUTO ? `${(atInfo['yUnit'] === ConstUnitPxPercent.PX ? viewScale : 1) * atInfo['y']}${atInfo['yUnit']}` : `${atInfo['y']}${atInfo['yUnit']}`
	].join(' ')
	return at
}
const calcLinear = (valueInfo, stepInfoList, viewScale) => {
	const deg = valueInfo['angle'] ? `${valueInfo['angle']}deg` : ''
	return checkValue([
		deg,
		checkColorStepInfo(stepInfoList, viewScale)
	]).join(', ')
}
const calcRadial = (valueInfo, stepInfoList, viewScale) => {
	const at = calcAt(valueInfo['atInfo'], viewScale)
	const sizeType = valueInfo['sizeType']
	const endingShape = valueInfo['endingShape']
	return checkValue([
		[endingShape, sizeType, at].filter(Boolean).join(' '),
		checkColorStepInfo(stepInfoList, viewScale)
	]).join(', ')
}
const calcConic = (valueInfo, stepInfoList, viewScale) => {
	const at = calcAt(valueInfo['atInfo'], viewScale)
	const deg = valueInfo['angle'] ? `from ${valueInfo['angle']}deg` : ''
	return checkValue([
		[deg, at].filter(Boolean).join(' '),
		checkColorStepInfo(stepInfoList, viewScale)
	]).join(', ')
}
const checkColorStepInfo = (stepInfoList, viewScale) => {
	return stepInfoList.map((target, index) => {
		const endIndexYn = index === stepInfoList.length - 1
		const {start, end} = target
		const nextData = stepInfoList[index + 1] || stepInfoList[stepInfoList.length - 1]
		const colorStop_start = start['stopUnit'] !== ConstUnitPxPercentAuto.AUTO ? `${(start['stopUnit'] === ConstUnitPxPercent.PX ? viewScale : 1) * start['stop']}${start['stopUnit']}` : ''
		const colorStop_end = end['stopUnit'] !== ConstUnitPxPercentAuto.AUTO ? `${(end['stopUnit'] === ConstUnitPxPercent.PX ? viewScale : 1) * end['stop']}${end['stopUnit']}` : ''

		const result = []
		if (target['mode'] === ConstGradientStepMode.RANGE) {
			if (start['divideYn'] || end['divideYn']) {
				result.push([checkValue([start['colorHint'], colorStop_start]).join(' ')])
				if (start['divideYn']) {
					if (endIndexYn) {
						result.push([
							checkValue([end['colorHint'], colorStop_start]).join(' ')
						])
					} else {
						result.push([
							checkValue([end['colorHint'], colorStop_start]).join(' ')
						])
					}
				}
				result.push([checkValue([end['colorHint'], colorStop_end]).join(' ')])
				if (end['divideYn']) {
					if (endIndexYn) {
						result.push([
							checkValue(['transparent', colorStop_end]).join(' ')
						])
					} else {
						result.push([
							checkValue([nextData['start']['colorHint'], colorStop_end]).join(' ')
						])
					}
				}

			} else {
				result.push([
					checkValue([start['colorHint'], colorStop_start]).join(' '),
					checkValue([end['colorHint'], colorStop_end]).join(' ')
				])
			}

		} else {
			result.push([checkValue([start['colorHint'], colorStop_start]).join(' ')])
			if (start['divideYn']) {
				if (endIndexYn) {
					result.push([
						checkValue(['transparent', colorStop_start]).join(' ')
					])
				} else {
					result.push([
						checkValue([nextData['start']['colorHint'], colorStop_start]).join(' ')
					])
				}
			} else {
				if (stepInfoList.length === 1) {
					result.push([checkValue([start['colorHint'], colorStop_start]).join(' ')])
				}
			}
		}
		return result.join(', ')
	}).join(', ')
}
const checkValue = v => v.filter(Boolean)