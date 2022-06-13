import {faFolder} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../../../HELPER_GET_DATA.js";

/**
 * dropLayerStepInfo
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_dropLayerStepInfo = {
	description: {
		key: 'dropLayerStepInfo',
		label: 'Drop StepInfo',
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
			const {dragStartIDX, dropIDX} = payload
			const dragStartStep = tList[dragStartIDX]
			const dropStep = tList[dropIDX]
			const newDropIDX = tList.indexOf(dropStep)
			tList.splice(dragStartIDX, 1)
			tList.splice(newDropIDX, 0, dragStartStep)
		}
		return pushHistory(action, newData, payload.saveHistoryYn)
	}
}
export default cmd_dropLayerStepInfo