import {faBorderStyle} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../../../HELPER_GET_DATA.js";

/**
 * border-image-outset mode 변경
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_update_borderImageOutsetMode = {
	description: {
		key: 'update_borderImageOutsetMode',
		label: 'BorderImageOutset Mode Change',
		icon: faBorderStyle
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		const targetViewInfo = HELPER_GET_DATA.getTargetViewInfo(newData)
		const borderInfo = targetViewInfo['containerInfo']['borderInfo']
		const {borderImageOutsetInfo} = borderInfo
		borderImageOutsetInfo['mode'] = payload
		action.label = `${targetViewInfo['viewKey']} BorderImageOutset Mode : ${payload}`
		return pushHistory(action, newData, true)
	}
}
export default cmd_update_borderImageOutsetMode