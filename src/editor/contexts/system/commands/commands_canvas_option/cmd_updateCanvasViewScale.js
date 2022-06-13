/**
 * Canvas ViewScale  update
 * @type {{description: {icon: IconDefinition, label: string, key: string}, execute: (function(*, *, *, *): *)}}
 */
import HELPER_GET_DATA from "../../HELPER_GET_DATA";

const cmd_updateCanvasViewScale = {
	description: {
		key: 'updateCanvasViewScale'
	},
	execute: (state, action, payload) => {
		const newData = HELPER_GET_DATA.makeNewState(state)
		newData.canvasInfo[payload.viewKey]['viewTransformInfo']['viewScale'] = payload.value
		return newData
	}
}
export default cmd_updateCanvasViewScale