import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";

/**
 * visualGradientEditorVisible  업데이트
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_updateVisualGradientEditorVisible = {
	description: {
		key: 'updateVisualGradientEditorVisible',

	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const {value, viewKey} = payload
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		newData.canvasInfo[viewKey]['visualGradientEditorVisible'] = value
		action.label = `${viewKey}  Visual Gradient Editor Visible : ${value ? 'On' : 'Off'}`
		action.icon = value ? faEye : faEyeSlash
		return pushHistory(action, newData, true)
	}
}
export default cmd_updateVisualGradientEditorVisible