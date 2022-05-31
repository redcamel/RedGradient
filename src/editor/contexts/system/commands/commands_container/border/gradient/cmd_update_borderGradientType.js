import {faFill} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../../../HELPER_GET_DATA.js";

/**
 * borderGradientType 변경
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_update_borderGradientType = {
	description: {
		key: 'update_borderGradientType',
		label: 'borderGradientType Change',
		icon: faFill
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		const borderInfo = HELPER_GET_DATA.getTargetViewInfo(newData)['containerInfo']['borderInfo']
		const {borderGradientInfo} = borderInfo
		borderGradientInfo[payload.key] = payload.value
		action.label = `borderGradientType Change / ${payload.mode} - ${payload.key} : ${payload.value}`
		return pushHistory(action, newData, payload.saveHistoryYn)
	}
}
export default cmd_update_borderGradientType