import {faBorderStyle} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../../../HELPER_GET_DATA.js";

/**
 * border-width mode 변경
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_update_borderWidthMode = {
	description: {
		key: 'update_borderWidthMode',
		label: 'BorderWidth Mode Change',
		icon: faBorderStyle
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}

			const targetViewInfo = HELPER_GET_DATA.getTargetViewInfo(newData)
			const borderInfo = targetViewInfo['containerInfo']['borderInfo']
			const {borderWidthInfo} = borderInfo
			borderWidthInfo['mode'] = payload

		action.label = `${targetViewInfo['viewKey']} Border Width Mode : ${payload}`
		return pushHistory(action, newData, true)
	}
}
export default cmd_update_borderWidthMode