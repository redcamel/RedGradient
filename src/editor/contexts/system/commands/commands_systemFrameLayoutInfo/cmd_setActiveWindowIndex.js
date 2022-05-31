/**
 * 분할된 프레임 레이아웃 내 활성화될 윈도우를 설정함
 * @type {{description: {key: string}, execute: (function(*, *, *): *)}}
 */
const cmd_setActiveWindowIndex = {
	description: {
		key: 'setActiveWindowIndex'
	},
	execute: (state, action, payload) => {
		const newData = {
			...state
		}
		newData.systemFrameLayoutInfo[newData.systemFrameLayoutInfo.activeLayoutKey].activeWindowIndex = payload.value
		return newData
	}
}
export default cmd_setActiveWindowIndex