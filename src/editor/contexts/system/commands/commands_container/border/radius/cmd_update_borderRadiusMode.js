import {faBorderStyle} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../../../HELPER_GET_DATA.js";

/**
 * border-radius mode 변경
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_update_borderRadiusMode = {
	description: {
		key: 'update_borderRadiusMode',
		label: 'BorderRadius Mode Change',
		icon: faBorderStyle
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		const targetViewInfo = HELPER_GET_DATA.getTargetViewInfo(newData)
		const borderInfo = targetViewInfo['containerInfo']['borderInfo']
		const {borderRadiusInfo} = borderInfo
		borderRadiusInfo['mode'] = payload
		action.label = `${targetViewInfo['viewKey']} Border Radius Mode : ${payload}`
		return pushHistory(action, newData, true)
	}
}
export default cmd_update_borderRadiusMode