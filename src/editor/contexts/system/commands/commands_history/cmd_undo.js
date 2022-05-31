/**
 * undo 히스토리
 * @type {{description: {key: string}, execute: (function(*, *, *, *): {})}}
 */
const cmd_undo = {
	description: {
		key: 'undo'
	},
	execute: (state, action, payload, historyInfo) => {
		const {undoHistory} = historyInfo
		return undoHistory()
	}
}
export default cmd_undo