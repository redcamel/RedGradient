import {faBorderStyle} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../../../HELPER_GET_DATA.js";

/**
 * border-image-outset value 변경
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_update_borderImageOutset = {
	description: {
		key: 'update_borderImageOutset',
		label: 'BorderImageOutset Change',
		icon: faBorderStyle
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		const {mode, key, value, saveHistoryYn} = payload
		const targetViewInfo = HELPER_GET_DATA.getTargetViewInfo(newData)
		const borderInfo = targetViewInfo['containerInfo']['borderInfo']
		const {borderImageOutsetInfo} = borderInfo
		borderImageOutsetInfo[mode][key] = value
		action.label = `${targetViewInfo['viewKey']} BorderImageOutset ${mode} - ${key} : ${value}`
		return pushHistory(action, newData, saveHistoryYn)
	}
}
export default cmd_update_borderImageOutset