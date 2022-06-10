/**
 * Canvas overflow Hidden 업데이트
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_updateCanvasOverflowHidden = {
	description: {
		key: 'updateCanvasOverflowHidden'
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const {viewKey,value} = payload
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		newData.canvasInfo[viewKey]['overflowHiddenYn'] = value
		action.label = `${viewKey} Device Overflow Allow : ${value.toString()}`
		return pushHistory(action, newData, true)
	}
}
export default cmd_updateCanvasOverflowHidden