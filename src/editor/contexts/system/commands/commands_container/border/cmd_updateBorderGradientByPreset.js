import {faFolder} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../../HELPER_GET_DATA";

/**
 * Layer  update
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
		const newData = HELPER_GET_DATA.makeNewState(state)
		action.label = `Border Gradient Update By Preset`
		return pushHistory(action, newData, true)
	}
}
export default cmd_updateBorderGradientByPreset