/**
 * Canvas editMode 업데이트
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_updateCanvasEditMode = {
	description: {
		key: 'updateCanvasEditMode'
	},
	execute: (state, action, payload) => {
		const newData = {
			...state
		}
		newData.canvasInfo[payload.viewKey]['editMode'] = payload.value
		return newData
	}
}
export default cmd_updateCanvasEditMode