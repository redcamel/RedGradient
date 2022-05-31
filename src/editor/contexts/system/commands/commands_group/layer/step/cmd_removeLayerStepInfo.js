import {faFolder} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../../../HELPER_GET_DATA.js";

/**
 *  stepInfo 삭제
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cam_removeLayerStepInfo = {
	description: {
		key: 'removeLayerStepInfo',
		label: 'remove StepInfo',
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
		info['stepInfoList'].splice(payload.stepIDX, 1)
		return pushHistory(action, newData, payload.saveHistoryYn)
	}
}
export default cam_removeLayerStepInfo