import {faMobileAlt} from "@fortawesome/free-solid-svg-icons";
import ConstDevicePreset from "../../../../../data/const/ConstDevicePreset.js";
import HELPER_GET_DATA from "../../HELPER_GET_DATA";

/**
 * Device Preset  update
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
		const newData = HELPER_GET_DATA.makeNewState(state)
		Object.values(ConstDevicePreset).forEach(v => {
			if (v['deviceName'] === payload.value) newData.deviceInfo = JSON.parse(JSON.stringify(v))
		})
		action.label = `Device Preset : ${newData.deviceInfo.deviceName}`
		return pushHistory(action, newData, true)
	}
}
export default cmd_updateDevicePreset