/**
 * 대상프레임의 해당뷰를 설정한다.
 * @type {{description: {key: string}, execute: (function(*, *, *): *)}}
 */
const cmd_setFrameLayoutData = {
	description: {
		key: 'setFrameLayoutData'
	},
	execute: (state, action, payload) => {
		const newData = {
			...state
		}
		newData.systemFrameLayoutInfo[payload.layoutKey].viewList[payload.index] = payload.value
		return newData
	}
}
export default cmd_setFrameLayoutData