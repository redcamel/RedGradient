/**
 * 키보드의 상태를 업데이트
 * @type {{description: {key: string}, execute: (function(*, *, *): *&{keyState})}}
 */
const cmd_setKeyState = {
	description: {
		key: 'setKeyState'
	},
	execute: (state, action, payload) => {
		const newData = {
			...state,
			keyState: payload
		}
		return newData
	}
}
export default cmd_setKeyState