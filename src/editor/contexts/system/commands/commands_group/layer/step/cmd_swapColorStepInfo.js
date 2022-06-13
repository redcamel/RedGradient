import {faArrowsUpDown} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../../../HELPER_GET_DATA.js";

/**
 * cmd_swapColorStepInfo
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_swapColorStepInfo = {
	description: {
		key: 'swapColorStepInfo',
		label: 'Swap Color StepInfo',
		icon: faArrowsUpDown
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const newData = HELPER_GET_DATA.makeNewState(state)
		const {borderGradientMode} = payload
		const layerGroupInfo = borderGradientMode ? HELPER_GET_DATA.getActiveViewInfo(newData).containerInfo.borderInfo.borderGradientInfo : HELPER_GET_DATA.getActiveLayerGroupInfo(newData)
		const info = (borderGradientMode ? layerGroupInfo : layerGroupInfo['groupList'][payload.groupIndex]['children'][payload.groupLayerIndex])['timeline'][payload.time]
		{
			const targetData = info['stepInfoList'][payload.stepIDX]
			const startColorHint = targetData['start']['colorHint']
			const endColorHint = targetData['end']['colorHint']
			targetData['start']['colorHint'] = endColorHint
			targetData['end']['colorHint'] = startColorHint
		}
		return pushHistory(action, newData, payload.saveHistoryYn)
	}
}
export default cmd_swapColorStepInfo