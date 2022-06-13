/**
 * Canvas ViewOffset  update
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
import HELPER_GET_DATA from "../../HELPER_GET_DATA";

const cmd_updateCanvasViewOffset = {
	description: {
		key: 'updateCanvasViewOffset'
	},
	execute: (state, action, payload) => {
		const newData = HELPER_GET_DATA.makeNewState(state)
		const {value} = payload
		value.x = +value.x.toFixed(3)
		value.y = +value.y.toFixed(3)
		newData.canvasInfo[payload.viewKey]['viewTransformInfo']['viewOffset'] = value
		return newData
	}
}
export default cmd_updateCanvasViewOffset