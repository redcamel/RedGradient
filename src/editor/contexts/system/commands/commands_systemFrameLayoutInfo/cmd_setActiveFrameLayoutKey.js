/**
 * 프레임 레이아웃 분할 모드를 지정
 * @type {{description: {key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_setActiveFrameLayoutKey = {
	description: {
		key: 'setActiveFrameLayoutKey'
	},
	execute: (state, action, payload, historyInfo) => {
		const {pushHistory} = historyInfo
		const {key, icon} = payload
		console.log('value', key, icon)
		const newData = {
			...state
		}
		newData.systemFrameLayoutInfo.activeLayoutKey = key
		action.label = `set active frame layout : ${key}`
		action.icon = icon
		return pushHistory(action, newData, true)
	}
}
export default cmd_setActiveFrameLayoutKey