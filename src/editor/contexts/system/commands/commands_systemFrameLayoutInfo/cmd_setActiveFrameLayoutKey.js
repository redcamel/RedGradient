/**
 * 프레임 레이아웃 분할 모드를 지정
 * @type {{description: {key: string}, execute: (function(*, *, *, *): *)}}
 */
const cmd_setActiveFrameLayoutKey = {
	description: {
		key: 'setActiveFrameLayoutKey'
	},
	execute: (state, action, payload, historyInfo) => {
		const newData = {
			...state
		}
		newData.systemFrameLayoutInfo.activeLayoutKey = payload.value
		return newData
	}
}
export default cmd_setActiveFrameLayoutKey