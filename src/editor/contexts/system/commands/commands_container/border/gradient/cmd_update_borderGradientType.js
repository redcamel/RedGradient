import {faBorderStyle} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../../../HELPER_GET_DATA.js";

/**
 * borderGradientType 변경
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_update_borderGradientType = {
	description: {
		key: 'update_borderGradientType',
		label: 'borderGradientType Change',
		icon: faBorderStyle
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const newData = HELPER_GET_DATA.makeNewState(state)
		const {key, value, saveHistoryYn} = payload
		const targetViewInfo = HELPER_GET_DATA.getActiveViewInfo(newData)
		const borderInfo = targetViewInfo['containerInfo']['borderInfo']
		const {borderGradientInfo} = borderInfo
		borderGradientInfo[key] = value
		action.label = `${targetViewInfo['viewKey']} borderGradientType - ${key} : ${value}`
		return pushHistory(action, newData, saveHistoryYn)
	}
}
export default cmd_update_borderGradientType