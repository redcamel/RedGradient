import {faFill} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../../../HELPER_GET_DATA.js";

/**
 * border-image-slice mode 변경
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_update_borderImageSliceMode = {
	description: {
		key: 'update_borderImageSliceMode',
		label: 'BorderImageSlice Mode Change',
		icon: faFill
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		const borderInfo = HELPER_GET_DATA.getTargetViewInfo(newData)['containerInfo']['borderInfo']
		const {borderImageSliceInfo} = borderInfo
		borderImageSliceInfo['mode'] = payload
		action.label = `BorderImageSlice Mode Change - ${payload}`
		return pushHistory(action, newData, true)
	}
}
export default cmd_update_borderImageSliceMode