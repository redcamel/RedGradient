import {faFill} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../../../HELPER_GET_DATA.js";

/**
 * border-radius mode 변경
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_update_borderRadiusMode = {
	description: {
		key: 'update_borderRadiusMode',
		label: 'BorderRadius Mode Change',
		icon: faFill
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		const borderInfo = HELPER_GET_DATA.getTargetViewInfo(newData)['containerInfo']['borderInfo']
		const {borderRadiusInfo} = borderInfo
		borderRadiusInfo['mode'] = payload
		action.label = `BorderRadius Mode Change - ${payload}`
		return pushHistory(action, newData, true)
	}
}
export default cmd_update_borderRadiusMode