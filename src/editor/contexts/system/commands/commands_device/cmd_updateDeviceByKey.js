import {faMobileAlt} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../HELPER_GET_DATA";

/**
 * 디바이스  update
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_updateDeviceByKey = {
	description: {
		key: 'updateDeviceByKey',
		label: 'Device Update',
		icon: faMobileAlt
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const {key, value, saveHistoryYn} = payload
		const newData = HELPER_GET_DATA.makeNewState(state)
		newData.deviceInfo['sizeInfo'][key] = value
		action.label = `Device ${key} : ${value}`
		return pushHistory(action, newData, saveHistoryYn)
	}
}
export default cmd_updateDeviceByKey