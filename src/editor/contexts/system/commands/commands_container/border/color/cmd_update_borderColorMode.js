import {faBorderStyle} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../../../HELPER_GET_DATA.js";

/**
 * border-color mode 변경
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_update_borderColorMode = {
	description: {
		key: 'update_borderColorMode',
		label: 'BorderColor Mode Change',
		icon: faBorderStyle
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const newData = HELPER_GET_DATA.makeNewState(state)
		const targetViewInfo = HELPER_GET_DATA.getActiveViewInfo(newData)
		const borderInfo = targetViewInfo['containerInfo']['borderInfo']
		const {borderColorInfo} = borderInfo
		borderColorInfo['mode'] = payload
		action.label = `BorderColor Mode Change - ${payload}`
		return pushHistory(action, newData, true)
	}
}
export default cmd_update_borderColorMode