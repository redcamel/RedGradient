/**
 * Canvas editMode 업데이트
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
import {faEdit} from "@fortawesome/free-solid-svg-icons";

const cmd_updateCanvasEditMode = {
	description: {
		key: 'updateCanvasEditMode',
		icon: faEdit
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const {value, viewKey} = payload
		const newData = {
			...state
		}
		newData.canvasInfo[viewKey]['editMode'] = value
		action.label = `${viewKey} Transform Mode : ${value}`
		return pushHistory(action, newData, true)
	}
}
export default cmd_updateCanvasEditMode