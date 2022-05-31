import {faFolder} from "@fortawesome/free-solid-svg-icons";

/**
 * Layer 업데이트
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_updateLayerByPreset = {
	description: {
		key: 'updateLayerByPreset',
		label: 'Layer Update',
		icon: faFolder
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		action.label = `Layer Update By Preset`
		return pushHistory(action, newData, true)
	}
}
export default cmd_updateLayerByPreset