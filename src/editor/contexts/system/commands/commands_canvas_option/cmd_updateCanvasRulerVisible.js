/**
 * ruler visible  update
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
import {faRulerCombined} from "@fortawesome/free-solid-svg-icons";
import HELPER_GET_DATA from "../../HELPER_GET_DATA";

const cmd_updateCanvasRulerVisible = {
	description: {
		key: 'updateCanvasRulerVisible',
		icon: faRulerCombined
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const {viewKey, value} = payload
		const newData = HELPER_GET_DATA.makeNewState(state)
		newData.canvasInfo[viewKey]['rulerVisible'] = value
		action.label = `${viewKey} Ruler Visible : ${value ? 'On' : 'Off'}`
		return pushHistory(action, newData, true)
	}
}
export default cmd_updateCanvasRulerVisible