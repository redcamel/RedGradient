/**
 * device visible 업데이트
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
import {faMobileAlt} from "@fortawesome/free-solid-svg-icons";

const cmd_updateCanvasDeviceVisible = {
	description: {
		key: 'updateCanvasDeviceVisible',
		icon: faMobileAlt
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const {viewKey, value} = payload
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		newData.canvasInfo[viewKey]['deviceVisible'] = value
		action.label = `${viewKey} Device Visible : ${value ? 'On' : 'Off'}`
		return pushHistory(action, newData, true)
	}
}
export default cmd_updateCanvasDeviceVisible