/**
 * Canvas overflow Hidden  update
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
import HELPER_GET_DATA from "../../HELPER_GET_DATA";

const cmd_updateCanvasOverflowHidden = {
	description: {
		key: 'updateCanvasOverflowHidden'
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const {viewKey, value} = payload
		const newData = HELPER_GET_DATA.makeNewState(state)
		newData.canvasInfo[viewKey]['overflowHiddenYn'] = value
		action.label = `${viewKey} Device Overflow Allow : ${value.toString()}`
		return pushHistory(action, newData, true)
	}
}
export default cmd_updateCanvasOverflowHidden