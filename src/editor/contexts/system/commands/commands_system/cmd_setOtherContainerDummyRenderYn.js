/**
 * 현재 컨테이너 이외의 컨테이너를 표시할지 여부를 결정
 * @type {{description: {key: string}, execute: (function(*, *, *): *&{otherContainerDummyRenderYn})}}
 */
const cmd_setOtherContainerDummyRenderYn = {
	description: {
		key: 'setOtherContainerDummyRenderYn'
	},
	execute: (state, action, payload) => {
		const newData = {
			...state,
			otherContainerDummyRenderYn: payload
		}
		return newData
	}
}
export default cmd_setOtherContainerDummyRenderYn