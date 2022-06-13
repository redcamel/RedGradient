import {faMagnet} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../../HELPER_GET_DATA";

/**
 * updateSnapToContainer
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_updateSnapToContainer = {
	description: {
		key: 'updateSnapToContainer',
		label: 'snapToContainer',
		icon: faMagnet
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const {viewKey, value} = payload
		const newData = HELPER_GET_DATA.makeNewState(state)
		newData['snapToContainer'] = value
		action.label = `${viewKey} Snap To Container : ${value.toString()}`

		return pushHistory(action, newData, true)
	}
}
export default cmd_updateSnapToContainer