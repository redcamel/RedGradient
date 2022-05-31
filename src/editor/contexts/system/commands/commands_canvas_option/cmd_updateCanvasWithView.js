/**
 * Canvas WithView 업데이트
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_updateCanvasWithView = {
	description: {
		key: 'updateCanvasWithView'
	},
	execute: (state, action, payload) => {
		const newData = {
			...state
		}
		const withView = newData.canvasInfo[payload.viewKey]['withView']
		console.log('withView', withView)
		if (withView.indexOf(payload.value) > -1) newData.canvasInfo[payload.viewKey]['withView'] = withView.filter(v => v !== payload.value)
		withView.push(payload.value)
		return newData
	}
}
export default cmd_updateCanvasWithView