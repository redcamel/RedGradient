import {faBorderStyle} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../../../HELPER_GET_DATA.js";

/**
 * border-style mode 변경
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_update_borderStyleMode = {
	description: {
		key: 'update_borderStyleMode',
		label: 'BorderStyle Mode Change',
		icon: faBorderStyle
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const newData = HELPER_GET_DATA.makeNewState(state)
		const targetViewInfo = HELPER_GET_DATA.getActiveViewInfo(newData)
		const borderInfo = targetViewInfo['containerInfo']['borderInfo']
		const {borderStyleInfo} = borderInfo
		borderStyleInfo['mode'] = payload

		action.label = `${targetViewInfo['viewKey']} BorderStyle Mode : ${payload}`
		return pushHistory(action, newData, true)
	}
}
export default cmd_update_borderStyleMode