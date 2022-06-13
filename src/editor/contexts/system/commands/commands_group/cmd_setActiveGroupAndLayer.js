import HELPER_GET_DATA from "../../HELPER_GET_DATA.js";

/**
 * setActiveGroupAndLayer
 * @type {{description: {key: string}, execute: (function(*, *, *, *): {})}}
 */
const cmd_setActiveGroupAndLayer = {
	description: {
		key: 'setActiveGroupAndLayer',
	},
	execute: (state, action, payload) => {
		const {activeGroupIndex, activeGroupLayerIndex} = payload
		const newData = HELPER_GET_DATA.makeNewState(state)
		const layerGroupInfo = HELPER_GET_DATA.getActiveLayerGroupInfo(newData)
		layerGroupInfo['activeGroupIndex'] = activeGroupIndex
		layerGroupInfo['activeGroupLayerIndex'] = activeGroupLayerIndex
		return newData
	}
}
export default cmd_setActiveGroupAndLayer