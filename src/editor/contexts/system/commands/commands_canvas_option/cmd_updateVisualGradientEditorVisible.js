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
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		newData.canvasInfo[payload.viewKey]['visualGradientEditorVisible'] = payload.value
		return pushHistory(action, newData, false)
	}
}
export default cmd_updateVisualGradientEditorVisible