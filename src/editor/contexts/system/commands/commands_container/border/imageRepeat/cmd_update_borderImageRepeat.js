import {faBorderStyle} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../../../HELPER_GET_DATA.js";

/**
 * border-image-repeat value 변경
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_update_borderImageRepeat = {
	description: {
		key: 'update_borderImageRepeat',
		label: 'BorderImageRepeat Change',
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
		const {borderImageRepeatInfo} = borderInfo
		borderImageRepeatInfo[key] = value
		action.label = `${targetViewInfo['viewKey']} BorderImageRepeat - ${key} : ${value}`
		return pushHistory(action, newData, true)
	}
}
export default cmd_update_borderImageRepeat