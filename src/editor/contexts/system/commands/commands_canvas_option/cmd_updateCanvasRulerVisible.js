/**
 * ruler visible 업데이트
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
import {faRulerCombined} from "@fortawesome/free-solid-svg-icons";

const cmd_updateCanvasRulerVisible = {
	description: {
		key: 'updateCanvasRulerVisible',
		icon : faRulerCombined
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const {viewKey,value} = payload
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		newData.canvasInfo[viewKey]['rulerVisible'] = value
		action.label = `${viewKey} Ruler Visible : ${value ? 'On' : 'Off'}`
		return pushHistory(action, newData, true)
	}
}
export default cmd_updateCanvasRulerVisible