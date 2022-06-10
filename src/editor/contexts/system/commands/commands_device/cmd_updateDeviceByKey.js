import {faMobileAlt} from "@fortawesome/free-solid-svg-icons";

/**
 * 디바이스 업데이트
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
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		newData.deviceInfo['sizeInfo'][key] = value
		action.label = `Device ${key} : ${value}`
		return pushHistory(action, newData, saveHistoryYn)
	}
}
export default cmd_updateDeviceByKey