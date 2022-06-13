/**
 * Canvas editMode  update
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../HELPER_GET_DATA";

const cmd_updateCanvasEditMode = {
	description: {
		key: 'updateCanvasEditMode',
		icon: faEdit
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const {value, viewKey} = payload
		const newData = HELPER_GET_DATA.makeNewState(state)
		newData.canvasInfo[viewKey]['editMode'] = value
		action.label = `${viewKey} Transform Mode : ${value}`
		return pushHistory(action, newData, true)
	}
}
export default cmd_updateCanvasEditMode