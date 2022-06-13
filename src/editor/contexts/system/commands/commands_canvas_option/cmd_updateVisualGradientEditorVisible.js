import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../HELPER_GET_DATA";

/**
 * visualGradientEditorVisible   update
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_updateVisualGradientEditorVisible = {
	description: {
		key: 'updateVisualGradientEditorVisible',

	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const {value, viewKey} = payload
		const newData = HELPER_GET_DATA.makeNewState(state)
		newData.canvasInfo[viewKey]['visualGradientEditorVisible'] = value
		action.label = `${viewKey}  Visual Gradient Editor Visible : ${value ? 'On' : 'Off'}`
		action.icon = value ? faEye : faEyeSlash
		return pushHistory(action, newData, true)
	}
}
export default cmd_updateVisualGradientEditorVisible