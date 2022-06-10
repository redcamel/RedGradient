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
		const {key, value} = payload
		const newData = {
			...JSON.parse(JSON.stringify(state))
		}
		newData['layerGroupViewSizeInfo'][key] = value
		action.label = `set ${key === 'previewBackgroundType' ? 'bgColor' : key} of group preview.  : ${value}`
		return pushHistory(action, newData, true)
	}
}
export default cmd_updateLayerGroupViewSizeInfo