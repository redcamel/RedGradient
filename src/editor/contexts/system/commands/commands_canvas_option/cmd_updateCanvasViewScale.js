/**
 * Canvas ViewScale 업데이트
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_updateCanvasViewScale = {
	description: {
		key: 'updateCanvasViewScale'
	},
	execute: (state, action, payload) => {
		const newData = {
			...state
		}
		newData.canvasInfo[payload.viewKey]['viewTransformInfo']['viewScale'] = payload.value
		return newData
	}
}
export default cmd_updateCanvasViewScale