import {faFill} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../../../HELPER_GET_DATA.js";

/**
 * border-color value 변경
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const update_borderColor = {
	description: {
		key: 'update_borderColor',
		label: 'BorderColor Change',
		icon: faFill
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		const borderInfo = HELPER_GET_DATA.getTargetViewInfo(newData)['containerInfo']['borderInfo']
		const {borderColorInfo} = borderInfo
		borderColorInfo[payload.mode][payload.key] = payload.value
		action.label = `BorderColor Change / ${payload.mode} - ${payload.key} : ${payload.value}`
		return pushHistory(action, newData, payload.saveHistoryYn)
	}
}
export default update_borderColor