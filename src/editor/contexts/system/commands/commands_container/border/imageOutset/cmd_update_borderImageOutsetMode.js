import {faFill} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../../../HELPER_GET_DATA.js";

/**
 * border-image-outset mode 변경
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_update_borderImageOutsetMode = {
	description: {
		key: 'update_borderImageOutsetMode',
		label: 'BorderImageOutset Mode Change',
		icon: faFill
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		const borderInfo = HELPER_GET_DATA.getTargetViewInfo(newData)['containerInfo']['borderInfo']
		const {borderImageOutsetInfo} = borderInfo
		borderImageOutsetInfo['mode'] = payload
		action.label = `BorderImageOutset Mode Change - ${payload}`
		return pushHistory(action, newData, true)
	}
}
export default cmd_update_borderImageOutsetMode