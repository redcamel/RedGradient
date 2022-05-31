/**
 * ruler visible 업데이트
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_updateCanvasRulerVisible = {
	description: {
		key: 'updateCanvasRulerVisible',
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		newData.canvasInfo[payload.viewKey]['rulerVisible'] = payload.value
		return pushHistory(action, newData, false)
	}
}
export default cmd_updateCanvasRulerVisible