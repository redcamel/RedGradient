import {faFill} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../../HELPER_GET_DATA.js";

/**
 * border modeType 변경
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_update_borderModeType = {
	description: {
		key: 'update_borderModeType',
		label: 'Border Mode Change',
		icon: faFill
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		const borderInfo = HELPER_GET_DATA.getTargetViewInfo(newData)['containerInfo']['borderInfo']
		borderInfo['mode'] = payload
		action.label = `Border Mode Change - ${payload}`
		return pushHistory(action, newData, true)
	}
}
export default cmd_update_borderModeType