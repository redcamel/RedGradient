import {faFill} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../../../HELPER_GET_DATA.js";

/**
 * border-image-slice value 변경
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_update_borderImageSlice = {
	description: {
		key: 'update_borderImageSlice',
		label: 'BorderImageSlice Change',
		icon: faFill
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		const borderInfo = HELPER_GET_DATA.getTargetViewInfo(newData)['containerInfo']['borderInfo']
		const {borderImageSliceInfo} = borderInfo
		borderImageSliceInfo[payload.mode][payload.key] = payload.value
		action.label = `BorderImageSlice Change - ${payload.key} : ${payload.value}`
		return pushHistory(action, newData, payload.saveHistoryYn)
	}
}
export default cmd_update_borderImageSlice