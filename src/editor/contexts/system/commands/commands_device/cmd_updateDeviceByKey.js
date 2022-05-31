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
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		newData.deviceInfo['sizeInfo'][payload.key] = payload.value
		action.label = `Device ${payload.key} Update : ${payload.value}`
		return pushHistory(action, newData, payload.saveHistoryYn)
	}
}
export default cmd_updateDeviceByKey