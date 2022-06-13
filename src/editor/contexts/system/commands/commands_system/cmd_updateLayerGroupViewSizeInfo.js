/**
 * updateLayerGroupViewSizeInfo
 * @type {{description: {key: string}, execute: (function(*, *, *, *): {})}}
 */
import HELPER_GET_DATA from "../../HELPER_GET_DATA";

const cmd_updateLayerGroupViewSizeInfo = {
	description: {
		key: 'updateLayerGroupViewSizeInfo',
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const {key, value} = payload
		const newData = HELPER_GET_DATA.makeNewState(state)
		newData['layerGroupViewSizeInfo'][key] = value
		action.label = `set ${key === 'previewBackgroundType' ? 'bgColor' : key} of group preview.  : ${value}`
		return pushHistory(action, newData, true)
	}
}
export default cmd_updateLayerGroupViewSizeInfo