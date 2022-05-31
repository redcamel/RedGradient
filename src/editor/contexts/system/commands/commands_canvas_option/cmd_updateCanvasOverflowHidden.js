/**
 * Canvas overflow Hidden 업데이트
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_updateCanvasOverflowHidden = {
	description: {
		key: 'updateCanvasOverflowHidden'
	},
	execute: (state, action, payload) => {
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		newData.canvasInfo[payload.viewKey]['overflowHiddenYn'] = payload.value
		return newData
	}
}
export default cmd_updateCanvasOverflowHidden