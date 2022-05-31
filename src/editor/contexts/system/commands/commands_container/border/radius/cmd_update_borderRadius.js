import {faFill} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../../../HELPER_GET_DATA.js";

/**
 * border-radius value 변경
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_update_borderRadius = {
	description: {
		key: 'update_borderRadius',
		label: 'BorderRadius Change',
		icon: faFill
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		console.log('payload', payload)
		const borderInfo = HELPER_GET_DATA.getTargetViewInfo(newData)['containerInfo']['borderInfo']
		const {borderRadiusInfo} = borderInfo
		borderRadiusInfo[payload.mode][payload.key] = payload.value
		action.label = `BorderRadius Change - ${payload.key} : ${payload.value}`
		return pushHistory(action, newData, payload.saveHistoryYn)
	}
}
export default cmd_update_borderRadius