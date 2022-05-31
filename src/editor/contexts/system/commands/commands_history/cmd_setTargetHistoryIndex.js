/**
 * 히스토리를 reset
 * @type {{description: {key: string}, execute: (function(*, *, *, *): {})}}
 */
const cmd_setTargetHistoryIndex = {
	description: {
		key: 'setTargetHistoryIndex'
	},
	execute: (state, action, payload, historyInfo) => {
		const {setTargetHistoryIndex, history} = historyInfo
		setTargetHistoryIndex(payload)
		return history[payload]['data']
	}
}
export default cmd_setTargetHistoryIndex