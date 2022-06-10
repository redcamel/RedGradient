/**
 * Canvas WithView 업데이트
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_updateCanvasWithView = {
	description: {
		key: 'updateCanvasWithView',
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const {value, viewKey} = payload
		const newData = {
			...state
		}
		const withView = newData.canvasInfo[viewKey]['withView']
		// console.log('withView', withView)
		if (withView.indexOf(value) > -1) newData.canvasInfo[viewKey]['withView'] = withView.filter(v => v !== value)
		withView.push(value)
		newData.canvasInfo[viewKey]['editMode'] = value
		action.label = `${viewKey} With View : ${withView.join(', ')}`
		return pushHistory(action, newData, true)
	}
}
export default cmd_updateCanvasWithView