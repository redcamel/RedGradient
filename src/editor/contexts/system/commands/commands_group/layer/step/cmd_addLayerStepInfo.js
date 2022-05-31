import {faFolder} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../../../HELPER_GET_DATA.js";
import DataRedGradientStepInfo from "../../../../../../../data/DataRedGradientStepInfo.js";
import ConstGradientStepMode from "../../../../../../../data/const/ConstGradientStepMode.js";

/**
 * Add stepInfo 업데이트
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_addLayerStepInfo = {
	description: {
		key: 'addLayerStepInfo',
		label: 'Add StepInfo',
		icon: faFolder
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		const {borderGradientMode} = payload
		const layerGroupInfo = borderGradientMode ? HELPER_GET_DATA.getTargetViewInfo(newData).containerInfo.borderInfo.borderGradientInfo : HELPER_GET_DATA.getActiveViewLayerGroupInfo(newData)
		const info = (borderGradientMode ? layerGroupInfo : layerGroupInfo['groupList'][payload.groupIndex]['children'][payload.groupLayerIndex])['timeline'][payload.time]

		{
			const tList = info['stepInfoList']
			const lastItem = tList[tList.length - 1]
			const {mode: lastItemMode} = lastItem
			const targetKEy = lastItemMode === ConstGradientStepMode.SINGLE ? 'start' : 'end'
			info['stepInfoList'].push(
				new DataRedGradientStepInfo({
					startColorHint: lastItem[targetKEy].colorHint,
					startStop: lastItem[targetKEy].stop,
					startStopUnit: lastItem[targetKEy].stopUnit,
					endColorHint: lastItem[targetKEy].colorHint,
					endStop: lastItem[targetKEy].stop,
					endStopUnit: lastItem[targetKEy].stopUnit,
					mode: lastItemMode
				}),
			)
		}
		return pushHistory(action, newData, payload.saveHistoryYn)
	}
}
export default cmd_addLayerStepInfo