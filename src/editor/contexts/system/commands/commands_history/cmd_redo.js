/**
 * redo 히스토리
 * @type {{description: {key: string}, execute: (function(*, *, *, *): {})}}
 */
const cmd_redo = {
	description: {
		key: 'redo'
	},
	execute: (state, action, payload, historyInfo) => {
		const {redoHistory} = historyInfo
		return redoHistory()
	}
}
export default cmd_redo