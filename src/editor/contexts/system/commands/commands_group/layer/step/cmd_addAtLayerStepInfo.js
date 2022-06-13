import {faFolder} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../../../HELPER_GET_DATA.js";
import DataRedGradientStepInfo from "../../../../../../../data/DataRedGradientStepInfo.js";
import ConstGradientStepMode from "../../../../../../../data/const/ConstGradientStepMode.js";
import ConstUnitPxPercent from "../../../../../../../data/const/ConstUnitPxPercent";

/**
 * Add stepInfo  update
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_addAtLayerStepInfo = {
	description: {
		key: 'addAtLayerStepInfo',
		label: 'Add At StepInfo',
		icon: faFolder
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const newData = HELPER_GET_DATA.makeNewState(state)
		const layerGroupInfo = HELPER_GET_DATA.getActiveLayerGroupInfo(newData)
		const info = layerGroupInfo['groupList'][payload.groupIndex]['children'][payload.groupLayerIndex]['timeline'][payload.time]
		const makeData = (targetItem, stop, targetKey) => {
			return new DataRedGradientStepInfo({
				startColorHint: targetItem[targetKey].colorHint,
				startStop: stop,
				startStopUnit: ConstUnitPxPercent.PERCENT,
				endColorHint: targetItem[targetKey].colorHint,
				endStop: stop,
				endStopUnit: ConstUnitPxPercent.PERCENT,
				mode: ConstGradientStepMode.SINGLE
			})
		}
		{
			const targetStepList = info['stepInfoList']
			let stepIDX = payload['stepIDX']
			const targetStepData = targetStepList[stepIDX || 0]
			const targetStepModeIsSingle = targetStepData['mode'] === ConstGradientStepMode.SINGLE
			if (targetStepData) {
				delete targetStepData['start']['endItem']
				delete targetStepData['end']['endItem']
			}
			const {percent} = payload
			if (payload.stepIDX === null) {
				targetStepList.splice(stepIDX, 0, makeData(targetStepData, percent, 'start'))
			} else {
				if (targetStepModeIsSingle) {
					const originStep = targetStepList[stepIDX]
					targetStepList.splice(stepIDX, 1, originStep, makeData(targetStepData, percent, 'start'))
				} else {
					const originStep = targetStepList[stepIDX]
					const tempEnd = new DataRedGradientStepInfo()
					const tempStart = new DataRedGradientStepInfo()
					tempStart['start'] = originStep['start']
					tempStart['end'] = originStep['start']
					tempEnd['start'] = originStep['end']
					tempEnd['end'] = originStep['end']
					if (!targetStepList[stepIDX + 1]) {
						targetStepList.push(makeData(targetStepData, percent, 'end'))
					} else {
						targetStepList.splice(stepIDX, 1, tempStart)
						const {
							layerSizeW
						} = HELPER_GET_DATA.calcLayerPixelSize(state, HELPER_GET_DATA.getActiveLayerInfo(state))
						let tempEndPercent
						// let tempStartPercent
						// if (originStep.start.stopUnit === ConstUnitPxPercent.PX) tempStartPercent = originStep.start.stop / layerSizeW * 100
						// else tempStartPercent = originStep.start.stop
						if (originStep.end.stopUnit === ConstUnitPxPercent.PX) tempEndPercent = originStep.end.stop / layerSizeW * 100
						else tempEndPercent = originStep.end.stop


						if (tempEndPercent > percent) {
							tempStart['mode'] = ConstGradientStepMode.SINGLE
							tempEnd['mode'] = ConstGradientStepMode.SINGLE
							targetStepList.splice(stepIDX, 1, tempStart, makeData(targetStepData, percent, 'end'), tempEnd)
						} else {
							stepIDX += 1
							targetStepList.splice(stepIDX, 0, tempEnd, makeData(targetStepData, percent, 'end'))
						}
					}
				}
			}
		}
		return pushHistory(action, newData, true)
	}
}
export default cmd_addAtLayerStepInfo