import {faFolder} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../../../HELPER_GET_DATA.js";

/**
 * duplicate stepInfo  update
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_duplicateLayerStepInfo = {
	description: {
		key: 'duplicateLayerStepInfo',
		label: 'duplicate StepInfo',
		icon: faFolder
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const newData = HELPER_GET_DATA.makeNewState(state)
		const {borderGradientMode} = payload
		const layerGroupInfo = borderGradientMode ? HELPER_GET_DATA.getActiveViewInfo(newData).containerInfo.borderInfo.borderGradientInfo : HELPER_GET_DATA.getActiveLayerGroupInfo(newData)
		const info = (borderGradientMode ? layerGroupInfo : layerGroupInfo['groupList'][payload.groupIndex]['children'][payload.groupLayerIndex])['timeline'][payload.time]
		{
			const tList = info['stepInfoList']
			tList.splice(payload.stepIDX, 0, JSON.parse(JSON.stringify(tList[payload.stepIDX])))
		}
		return pushHistory(action, newData, payload.saveHistoryYn)
	}
}
export default cmd_duplicateLayerStepInfo