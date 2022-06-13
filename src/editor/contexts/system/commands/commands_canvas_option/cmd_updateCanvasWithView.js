/**
 * Canvas WithView  update
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
import HELPER_GET_DATA from "../../HELPER_GET_DATA";

const cmd_updateCanvasWithView = {
	description: {
		key: 'updateCanvasWithView',
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const {value, viewKey} = payload
		const newData = HELPER_GET_DATA.makeNewState(state)
		const withView = newData.canvasInfo[viewKey]['withView']
		if (withView.indexOf(value) > -1) newData.canvasInfo[viewKey]['withView'] = withView.filter(v => v !== value)
		withView.push(value)
		newData.canvasInfo[viewKey]['editMode'] = value
		action.label = `${viewKey} With View : ${withView.join(', ')}`
		return pushHistory(action, newData, true)
	}
}
export default cmd_updateCanvasWithView