/**
 * Canvas ViewOffset 업데이트
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_updateCanvasViewOffset = {
	description: {
		key: 'updateCanvasViewOffset'
	},
	execute: (state, action, payload) => {
		const newData = {
			...state
		}
		const {value} = payload
		value.x = +value.x.toFixed(2)
		value.y = +value.y.toFixed(2)
		newData.canvasInfo[payload.viewKey]['viewTransformInfo']['viewOffset'] = value
		return newData
	}
}
export default cmd_updateCanvasViewOffset