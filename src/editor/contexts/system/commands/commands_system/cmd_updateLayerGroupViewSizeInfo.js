/**
 * updateLayerGroupViewSizeInfo
 * @type {{description: {key: string}, execute: (function(*, *, *, *): {})}}
 */
const cmd_updateLayerGroupViewSizeInfo = {
	description: {
		key: 'updateLayerGroupViewSizeInfo',
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		newData['layerGroupViewSizeInfo'][payload.key] = payload.value
		return pushHistory(action, newData, false)
	}
}
export default cmd_updateLayerGroupViewSizeInfo