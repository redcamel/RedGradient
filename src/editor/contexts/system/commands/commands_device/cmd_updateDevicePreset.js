import {faMobileAlt} from "@fortawesome/free-solid-svg-icons";
import ConstDevicePreset from "../../../../../data/const/ConstDevicePreset.js";

/**
 * Device Preset 업데이트
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_updateDevicePreset = {
	description: {
		key: 'updateDevicePreset',
		label: 'Device Preset Setting',
		icon: faMobileAlt
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		Object.values(ConstDevicePreset).forEach(v => {
			if (v['deviceName'] === payload.value) newData.deviceInfo = JSON.parse(JSON.stringify(v))
		})
		action.label = `Device Preset Update : ${newData.deviceInfo.deviceName}`
		return pushHistory(action, newData, true)
	}
}
export default cmd_updateDevicePreset