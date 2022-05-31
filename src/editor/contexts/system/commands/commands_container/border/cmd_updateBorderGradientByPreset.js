import {faFolder} from "@fortawesome/free-solid-svg-icons";

/**
 * Layer 업데이트
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_updateBorderGradientByPreset = {
	description: {
		key: 'updateBorderGradientByPreset',
		label: 'Border Gradient Update',
		icon: faFolder
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		action.label = `Border Gradient Update By Preset`
		return pushHistory(action, newData, true)
	}
}
export default cmd_updateBorderGradientByPreset