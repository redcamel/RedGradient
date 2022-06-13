/**
 * device visible  update
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
import {faMobileAlt} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../HELPER_GET_DATA";

const cmd_updateCanvasDeviceVisible = {
	description: {
		key: 'updateCanvasDeviceVisible',
		icon: faMobileAlt
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const {viewKey, value} = payload
		const newData = HELPER_GET_DATA.makeNewState(state)
		newData.canvasInfo[viewKey]['deviceVisible'] = value
		action.label = `${viewKey} Device Visible : ${value ? 'On' : 'Off'}`
		return pushHistory(action, newData, true)
	}
}
export default cmd_updateCanvasDeviceVisible