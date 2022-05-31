import {faFill} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../../../HELPER_GET_DATA.js";

/**
 * border-image-repeat value 변경
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_update_borderImageRepeat = {
	description: {
		key: 'update_borderImageRepeat',
		label: 'BorderImageRepeat Change',
		icon: faFill
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		const borderInfo = HELPER_GET_DATA.getTargetViewInfo(newData)['containerInfo']['borderInfo']
		const {borderImageRepeatInfo} = borderInfo
		borderImageRepeatInfo[payload.key] = payload.value
		action.label = `BorderImageRepeat Change - ${payload.key} : ${payload.value}`
		return pushHistory(action, newData, true)
	}
}
export default cmd_update_borderImageRepeat